import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, MapPin, Star } from "lucide-react";
import { FaqSection } from "@/components/Faq";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { Btn, SectionHead } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { TiltImage } from "@/components/TiltImage";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";
import { googleRating, projects, WHATSAPP } from "@/lib/kriyo-data";
import type { LocalPage as LocalPageData } from "@/lib/local-pages";
import { services } from "@/lib/services-data";

const FEATURED = ["koca-restaurant-website", "gignaati-whatsapp-bot", "website-ai-chatbot"];

export function LocalPage({ page }: { page: LocalPageData }) {
  const pageServices = page.services.map(slug => services.find(s => s.slug === slug)).filter(s => s !== undefined);
  const work = FEATURED.map(slug => projects.find(p => p.slug === slug)).filter(p => p !== undefined);
  return <AgencyLayout>
    {/* Hero: the claim on the left, the service area as a card on the right */}
    <section className="relative">
      <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div>
          <h1 className="text-[2.4rem] sm:text-6xl lg:text-[3.5rem]"><span className="line-in">{page.title.replace(/\.$/, "")}</span></h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground/75 animate-rise" style={{ animationDelay: "250ms" }}>{page.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "350ms" }}><Btn href={WHATSAPP}>Chat on WhatsApp</Btn><Btn href={`tel:${BUSINESS.phoneE164}`} dark={false}>Call {BUSINESS.phone}</Btn></div>
          <p className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] text-muted-foreground animate-rise" style={{ animationDelay: "450ms" }}>
            <span className="inline-flex items-center gap-1.5"><Star aria-hidden className="h-4 w-4 fill-flame text-flame" />{googleRating.score} on Google</span><span>Websites from ₹999</span><span>115+ projects</span>
          </p>
        </div>
        <div className="rounded-[28px] bg-ink p-8 text-ink-foreground shadow-[0_40px_80px_-40px_oklch(0.2_0.02_60/0.6)] animate-rise md:p-10" style={{ animationDelay: "300ms" }}>
          <p className="flex items-center gap-2 text-[15px] text-ink-foreground/60"><MapPin aria-hidden className="h-4 w-4 text-saffron" />{page.areasHeading}</p>
          <ul className="mt-6 space-y-1">
            {page.areas.map(a => <li key={a.name} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-ink-foreground/10 py-3 last:border-0"><span className="font-display text-xl">{a.name}</span>{a.note && <span className="text-[14px] text-ink-foreground/55">{a.note}</span>}</li>)}
          </ul>
          <p className="mt-6 text-[14px] text-ink-foreground/55">Studio: {ADDRESS_LINE}</p>
        </div>
      </div>
    </section>

    {/* Why, as three stone panels */}
    <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-32">
      <div className="grid gap-4 md:grid-cols-3">
        {page.sections.map((s, i) => <Reveal key={s.heading} delay={i * 80} className="rounded-[24px] bg-stone p-8">
          <h2 className="font-display text-[1.5rem] font-normal leading-snug md:text-[1.75rem]">{s.heading}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-foreground/75">{s.text}</p>
        </Reveal>)}
      </div>
    </section>

    {/* Services */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36">
      <SectionHead title="What I build here" />
      <ul className="mt-10 border-t border-border">
        {pageServices.map(s => <li key={s.slug} className="border-b border-border"><Link to="/services/$slug" params={{ slug: s.slug }} className="group grid items-baseline gap-2 py-7 md:grid-cols-[1fr_1.3fr_auto] md:gap-10">
          <span className="font-display text-[1.75rem] leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-[2.25rem]">{s.title}</span>
          <span className="text-[16px] leading-relaxed text-foreground/70">{s.description}</span>
          <ArrowRight aria-hidden className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" />
        </Link></li>)}
      </ul>
    </section>

    {/* Work */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHead title="Recent work" /><Reveal><Btn href="/portfolio" dark={false}>Full portfolio</Btn></Reveal></div>
      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
        {work.map(p => <Reveal key={p.slug}><Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block"><TiltImage src={p.image} alt={p.title} /><h3 className="mt-5 font-display text-xl font-normal leading-snug">{p.title}</h3><p className="mt-1 text-[15px] text-muted-foreground">{p.subtitle}</p></Link></Reveal>)}
      </div>
    </section>

    {/* FAQ */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36">
      <FaqSection faqs={page.faqs} extra={<Link to={page.related.to} className="mt-5 inline-flex items-center gap-1.5 text-[15px] text-accent underline underline-offset-4">{page.related.label} <ArrowUpRight aria-hidden className="h-4 w-4" /></Link>} />
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
