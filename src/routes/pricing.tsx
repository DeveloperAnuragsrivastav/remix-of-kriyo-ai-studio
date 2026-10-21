import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { FaqSection } from "@/components/Faq";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { Segmented, SectionHead } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { PricingPlans } from "@/components/PricingPlans";
import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/page-meta";
import { aiPlans, plans, timeline, websitePlans } from "@/lib/pricing";
import type { Faq } from "@/lib/service-faqs";

const faqs: Faq[] = [
  { q: "What is included in the price?", a: "Everything listed on the plan: design, mobile layout, on-page SEO, forms and the integrations shown. The business website and e-commerce plans also include one month of free maintenance." },
  { q: "What extra costs can there be on AI and automation plans?", a: "AI model usage, hosting and third-party tools are billed by those providers. WhatsApp chatbots also carry WhatsApp API setup, provider fees and Meta messaging charges where applicable. These are explained before you order." },
  { q: "Are domain and hosting included?", a: "No. Domain and hosting are bought in your name so you own them. I can recommend a provider and set everything up for you." },
  { q: "What do I need to provide?", a: "Your logo, text, photos and product details. If some content isn't ready, we can agree how to fill the gaps before the build starts, so the delivery time holds." },
  { q: "What if I need something the plans don't cover?", a: "Custom React or PHP websites, web apps and larger AI systems are quoted to your scope. The price is fixed in a written proposal, with deliverables, milestones and exclusions, before work begins." },
  { q: "How do I pay?", a: "Payment terms and milestones are agreed on WhatsApp before the build starts, and written into the order." },
];

export const Route = createFileRoute("/pricing")({
  head: () => {
    const url = `${BUSINESS.url}/pricing`;
    const schema = { "@context": "https://schema.org", "@graph": [
      { "@type": "OfferCatalog", name: "Website, AI and automation packages", url, itemListElement: plans.map(p => ({ "@type": "Offer", name: p.name, price: p.price.replace(/[^\d]/g, ""), priceCurrency: "INR", description: p.features.join(", "), seller: { "@id": `${BUSINESS.url}/#business` } })) },
      { "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ] };
    return { ...pageMeta("Pricing: Websites from ₹999, AI Chatbots from ₹1,999", "Fixed prices from Kriyvo AI: websites from ₹999 per page, AI chatbots from ₹1,999, WhatsApp AI bots ₹4,999 and n8n automation from ₹3,999."), scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }] };
  },
  component: Pricing,
});

const included = ["Mobile-first design", "On-page SEO setup", "WhatsApp & enquiry forms", "Source files & logins handed over", "Written scope before work starts", "Review points during the build"];

function Pricing() {
  const [tab, setTab] = useState<"Websites" | "AI & automation">("Websites");
  return <AgencyLayout>
    <section className="relative">
      <div className="relative mx-auto max-w-[1240px] px-4 pb-12 pt-16 text-center sm:px-6 md:pt-24">
        <h1 className="mx-auto max-w-3xl text-[2.6rem] sm:text-6xl lg:text-[4.25rem]"><span className="line-in">Posted prices, no surprises</span></h1>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "250ms" }}>Pick a package, message on WhatsApp and get it delivered in days, not months. The price on the card is the price you pay for the build.</p>
        <div className="mt-10 flex justify-center animate-rise" style={{ animationDelay: "350ms" }}><Segmented label="Price list" options={["Websites", "AI & automation"]} value={tab} onChange={setTab} /></div>
      </div>
    </section>
    <section id="ai" aria-labelledby="plans-heading" className="mx-auto max-w-[1240px] px-4 sm:px-6"><h2 id="plans-heading" className="sr-only">{tab} packages</h2><div key={tab} className="animate-stage"><PricingPlans plans={tab === "Websites" ? websitePlans : aiPlans} /></div></section>

    {/* What every build includes */}
    <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-10 rounded-[28px] bg-ink p-8 text-ink-foreground md:p-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div><h2 className="text-[1.9rem] md:text-[2.25rem]">Included in every build</h2><p className="mt-4 max-w-md text-lg leading-relaxed text-ink-foreground/70">Whichever package you pick, these come as standard.</p></div>
        <ul className="grid gap-3 sm:grid-cols-2">{included.map(t => <li key={t} className="flex items-center gap-3 rounded-2xl bg-ink-foreground/[0.07] px-5 py-4 text-[16px]"><Check aria-hidden className="h-4 w-4 shrink-0 text-saffron" strokeWidth={2.5} />{t}</li>)}</ul>
      </div>
    </section>

    <section id="process" className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-44"><ProcessTimeline /></section>

    <section className="mx-auto mt-28 max-w-[1240px] px-4 sm:px-6">
      <div className="flex flex-col justify-between gap-8 rounded-[28px] bg-stone p-8 md:flex-row md:items-center md:p-12">
        <div><h2 className="text-[1.9rem] md:text-[2.25rem]">Need something custom?</h2><p className="mt-3 max-w-2xl text-lg leading-relaxed text-foreground/70">Custom React or PHP websites, web apps and larger AI systems are quoted to your scope, with deliverables, milestones and exclusions written down first.</p></div>
        <Link to="/estimate" className="btn btn-dark shrink-0">Estimate a custom project <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>
      </div>
    </section>

    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36"><FaqSection title="Pricing questions" text="Straight answers on what the price covers, what it doesn't, and how paying works." faqs={faqs} /></section>
    <ProjectCTA />
  </AgencyLayout>;
}
