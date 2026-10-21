import { Children, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Instagram, Linkedin } from "lucide-react";
import { BUSINESS } from "@/lib/business";
import { Reveal } from "@/components/Reveal";

/** Shared pieces of the site's visual language, so every page speaks the same way. */

export const Btn = ({ href, children, dark = true, className = "" }: { href: string; children: ReactNode; dark?: boolean; className?: string }) =>
  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className={`btn ${dark ? "btn-dark" : "btn-light"} ${className}`}>{children}</a>;

export function SectionHead({ title, text, align = "left" }: { title: ReactNode; text?: ReactNode; align?: "center" | "left" }) {
  return <Reveal className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
    <h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem]">{title}</h2>
    {text && <p className={`mt-4 text-lg leading-relaxed text-foreground/70 ${align === "center" ? "mx-auto max-w-xl" : "max-w-xl"}`}>{text}</p>}
  </Reveal>;
}

export function BackLink({ to, children }: { to: string; children: ReactNode }) {
  return <Link to={to} className="group inline-flex items-center gap-2 text-[15px] text-muted-foreground transition-colors hover:text-foreground"><ArrowLeft aria-hidden className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />{children}</Link>;
}

/** A row of facts (client, service, stack…) set as a quiet ruled strip. */
export function FactStrip({ facts }: { facts: [string, ReactNode][] }) {
  return <dl className="grid gap-x-8 gap-y-6 border-y border-border py-7 sm:grid-cols-2 lg:grid-cols-4">
    {facts.map(([k, v]) => <div key={k}><dt className="text-[14px] text-muted-foreground">{k}</dt><dd className="mt-1.5 text-[16px] leading-snug">{v}</dd></div>)}
  </dl>;
}

/** Two-column prose block: the heading holds the left column, the text the right. */
export function Split({ title, children }: { title: string; children: ReactNode }) {
  return <section className="grid gap-4 border-t border-border py-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:py-16">
    <Reveal><h2 className="text-[1.75rem] md:text-[2.25rem]">{title}</h2></Reveal>
    <Reveal delay={80}><div className="max-w-2xl text-lg leading-[1.75] text-foreground/80">{children}</div></Reveal>
  </section>;
}

/** Segmented filter control, matching the pricing toggle. */
export function Segmented<T extends string>({ options, value, onChange, label, counts }: { options: T[]; value: T; onChange: (v: T) => void; label: string; counts?: Record<string, number> }) {
  return <div role="group" aria-label={label} className="inline-flex max-w-full flex-wrap gap-1 rounded-[22px] bg-stone p-1.5">
    {options.map(o => <button key={o} type="button" aria-pressed={o === value} onClick={() => onChange(o)}
      className={`rounded-full px-4 py-2.5 text-[15px] transition-colors duration-300 ${o === value ? "bg-card shadow-[0_6px_16px_-10px_oklch(0.2_0.02_70/0.5)]" : "text-muted-foreground hover:text-foreground"}`}>
      {o}{counts && <span className="ml-1.5 text-muted-foreground tabular">{counts[o]}</span>}
    </button>)}
  </div>;
}

/**
 * Cards that sit in a grid on larger screens and become a swipeable, snapping row on phones,
 * with dots underneath showing where you are. Keeps long card stacks from turning into a wall.
 */
export function SwipeRow({ children, grid, at = "lg", label }: { children: ReactNode; grid: string; at?: "md" | "lg"; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const items = Children.toArray(children);
  const md = at === "md";
  const to = (n: number) => { const el = ref.current; const c = el?.children[n] as HTMLElement | undefined; if (el && c) el.scrollTo({ left: c.offsetLeft - el.offsetLeft - (el.clientWidth - c.clientWidth) / 2, behavior: "smooth" }); };
  return <div>
    <div ref={ref} role="region" aria-label={label} onScroll={e => { const el = e.currentTarget; const w = (el.children[0] as HTMLElement | undefined)?.clientWidth ?? 1; setI(Math.min(items.length - 1, Math.round(el.scrollLeft / (w + 16)))); }}
      className={`-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden ${md ? "md:mx-0 md:grid md:overflow-visible md:px-0 md:pb-0" : "lg:mx-0 lg:grid lg:overflow-visible lg:px-0 lg:pb-0"} ${grid}`}>
      {items.map((c, n) => <div key={n} className={`flex w-[86%] max-w-[420px] shrink-0 snap-center ${md ? "md:w-auto md:max-w-none" : "lg:w-auto lg:max-w-none"}`}>{c}</div>)}
    </div>
    <div className={`mt-5 flex justify-center gap-1 ${md ? "md:hidden" : "lg:hidden"}`}>
      {items.map((_, n) => <button key={n} type="button" aria-label={`Show item ${n + 1} of ${items.length}`} onClick={() => to(n)} className="grid h-6 min-w-6 place-items-center rounded-full px-0.5"><span className={`block h-1.5 rounded-full transition-all duration-500 ${n === i ? "w-6 bg-ink" : "w-1.5 bg-foreground/20"}`} /></button>)}
    </div>
  </div>;
}

const socials = [
  { label: "Instagram", handle: "@kriyvo.ai", href: BUSINESS.instagram, icon: Instagram, note: "Builds, demos and behind the scenes" },
  { label: "LinkedIn", handle: "Kriyvo AI", href: BUSINESS.linkedin, icon: Linkedin, note: "Case studies and project updates" },
] as const;

/**
 * Kriyvo's social profiles. "pills" is the compact footer form; "cards" is the larger contact-page form.
 * On hover the pill fills with ink and the arrow lifts, matching the site's buttons.
 */
export function Socials({ variant = "pills", dark = false }: { variant?: "pills" | "cards"; dark?: boolean }) {
  if (variant === "cards") return <ul className="space-y-3">
    {socials.map(s => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={`${s.label}: ${s.handle} (opens in a new tab)`}
      className="group flex h-full items-center gap-4 rounded-[20px] bg-stone px-5 py-4 transition-colors duration-300 hover:bg-ink hover:text-ink-foreground">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-card shadow-[inset_0_0_0_1px_var(--color-border)] transition-colors duration-300 group-hover:bg-ink-foreground/10 group-hover:shadow-none"><s.icon aria-hidden className="h-5 w-5" /></span>
      <span className="min-w-0 flex-1"><span className="block text-[16px] font-medium">{s.label} · <span className="font-normal">{s.handle}</span></span><span className="block text-[14px] text-muted-foreground transition-colors group-hover:text-ink-foreground/65">{s.note}</span></span>
      <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-foreground" />
    </a></li>)}
  </ul>;
  return <ul className="flex flex-wrap gap-2">
    {socials.map(s => <li key={s.label}><a href={s.href} target="_blank" rel="noopener noreferrer me" aria-label={`${s.label}: ${s.handle} (opens in a new tab)`}
      className={`group inline-flex h-11 items-center gap-2.5 rounded-full pl-1.5 pr-4 text-[15px] transition-colors duration-300 ${dark ? "bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground hover:text-ink" : "bg-card shadow-[inset_0_0_0_1px_var(--color-border)] hover:bg-ink hover:text-ink-foreground hover:shadow-none"}`}>
      <span className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-300 ${dark ? "bg-ink-foreground/10 group-hover:bg-ink/10" : "bg-stone group-hover:bg-ink-foreground/15"}`}><s.icon aria-hidden className="h-4 w-4" /></span>
      {s.label}
      <ArrowUpRight aria-hidden className="h-3.5 w-3.5 opacity-50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
    </a></li>)}
  </ul>;
}
