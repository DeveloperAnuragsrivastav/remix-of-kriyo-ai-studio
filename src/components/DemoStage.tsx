import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Bot, Globe, MessageCircle, PhoneCall, Workflow, Check, CheckCheck, FileText, Mail, Mic, MicOff, PhoneOff, Search, Sparkles, Ticket, Users, Volume2, Webhook } from "lucide-react";
import { Orb } from "@/components/Orb";
import koca from "@/assets/portfolio/koca-restaurant-1000.webp";

/**
 * The homepage stage: one large laptop. Each service plays a short scripted sample on the
 * real desktop screen it lives on (the website, WhatsApp Web, an n8n canvas, a call console).
 */
type Demo = { id: string; tab: string; note: string; icon: typeof Globe; url: string; price: string; days: string; project: string; projectLabel: string; screen: (s: number, compact: boolean) => ReactNode };

const show = (on: boolean) => `transition-all duration-700 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "opacity-100 translate-y-0 blur-0" : "pointer-events-none opacity-0 translate-y-3 blur-[6px]"}`;
const gone = (on: boolean) => (on ? "" : "hidden");

function Typed({ text, on }: { text: string; on: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) { setN(0); return; }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setN(text.length); return; }
    let i = 0;
    const id = window.setInterval(() => { i += 2; setN(Math.min(i, text.length)); if (i >= text.length) window.clearInterval(id); }, 26);
    return () => window.clearInterval(id);
  }, [on, text]);
  return <>{text.slice(0, n)}</>;
}

/** A laptop whose screen is drawn at a fixed design size and scaled to fit, so every app keeps desktop proportions. */
function Laptop({ url, children }: { url: string; children: (compact: boolean) => ReactNode }) {
  const box = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(1040);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(e!.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const compact = w < 620;
  const W = compact ? 640 : 1040, H = compact ? 520 : 620, k = w / W;
  return <div data-ui className="mx-auto w-full">
    <div className="rounded-t-[22px] bg-ink p-2.5 pb-0 md:p-3.5 md:pb-0">
      <div ref={box} className="relative min-w-0 overflow-hidden rounded-t-[12px] bg-card" style={{ height: (H + 36) * k }}>
        <div className="absolute left-0 top-0" style={{ width: W, height: H + 36, transform: `scale(${k})`, transformOrigin: "top left" }}>
          <div className="flex h-9 items-center gap-3 border-b border-border bg-[#f3f2ef] px-4">
            <span className="flex gap-1.5" aria-hidden><i className="h-3 w-3 rounded-full bg-[#ff5f57]" /><i className="h-3 w-3 rounded-full bg-[#febc2e]" /><i className="h-3 w-3 rounded-full bg-[#28c840]" /></span>
            <span className="mx-auto w-[46%] truncate rounded-md bg-card px-3 py-1 text-center text-[12px] text-muted-foreground">{url}</span>
          </div>
          <div className="relative overflow-hidden" style={{ height: H }}>{children(compact)}</div>
        </div>
      </div>
    </div>
    <div aria-hidden className="mx-[-3%] h-3.5 rounded-b-[14px] bg-gradient-to-b from-[#d9d6d0] to-[#bdb9b2] md:h-5" />
  </div>;
}

/* ---------- Website: KOCA, with a table being booked ---------- */
function KocaSite({ s, compact }: { s: number; compact: boolean }) {
  return <div className="relative h-full bg-[#0b0a08] text-[#efe6d2]">
    <div className="flex items-center justify-between px-8 py-5 text-[13px]">
      <span className="text-[18px] tracking-[0.35em] text-[#d9b46a]">KOCA</span>
      {!compact && <span className="flex gap-7 text-[#efe6d2]/70"><span>The Story</span><span>The Stage</span><span>The Chapter</span><span>The Schedule</span></span>}
      <span className="rounded-full border border-[#d9b46a]/60 px-4 py-1.5 text-[#d9b46a]">Claim Your Table →</span>
    </div>
    <div className="relative mx-8 h-[calc(100%-96px)] overflow-hidden rounded-xl">
      <img src={koca} alt="" className="absolute inset-0 h-full w-full scale-[1.18] object-cover object-[center_70%] opacity-80" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a08] via-[#0b0a08]/30 to-transparent" />
      <div className={`absolute bottom-8 left-8 ${compact ? "max-w-[48%]" : "max-w-[52%]"}`}>
        <p className="text-[12px] tracking-[0.25em] text-[#d9b46a]">CHAPTER 2 — MAY 2026</p>
        <p className={`mt-3 font-display leading-[1.05] ${compact ? "text-[30px]" : "text-[40px]"}`}>Kitchen of Celebratory Arts</p>
        <p className="mt-3 text-[14px] text-[#efe6d2]/70">105 seats. Asian flavours. Modern Indian soul.</p>
      </div>
      {/* Reservation panel */}
      <div className={`absolute right-6 top-6 ${compact ? "w-[250px]" : "w-[300px]"} rounded-xl border border-[#d9b46a]/30 bg-[#12100c]/95 p-5 backdrop-blur ${show(s >= 1)}`}>
        <p className="font-display text-[22px]">Claim your table</p>
        <div className="mt-4 grid grid-cols-2 gap-2 text-[13px]">
          {[["Guests", "4"], ["Date", "Fri, 24 May"], ["Time", "8:30 pm"], ["Space", "KA PA DO Terrace"]].map(([k, v], i) => <div key={k} className="rounded-lg border border-[#d9b46a]/25 px-3 py-2"><p className="text-[11px] text-[#efe6d2]/50">{k}</p><p>{s >= 2 + Math.floor(i / 2) ? v : "—"}</p></div>)}
        </div>
        <p className={`mt-4 rounded-full py-2.5 text-center text-[14px] transition-colors duration-500 ${s >= 4 ? "bg-[#d9b46a] text-[#0b0a08]" : "border border-[#d9b46a]/50 text-[#d9b46a]"}`}>{s >= 5 ? <span className="inline-flex items-center gap-1.5"><Check aria-hidden className="h-4 w-4" />Table requested</span> : "Confirm Reservation"}</p>
        <p className={`mt-3 text-center text-[12px] text-[#efe6d2]/60 ${show(s >= 6)}`}>Confirmation sent to your WhatsApp</p>
      </div>
    </div>
  </div>;
}

/* ---------- AI chatbot: a shop site with the assistant answering ---------- */
const B = ({ me, on, children }: { me?: boolean; on: boolean; children: ReactNode }) =>
  <div className={`flex ${me ? "justify-end" : "justify-start"} ${show(on)} ${gone(on)}`}><p className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-[14px] leading-snug ${me ? "rounded-br-md bg-ink text-ink-foreground" : "rounded-bl-md bg-stone"}`}>{children}</p></div>;

function ShopChat({ s, compact }: { s: number; compact: boolean }) {
  return <div className="relative h-full bg-[#f7f4ef]">
    <div className="flex items-center justify-between px-8 py-5 text-[14px]"><span className="font-display text-[22px]">Lumen Home</span>{!compact && <span className="flex gap-6 text-muted-foreground"><span>Shop</span><span>Lighting</span><span>Delivery</span><span>Contact</span></span>}</div>
    <div className="px-8">
      <p className="max-w-[55%] font-display text-[44px] leading-[1.05]">Lighting for every room</p>
      <p className="mt-3 max-w-[45%] text-[15px] text-muted-foreground">Handmade lamps, delivered across Delhi NCR.</p>
      {!compact && <div className="mt-8 grid w-[52%] grid-cols-3 gap-3">{["#e7d6bf", "#d8c4a6", "#c9b08d"].map(c => <div key={c} className="aspect-[3/4] rounded-xl" style={{ background: c }} />)}</div>}
    </div>
    <div className={`absolute bottom-5 right-5 top-5 flex flex-col overflow-hidden rounded-2xl bg-card shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] ${compact ? "left-5" : "w-[380px]"}`}>
      <div className="flex items-center gap-3 bg-ink px-4 py-3 text-ink-foreground"><span className="grid h-8 w-8 place-items-center rounded-full bg-flame"><Bot aria-hidden className="h-4 w-4 text-white" /></span><span><span className="block text-[14px]">Lumen assistant</span><span className="block text-[11px] text-ink-foreground/60">AI · answers from our policies</span></span></div>
      <div className="flex flex-1 flex-col justify-end gap-2.5 p-4">
        <B me on={s >= 1}>Do you deliver on Sundays?</B>
        <B on={s >= 2}><Typed on={s >= 2} text="Yes! Sunday delivery runs 10 am to 6 pm across Delhi NCR." /></B>
        <p className={`flex items-center gap-1.5 pl-1 text-[11px] text-muted-foreground ${show(s >= 2)} ${gone(s >= 2)}`}><FileText aria-hidden className="h-3 w-3" />Source: delivery-policy.pdf</p>
        <B me on={s >= 3}>Can someone call me back?</B>
        <B on={s >= 4}><Typed on={s >= 4} text="Sure, what's your number?" /></B>
        <B me on={s >= 5}>98xxx xx421</B>
        <B on={s >= 6}>Thanks! The team will call you within the hour.</B>
      </div>
    </div>
    <div className={`absolute left-8 top-5 flex items-center gap-2.5 rounded-xl bg-ink px-4 py-3 text-[13px] text-ink-foreground shadow-lg ${show(s >= 6)}`}><Users aria-hidden className="h-4 w-4 text-saffron" />New lead saved to CRM · callback requested</div>
  </div>;
}

/* ---------- WhatsApp Web ---------- */
const Msg = ({ me, on, time, children }: { me?: boolean; on: boolean; time: string; children: ReactNode }) =>
    <div className={`flex ${me ? "justify-end" : "justify-start"} ${show(on)} ${gone(on)}`}>
      <div className={`max-w-[70%] rounded-lg px-3 pb-1 pt-1.5 text-[14px] leading-snug text-[#111b21] shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${me ? "rounded-tr-none bg-[#d9fdd3]" : "rounded-tl-none bg-white"}`}>
        {children}<span className="float-right ml-2 mt-1 inline-flex items-center gap-0.5 text-[11px] text-[#667781]">{time}{me && <CheckCheck aria-hidden className="h-3.5 w-3.5 text-[#53bdeb]" />}</span>
      </div>
    </div>;

function WhatsAppWeb({ s, compact }: { s: number; compact: boolean }) {
  const chats: [string, string, string][] = [["Rahul", s >= 5 ? "₹50k–₹1L" : "Hi, I saw your ad…", "10:42"], ["Neha Kapoor", "Thanks, received the quote", "09:15"], ["Arjun (Gurgaon)", "Can we do Friday?", "Yesterday"], ["Sana", "Perfect, thank you", "Yesterday"]];
  return <div className="flex h-full bg-[#f0f2f5]">
    {!compact && <div className="w-[300px] border-r border-[#e9edef] bg-white">
      <div className="flex items-center justify-between px-4 py-3"><span className="text-[18px] font-semibold text-[#111b21]">Chats</span><span className="rounded-full bg-[#d9fdd3] px-2 py-0.5 text-[11px] text-[#008069]">Business</span></div>
      <div className="mx-3 mb-2 flex items-center gap-2 rounded-lg bg-[#f0f2f5] px-3 py-1.5 text-[13px] text-[#667781]"><Search aria-hidden className="h-3.5 w-3.5" />Search</div>
      {chats.map(([n, m, t], i) => <div key={n} className={`flex items-center gap-3 px-4 py-3 ${i === 0 ? "bg-[#f0f2f5]" : ""}`}>
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#dfe5e7] text-[14px] text-[#54656f]">{n[0]}</span>
        <span className="min-w-0 flex-1"><span className="flex justify-between text-[14px] text-[#111b21]">{n}<span className="text-[11px] text-[#667781]">{t}</span></span><span className="block truncate text-[13px] text-[#667781]">{m}</span>{i === 0 && s >= 5 && <span className="mt-1 inline-block rounded bg-[#fff1e5] px-1.5 py-0.5 text-[10px] text-[#c2410c]">warm lead</span>}</span>
      </div>)}
    </div>}
    <div className="flex flex-1 flex-col">
      <div className="flex items-center gap-3 bg-[#f0f2f5] px-4 py-2.5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#dfe5e7] text-[13px] text-[#54656f]">R</span><span><span className="block text-[14px] text-[#111b21]">Rahul</span><span className="block text-[12px] text-[#667781]">{s === 1 || s === 3 ? "typing…" : "via Click-to-WhatsApp ad"}</span></span></div>
      <div className="flex flex-1 flex-col justify-end gap-1.5 overflow-hidden bg-[#efeae2] bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] px-8 py-4 [background-size:14px_14px]">
        <Msg me on time="10:41"><span className="mb-1.5 block rounded-md border-l-4 border-[#06cf9c] bg-[#cfe9cb] px-2 py-1 text-[12px] text-[#54656f]">From ad · Website + AI chatbot offer</span>Hi, I saw your ad. Need a quote.</Msg>
        <Msg on={s >= 2} time="10:41">Thanks for reaching out! What's your name?</Msg>
        <Msg me on={s >= 3} time="10:42">Rahul</Msg>
        <div className={`${show(s >= 4)} ${gone(s >= 4)} w-[42%] min-w-[240px]`}>
          <Msg on={s >= 4} time="10:42">Nice to meet you, Rahul. What's your budget?</Msg>
          <div className="mt-0.5 grid gap-0.5">{["Under ₹50k", "₹50k–₹1L", "Above ₹1L"].map(b => <span key={b} className={`rounded-lg py-1.5 text-center text-[13px] font-medium shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] ${s >= 5 && b === "₹50k–₹1L" ? "bg-[#e7f8e9] text-[#008069]" : "bg-white text-[#00a884]"}`}>{b}</span>)}</div>
        </div>
        <Msg me on={s >= 5} time="10:42">₹50k–₹1L</Msg>
        <Msg on={s >= 6} time="10:43">Connecting you to our sales team now.</Msg>
        <div className={`mx-auto rounded-md bg-white/90 px-3 py-1 text-[12px] text-[#54656f] ${show(s >= 7)} ${gone(s >= 7)}`}>Chat assigned to Sales · bot paused for 24 h</div>
      </div>
      <div className="flex items-center gap-3 bg-[#f0f2f5] px-4 py-2.5"><span className="flex-1 rounded-lg bg-white px-4 py-2 text-[13px] text-[#667781]">Type a message</span><Mic aria-hidden className="h-5 w-5 text-[#54656f]" /></div>
    </div>
  </div>;
}

/* ---------- Automation: the n8n canvas running, then the team's Gmail ---------- */
const nodes = [
  { icon: Webhook, name: "Feedback form", sub: "QR · Ward 3" },
  { icon: Sparkles, name: "AI analysis", sub: "OpenAI" },
  { icon: Ticket, name: "Create ticket", sub: "Supabase" },
  { icon: Mail, name: "Alert team", sub: "Gmail" },
];
function N8n({ s, compact }: { s: number; compact: boolean }) {
  const lit = (i: number) => s >= i + 1;
  return <div className="relative h-full bg-[#f4f4f5] bg-[radial-gradient(#d4d4d8_1px,transparent_1px)] [background-size:18px_18px]">
    <div className="flex items-center justify-between border-b border-[#e4e4e7] bg-white px-5 py-2.5 text-[13px]"><span className="font-medium">Patient feedback → team alert</span><span className={`rounded-full px-2.5 py-0.5 text-[11px] ${s >= 1 ? "bg-[#dcfce7] text-[#15803d]" : "bg-[#f4f4f5] text-[#71717a]"}`}>{s >= 5 ? "Succeeded in 1.9s" : s >= 1 ? "Running…" : "Active"}</span></div>
    <div className={`flex items-center px-8 ${compact ? "mt-6 gap-3" : "mt-12 gap-6"}`}>
      {nodes.map((n, i) => <div key={n.name} className="flex flex-1 items-center gap-3">
        <div className={`relative flex flex-1 flex-col items-center rounded-2xl border-2 bg-white px-2 py-4 text-center transition-all duration-500 ${lit(i) ? "border-[#22c55e] shadow-[0_10px_30px_-12px_rgba(34,197,94,0.5)]" : "border-[#e4e4e7]"}`}>
          <n.icon aria-hidden className={`h-7 w-7 ${lit(i) ? "text-[#ff6d5a]" : "text-[#a1a1aa]"}`} />
          <p className="mt-2 text-[13px] font-medium">{n.name}</p><p className="text-[11px] text-[#71717a]">{n.sub}</p>
          {lit(i) && <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-[#22c55e] text-white"><Check aria-hidden className="h-3 w-3" strokeWidth={3} /></span>}
        </div>
        {i < nodes.length - 1 && <div className="relative h-0.5 w-6 shrink-0 bg-[#d4d4d8]"><span className={`absolute inset-y-0 left-0 bg-[#22c55e] transition-all duration-700 ${lit(i + 1) ? "w-full" : "w-0"}`} /></div>}
      </div>)}
    </div>
    {/* Output of the node that just ran */}
    <div className={`flex gap-5 px-8 ${compact ? "mt-6" : "mt-12"}`}><div className={`rounded-2xl border border-[#e4e4e7] bg-white p-5 ${compact ? "w-full" : "w-[470px]"}`}>
      <p className="text-[12px] text-[#71717a]">{s >= 2 ? "Output · AI analysis" : "Output · Feedback form"}</p>
      <div className="mt-3 space-y-1.5 font-mono text-[12.5px]">
        <p><span className="text-[#71717a]">text:</span> "AC subah se kaam nahi kar raha. Koi sun nahi raha."</p>
        <p className={`${show(s >= 2)}`}><span className="text-[#71717a]">language:</span> Hindi</p>
        <p className={`${show(s >= 2)}`}><span className="text-[#71717a]">translation:</span> "The AC hasn't worked since morning."</p>
        <p className={`${show(s >= 2)}`}><span className="text-[#71717a]">intent:</span> complaint <span className="text-[#71717a]">· sentiment:</span> negative</p>
        <p className={`${show(s >= 2)}`}><span className="text-[#71717a]">department:</span> Maintenance <span className="text-[#71717a]">· severity:</span> <span className="text-[#dc2626]">critical</span></p>
        <p className={`${show(s >= 3)}`}><span className="text-[#71717a]">ticket:</span> BMRC-2187 → Maintenance head</p>
      </div>
    </div>
    {/* The email that lands */}
    <div className={`flex-1 self-start rounded-2xl bg-white p-5 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.4)] ${compact ? "hidden" : ""} ${show(s >= 5)}`}>
      <p className="flex items-center gap-2 text-[12px] text-[#5f6368]"><Mail aria-hidden className="h-4 w-4 text-[#d93025]" />Gmail · maintenance@bmrc · now</p>
      <p className="mt-3"><span className="rounded bg-[#fce8e6] px-1.5 py-0.5 text-[11px] font-medium text-[#c5221f]">Critical</span></p>
      <p className="mt-2 text-[16px] font-medium leading-snug">Ward 3: AC not working since morning</p>
      <p className="mt-2 text-[13px] leading-snug text-[#5f6368]">Patient feedback (Hindi, translated). Ticket BMRC-2187 assigned to you.</p>
      <p className="mt-4 inline-block rounded-full bg-[#0b57d0] px-4 py-1.5 text-[13px] text-white">Open ticket</p>
    </div></div>
  </div>;
}

/* ---------- Voice agent: call console with the AI's voice and the calendar ---------- */
const lines: [number, "Caller" | "AI receptionist", string][] = [
  [1, "Caller", "Hi, I'd like an appointment on Friday."],
  [2, "AI receptionist", "Friday 4 pm is free. Shall I book it for you?"],
  [3, "Caller", "Yes, please. 4 pm works."],
  [4, "AI receptionist", "Done. You'll get a confirmation on WhatsApp."],
];
function CallConsole({ s, compact }: { s: number; compact: boolean }) {
  const [secs, setSecs] = useState(0);
  useEffect(() => { const id = window.setInterval(() => setSecs(x => x + 1), 1000); return () => window.clearInterval(id); }, []);
  const line = [...lines].reverse().find(([at]) => s >= at);
  const speaking = !!line && line[1] === "AI receptionist" && s === line[0];
  const slots = ["2:00", "2:30", "3:00", "3:30", "4:00", "4:30", "5:00"];
  return <div className="flex h-full">
    <div className="flex flex-1 flex-col items-center bg-[#0f0e0d] px-8 pt-8 text-white">
      <p className="text-[13px] text-white/50">AI receptionist · Sunrise Clinic</p>
      <p className="mt-1 font-mono text-[13px] text-white/60">{String(Math.floor(secs / 60)).padStart(2, "0")}:{String(secs % 60).padStart(2, "0")} · on call with +91 98xxx xx210</p>
      <div className="relative mt-6 w-[250px]"><div aria-hidden className={`absolute inset-[14%] rounded-full bg-flame/50 blur-2xl transition-opacity duration-500 ${speaking ? "opacity-100" : "opacity-40"}`} /><Orb energy={speaking ? 0.95 : line ? 0.3 : 0.15} className="relative w-full" /></div>
      <div className="mt-4 min-h-[84px] max-w-[460px] text-center">
        {line && <div key={line[0]} className="animate-stage"><p className="text-[11px] uppercase tracking-[0.16em] text-white/45">{line[1]}</p><p className="mt-2 text-[18px] leading-snug"><Typed on text={line[2]} /></p></div>}
      </div>
      <div className="mt-auto flex gap-5 pb-7">{[MicOff, Volume2].map((I, i) => <span key={i} className="grid h-12 w-12 place-items-center rounded-full bg-white/10"><I aria-hidden className="h-5 w-5" /></span>)}<span className="grid h-12 w-12 place-items-center rounded-full bg-[#e5484d]"><PhoneOff aria-hidden className="h-5 w-5" /></span></div>
    </div>
    {!compact && <div className="w-[330px] bg-white p-5">
      <p className="text-[13px] text-[#5f6368]">Google Calendar · Friday</p>
      <div className="mt-3 border-t border-[#e8eaed]">
        {slots.map(t => <div key={t} className="flex h-[52px] items-start gap-3 border-b border-[#e8eaed] pt-1.5 text-[12px] text-[#70757a]">
          <span className="w-9">{t}</span>
          {t === "2:30" && <span className="flex-1 rounded-md bg-[#e8f0fe] px-2 py-1 text-[#1967d2]">Dr. Mehta · follow-up</span>}
          {t === "4:00" && <span className={`flex-1 rounded-md px-2 py-1 transition-all duration-700 ${s >= 4 ? "bg-flame text-white" : s >= 2 ? "border border-dashed border-flame/60 text-accent" : "opacity-0"}`}>{s >= 4 ? "Booked by AI · new patient" : "Free · holding…"}</span>}
        </div>)}
      </div>
      <div className={`mt-4 rounded-xl bg-[#f1f3f4] p-3 text-[12.5px] leading-snug ${show(s >= 6)}`}><p className="font-medium">Call summary → Telegram</p><p className="mt-1 text-[#5f6368]">New patient booked Fri 4 pm. Confirmation sent on WhatsApp.</p></div>
    </div>}
  </div>;
}

const demos: Demo[] = [
  { id: "website", tab: "Website", icon: Globe, note: "KOCA's site: a guest books a table in three taps.", url: "kocaofficial.com", price: "₹999", days: "1–5 days", project: "/portfolio/koca-restaurant-website", projectLabel: "KOCA restaurant", screen: (s, c) => <KocaSite s={s} compact={c} /> },
  { id: "chatbot", tab: "AI chatbot", icon: Bot, note: "Answers from your own documents and saves the lead.", url: "lumenhome.in · sample shop", price: "₹1,999", days: "1–2 days", project: "/portfolio/website-ai-chatbot", projectLabel: "Kriyvo Assistant", screen: (s, c) => <ShopChat s={s} compact={c} /> },
  { id: "whatsapp", tab: "WhatsApp bot", icon: MessageCircle, note: "Qualifies ad leads and hands them to sales.", url: "web.whatsapp.com · sample chat", price: "₹4,999", days: "2–4 days", project: "/portfolio/gignaati-whatsapp-bot", projectLabel: "Gignaati funnel", screen: (s, c) => <WhatsAppWeb s={s} compact={c} /> },
  { id: "automation", tab: "Automation", icon: Workflow, note: "Reads Hindi feedback, classifies it, alerts the right team.", url: "n8n · sample run", price: "₹3,999", days: "2–4 days", project: "/portfolio/bmrc-patient-feedback-pipeline", projectLabel: "BMRC hospital", screen: (s, c) => <N8n s={s} compact={c} /> },
  { id: "voice", tab: "Voice agent", icon: PhoneCall, note: "Answers calls and books straight into your calendar.", url: "call console · sample call", price: "", days: "", project: "/portfolio/ai-phone-calling-agent", projectLabel: "AI phone agent", screen: (s, c) => <CallConsole s={s} compact={c} /> },
];

const STEPS = 7;

export function DemoStage() {
  const [active, setActive] = useState(0);
  const [step, setStep] = useState(0);
  const [auto, setAuto] = useState(true);
  const demo = demos[active]!;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setStep(STEPS); return; }
    setStep(0);
    let s = 0;
    const id = window.setInterval(() => {
      s += 1;
      if (s <= STEPS) setStep(s);
      // Hold the finished demo, then move on to the next service until the visitor picks one.
      else if (s > STEPS + 3 && auto) setActive(a => (a + 1) % demos.length);
      else if (s > STEPS + 5) { s = 0; setStep(0); }
    }, 1300);
    return () => window.clearInterval(id);
  }, [active, auto]);

  const pick = (i: number) => { setAuto(false); setActive(i); };

  const cycle = `${(STEPS + 4) * 1.3}s`;
  return <div className="relative overflow-hidden rounded-[28px] bg-stone">
    <div className="grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)]">
      {/* Phone/tablet: icon chips */}
      <div className="min-w-0 [mask-image:linear-gradient(90deg,black_82%,transparent)] lg:hidden">
        <div role="tablist" aria-label="See a service working" className="flex gap-2 overflow-x-auto px-4 pb-1 pr-12 pt-4 [scrollbar-width:none]">
          {demos.map((d, i) => <button key={d.id} role="tab" id={`tab-${d.id}`} aria-selected={i === active} aria-controls="demo-panel" onClick={() => pick(i)}
            className={`btn shrink-0 !px-4 !py-2.5 !text-[15px] ${i === active ? "btn-dark" : "btn-light"}`}><d.icon aria-hidden className="h-4 w-4" />{d.tab}</button>)}
        </div>
      </div>
      {/* Desktop: a feature list with a progress line on the playing item */}
      <div role="tablist" aria-label="See a service working" aria-orientation="vertical" className="hidden flex-col justify-center gap-1 py-8 pl-8 lg:flex">
        {demos.map((d, i) => {
          const on = i === active;
          return <button key={d.id} role="tab" aria-selected={on} aria-controls="demo-panel" onClick={() => pick(i)}
            className={`group relative rounded-2xl px-5 py-4 text-left transition-colors duration-500 ${on ? "bg-card shadow-[0_18px_40px_-24px_oklch(0.25_0.03_60/0.45)]" : "hover:bg-card/50"}`}>
            <span className="flex items-center gap-3">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors duration-500 ${on ? "bg-ink text-ink-foreground" : "bg-card text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]"}`}><d.icon aria-hidden className="h-4 w-4" /></span>
              <span className={`font-display text-[20px] transition-colors duration-500 ${on ? "text-foreground" : "text-foreground/55 group-hover:text-foreground/80"}`}>{d.tab}</span>
            </span>
            <span className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <span className="overflow-hidden"><span className="block pl-12 pt-2 text-[14px] leading-relaxed text-muted-foreground">{d.note}</span>
                <span className="ml-12 mt-3 block h-0.5 overflow-hidden rounded-full bg-border">{on && auto && <span key={`p${active}`} className="block h-full origin-left bg-flame" style={{ animation: `progress ${cycle} linear both` }} />}{on && !auto && <span className="block h-full bg-flame" />}</span>
              </span>
            </span>
          </button>;
        })}
      </div>
      <div id="demo-panel" role="tabpanel" aria-labelledby={`tab-${demo.id}`} className="min-w-0 px-3 pb-6 pt-4 sm:px-6 lg:py-10 lg:pl-6 lg:pr-10">
        <div key={demo.id} className="animate-stage"><Laptop url={demo.url}>{c => demo.screen(step, c)}</Laptop></div>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border/70 px-5 py-4 text-[15px] md:px-10">
      {demo.price ? <>
        <p>{demo.tab} <span className="text-muted-foreground">from</span> {demo.price}</p>
        <p className="text-muted-foreground">Delivered in <span className="text-foreground">{demo.days}</span></p>
      </> : <p>{demo.tab} <span className="text-muted-foreground">quoted to your call flow</span></p>}
      <a href={demo.project} className="inline-flex items-center gap-1 text-accent hover:underline sm:ml-auto">Real project: {demo.projectLabel} <ArrowUpRight aria-hidden className="h-4 w-4" /></a>
    </div>
  </div>;
}
