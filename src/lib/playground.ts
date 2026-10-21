/**
 * "Try it now" outreach playground.
 *
 * Everything that touches a secret runs inside createServerFn handlers, which execute only on the
 * server (Vercel functions in production). The browser receives results and short-lived signed
 * tokens — never APIFY_TOKEN, RESEND_API_KEY or any other key.
 */
import { createServerFn } from "@tanstack/react-start";
import { PlaygroundError, env, fail, guard, isDown, markDown, rateLimit, verifyTurnstile, wrap } from "@/lib/demo-guards";
import { buildInviteHtml, type InviteProfile } from "@/lib/invite-template";

const LINKEDIN_RE = /^https:\/\/(www\.|[a-z]{2}\.)?linkedin\.com\/in\/[A-Za-z0-9\-_%]{3,100}\/?(\?.*)?$/;
const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,190}\.[a-z]{2,24}$/i;
const ACTOR_MODE = "Profile details no email ($4 per 1k)";
const RUN_TTL_MS = 10 * 60 * 1000;

const siteUrl = () => env("SITE_URL") || "https://kriyvoai.online";

// Signed tokens tie a run to the visitor who started it, so nobody can read or email someone else's run.
async function hmac(data: string) {
  const secret = env("PLAYGROUND_SECRET") || env("APIFY_TOKEN");
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return btoa(String.fromCharCode(...new Uint8Array(sig))).replace(/[+/=]/g, c => ({ "+": "-", "/": "_", "=": "" })[c]!);
}
const b64 = (s: string) => btoa(String.fromCharCode(...new TextEncoder().encode(s)));
const unb64 = (s: string) => new TextDecoder().decode(Uint8Array.from(atob(s), c => c.charCodeAt(0)));
async function sign<T extends object>(data: T) {
  const payload = b64(JSON.stringify({ ...data, exp: Date.now() + RUN_TTL_MS }));
  return `${payload}.${await hmac(payload)}`;
}
async function verify<T>(token: string): Promise<T> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig || (await hmac(payload)) !== sig) fail("This demo session is invalid. Please start again.");
  const data = JSON.parse(unb64(payload!)) as T & { exp: number };
  if (data.exp < Date.now()) fail("This demo session expired. Please start again.");
  return data;
}
const signRun = (runId: string, email: string) => sign({ runId, email });
const readRun = (token: string) => verify<{ runId?: string; email: string; sample?: string }>(token);

/**
 * Fallback when the profile reader can't run (no key, credit used up, Apify down, or the visitor is past
 * their share): the invite is still written, from the name in their LinkedIn URL, and marked as a sample.
 */
function sampleProfile(linkedinUrl: string): InviteProfile {
  const slug = linkedinUrl.split("/in/")[1]?.split(/[/?]/)[0] ?? "";
  const first = decodeURIComponent(slug).split(/[-_]/).find(w => /^[a-z]{2,}$/i.test(w)) ?? "there";
  return { firstName: first[0]!.toUpperCase() + first.slice(1).toLowerCase(), lastName: "", headline: "", about: "", location: "", company: "", role: "", industry: "", skills: [], photo: "" };
}

async function apify(path: string, init?: RequestInit) {
  const token = env("APIFY_TOKEN");
  if (!token) fail("The live demo isn't switched on yet. Message me on WhatsApp for a personal demo.");
  return fetch(`https://api.apify.com/v2${path}`, { ...init, headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json", ...init?.headers } });
}

type Position = { position?: string; companyName?: string };
/** The subset of the actor's output that the invite uses. */
type RawProfile = {
  firstName?: string; lastName?: string; headline?: string; about?: string; industry?: string; photo?: string; error?: unknown;
  location?: { linkedinText?: string; parsed?: { text?: string } };
  currentPosition?: Position[]; experience?: Position[]; topSkills?: string | string[];
};

/** Keep only what the invite needs (data minimisation). */
function pickProfile(raw: RawProfile): InviteProfile {
  const pos: Position = raw.currentPosition?.[0] ?? raw.experience?.[0] ?? {};
  const clip = (s: unknown, n: number) => (typeof s === "string" ? s.trim().slice(0, n) : "");
  return {
    firstName: clip(raw.firstName, 40) || "there",
    lastName: clip(raw.lastName, 40),
    headline: clip(raw.headline, 160),
    about: clip(raw.about, 600),
    location: clip(raw.location?.linkedinText ?? raw.location?.parsed?.text, 80),
    company: clip(pos.companyName, 80),
    role: clip(pos.position, 80),
    industry: clip(raw.industry, 60),
    skills: (Array.isArray(raw.topSkills) ? raw.topSkills : String(raw.topSkills ?? "").split(/[,•·]/)).map(s => clip(s, 40)).filter(Boolean).slice(0, 5),
    photo: typeof raw.photo === "string" && raw.photo.startsWith("https://media.licdn.com/") ? raw.photo : "",
  };
}

/* ---------- server functions ---------- */

export const startPlayground = createServerFn({ method: "POST" })
  .inputValidator((d: { linkedinUrl: string; email: string; consent: boolean; turnstileToken?: string }) => d)
  .handler(({ data }) => wrap(async () => {
    const linkedinUrl = String(data.linkedinUrl ?? "").trim();
    const email = String(data.email ?? "").trim().toLowerCase();
    if (!LINKEDIN_RE.test(linkedinUrl)) fail("Please paste your LinkedIn profile URL, like https://www.linkedin.com/in/your-name");
    if (!EMAIL_RE.test(email)) fail("Please enter a valid email address.");
    if (data.consent !== true) fail("Please tick the consent box so I can use your public profile for this demo.");
    await verifyTurnstile(data.turnstileToken, "outreach-demo");
    const allowed = await guard("outreach");
    await rateLimit(`pg:profile:${linkedinUrl.toLowerCase()}`, 2, 24 * 60 * 60);
    const sample = () => sign({ email, sample: linkedinUrl });
    if (!allowed || !env("APIFY_TOKEN") || isDown("apify")) return { token: await sample() };

    const actor = env("APIFY_ACTOR") || "harvestapi~linkedin-profile-scraper";
    try {
      const res = await apify(`/acts/${actor}/runs?timeout=90&maxItems=1&maxTotalChargeUsd=0.05`, {
        method: "POST",
        signal: AbortSignal.timeout(15000),
        body: JSON.stringify({ profileScraperMode: ACTOR_MODE, queries: [linkedinUrl.split("?")[0]] }),
      });
      if (!res.ok) { console.error("[playground] apify start", res.status, (await res.text()).slice(0, 300)); markDown("apify", res.status, res.headers.get("retry-after")); return { token: await sample() }; }
      const run = (await res.json()) as { data: { id: string } };
      return { token: await signRun(run.data.id, email) };
    } catch (e) {
      console.error("[playground] apify start", e instanceof Error ? e.message : e);
      markDown("apify", 0);
      return { token: await sample() };
    }
  }));

export const checkPlayground = createServerFn({ method: "POST" })
  .inputValidator((d: { token: string }) => d)
  .handler(({ data }) => wrap(async () => {
    const run0 = await readRun(String(data.token ?? ""));
    const email = run0.email;
    const done = async (profile: InviteProfile, sample = false) => ({ status: "done" as const, sample, profile, html: buildInviteHtml(profile, siteUrl()), inviteToken: await sign({ email, profile }) });
    if (run0.sample || !run0.runId) return done(sampleProfile(run0.sample ?? ""), true);
    const runId = run0.runId;
    const res = await apify(`/actor-runs/${runId}`).catch(() => null);
    if (!res?.ok) return done(sampleProfile(""), true);
    const run = ((await res.json()) as { data: { status: string; defaultDatasetId: string } }).data;
    if (["READY", "RUNNING"].includes(run.status)) return { status: "running" as const };
    if (run.status !== "SUCCEEDED") fail("I couldn't read that profile. Check the URL is your public LinkedIn profile and try again.");

    const items = (await (await apify(`/datasets/${run.defaultDatasetId}/items?clean=true&limit=1`)).json()) as RawProfile[];
    // Data is used once and not stored: delete the scraped result from Apify straight away.
    void apify(`/datasets/${run.defaultDatasetId}`, { method: "DELETE" }).catch(() => {});
    const raw = items?.[0];
    if (!raw || raw.error || !raw.firstName) fail("That profile looks private or empty. Try your public LinkedIn profile URL.");
    const profile = pickProfile(raw!);
    return done(profile);
  }));

export const emailPlayground = createServerFn({ method: "POST" })
  .inputValidator((d: { inviteToken: string }) => d)
  .handler(({ data }) => wrap(async () => {
    const { email, profile } = await verify<{ email: string; profile: InviteProfile }>(String(data.inviteToken ?? ""));
    const key = env("RESEND_API_KEY");
    if (!key) fail("Email isn't switched on yet — you can still copy your invite below.");
    if (!(await guard("inviteMail"))) fail("Today's email allowance is used up. You can copy the invite below instead.");
    await rateLimit(`pg:email:${email}`, 1, 24 * 60 * 60);
    const html = buildInviteHtml(profile, siteUrl());
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: env("INVITE_FROM") || "Kriyvo AI <hello@kriyvoai.online>",
        to: [email],
        subject: `${profile.firstName}, your personalised Kriyvo AI invite`,
        html,
      }),
    });
    if (!res.ok) { console.error("[playground] resend", res.status, await res.text()); fail("The email couldn't be sent right now. You can copy the invite instead."); }
    return { sent: true as const };
  }));
