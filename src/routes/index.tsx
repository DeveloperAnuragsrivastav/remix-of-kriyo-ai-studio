import { createFileRoute } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { projects, googleRating, GOOGLE_REVIEWS_URL, WHATSAPP } from "@/lib/kriyo-data";
import { Reveal } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { AgencyLayout } from "@/components/AgencyLayout";
import { Testimonials } from "@/components/Testimonials";
import { PricingPlans } from "@/components/PricingPlans";
import { DemoStage } from "@/components/DemoStage";
import { ProjectPlanner } from "@/components/ProjectPlanner";
import { ServiceIndex } from "@/components/ServiceIndex";
import { WorkBento } from "@/components/WorkBento";
import { aiPlans, websitePlans } from "@/lib/pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Website Designer & Developer, Delhi | From ₹999 | Kriyvo AI" },
      { name: "description", content: "Freelance web developer & AI automation engineer in New Delhi. Custom websites, WordPress, AI chatbots, WhatsApp bots and n8n automation. Websites from ₹999." },
      { property: "og:title", content: "Kriyvo AI — Freelance Website Designer, Developer & AI Automation Engineer" },
      { property: "og:description", content: "Websites, AI chatbots, voice agents and n8n automation, built end to end. 115+ projects delivered. Websites from ₹999." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const Btn = ({ href, children, dark = true }: { href: string; children: ReactNode; dark?: boolean }) =>
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`btn ${dark ? "btn-dark" : "btn-light"}`}>{children}</a>;

/** A section heading in the centred house style. */
function Head({ title, text, align = "center" }: { title: ReactNode; text?: string; align?: "center" | "left" }) {
  return <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem]">{title}</h2>
    {text && <p className={`mt-5 text-lg leading-relaxed text-foreground/70 ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}`}>{text}</p>}
  </Reveal>;
}


function Index() {
  const [plansTab, setPlansTab] = useState<"web" | "ai">("web");

  return <AgencyLayout>
    {/* Hero */}
    <section className="relative">
      <div className="relative mx-auto max-w-[1240px] px-4 pb-16 pt-16 text-center sm:px-6 md:pt-24">
        <h1 className="mx-auto max-w-4xl text-[1.8rem] min-[380px]:text-[2rem] sm:text-6xl lg:text-[4.25rem]">
          {["Websites and AI that", "work for your business"].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><span className="line-in" style={{ animationDelay: `${120 + i * 120}ms` }}>{l}</span></span>)}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "380ms" }}>Websites from ₹999, AI chatbots from ₹1,999, delivered in days. Built and handed over by one engineer, start to finish.</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3 animate-rise" style={{ animationDelay: "480ms" }}>
          <Btn href={WHATSAPP}>Chat on WhatsApp</Btn>
          <Btn href="/pricing" dark={false}>See prices</Btn>
        </div>
        <p className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[15px] text-muted-foreground animate-rise" style={{ animationDelay: "580ms" }}>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-foreground"><span className="inline-flex" aria-hidden>{Array.from({ length: 5 }, (_, i) => <Star key={i} className="h-3.5 w-3.5 fill-flame text-flame" />)}</span>{googleRating.score} on Google</a>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>115+ projects delivered</span>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border sm:block" />
          <span>New Ashok Nagar, Delhi · remote worldwide</span>
        </p>
      </div>
      <div className="relative mx-auto max-w-[1240px] px-4 sm:px-6 animate-rise" style={{ animationDelay: "680ms" }}><DemoStage /></div>
    </section>

    {/* Services: an index, no prices (those live in Pricing) */}
    <section id="services" className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-44">
      <div className="flex flex-col justify-between gap-6 border-b border-border pb-10 md:flex-row md:items-end">
        <Head align="left" title="What I build" text="Seven things, built end to end, each with a real project behind it." />
        <Reveal><Btn href="/services" dark={false}>All services</Btn></Reveal>
      </div>
      <ServiceIndex />
    </section>

    {/* Work */}
    <section id="work" className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-44">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Head align="left" title="Recent work" text="Websites, chatbots, WhatsApp funnels, voice agents and automations, running for real businesses." />
        <Reveal><Btn href="/portfolio" dark={false}>All projects</Btn></Reveal>
      </div>
      <div className="mt-12"><WorkBento /></div>
    </section>

    {/* Pricing */}
    <section id="pricing" className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-44">
      <Head title="Posted prices, no surprises" text="Fixed packages delivered in days. Bigger or custom builds are quoted to your scope." />
      <div className="mt-10 flex justify-center">
        <div role="tablist" aria-label="Price list" className="flex gap-1 rounded-full bg-stone p-1.5">
          {([["web", "Websites"], ["ai", "AI & automation"]] as const).map(([id, label]) => <button key={id} role="tab" aria-selected={plansTab === id} onClick={() => setPlansTab(id)} className={`rounded-full px-5 py-2.5 text-[15px] transition-colors duration-300 ${plansTab === id ? "bg-card shadow-[0_6px_16px_-10px_oklch(0.2_0.02_70/0.5)]" : "text-muted-foreground hover:text-foreground"}`}>{label}</button>)}
        </div>
      </div>
      <div key={plansTab} className="mt-10 animate-stage"><PricingPlans plans={plansTab === "web" ? websitePlans : aiPlans} /></div>
      <p className="mt-8 text-center text-[15px] text-muted-foreground"><a href="/pricing" className="text-accent hover:underline">Full pricing and FAQs</a></p>
    </section>

    {/* Process */}
    <section id="process" className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-44"><ProcessTimeline /></section>

    <Testimonials />

    {/* Estimator */}
    <section id="estimate" className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <Head title="Plan it in a minute" text="Pick what you need, the features and your timeline. The brief goes straight to WhatsApp and I reply personally with a price." />
      <div className="mt-14"><ProjectPlanner compact /></div>
    </section>
  </AgencyLayout>;
}
