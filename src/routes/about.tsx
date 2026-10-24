import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Check, FileArchive, FileText, KeyRound, MapPin, PlayCircle, Star, X } from "lucide-react";
import type { ReactNode } from "react";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { Btn, SectionHead, SwipeRow } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";
import { TiltImage } from "@/components/TiltImage";
import { GOOGLE_REVIEWS_URL, googleRating, projects, stack, WHATSAPP } from "@/lib/kriyo-data";
import { pageMeta } from "@/lib/page-meta";
import mark from "@/assets/kriyvo-mark.webp";

export const Route = createFileRoute("/about")({
  head: () => pageMeta("About Kriyvo AI: Freelance Web Developer & AI Automation in Delhi", "Kriyvo AI is a freelance web development and AI automation service in Delhi NCR run by an engineer. One person designs, codes and automates the whole system."),
  component: About,
});

const project = (slug: string) => projects.find(p => p.slug === slug)!;

/** Each discipline shown with a real project from it. */
const disciplines = [
  { t: "Custom websites", d: "Brand websites and web apps in React, Next.js, WordPress or PHP, designed around your audience, fast on mobile and wired to your enquiry flow.", p: project("koca-restaurant-website") },
  { t: "AI chatbots & voice agents", d: "Website assistants grounded in your own content, WhatsApp funnels and phone agents that book appointments and hand off to your team.", p: project("website-ai-chatbot") },
  { t: "Workflow automation", d: "n8n and Python workflows that connect your forms, CRM, inbox and messaging, with logging, retries and a visible place for exceptions.", p: project("aurum-conventions-outreach") },
  { t: "AI that routes real work", d: "Systems that read, classify and route the messages your team handles by hand today, like patient feedback across a hospital.", p: project("bmrc-patient-feedback-pipeline") },
];

const principles = [
  ["You work with the builder", "No account managers and no outsourcing. The person you brief is the person who designs, codes and ships it.", BuilderScene],
  ["Production, not demos", "Every build includes logging, failure handling and a clear place for things that need a human, so it keeps working after launch.", LogScene],
  ["Scope before code", "Deliverables, milestones and exclusions are written down before work starts. Anything extra is agreed with you first.", ScopeScene],
  ["A handover you can use", "Source files, setup notes and a walkthrough, so your team understands what was delivered and how to run it.", HandoverScene],
] as const;

function About() {
  return <AgencyLayout>
    {/* Hero: statement and a ruled facts line on the left, real work fanned out on the right */}
    <section className="mx-auto grid max-w-[1240px] items-center gap-14 px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
      <div>
        <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
          {["Developer first.", "Then AI engineer."].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><span className="line-in" style={{ animationDelay: `${100 + i * 120}ms` }}>{l}</span></span>)}
        </h1>
        <p className="mt-7 max-w-xl text-lg leading-relaxed text-foreground/75 animate-rise" style={{ animationDelay: "350ms" }}>Kriyvo AI is my freelance web development and AI automation service in Delhi NCR. I design and code the website, build the backend and wire up the AI and automation behind it, so one person owns the whole system and nothing gets lost between teams.</p>
        <div className="mt-9 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "450ms" }}><Btn href="/portfolio">See the work</Btn><Btn href={WHATSAPP} dark={false}>Chat on WhatsApp</Btn></div>
        <dl className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-border border-y border-border animate-rise" style={{ animationDelay: "550ms" }}>
          {([["115+", "Projects delivered"], ["30+", "Clients"], [`${googleRating.score}`, "Rating on Google"]] as const).map(([n, l], i) => <div key={l} className={`flex flex-col-reverse py-5 ${i ? "pl-5" : ""}`}><dt className="mt-1 text-[14px] text-muted-foreground">{l}</dt><dd className="flex items-center gap-1.5 font-display text-[1.75rem] leading-none md:text-[2.25rem]">{n}{i === 2 && <Star aria-hidden className="h-5 w-5 fill-flame text-flame" />}</dd></div>)}
        </dl>
      </div>
      <StudioStack />
    </section>

    {/* What I do: each discipline with a real project */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36">
      <SectionHead title="What I do" text="Four kinds of work, each shown with a real project it produced." />
      <div className="mt-14 grid gap-x-8 gap-y-16 md:grid-cols-2">
        {disciplines.map((d, i) => <Reveal key={d.t} delay={(i % 2) * 90}>
          <Link to="/portfolio/$slug" params={{ slug: d.p.slug }} className="group block">
            <TiltImage src={d.p.image} alt={d.p.title} />
            <h3 className="mt-6 font-display text-[1.75rem] font-normal">{d.t}</h3>
            <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-foreground/75">{d.d}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-[15px] text-accent">{d.p.title} <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></p>
          </Link>
        </Reveal>)}
      </div>
    </section>

    {/* How I work: each principle shown as the thing it produces */}
    <section className="mt-20 bg-ink py-20 text-ink-foreground md:mt-36 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal><h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem]">How I work</h2><p className="mt-4 max-w-md text-lg leading-relaxed text-ink-foreground/65">Four promises, and what each one looks like on a real project.</p></Reveal>
          <Reveal><Link to="/working-together" className="btn w-fit bg-ink-foreground text-ink">How a project runs <ArrowUpRight aria-hidden className="h-4 w-4" /></Link></Reveal>
        </div>
        <div className="mt-14 grid gap-4 md:grid-cols-2">
          {principles.map(([t, d, Scene], i) => <Reveal key={t} delay={(i % 2) * 90}><Principle n={i + 1} title={t} text={d}><Scene /></Principle></Reveal>)}
        </div>
      </div>
    </section>

    {/* Skills & stack */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36">
      <SectionHead title="Skills & stack" text="The tools I use every week to ship fast, reliable websites and AI systems." />
      <div className="mt-12"><SwipeRow label="Skills and stack" at="md" grid="md:grid-cols-2 lg:grid-cols-4">
        {stack.map(([group, items], i) => <Reveal key={group} delay={(i % 4) * 60} className="w-full rounded-[22px] bg-stone p-6">
          <h3 className="font-display text-xl font-normal">{group}</h3>
          <ul className="mt-4 flex flex-wrap gap-1.5">{items.map(t => <li key={t} className="rounded-full bg-card px-3 py-1.5 text-[14px]">{t}</li>)}</ul>
        </Reveal>)}
        <Reveal delay={180} className="flex w-full flex-col justify-between gap-6 rounded-[22px] bg-ink p-6 text-ink-foreground">
          <h3 className="font-display text-xl font-normal">Need a tool that isn't listed?</h3>
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn w-fit bg-ink-foreground text-ink">Ask on WhatsApp <ArrowUpRight aria-hidden className="h-4 w-4" /></a>
        </Reveal>
      </SwipeRow></div>
    </section>

    <Testimonials />
    <ProjectCTA />
  </AgencyLayout>;
}

/** Three real projects fanned like prints on a desk; they spread apart on hover. */
function StudioStack() {
  const shots = [project("website-ai-chatbot"), project("gignaati-whatsapp-bot"), project("koca-restaurant-website")];
  const pose = [
    "-translate-x-[17%] -translate-y-[9%] -rotate-[6deg] scale-[0.86] group-hover:-translate-x-[26%] group-hover:-rotate-[9deg]",
    "translate-x-[17%] -translate-y-[5%] rotate-[5deg] scale-[0.86] group-hover:translate-x-[26%] group-hover:rotate-[8deg]",
    "translate-y-[12%] group-hover:translate-y-[6%]",
  ];
  return <div className="group relative mx-auto aspect-[5/4] w-full max-w-[560px] animate-rise" style={{ animationDelay: "300ms" }}>
    {shots.map((p, i) => <Link key={p.slug} to="/portfolio/$slug" params={{ slug: p.slug }} aria-label={p.title}
      className={`absolute inset-x-[12%] top-[14%] block overflow-hidden rounded-[18px] bg-ink shadow-[0_30px_60px_-28px_oklch(0.2_0.02_60/0.55)] ring-1 ring-black/5 transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] ${pose[i]}`}>
      <img src={p.image} alt="" className="aspect-[16/10] w-full object-cover object-top" />
    </Link>)}
    <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="absolute bottom-[4%] left-0 flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-[0_20px_44px_-22px_oklch(0.2_0.02_60/0.5),inset_0_0_0_1px_var(--color-border)] transition-transform duration-500 hover:-translate-y-0.5">
      <span className="font-display text-[1.75rem] leading-none">{googleRating.score}</span>
      <span><span className="flex" aria-hidden>{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3.5 w-3.5 fill-flame text-flame" />)}</span><span className="mt-0.5 block text-[13px] text-muted-foreground">{googleRating.count} Google reviews</span></span>
    </a>
    <div className="absolute right-0 top-0 flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-ink-foreground shadow-[0_20px_44px_-22px_oklch(0.2_0.02_60/0.6)]">
      <img src={mark} alt="" width={30} height={32} className="h-8 w-auto" />
      <span><span className="block text-[15px]">Kriyvo AI</span><span className="flex items-center gap-1 text-[13px] text-ink-foreground/60"><MapPin aria-hidden className="h-3 w-3 text-saffron" />New Ashok Nagar, Delhi</span></span>
    </div>
  </div>;
}

/** A principle card: a small scene from a real project on top, the promise below. A soft light follows the cursor. */
function Principle({ n, title, text, children }: { n: number; title: string; text: string; children: ReactNode }) {
  return <div onPointerMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`); }}
    className="group relative h-full overflow-hidden rounded-[26px] bg-ink-foreground/[0.05] p-3 ring-1 ring-ink-foreground/[0.08] transition-colors duration-500 hover:bg-ink-foreground/[0.07]">
    <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), oklch(0.68 0.21 42 / 0.10), transparent 60%)" }} />
    <div data-ui className="relative h-[220px] overflow-hidden rounded-[18px] bg-[oklch(0.2_0.004_60)] ring-1 ring-ink-foreground/[0.06]">{children}</div>
    <div className="relative px-5 pb-6 pt-7 md:px-7 md:pb-8">
      <p className="font-display text-[15px] text-saffron tabular">{String(n).padStart(2, "0")}</p>
      <h3 className="mt-2 font-display text-[1.75rem] font-normal leading-tight md:text-[2.25rem]">{title}</h3>
      <p className="mt-3 max-w-md text-[16px] leading-relaxed text-ink-foreground/65">{text}</p>
    </div>
  </div>;
}

const scene = "absolute inset-0 flex flex-col justify-center gap-2.5 p-5 md:p-6 text-[14px] transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]";

/** The client talks to the person writing the code, from brief to launch. */
function BuilderScene() {
  return <div className={scene}>
    <p className="ml-auto max-w-[78%] rounded-2xl rounded-br-md bg-ink-foreground/10 px-4 py-2.5">Can the form also send new leads to WhatsApp?</p>
    <div className="flex max-w-[86%] items-end gap-2"><img src={mark} alt="" width={22} height={23} className="mb-1 h-6 w-auto" /><p className="rounded-2xl rounded-bl-md bg-ink-foreground px-4 py-2.5 text-ink">Yes. I'll wire it in and send you a preview link.</p></div>
    <ol className="mt-2 flex flex-wrap items-center gap-1.5 text-[12px] text-ink-foreground/55">{["Brief", "Design", "Code", "Launch"].map((s, i) => <li key={s} className="flex items-center gap-1.5">{i > 0 && <span aria-hidden className="h-px w-3 bg-ink-foreground/25" />}<span className="rounded-full bg-ink-foreground/[0.08] px-2.5 py-1">{s}</span></li>)}<li className="ml-1 text-ink-foreground/45">one person</li></ol>
  </div>;
}

/** What a production build logs: retries, and a human queue for what it can't handle. */
function LogScene() {
  const rows: [string, string, "ok" | "retry" | "human"][] = [["lead.received", "form → CRM", "ok"], ["crm.sync", "retry 1 → ok", "retry"], ["whatsapp.notify", "sent to owner", "ok"], ["invoice.parse", "unclear → human queue", "human"]];
  const dot = { ok: "bg-emerald-400", retry: "bg-saffron", human: "bg-flame" };
  return <div className={`${scene} font-mono text-[12.5px]`}>
    {rows.map(([e, note, s], i) => <p key={e} className="flex items-center gap-3 rounded-lg bg-ink-foreground/[0.04] px-3 py-2"><span className="hidden text-ink-foreground/35 sm:inline">09:41:0{i + 2}</span><span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${dot[s]}`} /><span>{e}</span><span className="ml-auto truncate text-ink-foreground/50">{note}</span></p>)}
  </div>;
}

/** The written scope: what's in, what's out, and the milestones. */
function ScopeScene() {
  const rows: [string, boolean][] = [["Pages and layout agreed", true], ["Enquiry form → WhatsApp", true], ["On-page SEO", true], ["Paid ads management", false]];
  return <div className={scene}>
    <div className="rounded-xl bg-ink-foreground px-5 py-4 text-ink shadow-[0_20px_40px_-24px_black]">
      <p className="flex items-center justify-between text-[12px] text-ink/55"><span>Scope · Business website</span><span>Signed off</span></p>
      <ul className="mt-3 space-y-1.5">{rows.map(([t, inc]) => <li key={t} className={`flex items-center gap-2 ${inc ? "" : "text-ink/45 line-through"}`}>{inc ? <Check aria-hidden className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} /> : <X aria-hidden className="h-3.5 w-3.5" />}{t}</li>)}</ul>
      <div className="mt-3 grid grid-cols-4 gap-1">{[1, 1, 0, 0].map((d, i) => <span key={i} className={`h-1 rounded-full ${d ? "bg-accent" : "bg-ink/12"}`} />)}</div>
    </div>
  </div>;
}

/** Everything handed over at the end. */
function HandoverScene() {
  const files: [typeof FileArchive, string, string][] = [[FileArchive, "Source code", ".zip"], [FileText, "Setup notes", ".pdf"], [PlayCircle, "Walkthrough", ".mp4"], [KeyRound, "Logins", "all yours"]];
  return <div className={scene}>
    <ul className="grid grid-cols-2 gap-2">{files.map(([Icon, f, tag]) => <li key={f} className="flex items-center gap-3 rounded-xl bg-ink-foreground/[0.06] px-3 py-3"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-ink-foreground/10"><Icon aria-hidden className="h-4 w-4 text-saffron" /></span><span className="min-w-0"><span className="block truncate text-[13px]">{f}</span><span className="text-[12px] text-ink-foreground/45">{tag}</span></span></li>)}</ul>
    <p className="flex items-center gap-2 text-[13px] text-ink-foreground/60"><Check aria-hidden className="h-4 w-4 text-emerald-400" strokeWidth={2.5} />Handed over to your team</p>
  </div>;
}
