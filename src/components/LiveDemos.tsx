import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Bot, Check, CheckCheck, FileText, Loader2, Mail, Mic, MicOff, Phone, PhoneOff, Send, Sparkles, Star, Ticket, Users, Webhook } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Orb } from "@/components/Orb";
import { askAssistant, classifyFeedback, voiceTurn } from "@/lib/live-demos";
import { BUSINESS } from "@/lib/business";

/** Interactive, real-time versions of the portfolio projects, opened from a "Try it now" button. */
export type DemoKind = "chatbot" | "whatsapp" | "feedback" | "voice";
export const demoForProject: Record<string, DemoKind> = {
  "website-ai-chatbot": "chatbot",
  "gignaati-whatsapp-bot": "whatsapp",
  "bmrc-patient-feedback-pipeline": "feedback",
  "ai-phone-calling-agent": "voice",
};

const wa = (text: string) => `https://wa.me/${BUSINESS.phoneE164.slice(1)}?text=${encodeURIComponent(text)}`;
const meta: Record<DemoKind, { title: string; text: string }> = {
  chatbot: { title: "Talk to the Kriyvo assistant", text: "Ask about prices, delivery or what's included. It answers only from Kriyvo's own facts and captures your details when you're ready." },
  whatsapp: { title: "Try the WhatsApp lead funnel", text: "This is what a lead from a Click-to-WhatsApp ad goes through. Answer like a customer and watch the CRM fill in." },
  feedback: { title: "Send feedback like a patient", text: "Write in any language. The pipeline reads it, classifies it and alerts the right department head." },
  voice: { title: "Call the AI receptionist", text: "Speak to a live voice agent. It answers, checks availability and books, like the one built for a client." },
};

/** The shell every demo opens in: full screen on phones, a centred window on larger screens. */
export function LiveDemo({ kind, trigger }: { kind: DemoKind; trigger: ReactNode }) {
  const [open, setOpen] = useState(false);
  return <Dialog open={open} onOpenChange={setOpen}>
    <DialogTrigger asChild>{trigger}</DialogTrigger>
    <DialogContent className="flex h-[100svh] max-h-[100svh] w-screen max-w-none flex-col gap-0 overflow-hidden rounded-none border-0 bg-background p-0 sm:h-[min(760px,92svh)] sm:w-[calc(100vw-2rem)] sm:max-w-3xl sm:rounded-[28px]">
      <div className="border-b border-border px-5 pb-4 pt-5 pr-12 md:px-7 md:pt-6">
        <DialogTitle className="font-display text-[1.6rem] font-normal leading-tight md:text-[1.9rem]">{meta[kind].title}</DialogTitle>
        <DialogDescription className="mt-1.5 text-[15px] leading-relaxed text-muted-foreground">{meta[kind].text}</DialogDescription>
      </div>
      <div className="min-h-0 flex-1">{open && (kind === "chatbot" ? <ChatDemo /> : kind === "whatsapp" ? <WhatsAppDemo /> : kind === "feedback" ? <FeedbackDemo /> : <VoiceDemo />)}</div>
    </DialogContent>
  </Dialog>;
}

const ModeNote = ({ live }: { live: boolean | null }) => live === false
  ? <p className="text-[12px] text-muted-foreground">Demo mode: scripted answers until the AI key is switched on.</p>
  : null;

/* ---------- Chatbot ---------- */
type Turn = { role: "user" | "assistant"; text: string; source?: string | null };
type Lead = { name: string | null; phone: string | null; email: string | null; need: string | null };

function ChatDemo() {
  const [turns, setTurns] = useState<Turn[]>([{ role: "assistant", text: "Hi! I'm the Kriyvo assistant. Ask me anything about websites, chatbots or automation." }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [lead, setLead] = useState<Lead | null>(null);
  const [live, setLive] = useState<boolean | null>(null);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [turns, busy]);

  const send = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...turns, { role: "user" as const, text: q }];
    setTurns(next); setInput(""); setBusy(true);
    const res = await askAssistant({ data: { turns: next.slice(1).map(t => ({ role: t.role, text: t.text })) } }).catch(() => ({ error: "Connection problem. Please try again." }));
    setBusy(false);
    if ("error" in res) { setTurns(t => [...t, { role: "assistant", text: res.error }]); return; }
    setLive(res.live);
    setTurns(t => [...t, { role: "assistant", text: res.reply, source: res.source }]);
    if (res.lead.phone || res.lead.email) setLead(l => ({ name: res.lead.name ?? l?.name ?? null, phone: res.lead.phone ?? l?.phone ?? null, email: res.lead.email ?? l?.email ?? null, need: res.lead.need ?? l?.need ?? null }));
  };

  const chips = ["How much is a business website?", "How fast can you deliver?", "WhatsApp bot ka price kya hai?"];
  return <div className="grid h-full md:grid-cols-[1fr_250px]">
    <div className="flex min-h-0 flex-col">
      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto px-5 py-5 md:px-7">
        {turns.map((t, i) => <div key={i} className={`flex animate-stage ${t.role === "user" ? "justify-end" : "justify-start"}`}>
          <div className="max-w-[85%]">
            <p className={`rounded-2xl px-4 py-2.5 text-[15px] leading-relaxed ${t.role === "user" ? "rounded-br-md bg-ink text-ink-foreground" : "rounded-bl-md bg-stone"}`}>{t.text}</p>
            {t.source && <p className="mt-1.5 flex items-center gap-1.5 pl-1 text-[12px] text-muted-foreground"><FileText aria-hidden className="h-3 w-3" />From: {t.source}</p>}
          </div>
        </div>)}
        {busy && <div className="flex gap-1.5 rounded-2xl rounded-bl-md bg-stone px-4 py-3.5 w-fit" aria-label="Assistant is typing">{[0, 1, 2].map(i => <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground/60" style={{ animation: `typing 1.2s ${i * 0.15}s ease-in-out infinite` }} />)}</div>}
        <div ref={end} />
      </div>
      {turns.length < 3 && <div className="flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:px-7">{chips.map(c => <button key={c} type="button" onClick={() => send(c)} className="shrink-0 rounded-full bg-stone px-3.5 py-2 text-[14px] transition-colors hover:bg-border">{c}</button>)}</div>}
      <form onSubmit={e => { e.preventDefault(); void send(input); }} className="flex items-center gap-2 border-t border-border px-4 py-3 md:px-6">
        <label htmlFor="demo-chat" className="sr-only">Your message</label>
        <input id="demo-chat" value={input} onChange={e => setInput(e.target.value)} placeholder="Ask a question, or share your WhatsApp number" autoComplete="off" className="h-12 min-w-0 flex-1 rounded-full bg-stone px-5 text-[15px] outline-none ring-flame/40 focus:ring-2" />
        <button type="submit" aria-label="Send" disabled={busy || !input.trim()} className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground transition-opacity disabled:opacity-40"><Send aria-hidden className="h-5 w-5" /></button>
      </form>
    </div>
    <aside className="hidden border-l border-border bg-stone/60 p-5 md:block">
      <p className="text-[13px] text-muted-foreground">What the business sees</p>
      {lead ? <div className="mt-4 animate-stage rounded-2xl bg-card p-4">
        <p className="flex items-center gap-2 text-[14px] font-medium"><Users aria-hidden className="h-4 w-4 text-accent" />New lead in CRM</p>
        <dl className="mt-3 space-y-1.5 text-[13px]">{([["Name", lead.name], ["Phone", lead.phone], ["Email", lead.email], ["Wants", lead.need]] as const).filter(([, v]) => v).map(([k, v]) => <div key={k} className="flex gap-2"><dt className="w-14 text-muted-foreground">{k}</dt><dd className="min-w-0 break-words">{v}</dd></div>)}</dl>
        <a href={wa(`Hi Kriyvo AI, I tried the website assistant demo.${lead.need ? ` I need: ${lead.need}.` : ""}`)} target="_blank" rel="noreferrer" className="btn btn-dark mt-4 w-full !py-2.5 !text-[14px]">Talk to Kriyvo</a>
      </div> : <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">Share a WhatsApp number or email in the chat and a lead card appears here, the way it lands in a CRM.</p>}
      <div className="mt-6"><ModeNote live={live} /></div>
    </aside>
  </div>;
}

/* ---------- WhatsApp funnel (button-led, like the real Gignaati bot) ---------- */
type WaMsg = { me?: boolean; text: string; time: string; buttons?: string[] | undefined };
type WaData = Partial<Record<"name" | "need" | "budget" | "when", string>>;
const STEPS: { ask: string; buttons?: string[]; key: "name" | "need" | "budget" | "when" }[] = [
  { ask: "Thanks for reaching out to Kriyvo AI! What's your name?", key: "name" },
  { ask: "Nice to meet you, {name}. What do you need?", buttons: ["A website", "An AI chatbot", "Automation"], key: "need" },
  { ask: "Great choice. What's your budget?", buttons: ["Under ₹10k", "₹10k–₹50k", "Above ₹50k"], key: "budget" },
  { ask: "And when would you like to start?", buttons: ["This week", "This month", "Just exploring"], key: "when" },
];
const clock = () => new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: false });

function WhatsAppDemo() {
  const [msgs, setMsgs] = useState<WaMsg[]>([{ me: true, text: "Hi, I saw your ad. Need a quote.", time: clock() }]);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<WaData>({});
  const [typing, setTyping] = useState(true);
  const [input, setInput] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => { end.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [msgs, typing]);
  const botSay = (s: number, d: WaData) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      if (s < STEPS.length) setMsgs(m => [...m, { text: STEPS[s]!.ask.replace("{name}", d.name ?? ""), time: clock(), buttons: STEPS[s]!.buttons }]);
      else setMsgs(m => [...m, { text: `Thanks ${d.name}! Connecting you to our sales team now. They'll reply here shortly.`, time: clock() }]);
    }, 900);
  };
  useEffect(() => { botSay(0, {}); }, []);
  const answer = (value: string) => {
    const v = value.trim();
    if (!v || step >= STEPS.length) return;
    const d: WaData = { ...data, [STEPS[step]!.key]: v };
    setData(d); setMsgs(m => [...m, { me: true, text: v, time: clock() }]); setInput("");
    const s = step + 1; setStep(s); botSay(s, d);
  };
  const score = data.budget === "Above ₹50k" || data.when === "This week" ? "hot" : data.budget === "Under ₹10k" && data.when === "Just exploring" ? "cold" : "warm";
  const done = step >= STEPS.length;
  const current = STEPS[step];

  return <div className="grid h-full md:grid-cols-[1fr_250px]">
    <div className="flex min-h-0 flex-col bg-[#efeae2]">
      <div className="flex items-center gap-3 bg-[#008069] px-4 py-3 text-white"><span className="grid h-9 w-9 place-items-center rounded-full bg-white text-[13px] font-semibold text-[#008069]">K</span><span><span className="block text-[15px] font-medium">Kriyvo AI</span><span className="block text-[12px] text-white/80">{typing ? "typing…" : "Business account"}</span></span></div>
      <div className="min-h-0 flex-1 space-y-1.5 overflow-y-auto bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] px-4 py-4 [background-size:14px_14px]">
        {msgs.map((m, i) => <div key={i} className={`flex animate-stage ${m.me ? "justify-end" : "justify-start"}`}>
          <div className="max-w-[80%]">
            <div className={`rounded-lg px-3 pb-1 pt-1.5 text-[14.5px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${m.me ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white"}`}>
              {i === 0 && <span className="mb-1.5 block rounded-md border-l-4 border-[#06cf9c] bg-[#cfe9cb] px-2 py-1 text-[12px] text-[#54656f]">From ad · Website + AI chatbot offer</span>}
              {m.text}<span className="float-right ml-2 mt-1 inline-flex items-center gap-0.5 text-[11px] text-[#667781]">{m.time}{m.me && <CheckCheck aria-hidden className="h-3.5 w-3.5 text-[#53bdeb]" />}</span>
            </div>
            {m.buttons && i === msgs.length - 1 && !done && <div className="mt-1 grid gap-1">{m.buttons.map(b => <button key={b} type="button" onClick={() => answer(b)} className="rounded-lg bg-white py-2 text-center text-[14px] font-medium text-[#00a884] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] transition-colors hover:bg-[#f5f6f6]">{b}</button>)}</div>}
          </div>
        </div>)}
        {done && !typing && <div className="mx-auto w-fit animate-stage rounded-md bg-white/90 px-3 py-1 text-[12px] text-[#54656f]">Chat assigned to Sales · bot paused for 24 h</div>}
        <div ref={end} />
      </div>
      <form onSubmit={e => { e.preventDefault(); answer(input); }} className="flex items-center gap-2 bg-[#f0f2f5] px-3 py-2.5">
        <label htmlFor="demo-wa" className="sr-only">Message</label>
        <input id="demo-wa" value={input} onChange={e => setInput(e.target.value)} disabled={typing || done || !!current?.buttons} placeholder={current?.buttons ? "Tap an option above" : done ? "Chat handed to the team" : "Type a message"} className="h-11 min-w-0 flex-1 rounded-full bg-white px-4 text-[15px] text-[#111b21] outline-none disabled:opacity-60" />
        <button type="submit" aria-label="Send" disabled={typing || done || !!current?.buttons || !input.trim()} className="grid h-11 w-11 place-items-center rounded-full bg-[#00a884] text-white disabled:opacity-50"><Send aria-hidden className="h-4 w-4" /></button>
      </form>
      {done && <div className="bg-background px-4 py-3 md:hidden"><a href={wa(`Hi Kriyvo AI, I'm ${data.name}. I need ${data.need?.toLowerCase()}, budget ${data.budget}, starting ${data.when?.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="btn btn-dark w-full">Continue on real WhatsApp</a></div>}
    </div>
    <aside className="hidden border-l border-border p-5 md:block">
      <p className="text-[13px] text-muted-foreground">CRM, updating live</p>
      <div className="mt-4 rounded-2xl bg-stone p-4">
        <dl className="space-y-2 text-[14px]">{([["Name", data.name], ["Wants", data.need], ["Budget", data.budget], ["Start", data.when]] as const).map(([k, v]) => <div key={k} className="flex gap-2"><dt className="w-14 text-muted-foreground">{k}</dt><dd className={v ? "animate-stage" : "text-muted-foreground/50"}>{v ?? "…"}</dd></div>)}</dl>
        {done && <p className={`mt-4 inline-flex animate-stage rounded-full px-3 py-1 text-[13px] font-medium ${score === "hot" ? "bg-flame text-white" : score === "warm" ? "bg-[#fff1e5] text-accent" : "bg-card text-muted-foreground"}`}>Tagged: {score} lead</p>}
      </div>
      {done && <a href={wa(`Hi Kriyvo AI, I'm ${data.name}. I need ${data.need?.toLowerCase()}, budget ${data.budget}, starting ${data.when?.toLowerCase()}.`)} target="_blank" rel="noreferrer" className="btn btn-dark mt-4 w-full !py-2.5 !text-[14px]">Continue on real WhatsApp</a>}
    </aside>
  </div>;
}

/* ---------- Patient feedback pipeline ---------- */
type Result = { language: string; translation: string; sentiment: string; intent: string; department: string; severity: string; summary: string; live: boolean };
const samples = ["AC subah se kaam nahi kar raha. Koi sun nahi raha.", "The night nurse in Ward 3 was very kind and patient. Thank you!", "Bill mein do baar charge laga hai, please check karo."];
const pipe = [{ icon: Webhook, t: "Feedback received" }, { icon: Sparkles, t: "AI reads and translates" }, { icon: Bot, t: "Intent and severity classified" }, { icon: Ticket, t: "Ticket opened" }, { icon: Mail, t: "Department head emailed" }];

function FeedbackDemo() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [stage, setStage] = useState(-1);
  const [res, setRes] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const run = async () => {
    if (text.trim().length < 4) { setError("Write a line of feedback first, or pick a sample."); return; }
    setError(""); setRes(null); setStage(0);
    const timer = window.setInterval(() => setStage(s => Math.min(s + 1, 2)), 700);
    const out = await classifyFeedback({ data: { text } }).catch(() => ({ error: "Connection problem. Please try again." }));
    window.clearInterval(timer);
    if ("error" in out) { setError(out.error); setStage(-1); return; }
    setRes(out as Result); setStage(3);
    window.setTimeout(() => setStage(4), 700); window.setTimeout(() => setStage(5), 1400);
  };
  const ticket = `BMRC-${(text.length * 37 + 1000) % 9000 + 1000}`;
  const sevColor = res?.severity === "critical" ? "bg-[#fce8e6] text-[#c5221f]" : res?.severity === "high" ? "bg-[#fff1e5] text-accent" : "bg-stone text-foreground/70";

  return <div className="h-full overflow-y-auto">
    <div className="grid gap-6 p-5 md:grid-cols-2 md:p-7">
      <div>
        <p className="text-[13px] text-muted-foreground">The patient's phone · QR in Ward 3</p>
        <div className="mt-3 rounded-[22px] bg-stone p-5">
          <p className="text-[15px]">How was your stay?</p>
          <div className="mt-2 flex gap-1" role="group" aria-label="Rating">{[1, 2, 3, 4, 5].map(i => <button key={i} type="button" aria-label={`${i} stars`} onClick={() => setRating(i)}><Star aria-hidden className={`h-6 w-6 ${i <= rating ? "fill-[#f5a623] text-[#f5a623]" : "text-border"}`} /></button>)}</div>
          <label htmlFor="demo-fb" className="sr-only">Feedback</label>
          <textarea id="demo-fb" value={text} onChange={e => setText(e.target.value)} placeholder="Write in any language…" className="mt-4 min-h-28 w-full rounded-2xl bg-card px-4 py-3 text-[15px] outline-none ring-flame/40 focus:ring-2" />
          <div className="mt-3 flex flex-wrap gap-1.5">{samples.map(s => <button key={s} type="button" onClick={() => setText(s)} className="max-w-full truncate rounded-full bg-card px-3 py-1.5 text-[13px] text-foreground/75 hover:text-foreground">{s}</button>)}</div>
          <button type="button" onClick={run} disabled={stage >= 0 && stage < 5} className="btn btn-dark mt-4 w-full disabled:opacity-60">{stage >= 0 && stage < 5 ? <><Loader2 aria-hidden className="h-4 w-4 animate-spin" />Processing</> : "Submit feedback"}</button>
          {error && <p role="alert" className="mt-3 text-[14px] text-destructive">{error}</p>}
        </div>
      </div>
      <div>
        <p className="text-[13px] text-muted-foreground">What runs behind it</p>
        <ol className="mt-3 space-y-2">{pipe.map((p, i) => {
          const on = stage > i || (stage === 5 && i === 4), now = stage === i;
          return <li key={p.t} className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-colors duration-500 ${on ? "bg-card shadow-[inset_0_0_0_1px_var(--color-border)]" : "bg-stone/60"}`}>
            <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${on ? "bg-flame text-white" : "bg-card text-muted-foreground"}`}>{on ? <Check aria-hidden className="h-4 w-4" /> : now ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <p.icon aria-hidden className="h-4 w-4" />}</span>
            <span className={`text-[15px] ${on || now ? "" : "text-muted-foreground"}`}>{p.t}</span>
          </li>;
        })}</ol>
        {res && stage >= 3 && <div className="mt-4 animate-stage rounded-2xl bg-card p-4 shadow-[inset_0_0_0_1px_var(--color-border)]">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-[14px]">
            {([["Language", res.language], ["Sentiment", res.sentiment], ["Intent", res.intent], ["Department", res.department]] as const).map(([k, v]) => <div key={k}><dt className="text-[12px] text-muted-foreground">{k}</dt><dd className="capitalize">{v}</dd></div>)}
          </dl>
          <p className="mt-3 text-[14px]"><span className="text-[12px] text-muted-foreground">Translation </span><br />{res.translation}</p>
        </div>}
        {res && stage >= 5 && <div className="mt-3 animate-stage rounded-2xl bg-ink p-4 text-ink-foreground">
          <p className="flex items-center gap-2 text-[12px] text-ink-foreground/60"><Mail aria-hidden className="h-4 w-4" />To: {res.department} head · now</p>
          <p className="mt-2"><span className={`rounded px-1.5 py-0.5 text-[11px] font-medium capitalize ${sevColor}`}>{res.severity}</span></p>
          <p className="mt-2 text-[16px] leading-snug">{res.summary}</p>
          <p className="mt-1 text-[13px] text-ink-foreground/60">Ticket {ticket} · Ward 3 · {rating ? `${rating}/5 stars` : "no rating"}</p>
        </div>}
        <div className="mt-3"><ModeNote live={res ? res.live : null} /></div>
      </div>
    </div>
  </div>;
}

/* ---------- Voice agent (ElevenLabs) ---------- */
type Rec = { lang: string; interimResults: boolean; continuous: boolean; start(): void; stop(): void; abort(): void; onresult: ((e: { resultIndex: number; results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null; onend: (() => void) | null; onerror: ((e: { error: string }) => void) | null };
type Booking = { name: string | null; day: string | null; time: string | null; reason: string | null; confirmed: boolean } | null;

/**
 * A real call with an AI receptionist. The browser hears the visitor (speech recognition), Groq decides
 * what the receptionist says, ElevenLabs speaks it, and the orb moves with the voice. Browsers without
 * speech recognition get a text box instead, so the demo still works everywhere.
 */
function VoiceDemo() {
  const [phase, setPhase] = useState<"idle" | "connecting" | "speaking" | "listening" | "thinking" | "ended">("idle");
  const [lines, setLines] = useState<{ who: "You" | "Agent"; text: string }[]>([]);
  const [heard, setHeard] = useState("");
  const [note, setNote] = useState("");
  const [energy, setEnergy] = useState(0.15);
  const [secs, setSecs] = useState(0);
  const [booking, setBooking] = useState<Booking>(null);
  const [typed, setTyped] = useState("");
  const turns = useRef<{ role: "user" | "assistant"; text: string }[]>([]);
  const rec = useRef<Rec | null>(null);
  const audio = useRef<HTMLAudioElement | null>(null);
  const live = useRef(false);
  const raf = useRef(0);
  const [canListen] = useState(() => typeof window !== "undefined" && !!((window as unknown as { SpeechRecognition?: unknown }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: unknown }).webkitSpeechRecognition));
  const onCall = phase !== "idle" && phase !== "ended";

  useEffect(() => {
    if (!onCall) return;
    const t = window.setInterval(() => setSecs(s => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [onCall]);
  useEffect(() => () => hangUp(), []); // eslint-disable-line react-hooks/exhaustive-deps

  function hangUp() {
    live.current = false;
    rec.current?.abort(); rec.current = null;
    audio.current?.pause(); audio.current = null;
    if (typeof window !== "undefined") window.speechSynthesis?.cancel();
    cancelAnimationFrame(raf.current);
    setEnergy(0.15);
  }

  /** Plays the receptionist's line; the orb follows the loudness of the audio. */
  function say(text: string, src: string | null) {
    setLines(l => [...l.slice(-5), { who: "Agent", text }]);
    if (!live.current) return;
    if (!src) { browserSpeak(text); return; }
    setPhase("speaking");
    const el = new Audio(src);
    audio.current = el;
    try {
      const ctx = new AudioContext();
      const an = ctx.createAnalyser(); an.fftSize = 512;
      ctx.createMediaElementSource(el).connect(an); an.connect(ctx.destination);
      const buf = new Uint8Array(an.fftSize);
      const tick = () => { an.getByteTimeDomainData(buf); let sum = 0; for (const v of buf) sum += ((v - 128) / 128) ** 2; setEnergy(Math.min(1, 0.3 + Math.sqrt(sum / buf.length) * 4)); raf.current = requestAnimationFrame(tick); };
      tick();
      el.onended = () => { cancelAnimationFrame(raf.current); setEnergy(0.25); void ctx.close(); if (live.current) listen(); };
    } catch { el.onended = () => { if (live.current) listen(); }; }
    el.play().catch(() => { if (live.current) listen(); });
  }

  /** Fallback when ElevenLabs is unavailable: the browser's own voice, with the orb pulsing while it talks. */
  function browserSpeak(text: string) {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) { listen(); return; }
    setPhase("speaking");
    const u = new SpeechSynthesisUtterance(text);
    const voices = synth.getVoices();
    // Prefer the natural-sounding voices browsers ship (neural/"Natural", Google, Apple's newer ones) over the old robotic defaults.
    const en = voices.filter(v => v.lang.startsWith("en"));
    const rank = (v: SpeechSynthesisVoice) => (/natural|neural|online/i.test(v.name) ? 0 : /google/i.test(v.name) ? 1 : /samantha|ava|allison|serena|karen|moira|veena|rishi/i.test(v.name) ? 2 : 3) + (v.lang === "en-IN" ? -0.5 : v.lang === "en-GB" || v.lang === "en-US" ? 0 : 0.3);
    u.voice = en.sort((a, b) => rank(a) - rank(b))[0] ?? null;
    u.rate = 1.02;
    let pulse = 0;
    const id = window.setInterval(() => { pulse += 1; setEnergy(0.45 + Math.abs(Math.sin(pulse * 0.9)) * 0.35); }, 110);
    const done = () => { window.clearInterval(id); setEnergy(0.25); if (live.current) listen(); };
    u.onend = done; u.onerror = done;
    synth.cancel(); synth.speak(u);
  }

  async function reply(text: string) {
    setLines(l => [...l.slice(-5), { who: "You", text }]);
    turns.current.push({ role: "user", text });
    setPhase("thinking"); setEnergy(0.2);
    const r = await voiceTurn({ data: { turns: turns.current } }).catch(() => ({ error: "The line dropped. Please try again." }));
    if (!live.current) return;
    if ("error" in r) { setNote(r.error); turns.current.pop(); listen(); return; }
    turns.current.push({ role: "assistant", text: r.say });
    if (r.booking) setBooking(r.booking);
    say(r.say, r.audio);
  }

  function listen() {
    if (!live.current) return;
    setPhase("listening"); setHeard(""); setEnergy(0.22);
    if (!canListen) return; // the text box takes over
    const R = ((window as unknown as { SpeechRecognition?: new () => Rec }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition: new () => Rec }).webkitSpeechRecognition);
    const r = new R();
    r.lang = "en-IN"; r.interimResults = true; r.continuous = false;
    let final = "";
    r.onresult = e => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) { const res = e.results[i]!; if (res.isFinal) final += res[0]!.transcript; else interim += res[0]!.transcript; }
      setHeard(final || interim); setEnergy(0.45);
    };
    r.onerror = e => { if (e.error === "not-allowed") { setNote("Allow microphone access to talk, or type below."); } };
    r.onend = () => { rec.current = null; if (!live.current) return; if (final.trim()) void reply(final.trim()); else listen(); };
    rec.current = r;
    try { r.start(); } catch { /* already listening */ }
  }

  async function start() {
    hangUp();
    setNote(""); setLines([]); setSecs(0); setBooking(null); turns.current = [];
    live.current = true; setPhase("connecting");
    const r = await voiceTurn({ data: { turns: [] } }).catch(() => ({ error: "Couldn't reach the voice line." }));
    if (!live.current) return;
    if ("error" in r) { setNote(r.error); live.current = false; setPhase("idle"); return; }
    turns.current.push({ role: "assistant", text: r.say });
    say(r.say, r.audio);
  }

  const end = () => { hangUp(); setPhase("ended"); };
  const clock = `${String(Math.floor(secs / 60)).padStart(2, "0")}:${String(secs % 60).padStart(2, "0")}`;
  const status = { idle: "ready", connecting: "connecting…", speaking: `on call ${clock}`, listening: `on call ${clock} · listening`, thinking: `on call ${clock}`, ended: `call ended ${clock}` }[phase];

  return <div className="flex h-full flex-col items-center overflow-y-auto bg-[#0f0e0d] px-5 py-6 text-white md:py-8">
    <p className="text-[13px] text-white/55">AI receptionist · Sunrise Clinic · {status}</p>
    <div className="relative mt-4 w-[min(56vw,240px)]"><div aria-hidden className={`absolute inset-[14%] rounded-full bg-flame/50 blur-2xl transition-opacity duration-500 ${phase === "speaking" ? "opacity-100" : "opacity-40"}`} /><Orb energy={energy} className="relative w-full" /></div>
    <div className="mt-4 min-h-[110px] w-full max-w-md space-y-2 text-center" aria-live="polite">
      {lines.length ? lines.slice(-2).map((l, i) => <p key={`${lines.length}-${i}`} className="animate-stage text-[15px] leading-snug"><span className="mr-2 text-[11px] uppercase tracking-[0.14em] text-white/45">{l.who}</span>{l.text}</p>)
        : <p className="text-[15px] text-white/60">{phase === "connecting" ? "Calling…" : "Tap the green button and talk. Try: “I'd like an appointment on Friday.”"}</p>}
      {phase === "listening" && canListen && <p className="flex items-center justify-center gap-2 text-[14px] text-white/60"><span className="h-2 w-2 animate-pulse rounded-full bg-[#22c55e]" />{heard || "Listening…"}</p>}
      {phase === "thinking" && <p className="flex items-center justify-center gap-2 text-[14px] text-white/50"><Loader2 aria-hidden className="h-4 w-4 animate-spin" />Thinking…</p>}
      {note && <p role="alert" className="text-[14px] text-saffron">{note}</p>}
    </div>
    {booking?.confirmed && <div className="mt-2 w-full max-w-sm animate-stage rounded-2xl bg-white/[0.07] p-4 text-[14px]">
      <p className="flex items-center gap-2 text-white/60"><Check aria-hidden className="h-4 w-4 text-[#22c55e]" />Appointment booked · confirmation sent on WhatsApp</p>
      <p className="mt-2 text-[16px]">{[booking.day, booking.time].filter(Boolean).join(", ")}{booking.name && ` · ${booking.name}`}</p>
      {booking.reason && <p className="mt-0.5 text-white/55">{booking.reason}</p>}
    </div>}
    {onCall && !canListen && phase === "listening" && <form className="mt-3 flex w-full max-w-sm gap-2" onSubmit={e => { e.preventDefault(); const t = typed.trim(); if (t) { setTyped(""); void reply(t); } }}>
      <label className="sr-only" htmlFor="voice-type">Your reply</label>
      <input id="voice-type" value={typed} onChange={e => setTyped(e.target.value)} placeholder="Type what you'd say…" className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-3 text-[15px] placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30" />
      <button type="submit" aria-label="Send" className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink"><Send aria-hidden className="h-4 w-4" /></button>
    </form>}
    <div className="mt-6 flex items-center gap-5">
      {onCall
        ? <button type="button" aria-label="End call" onClick={end} className="grid h-16 w-16 place-items-center rounded-full bg-[#e5484d]"><PhoneOff aria-hidden className="h-7 w-7" /></button>
        : <button type="button" aria-label={phase === "ended" ? "Call again" : "Start call"} onClick={() => void start()} className="grid h-16 w-16 place-items-center rounded-full bg-[#22c55e]"><Phone aria-hidden className="h-7 w-7" /></button>}
    </div>
    <a href={wa("Hi Kriyvo AI, I tried the voice agent demo and want one for my business.")} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-1.5 text-[14px] text-white/70 hover:text-white">Want one for your business? <ArrowUpRight aria-hidden className="h-4 w-4" /></a>
  </div>;
}
