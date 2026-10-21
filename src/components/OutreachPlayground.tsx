import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Linkedin, Loader2, Mail, RotateCcw, Sparkles } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { checkPlayground, emailPlayground, startPlayground } from "@/lib/playground";
import { WHATSAPP } from "@/lib/kriyo-data";

type Phase = "form" | "running" | "done";
const STAGES = ["Reading your public LinkedIn profile…", "Finding ideas that fit your role…", "Writing your personal invite…"];
const TURNSTILE_SITE_KEY = import.meta.env["VITE_TURNSTILE_SITE_KEY"] as string | undefined;

export const TURNSTILE_ACTION = "outreach-demo";

declare global {
  interface Window { turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void; remove: (id: string) => void } }
}

let scriptLoading: Promise<void> | null = null;
const loadTurnstile = () => scriptLoading ??= new Promise<void>((resolve, reject) => {
  if (window.turnstile) { resolve(); return; }
  const s = document.createElement("script");
  s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
  s.async = true; s.defer = true;
  s.onload = () => resolve();
  s.onerror = () => { scriptLoading = null; reject(new Error("turnstile")); };
  document.head.appendChild(s);
});

/**
 * Cloudflare Turnstile human check, rendered explicitly so each form gets a fresh widget. Tokens are
 * single-use: the form remounts this after every attempt, which renders a new widget and a new token.
 * An expired or failed check clears the token so the submit button waits for a new one.
 * Renders nothing until a site key is configured.
 */
function Turnstile({ onToken }: { onToken: (t: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || !ref.current) return;
    let id: string | undefined, gone = false;
    loadTurnstile().then(() => {
      if (gone || !ref.current || !window.turnstile) return;
      id = window.turnstile.render(ref.current, {
        sitekey: TURNSTILE_SITE_KEY,
        action: TURNSTILE_ACTION,
        theme: "light",
        callback: (t: string) => { setFailed(false); onToken(t); },
        "expired-callback": () => onToken(""),
        "error-callback": () => { onToken(""); setFailed(true); },
      });
    }).catch(() => setFailed(true));
    return () => { gone = true; if (id) window.turnstile?.remove(id); };
  }, [onToken]);
  if (!TURNSTILE_SITE_KEY) return null;
  return <div>
    <div ref={ref} className="min-h-[65px]" />
    {failed && <p className="mt-1 text-[14px] text-muted-foreground">The human check couldn't load. Turn off any blocker for challenges.cloudflare.com, or message me on WhatsApp.</p>}
  </div>;
}

export function OutreachPlayground({ trigger }: { trigger?: ReactNode } = {}) {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("form");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [captcha, setCaptcha] = useState("");
  const [error, setError] = useState("");
  const [stage, setStage] = useState(0);
  const [result, setResult] = useState<{ html: string; inviteToken: string; firstName: string; sample: boolean } | null>(null);
  const [mail, setMail] = useState<"idle" | "sending" | "sent">("idle");
  const [copied, setCopied] = useState(false);
  const cancelled = useRef(false);

  useEffect(() => () => { cancelled.current = true; }, []);
  useEffect(() => {
    if (phase !== "running") return;
    const id = window.setInterval(() => setStage(s => Math.min(s + 1, STAGES.length - 1)), 3500);
    return () => window.clearInterval(id);
  }, [phase]);

  const reset = () => { setPhase("form"); setResult(null); setError(""); setStage(0); setMail("idle"); setCopied(false); };

  async function run(e: React.FormEvent) {
    e.preventDefault();
    if (TURNSTILE_SITE_KEY && !captcha) { setError("Please complete the quick human check first."); return; }
    setError(""); setStage(0); setPhase("running"); cancelled.current = false;
    const turnstileToken = captcha;
    setCaptcha(""); // single-use: the form shows a fresh check if this attempt fails
    const started = await startPlayground({ data: { linkedinUrl, email, consent, turnstileToken } });
    if ("error" in started) { setError(started.error); setPhase("form"); return; }
    const deadline = Date.now() + 120_000;
    while (!cancelled.current && Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 2500));
      const res = await checkPlayground({ data: { token: started.token } });
      if ("error" in res) { setError(res.error); setPhase("form"); return; }
      if (res.status === "done") { setResult({ html: res.html, inviteToken: res.inviteToken, firstName: res.profile.firstName, sample: res.sample }); setPhase("done"); return; }
    }
    if (!cancelled.current) { setError("That took longer than expected. Please try again."); setPhase("form"); }
  }

  async function sendEmail() {
    if (!result) return;
    setMail("sending");
    const res = await emailPlayground({ data: { inviteToken: result.inviteToken } });
    if ("error" in res) { setError(res.error); setMail("idle"); return; }
    setMail("sent");
  }

  async function copyHtml() {
    if (!result) return;
    await navigator.clipboard.writeText(result.html);
    setCopied(true); window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog open={open} onOpenChange={o => { setOpen(o); if (!o) { cancelled.current = true; reset(); } }}>
      <DialogTrigger asChild>
        {trigger ?? <button type="button" className="btn bg-ink-foreground text-ink">
          <Sparkles aria-hidden className="h-4 w-4" /> Try it now on your own profile
        </button>}
      </DialogTrigger>
      <DialogContent className="h-[100svh] max-h-[100svh] w-screen max-w-none gap-0 overflow-y-auto rounded-none border-0 p-0 sm:h-auto sm:max-h-[92svh] sm:w-[calc(100vw-2rem)] sm:max-w-2xl sm:rounded-[28px]">
        <div className="border-b border-border p-5 pr-12 md:p-8">
          <DialogTitle className="font-display text-[1.6rem] font-normal leading-tight md:text-3xl">See the outreach pipeline write to you</DialogTitle>
          <DialogDescription className="mt-2 text-base leading-relaxed text-muted-foreground">
            Paste your LinkedIn profile. The same engine I build for clients reads your public profile and writes you a personalised invite in seconds.
          </DialogDescription>
        </div>

        <div className="p-5 md:p-8">
          {phase === "form" && (
            <form onSubmit={run} className="space-y-5">
              <div>
                <label htmlFor="pg-linkedin" className="mb-2 block text-[15px]">Your LinkedIn profile URL</label>
                <div className="relative">
                  <Linkedin aria-hidden className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input id="pg-linkedin" type="url" required inputMode="url" value={linkedinUrl} onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="https://www.linkedin.com/in/your-name" className="h-12 w-full rounded-2xl bg-stone pl-10 pr-3.5 text-base outline-none ring-flame/40 focus:ring-2" />
                </div>
              </div>
              <div>
                <label htmlFor="pg-email" className="mb-2 block text-[15px]">Your email (for an optional copy)</label>
                <div className="relative">
                  <Mail aria-hidden className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input id="pg-email" type="email" required autoComplete="email" value={email} onChange={e => setEmail(e.target.value)}
                    placeholder="you@company.com" className="h-12 w-full rounded-2xl bg-stone pl-10 pr-3.5 text-base outline-none ring-flame/40 focus:ring-2" />
                </div>
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-stone p-4 text-[15px] leading-relaxed">
                <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} required className="mt-0.5 h-4 w-4 shrink-0 accent-[var(--accent)]" />
                <span>Use my <strong>public</strong> LinkedIn profile to personalise this demo. It's used once to write the invite and isn't stored. <a href="/privacy-policy#demos" target="_blank" rel="noreferrer" className="text-accent underline underline-offset-4">How demo data is handled</a></span>
              </label>
              <Turnstile onToken={setCaptcha} />
              {error && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
              <button type="submit" disabled={!consent || (!!TURNSTILE_SITE_KEY && !captcha)} className="btn btn-dark w-full disabled:opacity-50">
                <Sparkles aria-hidden className="h-4 w-4" /> Write my invite
              </button>
              <p className="text-center text-[14px] text-muted-foreground">Free demo · 3 tries per day · Takes about 10 seconds</p>
            </form>
          )}

          {phase === "running" && (
            <div className="py-6" aria-live="polite">
              <ol className="space-y-4">
                {STAGES.map((s, i) => (
                  <li key={s} className={`flex items-center gap-3 text-base transition-opacity duration-500 ${i <= stage ? "opacity-100" : "opacity-35"}`}>
                    {i < stage ? <Check aria-hidden className="h-5 w-5 text-accent" strokeWidth={2.5} /> : i === stage ? <Loader2 aria-hidden className="h-5 w-5 animate-spin text-accent" /> : <span className="h-5 w-5 rounded-full border-2 border-border" aria-hidden />}
                    {s}
                  </li>
                ))}
              </ol>
            </div>
          )}

          {phase === "done" && result && (
            <div className="space-y-5">
              <p className="text-base"><strong>Here's your invite, {result.firstName}.</strong> This is exactly what the pipeline would send.</p>
              {result.sample && <p className="rounded-xl bg-stone px-4 py-3 text-[14px] text-muted-foreground">The profile reader is resting right now, so this sample is written from your name only. With your full profile it also uses your role, company and skills.</p>}
              <iframe title="Your personalised invite" srcDoc={result.html} sandbox="allow-popups allow-popups-to-escape-sandbox" className="h-[60svh] w-full rounded-2xl bg-stone sm:h-[520px]" />
              {error && <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">{error}</p>}
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={sendEmail} disabled={mail !== "idle"} className="btn btn-dark disabled:opacity-60">
                  {mail === "sending" ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : mail === "sent" ? <Check aria-hidden className="h-4 w-4" /> : <Mail aria-hidden className="h-4 w-4" />}
                  {mail === "sent" ? `Sent to ${email}` : "Email me a copy"}
                </button>
                <button type="button" onClick={copyHtml} className="btn btn-light">
                  {copied ? <Check aria-hidden className="h-4 w-4" /> : <Copy aria-hidden className="h-4 w-4" />}{copied ? "Copied" : "Copy HTML"}
                </button>
                <button type="button" onClick={reset} className="btn btn-light">
                  <RotateCcw aria-hidden className="h-4 w-4" /> Try another
                </button>
              </div>
              <div className="flex flex-col gap-3 rounded-2xl bg-ink p-5 text-ink-foreground sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-relaxed text-ink-foreground/80">Want this running for your own leads?</p>
                <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn shrink-0 bg-ink-foreground text-ink">Build mine <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
