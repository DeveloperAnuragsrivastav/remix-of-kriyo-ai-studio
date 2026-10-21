/**
 * Server-only helpers shared by the live demos: env access, error type, rate limits and Turnstile.
 * Only referenced inside createServerFn handlers, so the compiler strips this module from the client bundle.
 */
import { getRequestHeader, getRequestIP } from "@tanstack/react-start/server";

export const env = (k: string) => process.env[k]?.trim() || "";

/* ---------- helpers (server-only, called from handlers) ---------- */

export class PlaygroundError extends Error {}
export const fail = (message: string): never => { throw new PlaygroundError(message); };

/**
 * The visitor's IP. Netlify sets x-nf-client-connection-ip itself, so it can't be spoofed by the
 * browser; x-forwarded-for is only a fallback for other hosts and local dev.
 */
export function clientIp() {
  return getRequestHeader("x-nf-client-connection-ip")?.trim() || getRequestIP() || getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
}

/* ---------- rate limits ---------- */

const MIN = 60, HOUR = 60 * MIN, DAY = 24 * HOUR;

/**
 * Every demo that spends API credit is limited three ways:
 *   - a burst limit per visitor (stops scripts hammering it),
 *   - a daily limit per visitor (a fair share for real visitors),
 *   - a daily cap across all visitors (a hard ceiling on the bill, whatever happens).
 */
export const LIMITS = {
  chat:      { burst: [6, MIN], daily: 40, global: 1500 },  // website assistant + WhatsApp funnel (Groq)
  feedback:  { burst: [4, MIN], daily: 20, global: 600 },   // patient-feedback classifier (Groq)
  voiceCall: { burst: [2, 10 * MIN], daily: 8, global: 200 }, // starting a voice call (ElevenLabs greeting)
  voiceTurn: { burst: [12, MIN], daily: 120, global: 2500 }, // each spoken reply (Groq + ElevenLabs)
  outreach:  { burst: [2, 10 * MIN], daily: 3, global: 60 },  // LinkedIn read via Apify
  inviteMail:{ burst: [1, MIN], daily: 3, global: 100 },    // invite email via Resend
} satisfies Record<string, { burst: [number, number]; daily: number; global: number }>;
export type LimitName = keyof typeof LIMITS;

const memoryHits = new Map<string, { n: number; reset: number }>();

/** Counts one hit in a fixed window and says whether it went over. Upstash when configured (shared across instances), else in-memory. */
async function over(key: string, limit: number, windowSec: number) {
  const bucket = Math.floor(Date.now() / 1000 / windowSec);
  const k = `rl:${key}:${bucket}`;
  const url = env("UPSTASH_REDIS_REST_URL"), token = env("UPSTASH_REDIS_REST_TOKEN");
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([["INCR", k], ["EXPIRE", k, String(windowSec), "NX"]]),
      });
      if (res.ok) { const [incr] = (await res.json()) as [{ result: number }]; return (incr?.result ?? 0) > limit; }
      console.error("[ratelimit] upstash", res.status);
    } catch (e) { console.error("[ratelimit] upstash", e); }
    // Upstash unreachable: fall through to the in-memory counter rather than leaving the demo open.
  }
  const now = Date.now();
  if (memoryHits.size > 5000) for (const [mk, v] of memoryHits) if (v.reset < now) memoryHits.delete(mk);
  const hit = memoryHits.get(k);
  if (!hit || hit.reset < now) { memoryHits.set(k, { n: 1, reset: now + windowSec * 1000 }); return 1 > limit; }
  return ++hit.n > limit;
}

/**
 * Applies a demo's limits for this visitor. A burst of requests is refused outright (that's a script,
 * not a person). Past the daily share or the global cap the demo keeps running, but in its scripted
 * version, so it never spends more credit and never shows a dead end. Returns whether live AI may be used.
 */
export async function guard(name: LimitName): Promise<boolean> {
  const l = LIMITS[name], ip = clientIp();
  const [burst, burstWindow] = l.burst;
  if (await over(`${name}:ip:${ip}:burst`, burst, burstWindow)) fail("That's a lot of requests in a short time. Give it a minute and try again.");
  if (await over(`${name}:ip:${ip}:day`, l.daily, DAY)) return false;
  if (await over(`${name}:global:day`, l.global, DAY)) return false;
  return true;
}

/* ---------- circuit breaker ---------- */

const openUntil = new Map<string, number>();

/** True while a provider is cooling down after a failure, so visitors get the fallback instantly instead of waiting on a dead key. */
export const isDown = (service: string) => (openUntil.get(service) ?? 0) > Date.now();

/**
 * Marks a provider as down after a failed call. Bad or exhausted keys (401/402/403) cool down for 10 minutes,
 * rate limits (429) for the provider's Retry-After or 2 minutes, outages and timeouts for 30 seconds.
 */
export function markDown(service: string, status: number, retryAfter?: string | null) {
  const sec = Number(retryAfter) || ([401, 402, 403].includes(status) ? 600 : status === 429 ? 120 : 30);
  openUntil.set(service, Date.now() + Math.min(sec, 3600) * 1000);
  console.error(`[demo] ${service} unavailable (${status || "network"}); using fallback for ${sec}s`);
}

/** A single extra limit on any key (used for per-profile and per-email caps). */
export async function rateLimit(key: string, limit: number, windowSec: number) {
  if (await over(key, limit, windowSec)) fail("You've reached today's limit for this demo. Message me on WhatsApp and I'll run it for you.");
}

/**
 * Frontend hostnames a Turnstile token may come from. Production only accepts the real domains;
 * localhost is allowed in local development. Override with TURNSTILE_HOSTNAMES (comma-separated).
 */
function turnstileHostOk(host: string | undefined) {
  if (!host) return false;
  const list = env("TURNSTILE_HOSTNAMES") ? env("TURNSTILE_HOSTNAMES").split(",").map(h => h.trim()) : ["kriyvoai.online", "www.kriyvoai.online", "kriyvo-ai.netlify.app"];
  if (list.includes(host) || host.endsWith("--kriyvo-ai.netlify.app")) return true; // deploy previews
  return process.env["NODE_ENV"] !== "production" && (host === "localhost" || host === "127.0.0.1");
}

/**
 * Verifies a Turnstile token with Cloudflare. Fails closed: a missing, oversized, replayed or
 * wrong-action token, a foreign hostname, or Cloudflare being unreachable all reject the request.
 */
export async function verifyTurnstile(token: string | undefined, action: string) {
  const secret = env("TURNSTILE_SECRET_KEY");
  if (!secret) return; // Not configured yet: rate limits still apply.
  if (typeof token !== "string" || !token || token.length > 2048) fail("Please complete the quick human check.");
  let out: { success: boolean; action?: string; hostname?: string; "error-codes"?: string[] };
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      signal: AbortSignal.timeout(8000),
      body: new URLSearchParams({ secret, response: token!, remoteip: clientIp() }),
    });
    if (!res.ok) throw new Error(`siteverify ${res.status}`);
    out = await res.json();
  } catch (e) {
    console.error("[turnstile]", e instanceof Error ? e.message : e);
    return fail("The human check couldn't be confirmed right now. Please try again in a moment.");
  }
  if (!out.success) {
    const codes = out["error-codes"] ?? [];
    if (codes.includes("invalid-input-secret")) console.error("[turnstile] TURNSTILE_SECRET_KEY is wrong or missing in this environment");
    fail(codes.includes("timeout-or-duplicate") ? "That human check expired. Please tick it again." : "The human check failed. Please refresh and try again.");
  }
  if (out.action !== action) { console.error("[turnstile] action mismatch", out.action); fail("The human check failed. Please refresh and try again."); }
  if (!turnstileHostOk(out.hostname)) { console.error("[turnstile] hostname not allowed", out.hostname); fail("The human check failed. Please refresh and try again."); }
}

export const wrap = async <T,>(fn: () => Promise<T>): Promise<T | { error: string }> => {
  try { return await fn(); }
  catch (e) {
    if (e instanceof PlaygroundError) return { error: e.message };
    console.error("[demo]", e);
    return { error: "Something went wrong on my side. Please try again in a minute." };
  }
};
