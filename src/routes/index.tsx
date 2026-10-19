import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Activity, BrainCircuit, Check, Cloud, Cog, Database, FileCheck, KeyRound,
  Menu, MessageSquare, MonitorSmartphone, Phone, Plug, Server, Workflow, X,
} from "lucide-react";
import { projects, process, caseStudies, WHATSAPP } from "@/lib/kriyo-data";
import { Reveal } from "@/components/Reveal";
import mark from "@/assets/kriyvo-mark.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kriyvo AI — AI Agents, Automation & Digital Products" },
      { name: "description", content: "Kriyvo AI builds AI chatbots, voice agents, n8n automations and premium websites that deliver measurable results." },
      { property: "og:title", content: "Kriyvo AI — AI that works for every business" },
      { property: "og:description", content: "Chatbots, voice agents, automation workflows and websites — production-ready, from India." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const P = (i: number) => projects[i] as (typeof projects)[number];

/* ---------- small pieces ---------- */
function Logo({ invert = false }: { invert?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <img src={mark} alt="Kriyvo AI" className="h-7 w-auto" />
      <span className={`text-[19px] font-bold tracking-tight ${invert ? "text-ink-foreground" : ""}`}>kriyvo<span className="text-gradient">.ai</span></span>
    </span>
  );
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-fit border-y border-periwinkle/60 px-10 py-2 text-sm font-medium text-indigo">{children}</div>
  );
}
function CheckMark() {
  return <span className="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-accent text-[9px] text-accent-foreground">✓</span>;
}
const Btn = ({ href, children, dark = true }: { href: string; children: React.ReactNode; dark?: boolean }) => (
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
    className={`inline-flex items-center rounded-full px-6 py-3 text-[15px] font-medium transition hover:-translate-y-0.5 ${dark ? "bg-primary text-primary-foreground shadow-soft" : "border border-border bg-card"}`}>
    {children}
  </a>
);

/* ---------- data ---------- */
const announcements = ["Autonomous voice & phone calling agents now live", "Free AI chatbot consultation this month", "CRM & automation builds starting ₹15,000"];
const clients = ["KOCA", "Aurum Conventions", "Gignaati", "BMRC Hospital", "Smartians AI", "Swaran Soft"];
const tabs = ["Chat Agents", "Voice Agents", "Automations", "WhatsApp", "Websites"];
const tabProject = [1, 4, 2, 3, 0];

const workflow = [
  { t: "Research", d: "Agents research prospects and your own documents, then re-plan as they learn something new.", p: 2, icon: BrainCircuit },
  { t: "Lead qualification", d: "Greets every visitor, answers from grounded knowledge and qualifies intent in seconds.", p: 1, icon: MessageSquare },
  { t: "Voice calls", d: "Holds natural phone conversations and books directly into your calendar.", p: 4, icon: Phone },
  { t: "Escalations", d: "Classifies sentiment and severity, then alerts the right person on WhatsApp and email.", p: 5, icon: Activity },
  { t: "Integrations", d: "Connects CRMs, calendars, sheets, Telegram, Supabase and every tool you already use.", p: 3, icon: Plug },
];

const integrations = ["n8n", "OpenAI", "Pinecone", "Qdrant", "Retell AI", "WhatsApp", "FastAPI", "Supabase", "Google Calendar", "Google Drive", "Telegram", "Gmail", "Next.js", "Python"];

const bento = [
  { icon: MessageSquare, t: "Chat Agents", d: "Web & WhatsApp assistants grounded in your data" },
  { icon: Phone, t: "Voice Agents", d: "Sub-250ms conversational phone calls" },
  { icon: Workflow, t: "Workflows", d: "Multi-step n8n pipelines with human checkpoints" },
  { icon: Database, t: "Knowledge Base", d: "Docs vectorised into Pinecone or Qdrant" },
];

const fullstack = [
  { icon: MonitorSmartphone, t: "Customer-facing Applications", d: "Products your customers actually use — chat widgets, WhatsApp funnels, phone lines and brand websites.", links: ["Website Chatbots", "WhatsApp Bots", "Voice Agents", "Brand Websites"] },
  { icon: BrainCircuit, t: "Grounded Intelligence", d: "LLM reasoning grounded in your documents with RAG, sentiment triage and dynamic prompt chains.", links: ["RAG Knowledge Base", "Sentiment Analysis", "Personalised Copy", "Lead Scoring"] },
  { icon: Cog, t: "Automation Infrastructure", d: "Webhooks and workflows that connect every system and run reliably with monitoring built in.", links: ["n8n Workflows", "FastAPI Services", "CRM Sync", "Alerts & Logging"] },
];

const deploy = [
  { icon: Cloud, t: "Kriyvo Managed", d: "We host, monitor and improve — fastest time to value" },
  { icon: Server, t: "Your Cloud", d: "Deployed inside your own accounts and keys" },
  { icon: KeyRound, t: "Full Handover", d: "Complete code, docs and operational ownership" },
];

const stats: [string, string][] = [["06", "Systems in production"], ["80%+", "Calls automated"], ["<5s", "Lead response"], ["<60s", "Critical escalation"]];

const navLinks: [string, string][] = [["Products", "#platform"], ["How we build", "#build"], ["Case Studies", "#work"], ["Enterprise", "#enterprise"]];

/* ---------- page ---------- */
function Index() {
  const [ann, setAnn] = useState(0);
  const [annOff, setAnnOff] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState(0);
  const [wf, setWf] = useState(0);
  const [tst, setTst] = useState(0);
  const [lang, setLang] = useState<"py" | "js" | "curl">("py");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const a = setInterval(() => setAnn((x) => (x + 1) % announcements.length), 4000);
    const f = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", f, { passive: true });
    return () => { clearInterval(a); window.removeEventListener("scroll", f); };
  }, []);
  useEffect(() => {
    const t = setTimeout(() => setTst((x) => (x + 1) % projects.length), 6000);
    return () => clearTimeout(t);
  }, [tst]);

  const tp = P(tabProject[tab] ?? 0);
  const code = {
    py: `# What we actually ship: a FastAPI webhook\n# behind a WhatsApp lead-qualification bot\n\nfrom fastapi import FastAPI, Request\n\napp = FastAPI()\n\n@app.post("/webhook/whatsapp")\nasync def inbound(req: Request):\n    msg = await req.json()\n    reply = await agent.answer(\n        msg["text"], knowledge="your-docs")\n    await whatsapp.send(msg["from"], reply)\n    if reply.qualified:\n        await crm.sync(msg["from"])\n    return {"ok": True}`,
    js: `// The same webhook in Node —\n// every build is real code you own\n\nimport express from "express";\n\nconst app = express().use(express.json());\n\napp.post("/webhook/whatsapp", async (req, res) => {\n  const msg = req.body;\n  const reply = await agent.answer(msg.text, {\n    knowledge: "your-docs",\n  });\n  await whatsapp.send(msg.from, reply);\n  if (reply.qualified) await crm.sync(msg.from);\n  res.json({ ok: true });\n});`,
    curl: `# Test the webhook the way Meta calls it\ncurl -X POST https://your-domain.com/webhook/whatsapp \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "from": "+91 98xxxxxx21",\n    "text": "What does the enterprise plan include?"\n  }'`,
  }[lang];
  const tq = P(tst);

  return (
    <div className="min-h-screen overflow-x-clip">
      {/* Announcement bar */}
      {!annOff && (
        <div className="relative z-50 flex items-center justify-center gap-3 border-b border-periwinkle/40 bg-card/80 px-10 py-2 text-center text-[13px]">
          <span className="rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-indigo">New</span>
          <span key={ann} className="inline-block animate-rise">{announcements[ann]}</span>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="font-medium text-indigo underline underline-offset-2">Talk to us</a>
          <button aria-label="Dismiss announcement" onClick={() => setAnnOff(true)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground transition hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Nav */}
      <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled || menuOpen ? "border-b border-border bg-background/80 backdrop-blur-xl" : ""}`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#" onClick={() => setMenuOpen(false)}><Logo /></a>
          <div className="hidden gap-8 text-[15px] md:flex">
            {navLinks.map(([l, h]) => (
              <a key={l} href={h} className="text-foreground/80 transition hover:text-foreground">{l}</a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a href="#work" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground sm:inline-flex">Our Work</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hidden rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium sm:inline-flex">Contact Us</a>
            <button aria-label="Toggle menu" onClick={() => setMenuOpen((o) => !o)} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card md:hidden">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-background px-6 py-4 md:hidden animate-rise">
            <div className="flex flex-col gap-1 text-[15px]">
              {navLinks.map(([l, h]) => (
                <a key={l} href={h} onClick={() => setMenuOpen(false)} className="rounded-xl px-3 py-3 text-foreground/80 transition hover:bg-secondary hover:text-foreground">{l}</a>
              ))}
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-2 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground">Contact Us</a>
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative -mt-[73px] pt-[73px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-glow animate-glow" />
        <div className="pointer-events-none absolute left-1/2 top-[380px] -translate-x-1/2">
          {[0, 2, 4].map((d) => (
            <span key={d} className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-periwinkle/40 animate-ripple" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-14 text-center">
          <img src={mark} alt="" className="mx-auto mb-8 h-14 w-auto animate-rise drop-shadow-lg" />
          <div className="animate-rise" style={{ animationDelay: "100ms" }}><Eyebrow>India's Applied AI Studio</Eyebrow></div>
          <h1 className="mt-8 text-6xl md:text-[5.2rem] leading-[1] animate-rise" style={{ animationDelay: "200ms" }}>AI that works for every business</h1>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "300ms" }}>
            Built on production-grade engineering. Powered by grounded frontier models.<br className="hidden md:block" /> Delivering measurable impact from day one.
          </p>
          <div className="mt-10 flex justify-center gap-3 animate-rise" style={{ animationDelay: "400ms" }}>
            <Btn href={WHATSAPP}>Book a call</Btn>
            <Btn href="#work" dark={false}>See our work</Btn>
          </div>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-2 gap-6 md:grid-cols-4 animate-rise" style={{ animationDelay: "500ms" }}>
            {stats.map(([n, l]) => (
              <div key={l}><p className="font-display text-4xl">{n}</p><p className="mt-1 text-xs text-muted-foreground">{l}</p></div>
            ))}
          </div>
          <p className="mt-4 text-[11px] text-muted-foreground/70 animate-rise" style={{ animationDelay: "550ms" }}>Measured across live client deployments, 2025</p>
        </div>
        <div className="relative pb-16 pt-10">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Businesses build with Kriyvo</p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-20">
              {[...clients, ...clients, ...clients, ...clients].map((c, i) => (
                <span key={i} className="whitespace-nowrap font-display text-2xl font-semibold text-foreground/60">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Platform: browser window with tabs */}
      <section id="platform" className="relative py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_100%_30%,var(--periwinkle),transparent_70%)] opacity-40" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Reveal><h2 className="text-center text-5xl md:text-6xl">The AI platform<br />businesses build on</h2></Reveal>
          <Reveal delay={150}>
            <div className="mt-14 overflow-hidden rounded-[28px] border border-border bg-card shadow-soft">
              <div className="flex overflow-x-auto border-b border-border bg-secondary/60 p-1.5">
                {tabs.map((t, i) => (
                  <button key={t} onClick={() => setTab(i)}
                    className={`flex-1 whitespace-nowrap rounded-2xl px-5 py-2.5 text-sm transition ${i === tab ? "bg-card font-medium text-indigo shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>{t}</button>
                ))}
              </div>
              <div key={tab} className="grid gap-8 p-6 md:grid-cols-[1.3fr_1fr] md:p-10 animate-rise">
                <img src={tp.image} alt={tp.title} className="aspect-[16/10] w-full rounded-2xl object-cover" />
                <div className="flex flex-col">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{tp.client}</p>
                  <h3 className="mt-3 text-3xl leading-tight">{tp.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{tp.subtitle}</p>
                  <ul className="mt-6 space-y-3">{tp.deliverables.map((d) => <li key={d} className="flex gap-3 text-sm"><CheckMark />{d}</li>)}</ul>
                  <div className="mt-auto pt-8">
                    <p className="font-display text-4xl font-medium text-gradient">{tp.metric}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{tp.result}</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Horizontal accordion — "Cowork" style */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <h2 className="text-4xl md:text-5xl">Kriyvo Agents</h2>
            <p className="mt-3 max-w-md text-muted-foreground">AI teammates that research, qualify, call, escalate and get work done.</p>
          </Reveal>
          <Btn href="#work" dark={false}>See them in action</Btn>
        </div>
        <div className="mt-10 flex h-auto flex-col gap-2 md:h-[480px] md:flex-row">
          {workflow.map((w, i) => {
            const on = i === wf;
            const Icon = w.icon;
            return (
              <div key={w.t} onClick={() => setWf(i)} onMouseEnter={() => setWf(i)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? "md:flex-[8]" : "md:flex-[1]"}`}>
                {on ? (
                  <div className="flex h-full flex-col p-7 animate-rise">
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                    <h3 className="mt-1 text-3xl">{w.t}</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{w.d}</p>
                    <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl bg-secondary p-4 md:p-6">
                      <img src={P(w.p).image} alt={P(w.p).title} className="h-full max-h-72 w-full rounded-xl object-cover shadow-soft md:max-h-none" />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-between gap-3 p-5 md:flex-col md:justify-start md:gap-4 md:py-7">
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                    <Icon className="h-5 w-5 text-muted-foreground" />
                    <span className="text-[15px] md:hidden">{w.t}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className="mt-10 space-y-3 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
          {[0, 1].map((r) => (
            <div key={r} className="flex w-max animate-marquee gap-3" style={{ animationDirection: r ? "reverse" : "normal", animationDuration: "55s" }}>
              {[...integrations, ...integrations].map((s, i) => (
                <span key={i} className="rounded-xl border border-border bg-card px-4 py-2 text-sm">{s}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Developers: real code + bento */}
      <section id="build" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-5xl md:text-6xl">Real code,<br />not a black box</h2></Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-card p-7">
              <h3 className="text-3xl">This is what a build<br /><span className="text-gradient">actually looks like</span></h3>
              <p className="mt-3 text-sm text-muted-foreground">A simplified excerpt from a production WhatsApp bot we shipped — you get the full source on handover.</p>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-secondary/50">
                <div className="flex items-center gap-1 border-b border-border px-3 py-2 text-xs">
                  {(["py", "js", "curl"] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)} className={`rounded-lg px-3 py-1.5 ${lang === l ? "bg-card font-medium shadow-sm" : "text-muted-foreground"}`}>{{ py: "Python", js: "JavaScript", curl: "cURL" }[l]}</button>
                  ))}
                </div>
                <pre key={lang} className="h-60 overflow-auto p-5 font-mono text-[13px] leading-relaxed text-foreground/80 animate-rise">{code}</pre>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-5 block rounded-full bg-primary py-3 text-center text-sm font-medium text-primary-foreground">Start your project</a>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {bento.map((b, i) => (
              <Reveal key={b.t} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft">
                  <b.icon className="h-6 w-6 text-muted-foreground transition group-hover:text-accent" />
                  <h4 className="mt-10 font-display text-xl">{b.t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{b.d}</p>
                </div>
              </Reveal>
            ))}
            {[{ icon: Plug, t: "REST & Webhooks" }, { icon: FileCheck, t: "Full Handover" }, { icon: Activity, t: "Live Monitoring" }].map((x, i) => (
              <Reveal key={x.t} delay={300 + i * 80} className={i === 2 ? "col-span-2" : ""}>
                <div className="flex items-center gap-3 rounded-3xl border border-border bg-card p-5">
                  <x.icon className="h-5 w-5 text-muted-foreground" />
                  <h4 className="font-display text-lg">{x.t}</h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Full-stack */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">India's full-stack<br />applied AI partner</h2></Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {fullstack.map((c, i) => (
            <Reveal key={c.t} delay={i * 120}>
              <div className="group h-full rounded-3xl border border-border bg-card p-7 transition duration-500 hover:-translate-y-1 hover:shadow-soft">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-secondary">
                  <c.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="mt-6 text-2xl">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                <ul className="mt-5 space-y-3">
                  {c.links.map((l) => (
                    <li key={l} className="flex gap-3 text-sm"><CheckMark />{l}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Btn href="#work" dark={false}>See case studies</Btn></div>
      </section>

      {/* Enterprise + deployment */}
      <section id="enterprise" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl md:text-5xl">Enterprise-grade. Out of<br />the box.</h2>
          <p className="mt-4 text-center text-muted-foreground">Monitoring, control and confidence. Not bolted on. Built in from day one.</p>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {[["Forward deployed", "We work alongside your team, designing agents, integrating systems and staying until you're live. Not a handoff. A partnership.", process.map((p) => p.title)],
            ["Deployment flexibility", "Agents run where your data already lives — your CRM, your cloud, your channels. Your agents, your terms.", ["Web, WhatsApp, phone or email", "Bring your own model or use ours", "Swap tools without rewriting workflows", "Complete documentation & handover"]]].map(([t, d, l], i) => (
            <Reveal key={t as string} delay={i * 120}>
              <div className="h-full rounded-3xl border border-border bg-card p-8">
                <h3 className="text-2xl">{t as string}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d as string}</p>
                <ul className="mt-6 space-y-3">{(l as string[]).map((x) => <li key={x} className="flex gap-3 text-sm"><CheckMark />{x}</li>)}</ul>
              </div>
            </Reveal>
          ))}
          <Reveal className="md:col-span-2">
            <div className="flex flex-col gap-6 rounded-3xl border border-border bg-card p-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-lg">
                <h3 className="text-2xl">Reliability and governance</h3>
                <p className="mt-2 text-sm text-muted-foreground">Every agent action is logged and traceable — exception alerts, evaluation benchmarks and human escalation checkpoints are built into the core.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {["Live monitoring", "Exception alerts", "Audit logs", "Human handoff", "NDA protected"].map((b) => (
                  <span key={b} className="rounded-xl border border-accent/30 bg-accent/5 px-3 py-2 text-xs font-medium text-accent">{b}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {deploy.map((d, i) => (
            <Reveal key={d.t} delay={i * 100}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:shadow-soft">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-secondary"><d.icon className="h-6 w-6 text-accent" /></div>
                <div><h4 className="font-display text-lg font-medium">{d.t}</h4><p className="text-sm text-muted-foreground">{d.d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10 text-center"><Btn href={WHATSAPP}>Talk to us about your setup</Btn></div>
      </section>

      {/* Outcomes carousel */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">Outcomes from live deployments</h2></Reveal>
        <Reveal delay={120}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12">
            <div key={tst} className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] animate-rise">
              <div>
                <p className="text-center font-display text-xl font-semibold tracking-wide text-accent md:text-left">{tq.client}</p>
                <p className="mt-6 font-display text-4xl font-medium text-gradient md:text-5xl">{tq.metric}</p>
                <p className="mt-4 text-lg leading-snug text-foreground/80">{tq.result}</p>
                <p className="mt-6 text-sm text-muted-foreground">{tq.title} · {tq.sector}</p>
              </div>
              <img src={tq.image} alt={tq.title} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            </div>
            <div className="mt-8 flex justify-center gap-2.5">
              {projects.map((_, i) => (
                <button key={i} aria-label={`Show outcome ${i + 1}`} onClick={() => setTst(i)} className={`h-2.5 rounded-full transition-all duration-500 ${i === tst ? "w-9 bg-accent" : "w-2.5 bg-border hover:bg-muted-foreground/40"}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Case studies as "Research & Updates" cards */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">Case studies</h2></Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title} delay={(i % 2) * 100}>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group block">
                <div className="overflow-hidden rounded-2xl">
                  <img src={c.image} alt={c.title} loading="lazy" width={1280} height={800} className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{c.client}</p>
                <h3 className="mt-1.5 font-display text-lg font-medium leading-snug tracking-tight group-hover:text-accent">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.outcome}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Btn href={WHATSAPP} dark={false}>Build something similar</Btn></div>
      </section>

      {/* In-depth case studies */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal>
          <h2 className="text-center text-4xl md:text-5xl">Inside the builds</h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">The problem, what we built and what it delivered — four production systems, end to end.</p>
        </Reveal>
        <div className="mt-16 space-y-20">
          {caseStudies.map((c, i) => (
            <Reveal key={c.title}>
              <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="overflow-hidden rounded-3xl border border-border shadow-soft">
                  <img src={c.image} alt={c.title} loading="lazy" width={1280} height={800} className="aspect-[16/10] w-full object-cover" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-accent">{c.client}</p>
                  <h3 className="mt-2 text-3xl leading-tight md:text-4xl">{c.title}</h3>
                  <div className="mt-6 space-y-5">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">The problem</p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/80">{c.problem}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What we built</p>
                      <p className="mt-1.5 text-[15px] leading-relaxed text-foreground/80">{c.built}</p>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {c.stack.map((s) => (
                      <span key={s} className="rounded-lg border border-border bg-card px-3 py-1.5 text-xs font-medium">{s}</span>
                    ))}
                  </div>
                  <p className="mt-6 border-l-2 border-accent pl-4 font-display text-lg font-medium leading-snug">{c.outcome}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center"><Btn href={WHATSAPP}>Discuss your project</Btn></div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink px-8 py-20 text-center text-ink-foreground">
            <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-96 w-[600px] rounded-full bg-accent-gradient opacity-50 blur-3xl animate-glow" />
            <h2 className="relative text-5xl md:text-6xl">Ready to build something<br />extraordinary?</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-ink-foreground/65">Production-ready code with guaranteed handover. Let's turn your ideas into systems people love.</p>
            <div className="relative mt-9 flex flex-wrap justify-center gap-3">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full bg-card px-6 py-3 text-sm font-medium text-card-foreground">Chat on WhatsApp</a>
              <a href="#work" className="rounded-full border border-ink-foreground/25 px-6 py-3 text-sm font-medium">Browse case studies</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Footer */}
      <footer className="relative overflow-hidden border-t border-border pt-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">AI that works for every business</p>
            <p className="mt-8 text-xs text-muted-foreground">© 2026 Kriyvo AI<br />Delhi NCR, India</p>
          </div>
          {([
            ["Products", [["Chat Agents", "#platform"], ["Voice Agents", "#platform"], ["WhatsApp Bots", "#platform"], ["Automations", "#platform"], ["Websites", "#platform"]]],
            ["Capabilities", [["RAG Knowledge Base", "#build"], ["Lead Qualification", "#build"], ["Sentiment Triage", "#build"], ["CRM Sync", "#build"]]],
            ["Work", caseStudies.map((c) => [c.client, "#work"] as [string, string])],
            ["Company", [["Process", "#enterprise"], ["Case Studies", "#work"], ["Contact", WHATSAPP], ["WhatsApp", WHATSAPP]]],
          ] as [string, [string, string][]][]).map(([h, items]) => (
            <div key={h}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{h}</p>
              <ul className="mt-4 space-y-2.5 text-sm">
                {items.map(([x, h2]) => (
                  <li key={x}><a href={h2} target={h2.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="hover:text-accent">{x}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-16 select-none text-center font-display text-[22vw] font-semibold leading-[0.75] tracking-[-0.06em] text-gradient">kriyvo</p>
      </footer>
    </div>
  );
}
