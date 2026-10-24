import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, MapPin, ShieldCheck, Star, UserCheck, Zap } from "lucide-react";
import { FaqSection } from "@/components/Faq";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { Btn, SectionHead, SwipeRow } from "@/components/Kit";
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

  return (
    <AgencyLayout>
      {/* 1. HERO SECTION */}
      <section className="relative">
        <div className="relative mx-auto grid max-w-[1240px] items-center gap-12 px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1.18fr_1fr] lg:gap-16">
          <div>
            {/* H1 Heading in Kriyvo's Signature Display Serif */}
            <h1 className="text-[2.5rem] font-light leading-[1.08] tracking-[-0.025em] text-foreground sm:text-5xl md:text-[3.5rem]">
              <span className="line-in">{page.title.replace(/\.$/, "")}</span>
            </h1>

            {/* Intro Prose */}
            <p
              className="mt-6 max-w-xl text-lg leading-[1.65] text-foreground/80 sm:text-[19px] animate-rise"
              style={{ animationDelay: "150ms" }}
            >
              {page.intro}
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "250ms" }}>
              <Btn href={WHATSAPP}>Chat on WhatsApp</Btn>
              <Btn href={`tel:${BUSINESS.phoneE164}`} dark={false}>Call {BUSINESS.phone}</Btn>
            </div>

            {/* Quiet Proof Line */}
            <div
              className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-border/70 pt-6 text-[14.5px] text-muted-foreground animate-rise"
              style={{ animationDelay: "350ms" }}
            >
              <span className="inline-flex items-center gap-1.5 font-medium text-foreground">
                <Star aria-hidden className="h-4 w-4 fill-flame text-flame" />
                {googleRating.score} on Google
              </span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border sm:block" />
              <span>{page.priceNote ?? "Websites from ₹999"}</span>
              <span aria-hidden className="hidden h-1 w-1 rounded-full bg-border sm:block" />
              <span className="text-foreground/80 font-medium">115+ delivered</span>
            </div>
          </div>

          {/* Right Column: Areas Served Ink Panel (matching DESIGN.md panel-ink) */}
          <div
            className="rounded-[24px] bg-ink p-7 text-ink-foreground animate-rise md:p-8"
            style={{ animationDelay: "200ms" }}
          >
            <div className="flex items-center justify-between border-b border-ink-foreground/10 pb-4">
              <p className="flex items-center gap-2 text-[14px] text-ink-foreground/70">
                <MapPin aria-hidden className="h-4 w-4 text-saffron" />
                {page.areasHeading}
              </p>
              <span className="h-2 w-2 rounded-full bg-saffron" />
            </div>

            <ul className="mt-5 divide-y divide-ink-foreground/[0.08]">
              {page.areas.map(a => (
                <li
                  key={a.name}
                  className="group flex flex-wrap items-baseline justify-between gap-x-4 py-3 transition-colors hover:text-white"
                >
                  <span className="font-display text-[1.2rem] text-ink-foreground/95 transition-transform duration-300 group-hover:translate-x-1">
                    {a.name}
                  </span>
                  {a.note && (
                    <span className="text-[13px] text-ink-foreground/50">
                      {a.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-ink-foreground/10 pt-4 flex flex-wrap items-center justify-between gap-2 text-[13px] text-ink-foreground/55">
              <span>Studio: {ADDRESS_LINE}</span>
              <span className="text-saffron">Direct 1-on-1 collaboration</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. IN-DEPTH EDITORIAL CONTENT DOSSIER */}
      {page.editorialBlocks && page.editorialBlocks.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
          <div className="space-y-16">
            {page.editorialBlocks.map((b, i) => (
              <Reveal
                key={b.heading}
                delay={i * 60}
                className="rounded-[28px] bg-stone p-8 sm:p-12 md:p-14 shadow-[inset_0_0_0_1px_var(--color-border)]"
              >
                {/* Editorial Heading */}
                <h2 className="font-display text-[2rem] font-light leading-[1.1] tracking-[-0.025em] text-foreground sm:text-[2.5rem] md:text-[2.85rem]">
                  {b.heading}
                </h2>

                {/* Editorial Lead Paragraph */}
                {b.lead && (
                  <p className="mt-5 text-xl font-light leading-relaxed text-foreground/90 sm:text-[1.3rem]">
                    {b.lead}
                  </p>
                )}

                {/* Body Paragraphs */}
                <div className="mt-7 max-w-[70ch] space-y-4 text-[17px] leading-[1.7] text-foreground/80 md:text-[18px]">
                  {b.paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>

                {/* Key Technical Takeaways */}
                {b.bullets && b.bullets.length > 0 && (
                  <div className="mt-9 border-t border-border/70 pt-7">
                    <p className="mb-4 text-sm font-medium text-muted-foreground">
                      Key technical takeaways
                    </p>
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {b.bullets.map((bullet, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 rounded-2xl bg-card p-4.5 text-[15px] leading-relaxed text-foreground/85 shadow-[inset_0_0_0_1px_var(--color-border)] transition-shadow hover:shadow-2xs"
                        >
                          <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-stone text-accent">
                            <Check className="h-3 w-3" strokeWidth={2.5} />
                          </div>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Editorial Quote Statement */}
                {b.highlight && (
                  <blockquote className="mt-9 rounded-2xl bg-card p-6 md:p-8 font-display text-xl font-light italic leading-snug text-foreground/95 sm:text-2xl shadow-[inset_0_0_0_1px_var(--color-border)] border-l-4 border-l-accent">
                    “{b.highlight}”
                  </blockquote>
                )}
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* 3. LUXURY BENCHMARK & COMPARISON TABLE */}
      {page.table && (
        <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
          {page.table.caption && (
            <div className="mb-8">
              <SectionHead
                title={page.table.caption}
                text="Direct side-by-side technical evaluation across performance, total cost of ownership, and control."
              />
            </div>
          )}

          <div className="overflow-hidden rounded-[24px] bg-card shadow-[inset_0_0_0_1px_var(--color-border)]">
            <div className="overflow-x-auto [scrollbar-width:thin]">
              <table className="w-full min-w-[700px] border-collapse text-left text-[15px]">
                <thead>
                  <tr className="border-b border-border bg-stone/70 text-[14px]">
                    {page.table.headers.map((h, i) => {
                      const isHero = i === 1;
                      return (
                        <th
                          key={i}
                          className={`px-6 py-4.5 font-normal ${
                            isHero
                              ? "bg-stone font-medium text-foreground"
                              : "text-muted-foreground"
                          }`}
                        >
                          {isHero ? (
                            <span className="font-display text-[16px] text-foreground font-medium">
                              {h}
                            </span>
                          ) : (
                            h
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {page.table.rows.map((row, rIdx) => (
                    <tr key={rIdx} className="transition-colors hover:bg-stone/30">
                      {row.map((cell, cIdx) => {
                        const isHero = cIdx === 1;
                        return (
                          <td
                            key={cIdx}
                            className={`px-6 py-4 leading-relaxed ${
                              cIdx === 0
                                ? "font-display text-[15px] font-medium text-foreground"
                                : isHero
                                ? "bg-stone/30 font-medium text-foreground text-[15px]"
                                : "text-[14.5px] text-foreground/75"
                            }`}
                          >
                            {cell}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border bg-stone/40 px-6 py-3.5 text-xs text-muted-foreground">
              <span>Evaluated based on 2026 production deployment benchmarks</span>
              <span>Direct engineering handover · 100% IP transfer</span>
            </div>
          </div>
        </section>
      )}

      {/* 4. DELIVERABLES & TECHNICAL CAPABILITIES */}
      {page.deliverables && page.deliverables.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
          <SectionHead
            title="Deliverables & technical capabilities"
            text="Every project comes with clear milestones, clean architecture, and 100% intellectual property handover."
          />
          <div className="mt-12">
            <SwipeRow label="Deliverables and capabilities" at="lg" grid="lg:grid-cols-3 lg:gap-6">
              {page.deliverables.map((d, i) => (
                <div
                  key={d.title}
                  className="group relative flex h-full flex-col justify-between rounded-[24px] bg-stone p-7 transition-all duration-300 hover:bg-card hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_oklch(0.2_0.02_70/0.14)] shadow-[inset_0_0_0_1px_var(--color-border)] md:p-8"
                >
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      {d.badge ? (
                        <span className="inline-block rounded-full bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
                          {d.badge}
                        </span>
                      ) : (
                        <span />
                      )}
                      <span className="font-display text-[14px] text-muted-foreground/60 tabular">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="font-display text-[1.4rem] font-normal leading-snug text-foreground">
                      {d.title}
                    </h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-foreground/75">
                      {d.desc}
                    </p>
                  </div>

                  {d.points && d.points.length > 0 && (
                    <ul className="mt-7 space-y-2.5 border-t border-border/70 pt-5">
                      {d.points.map((pt, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5 text-[14px] leading-relaxed text-foreground/80">
                          <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-card shadow-[inset_0_0_0_1px_var(--color-border)]">
                            <Check className="h-2.5 w-2.5 text-accent" strokeWidth={3} />
                          </div>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </SwipeRow>
          </div>
        </section>
      )}

      {/* 5. CORE STRATEGIC PERSPECTIVES */}
      {page.sections && page.sections.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
          <SectionHead
            title="Engineering philosophy & architecture"
            text="Principled technical choices that guarantee longevity, sub-second speed, and zero platform lock-in."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {page.sections.map((s, i) => {
              const h = s.heading.toLowerCase();
              let icon = <UserCheck className="h-5 w-5 text-accent" />;
              let tag = "Direct Model";
              let signal = "Direct 1-on-1 engineer access";

              if (h.includes("builder") || h.includes("freelance") || h.includes("direct") || h.includes("agency") || h.includes("rep")) {
                icon = <UserCheck className="h-5 w-5 text-accent" />;
                tag = "Direct Collaboration";
                signal = "No account managers or agency bloat";
              } else if (h.includes("price") || h.includes("pricing") || h.includes("cost") || h.includes("scope") || h.includes("proposal") || h.includes("quote") || h.includes("admin")) {
                icon = <ShieldCheck className="h-5 w-5 text-accent" />;
                tag = "Scope & Pricing";
                signal = "Fixed milestone proposals, zero retainers";
              } else if (h.includes("mobile") || h.includes("speed") || h.includes("fast") || h.includes("seo") || h.includes("code") || h.includes("php") || h.includes("builder") || h.includes("plugin")) {
                icon = <Zap className="h-5 w-5 text-flame" />;
                tag = "Performance";
                signal = "Sub-second 4G speed & schema SEO";
              } else {
                if (i === 1) {
                  icon = <ShieldCheck className="h-5 w-5 text-accent" />;
                  tag = "Scope Certainty";
                  signal = "Written scope & clear milestones";
                } else if (i === 2) {
                  icon = <Zap className="h-5 w-5 text-flame" />;
                  tag = "Architecture";
                  signal = "Clean code & modern standards";
                }
              }

              return (
                <Reveal
                  key={s.heading}
                  delay={i * 80}
                  className="group relative flex h-full flex-col justify-between rounded-[24px] bg-stone p-8 transition-all duration-300 hover:bg-card hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_oklch(0.2_0.02_70/0.14)] shadow-[inset_0_0_0_1px_var(--color-border)] md:p-9"
                >
                  <div>
                    {/* Top Header: Graphic Icon Badge + Category Tag + Number */}
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-[inset_0_0_0_1px_var(--color-border)] transition-transform duration-300 group-hover:scale-105 group-hover:bg-stone">
                        {icon}
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className="rounded-full bg-card px-2.5 py-1 text-[12px] font-medium text-muted-foreground shadow-[inset_0_0_0_1px_var(--color-border)]">
                          {tag}
                        </span>
                        <span className="font-display text-[15px] text-muted-foreground/70 tabular">
                          0{i + 1}
                        </span>
                      </div>
                    </div>

                    {/* Card Heading */}
                    <h3 className="mt-6 font-display text-[1.45rem] font-normal leading-[1.25] tracking-[-0.015em] text-foreground">
                      {s.heading}
                    </h3>

                    {/* Card Body Text */}
                    <p className="mt-3.5 text-[15px] leading-[1.7] text-foreground/75 whitespace-pre-line">
                      {s.text}
                    </p>
                  </div>

                  {/* Bottom Tangible Proof Strip */}
                  <div className="mt-8 flex items-center justify-between border-t border-border/70 pt-5 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1.5 font-medium text-foreground/80">
                      <Check className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                      {signal}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>
      )}

      {/* 6. CONNECTED 4-STEP PROCESS WORKFLOW (Matching ProcessTimeline week card) */}
      {page.processSteps && page.processSteps.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
          <SectionHead
            title="How the project runs"
            text="A structured, predictable 4-step delivery pipeline with zero agency bureaucracy."
          />
          <div className="mt-10 rounded-[28px] bg-ink p-8 text-ink-foreground md:p-10">
            <p className="text-[14px] text-ink-foreground/60">Milestone sequence from first brief to handover</p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {page.processSteps.map((p, i) => {
                const isFinal = i === page.processSteps!.length - 1;
                return (
                  <div
                    key={p.step}
                    className={`rounded-2xl p-5 flex flex-col justify-between ${
                      isFinal ? "bg-saffron text-ink" : "bg-ink-foreground/[0.08]"
                    }`}
                  >
                    <div>
                      <p className={`text-[12px] ${isFinal ? "text-ink/70" : "text-ink-foreground/55"}`}>
                        Step {p.step}
                      </p>
                      <h3 className="mt-2 font-display text-[1.3rem] font-normal leading-snug">
                        {p.title}
                      </h3>
                      <p className={`mt-2 text-[14px] leading-relaxed ${
                        isFinal ? "text-ink/80" : "text-ink-foreground/70"
                      }`}>
                        {p.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 text-[14px] text-ink-foreground/55">Direct collaboration over WhatsApp and phone. Code and DNS transfer on approval.</p>
          </div>
        </section>
      )}

      {/* 7. GOLD-STANDARD PRICING TIERS (Matching PricingPlans.tsx) */}
      {page.pricingTiers && page.pricingTiers.length > 0 && (
        <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
          <SectionHead
            title="Transparent scope-based packages"
            text="Fixed proposals with clear milestones. No hidden hourly billing or surprise retainer invoices."
          />
          <div className="mt-12">
            <SwipeRow label="Pricing packages" at="lg" grid="lg:grid-cols-3 lg:gap-6 items-stretch">
              {page.pricingTiers.map((t) => {
                const pop = !!t.isPopular;
                return (
                  <div
                    key={t.name}
                    className={`relative flex w-full flex-col justify-between rounded-[28px] p-7 md:p-9 ${
                      pop ? "bg-ink text-ink-foreground" : "bg-stone"
                    }`}
                  >
                    <div>
                      <h3 className="flex items-center justify-between gap-3 font-display text-2xl font-normal">
                        {t.name}
                        {pop && (
                          <span className="rounded-full bg-saffron px-3 py-1 font-sans text-[13px] font-medium text-ink">
                            Popular
                          </span>
                        )}
                      </h3>

                      <p
                        className={`mt-2 text-sm leading-relaxed ${
                          pop ? "text-ink-foreground/70" : "text-foreground/70"
                        }`}
                      >
                        {t.desc}
                      </p>

                      <div className="mt-6 flex flex-wrap items-baseline gap-2">
                        <b className="text-[3.25rem] font-light leading-none tracking-[-0.04em] tabular md:text-6xl">
                          {t.price}
                        </b>
                        {t.period && (
                          <span
                            className={`font-sans text-sm ${
                              pop ? "text-ink-foreground/60" : "text-muted-foreground"
                            }`}
                          >
                            {t.period}
                          </span>
                        )}
                      </div>

                      <ul className="mt-7 space-y-3">
                        {t.features.map((feat, fIdx) => (
                          <li key={fIdx} className="flex gap-3 text-[15px] leading-relaxed">
                            <Check
                              className={`mt-0.5 h-4 w-4 shrink-0 ${pop ? "text-saffron" : "text-accent"}`}
                              strokeWidth={2.25}
                            />
                            <span className={pop ? "text-ink-foreground/90" : "text-foreground/80"}>
                              {feat}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-8">
                      <a
                        href={WHATSAPP}
                        target="_blank"
                        rel="noreferrer"
                        className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-medium transition ${
                          pop
                            ? "bg-ink-foreground text-ink hover:bg-ink-foreground/85"
                            : "bg-ink text-ink-foreground hover:bg-ink/85"
                        }`}
                      >
                        Discuss on WhatsApp <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <p
                        className={`mt-3 text-center text-sm ${
                          pop ? "text-ink-foreground/60" : "text-muted-foreground"
                        }`}
                      >
                        Direct engineering response within 2 hours
                      </p>
                    </div>
                  </div>
                );
              })}
            </SwipeRow>
          </div>
        </section>
      )}

      {/* 8. SERVICES PORTFOLIO LINKS */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
        <SectionHead
          title="What I build here"
          text="Tailored digital solutions engineered for speed, conversion, and zero ongoing maintenance overhead."
        />
        <ul className="mt-10 border-t border-border">
          {pageServices.map((s, idx) => (
            <li key={s.slug} className="border-b border-border">
              <Link
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="group grid items-baseline gap-2 py-7 transition-colors md:grid-cols-[auto_1fr_1.3fr_auto] md:gap-10 hover:bg-stone/30 -mx-3 px-3 rounded-2xl"
              >
                <span className="hidden text-xs text-muted-foreground md:block tabular">
                  0{idx + 1}
                </span>
                <span className="font-display text-[1.75rem] leading-tight transition-transform duration-500 group-hover:translate-x-2 md:text-[2.25rem]">
                  {s.title}
                </span>
                <span className="text-[16px] leading-relaxed text-foreground/70">
                  {s.description}
                </span>
                <ArrowRight
                  aria-hidden
                  className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* 9. RECENT WORK BENTO SHOWCASE */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            title="Recent work"
            text="Production web applications, AI phone calling agents, and custom WhatsApp bots built for real businesses."
          />
          <Reveal>
            <Btn href="/portfolio" dark={false}>Full portfolio</Btn>
          </Reveal>
        </div>
        <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {work.map(p => (
            <Reveal key={p.slug}>
              <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block">
                <TiltImage src={p.image} alt={p.title} />
                <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.category}</span>
                  <span className="flex items-center gap-1 text-accent font-sans">View case study <ArrowUpRight className="h-3 w-3" /></span>
                </div>
                <h3 className="mt-2 font-display text-xl font-normal leading-snug group-hover:text-accent transition-colors">
                  {p.title}
                </h3>
                <p className="mt-1 text-[15px] text-muted-foreground">{p.subtitle}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 10. FAQ SECTION */}
      <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6 md:mt-36">
        <FaqSection
          faqs={page.faqs}
          extra={
            page.related ? (
              <Link
                to={page.related.to as any}
                className="mt-5 inline-flex items-center gap-1.5 text-[15px] text-accent underline underline-offset-4"
              >
                {page.related.label} <ArrowUpRight aria-hidden className="h-4 w-4" />
              </Link>
            ) : undefined
          }
        />
      </section>

      <ProjectCTA />
    </AgencyLayout>
  );
}


