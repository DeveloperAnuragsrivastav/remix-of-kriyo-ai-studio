import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, MapPin, Star } from "lucide-react";
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
            <span className="inline-flex items-center gap-1.5"><Star aria-hidden className="h-4 w-4 fill-flame text-flame" />{googleRating.score} on Google</span><span>{page.priceNote ?? "Websites from ₹999"}</span><span>115+ projects</span>
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

    {/* In-depth Editorial Content Sections */}
    {page.editorialBlocks && page.editorialBlocks.length > 0 && (
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-28">
        <div className="space-y-12">
          {page.editorialBlocks.map((b, i) => (
            <Reveal key={b.heading} delay={i * 50} className="rounded-[28px] border border-border/80 bg-card p-8 md:p-12">
              <h2 className="font-display text-[1.8rem] font-normal leading-tight md:text-[2.25rem]">{b.heading}</h2>
              {b.lead && <p className="mt-4 text-xl font-light leading-relaxed text-foreground/90">{b.lead}</p>}
              <div className="mt-6 space-y-4 text-[16px] leading-relaxed text-foreground/75 md:text-[17px]">
                {b.paragraphs.map((p, idx) => <p key={idx}>{p}</p>)}
              </div>
              {b.bullets && b.bullets.length > 0 && (
                <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                  {b.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-3 rounded-2xl bg-stone p-4 text-[15px] leading-snug">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}
              {b.highlight && (
                <div className="mt-8 rounded-2xl border-l-4 border-accent bg-stone/70 p-5 text-[16px] italic text-foreground/85">
                  {b.highlight}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    )}

    {/* Comparison or Benchmark Table */}
    {page.table && (
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-28">
        {page.table.caption && <SectionHead title={page.table.caption} />}
        <div className="mt-8 overflow-x-auto rounded-[24px] border border-border bg-card shadow-sm">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead className="border-b border-border bg-stone font-display text-base">
              <tr>
                {page.table.headers.map((h, i) => (
                  <th key={i} className="px-6 py-4 font-normal text-foreground">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {page.table.rows.map((row, rIdx) => (
                <tr key={rIdx} className="transition-colors hover:bg-stone/40">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className={`px-6 py-4 ${cIdx === 0 ? "font-medium text-foreground" : "text-foreground/75"}`}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )}

    {/* Deliverables / Capabilities Cards */}
    {page.deliverables && page.deliverables.length > 0 && (
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-28">
        <SectionHead title="Deliverables & technical capabilities" />
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {page.deliverables.map((d, i) => (
            <Reveal key={d.title} delay={i * 60} className="flex flex-col justify-between rounded-[24px] bg-stone p-8">
              <div>
                {d.badge && <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-[13px] font-medium text-accent">{d.badge}</span>}
                <h3 className="mt-3 font-display text-xl font-normal leading-snug">{d.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">{d.desc}</p>
              </div>
              {d.points && (
                <ul className="mt-6 space-y-2 border-t border-border/60 pt-4 text-[14px] text-foreground/70">
                  {d.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-center gap-2">
                      <Check className="h-3.5 w-3.5 text-accent" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </div>
      </section>
    )}

    {/* Key Strategic Panels */}
    {page.sections && page.sections.length > 0 && (
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-28">
        <div className="grid gap-4 md:grid-cols-3">
          {page.sections.map((s, i) => <Reveal key={s.heading} delay={i * 80} className="rounded-[24px] bg-stone p-8">
            <h2 className="font-display text-[1.5rem] font-normal leading-snug md:text-[1.75rem]">{s.heading}</h2>
            <p className="mt-4 text-[16px] leading-relaxed text-foreground/75 whitespace-pre-line">{s.text}</p>
          </Reveal>)}
        </div>
      </section>
    )}

    {/* 4-Step Process Workflow */}
    {page.processSteps && page.processSteps.length > 0 && (
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-28">
        <SectionHead title="How the project runs: From brief to handover" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.processSteps.map((p, i) => (
            <Reveal key={p.step} delay={i * 70} className="rounded-[24px] bg-ink p-7 text-ink-foreground">
              <span className="font-mono text-xs uppercase tracking-wider text-saffron">{p.step}</span>
              <h3 className="mt-3 font-display text-xl font-normal text-white">{p.title}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-foreground/70">{p.desc}</p>
            </Reveal>
          ))}
        </div>
      </section>
    )}

    {/* Pricing Tiers */}
    {page.pricingTiers && page.pricingTiers.length > 0 && (
      <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-28">
        <SectionHead title="Transparent scope-based packages" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {page.pricingTiers.map((t, i) => (
            <Reveal key={t.name} delay={i * 80} className={`relative flex flex-col justify-between rounded-[28px] p-8 md:p-10 ${t.isPopular ? "border-2 border-accent bg-card shadow-lg" : "border border-border bg-stone"}`}>
              {t.isPopular && <span className="absolute -top-3.5 left-8 rounded-full bg-accent px-3 py-0.5 text-xs font-semibold text-white">Recommended</span>}
              <div>
                <h3 className="font-display text-2xl font-normal">{t.name}</h3>
                <p className="mt-2 text-sm text-foreground/70">{t.desc}</p>
                <p className="mt-6 font-display text-4xl font-normal tracking-tight">{t.price} <span className="text-sm font-sans font-normal text-muted-foreground">{t.period ?? ""}</span></p>
                <ul className="mt-8 space-y-3">
                  {t.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5 text-[15px] text-foreground/80">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 border-t border-border pt-6">
                <Btn href={WHATSAPP} dark={t.isPopular}>Discuss on WhatsApp</Btn>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    )}

    {/* Services */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-32">
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
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-32">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><SectionHead title="Recent work" /><Reveal><Btn href="/portfolio" dark={false}>Full portfolio</Btn></Reveal></div>
      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
        {work.map(p => <Reveal key={p.slug}><Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block"><TiltImage src={p.image} alt={p.title} /><h3 className="mt-5 font-display text-xl font-normal leading-snug">{p.title}</h3><p className="mt-1 text-[15px] text-muted-foreground">{p.subtitle}</p></Link></Reveal>)}
      </div>
    </section>

    {/* FAQ */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-32">
      <FaqSection faqs={page.faqs} extra={page.related ? <Link to={page.related.to as any} className="mt-5 inline-flex items-center gap-1.5 text-[15px] text-accent underline underline-offset-4">{page.related.label} <ArrowUpRight aria-hidden className="h-4 w-4" /></Link> : undefined} />
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
