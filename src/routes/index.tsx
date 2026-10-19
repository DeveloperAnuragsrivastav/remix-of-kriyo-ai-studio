import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { projects, process, WHATSAPP } from "@/lib/kriyo-data";
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
function Check() {
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
const clients = ["KOCA", "Kriyvo AI", "Aurum Conventions", "Gignaati", "BMRC Hospital", "Enterprise · NDA"];
const tabs = ["Chat Agents", "Voice Agents", "Automations", "WhatsApp", "Websites"];
const tabProject = [1, 4, 2, 3, 0];

const workflow = [
  { t: "Research", d: "Agents research prospects and your own documents, then re-plan as they learn something new.", p: 2 },
  { t: "Lead qualification", d: "Greets every visitor, answers from grounded knowledge and qualifies intent in seconds.", p: 1 },
  { t: "Voice calls", d: "Holds natural phone conversations and books directly into your calendar.", p: 4 },
  { t: "Escalations", d: "Classifies sentiment and severity, then alerts the right person on WhatsApp and email.", p: 5 },
  { t: "Integrations", d: "Connects CRMs, calendars, sheets, Telegram, Supabase and every tool you already use.", p: 3 },
];

const integrations = ["n8n", "OpenAI", "Pinecone", "Qdrant", "Retell AI", "WhatsApp", "FastAPI", "Supabase", "Google Calendar", "Google Drive", "Telegram", "Gmail", "Next.js", "Python"];

const bento = [
  ["Chat Agents", "Web & WhatsApp assistants grounded in your data"],
  ["Voice Agents", "Sub-250ms conversational phone calls"],
  ["Workflows", "Multi-step n8n pipelines with human checkpoints"],
  ["Knowledge Base", "Docs vectorised into Pinecone or Qdrant"],
];

const fullstack = [
  { bg: "bg-card-blue", t: "Customer-facing Applications", d: "Products your customers actually use — chat widgets, WhatsApp funnels, phone lines and brand websites.", links: ["Website Chatbots", "WhatsApp Bots", "Voice Agents", "Brand Websites"] },
  { bg: "bg-card-orange", t: "Grounded Intelligence", d: "LLM reasoning grounded in your documents with RAG, sentiment triage and dynamic prompt chains.", links: ["RAG Knowledge Base", "Sentiment Analysis", "Personalised Copy", "Lead Scoring"] },
  { bg: "bg-card-green", t: "Automation Infrastructure", d: "Webhooks and workflows that connect every system and run reliably with monitoring built in.", links: ["n8n Workflows", "FastAPI Services", "CRM Sync", "Alerts & Logging"] },
];

const deploy = [
  { bg: "bg-card-blue", t: "Kriyvo Managed", d: "We host, monitor and improve — fastest time to value" },
  { bg: "bg-card-rose", t: "Your Cloud", d: "Deployed inside your own accounts and keys" },
  { bg: "bg-card-green", t: "Full Handover", d: "Complete code, docs and operational ownership" },
];

/* ---------- page ---------- */
function Index() {
  const [ann, setAnn] = useState(0);
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
    py: `from kriyvo import Agent\n\nagent = Agent(\n    name="lead-assistant",\n    knowledge="./docs",\n    channels=["web", "whatsapp"],\n)\n\nagent.on("qualified", crm.sync)\nagent.deploy()`,
    js: `import { Agent } from "kriyvo";\n\nconst agent = new Agent({\n  name: "lead-assistant",\n  knowledge: "./docs",\n  channels: ["web", "whatsapp"],\n});\n\nagent.on("qualified", crm.sync);\nawait agent.deploy();`,
    curl: `curl -X POST https://api.kriyvo.ai/v1/agents \\\n  -H "Authorization: Bearer $KEY" \\\n  -d '{\n    "name": "lead-assistant",\n    "channels": ["web","whatsapp"]\n  }'`,
  }[lang];
  const tq = P(tst);

  return (
    <div className="min-h-screen overflow-x-clip">
      {/* Announcement bar */}
      <div className="relative z-50 border-b border-periwinkle/40 bg-card/80 py-2 text-center text-[13px]">
        <span className="mr-3 rounded-full border border-border px-2 py-0.5 text-[11px] font-semibold text-indigo">New</span>
        <span key={ann} className="inline-block animate-rise">{announcements[ann]}</span>
        <a href={WHATSAPP} target="_blank" rel="noreferrer" className="ml-3 font-medium text-indigo underline underline-offset-2">Talk to us</a>
      </div>

      {/* Nav */}
      <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : ""}`}>
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#"><Logo /></a>
          <div className="hidden gap-8 text-[15px] md:flex">
            {[["Products", "#platform"], ["Developers", "#build"], ["Case Studies", "#work"], ["Company", "#enterprise"]].map(([l, h]) => (
              <a key={l} href={h} className="text-foreground/80 transition hover:text-foreground">{l}</a>
            ))}
          </div>
          <div className="flex gap-2">
            <a href="#work" className="hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground sm:inline-flex">Our Work</a>
            <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium">Contact Us</a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative -mt-[73px] pt-[73px]">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-glow animate-glow" />
        <div className="pointer-events-none absolute left-1/2 top-[380px] -translate-x-1/2">
          {[0, 2, 4].map((d) => (
            <span key={d} className="absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-periwinkle/40 animate-ripple" style={{ animationDelay: `${d}s` }} />
          ))}
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-20 text-center">
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
        </div>
        <div className="relative pb-16 pt-24">
          <p className="mb-8 text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">Businesses build with Kriyvo</p>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
            <div className="flex w-max animate-marquee gap-20">
              {[...clients, ...clients, ...clients, ...clients].map((c, i) => (
                <span key={i} className="whitespace-nowrap font-display text-2xl font-semibold text-foreground/35">{c}</span>
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
                  <ul className="mt-6 space-y-3">{tp.deliverables.map((d) => <li key={d} className="flex gap-3 text-sm"><Check />{d}</li>)}</ul>
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
          <Btn href={WHATSAPP} dark={false}>Explore Kriyvo Agents</Btn>
        </div>
        <div className="mt-10 flex h-auto flex-col gap-2 md:h-[480px] md:flex-row">
          {workflow.map((w, i) => {
            const on = i === wf;
            return (
              <div key={w.t} onClick={() => setWf(i)} onMouseEnter={() => setWf(i)}
                className={`relative cursor-pointer overflow-hidden rounded-3xl border border-border bg-card transition-all duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${on ? "md:flex-[8]" : "md:flex-[1]"}`}>
                {on ? (
                  <div className="flex h-full flex-col p-7 animate-rise">
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                    <h3 className="mt-1 text-3xl">{w.t}</h3>
                    <p className="mt-2 max-w-sm text-sm text-muted-foreground">{w.d}</p>
                    <div className="relative mt-6 flex-1 overflow-hidden rounded-2xl bg-[radial-gradient(80%_80%_at_20%_100%,var(--saffron),var(--periwinkle)_60%,transparent)] p-4 md:p-6">
                      <img src={P(w.p).image} alt={P(w.p).title} className="h-full max-h-72 w-full rounded-xl object-cover shadow-soft md:max-h-none" />
                    </div>
                  </div>
                ) : (
                  <div className="flex h-full items-center justify-between p-5 md:flex-col md:py-7">
                    <span className="text-xs text-muted-foreground">0{i + 1}</span>
                    <span className="text-[15px] md:writing-vertical">{w.t}</span>
                    <span className="text-xl text-muted-foreground">+</span>
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

      {/* Developers: code + bento */}
      <section id="build" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-5xl md:text-6xl">Build anything with<br />Kriyvo agents</h2></Reveal>
        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-border bg-[linear-gradient(180deg,var(--card),color-mix(in_oklab,var(--periwinkle)_25%,var(--card)))] p-7">
              <h3 className="text-3xl">Add a <span className="text-gradient">grounded AI agent</span><br />to your business in days</h3>
              <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-card">
                <div className="flex items-center gap-1 border-b border-border px-3 py-2 text-xs">
                  {(["py", "js", "curl"] as const).map((l) => (
                    <button key={l} onClick={() => setLang(l)} className={`rounded-lg px-3 py-1.5 ${lang === l ? "bg-secondary font-medium" : "text-muted-foreground"}`}>{{ py: "Python", js: "JavaScript", curl: "cURL" }[l]}</button>
                  ))}
                </div>
                <pre key={lang} className="h-60 overflow-auto p-5 font-mono text-[13px] leading-relaxed text-foreground/80 animate-rise">{code}</pre>
              </div>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-5 block rounded-full bg-primary py-3 text-center text-sm font-medium text-primary-foreground">Start your project</a>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4">
            {bento.map(([t, d], i) => (
              <Reveal key={t} delay={i * 80}>
                <div className="group h-full rounded-3xl border border-border bg-card p-6 transition duration-500 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft">
                  <img src={mark} alt="" className="h-7 w-auto opacity-40 transition group-hover:opacity-100" />
                  <h4 className="mt-10 font-display text-xl">{t}</h4>
                  <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                </div>
              </Reveal>
            ))}
            {["REST & Webhooks", "Full Handover", "Live Monitoring"].map((t, i) => (
              <Reveal key={t} delay={300 + i * 80} className={i === 2 ? "col-span-2" : ""}>
                <div className="rounded-3xl border border-border bg-card p-5"><h4 className="font-display text-lg">{t}</h4></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Kriyvo Can */}
      <section className="mx-auto max-w-6xl px-6 py-10">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink p-10 text-ink-foreground md:p-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent-gradient opacity-40 blur-3xl animate-glow" />
            <img src={mark} alt="" className="pointer-events-none absolute -bottom-10 right-10 h-80 w-auto opacity-15" />
            <h2 className="relative text-6xl md:text-8xl">Kriyvo <span className="text-gradient">Can</span></h2>
            <p className="relative mt-6 max-w-lg text-ink-foreground/65">From a celebrity restaurant launch to a hospital that escalates critical complaints in under a minute — turning manual bottlenecks into autonomous systems.</p>
            <div className="relative mt-14 grid grid-cols-2 gap-8 md:grid-cols-4">
              {[["06", "Systems in production"], ["80%+", "Calls automated"], ["<5s", "Lead response"], ["<60s", "Critical escalation"]].map(([n, l]) => (
                <div key={l}><p className="font-display text-5xl">{n}</p><p className="mt-1 text-sm text-ink-foreground/55">{l}</p></div>
              ))}
            </div>
            <div className="relative mt-12"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="inline-flex rounded-full bg-card px-6 py-3 text-sm font-medium text-card-foreground">Explore Kriyvo</a></div>
          </div>
        </Reveal>
      </section>

      {/* Pillars */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">Powering the AI-first business</h2></Reveal>
        <div className="mt-14 grid items-center gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <div className="relative grid aspect-[4/5] place-items-center overflow-hidden rounded-3xl bg-card-blue">
              <span className="absolute h-64 w-64 rounded-full border border-card/50 animate-ripple" />
              <span className="absolute h-64 w-64 rounded-full border border-card/50 animate-ripple" style={{ animationDelay: "3s" }} />
              <img src={mark} alt="" className="relative h-28 w-auto animate-float drop-shadow-xl" />
            </div>
          </Reveal>
          <div className="space-y-9">
            {[["Grounded by design", "Every agent answers from your own documents and data through RAG — built, deployed and run on your terms."],
              ["Production-grade models", "GPT-4, Retell AI and vector search orchestrated for latency, accuracy and cost."],
              ["Human at the core", "Human-in-the-loop checkpoints and clean sales handoffs wherever judgement matters."]].map(([t, d], i) => (
              <Reveal key={t} delay={i * 120}>
                <div className="flex gap-4">
                  <span className="mt-1.5 text-lg text-accent">✦</span>
                  <div><h3 className="text-2xl">{t}</h3><p className="mt-1.5 text-muted-foreground">{d}</p></div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={400}><a href={WHATSAPP} target="_blank" rel="noreferrer" className="block rounded-full bg-primary py-3.5 text-center text-sm font-medium text-primary-foreground">Get Started</a></Reveal>
          </div>
        </div>
      </section>

      {/* Full-stack */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">India's full-stack<br />applied AI partner</h2></Reveal>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {fullstack.map((c, i) => (
            <Reveal key={c.t} delay={i * 120}>
              <div className="group">
                <div className={`grid h-44 place-items-center overflow-hidden rounded-2xl ${c.bg}`}>
                  <img src={mark} alt="" className="h-16 w-auto brightness-0 invert opacity-90 transition duration-700 group-hover:scale-125 group-hover:rotate-6" />
                </div>
                <h3 className="mt-6 text-2xl">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.d}</p>
                <ul className="mt-5">
                  {c.links.map((l) => (
                    <li key={l} className="group/l flex items-center justify-between border-b border-border py-3 text-sm">
                      {l}<span className="text-muted-foreground transition group-hover/l:translate-x-1 group-hover/l:text-accent">→</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Btn href={WHATSAPP}>Start building with Kriyvo</Btn></div>
      </section>

      {/* Enterprise */}
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
                <ul className="mt-6 space-y-3">{(l as string[]).map((x) => <li key={x} className="flex gap-3 text-sm"><Check />{x}</li>)}</ul>
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
        <div className="mt-10 text-center"><Btn href={WHATSAPP}>Contact Us</Btn></div>
      </section>

      {/* Deploy anywhere */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">Built to run anywhere<br />your business runs</h2></Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {deploy.map((d, i) => (
            <Reveal key={d.t} delay={i * 100}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 transition hover:shadow-soft">
                <div className={`grid h-16 w-16 shrink-0 place-items-center rounded-xl ${d.bg}`}><img src={mark} alt="" className="h-7 w-auto brightness-0 invert" /></div>
                <div><h4 className="font-display text-lg font-medium">{d.t}</h4><p className="text-sm text-muted-foreground">{d.d}</p></div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Outcomes carousel */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">What our clients achieved</h2></Reveal>
        <Reveal delay={120}>
          <div className="relative mt-12 overflow-hidden rounded-3xl border border-border bg-card p-8 md:p-12">
            <div key={tst} className="grid items-center gap-10 md:grid-cols-[1.4fr_1fr] animate-rise">
              <div>
                <p className="text-center font-display text-xl font-semibold tracking-wide text-accent md:text-left">{tq.client}</p>
                <p className="mt-6 text-2xl leading-snug md:text-3xl">"{tq.result}"</p>
                <p className="mt-6 text-sm text-muted-foreground">{tq.title} · {tq.sector}</p>
              </div>
              <img src={tq.image} alt={tq.title} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            </div>
            <div className="mt-8 flex justify-center gap-2">
              {projects.map((_, i) => (
                <button key={i} aria-label={`Show outcome ${i + 1}`} onClick={() => setTst(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === tst ? "w-8 bg-accent" : "w-1.5 bg-border"}`} />
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Case studies as "Research & Updates" cards */}
      <section id="work" className="mx-auto max-w-6xl px-6 py-24">
        <Reveal><h2 className="text-center text-4xl md:text-5xl">Case studies</h2></Reveal>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 100}>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="group block">
                <div className="overflow-hidden rounded-2xl">
                  <img src={p.image} alt={p.title} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <p className="mt-4 text-xs text-muted-foreground">{p.client} · {p.category}</p>
                <h3 className="mt-1.5 font-display text-lg font-medium leading-snug tracking-tight group-hover:text-accent">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.metric}</p>
              </a>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 text-center"><Btn href={WHATSAPP} dark={false}>Build something similar</Btn></div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[32px] bg-ink px-8 py-20 text-center text-ink-foreground">
            <div className="pointer-events-none absolute inset-x-0 -top-40 mx-auto h-96 w-[600px] rounded-full bg-accent-gradient opacity-50 blur-3xl animate-glow" />
            <h2 className="relative text-5xl md:text-6xl">Ready to build something<br />extraordinary?</h2>
            <p className="relative mx-auto mt-5 max-w-lg text-ink-foreground/65">Production-ready code with guaranteed handover. Let's turn your ideas into systems people love.</p>
            <div className="relative mt-9 flex justify-center gap-3">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full bg-card px-6 py-3 text-sm font-medium text-card-foreground">Chat on WhatsApp</a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="rounded-full border border-ink-foreground/25 px-6 py-3 text-sm font-medium">Book a Discovery Call</a>
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
          {[["Products", ["Chat Agents", "Voice Agents", "WhatsApp Bots", "Automations", "Websites"]],
            ["Capabilities", ["RAG Knowledge Base", "Lead Qualification", "Sentiment Triage", "CRM Sync"]],
            ["Work", projects.slice(0, 4).map((p) => p.client.split(" (")[0] as string)],
            ["Company", ["Process", "Case Studies", "Contact", "WhatsApp"]]].map(([h, items]) => (
            <div key={h as string}>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{h as string}</p>
              <ul className="mt-4 space-y-2.5 text-sm">{(items as string[]).map((x) => <li key={x}><a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-accent">{x}</a></li>)}</ul>
            </div>
          ))}
        </div>
        <p className="mt-16 select-none text-center font-display text-[22vw] font-semibold leading-[0.75] tracking-[-0.06em] text-gradient">kriyvo</p>
      </footer>
    </div>
  );
}
