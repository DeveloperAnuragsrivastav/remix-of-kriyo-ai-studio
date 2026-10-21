import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { FaqSection } from "@/components/Faq";
import { BackLink, Btn, Split } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { TiltImage } from "@/components/TiltImage";
import { WHATSAPP } from "@/lib/kriyo-data";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { serviceDetails } from "@/lib/service-details";
import { services } from "@/lib/services-data";
import { pageMeta } from "@/lib/page-meta";
import { serviceFaqs } from "@/lib/service-faqs";
import { BUSINESS } from "@/lib/business";
export const Route = createFileRoute("/services/$slug")({ loader: ({ params }) => { const service = services.find(s => s.slug === params.slug); if (!service) throw notFound(); return service; }, head: ({ loaderData }) => {
    const base = pageMeta(loaderData?.metaTitle ?? loaderData?.title ?? "Service", loaderData?.metaDescription ?? loaderData?.description ?? "Freelance digital services from Kriyvo AI.");
    if (!loaderData) return base;
    const url = `${BUSINESS.url}/services/${loaderData.slug}`;
    const faqs = serviceFaqs[loaderData.slug] ?? [];
    const schema = { "@context": "https://schema.org", "@graph": [
      { "@type": "Service", name: loaderData.title, description: loaderData.description, serviceType: loaderData.category, url, provider: { "@id": `${BUSINESS.url}/#business` }, areaServed: ["New Delhi", "Delhi NCR", "India"], offers: /website|wordpress/.test(loaderData.slug) ? { "@type": "Offer", priceCurrency: "INR", price: "999", description: "Website packages from ₹999 per page" } : { "@type": "Offer", priceCurrency: "INR", price: /chatbot/.test(loaderData.slug) ? "1999" : /llm/.test(loaderData.slug) ? "9999" : "3999", description: /chatbot/.test(loaderData.slug) ? "AI chatbots from ₹1,999" : /llm/.test(loaderData.slug) ? "Custom AI automation from ₹9,999" : "Automation from ₹3,999" } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BUSINESS.url}/` }, { "@type": "ListItem", position: 2, name: "Services", item: `${BUSINESS.url}/services` }, { "@type": "ListItem", position: 3, name: loaderData.title, item: url }] },
      ...(faqs.length ? [{ "@type": "FAQPage", mainEntity: faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }] : []),
    ] };
    return { ...base, scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }] };
  }, component: Service });
function Service() {
  const service = Route.useLoaderData();
  const faqs = serviceFaqs[service.slug] ?? [];
  return <AgencyLayout>
    <article className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 md:pt-16">
      <BackLink to="/services">All services</BackLink>
      <h1 className="mt-10 max-w-4xl text-[2.4rem] sm:text-6xl lg:text-[3.5rem]"><span className="line-in">{service.heading ?? service.title}</span></h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "200ms" }}>{service.description}</p>
      <div className="mt-8 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "300ms" }}><Btn href={WHATSAPP}>Chat on WhatsApp</Btn><Btn href="/pricing" dark={false}>See prices</Btn></div>
      {service.image && <div className="mt-12 animate-rise" style={{ animationDelay: "400ms" }}><TiltImage src={service.image} alt={service.title} eager /></div>}

      {/* Fit + what I build: a stone panel beside a checklist */}
      <section className="mt-16 grid gap-6 md:grid-cols-2">
        <Reveal className="rounded-[24px] bg-stone p-8 md:p-10"><h2 className="text-[1.75rem] md:text-[2.25rem]">Is this the right fit?</h2><p className="mt-4 text-lg leading-relaxed text-foreground/80">{service.need}</p><p className="mt-6 rounded-2xl bg-card px-5 py-4 text-[16px] leading-relaxed">{service.boundary}</p></Reveal>
        <Reveal delay={80} className="rounded-[24px] bg-ink p-8 text-ink-foreground md:p-10"><h2 className="text-[1.75rem] md:text-[2.25rem]">What I can build</h2><ul className="mt-6 space-y-4">{service.offerings.map(item => <li key={item} className="flex gap-3 text-lg"><Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-saffron" strokeWidth={2.5} />{item}</li>)}</ul></Reveal>
      </section>

      <div className="mt-12">{serviceDetails[service.slug]?.map(section => <Split key={section.heading} title={section.heading}><p>{section.text}</p></Split>)}</div>

      {faqs.length > 0 && <div className="border-t border-border py-16 md:py-20"><FaqSection faqs={faqs} text="What clients usually ask before we start." /></div>}

      <p className="border-t border-border pt-8 text-[15px] leading-relaxed text-muted-foreground">Based in New Ashok Nagar, East Delhi, working with businesses across <Link to="/web-developer-delhi-ncr" className="text-accent underline underline-offset-4">Noida, Gurgaon and Delhi NCR</Link>, <Link to="/website-developer-east-delhi" className="text-accent underline underline-offset-4">East Delhi</Link>, the rest of India and remotely worldwide. <Link to="/working-together" className="text-accent underline underline-offset-4">How we work together</Link> · <Link to="/case-studies" className="text-accent underline underline-offset-4">Case studies</Link></p>
    </article>
    <ProjectCTA />
  </AgencyLayout>;
}
