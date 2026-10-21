import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { WHATSAPP, EMAIL } from "@/lib/kriyo-data";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";
import { Socials } from "@/components/Kit";
import mark from "@/assets/kriyvo-mark.webp";
import texture from "@/assets/portfolio/koca-restaurant-1000.webp";

const navigation = [
  ["Services", "/services"], ["Pricing", "/pricing"], ["Portfolio", "/portfolio"], ["Case studies", "/case-studies"],
  ["About", "/about"], ["Blog", "/blog"],
] as const;
const footerLinks = [...navigation, ["Project estimator", "/estimate"], ["Deliverables", "/deliverables"], ["Working together", "/working-together"], ["Contact", "/contact"], ["Website designer in Delhi NCR", "/web-developer-delhi-ncr"], ["Website designer in East Delhi", "/website-developer-east-delhi"]] as const;

function Wordmark() {
  return <span className="flex items-center gap-2"><img src={mark} alt="" width={27} height={28} className="h-7 w-auto" /><span className="text-[20px] font-medium tracking-[-0.02em]">Kriyvo AI</span></span>;
}

const offers = ["Websites from ₹999, delivered in 1–5 days", "AI chatbots from ₹1,999 · WhatsApp bots from ₹4,999", "Free first consultation, right here on WhatsApp"];

/** A slim offer bar above the header; rotates through current offers and can be dismissed for the visit. */
export function AnnouncementBar() {
  const [i, setI] = useState(0);
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    try { if (sessionStorage.getItem("kriyvo-bar") === "off") setHidden(true); } catch { /* storage unavailable */ }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI(x => (x + 1) % offers.length), 4500);
    return () => window.clearInterval(id);
  }, []);
  if (hidden) return null;
  return <div className="relative bg-ink text-ink-foreground">
    <div className="mx-auto flex min-h-10 max-w-[1240px] items-center justify-center gap-3 px-12 py-2 text-center text-[14px]">
      <span key={i} aria-live="polite" className="animate-rise text-ink-foreground/85">{offers[i]}</span>
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hidden shrink-0 font-medium text-saffron underline-offset-4 hover:underline sm:inline">Claim it</a>
    </div>
    <button type="button" aria-label="Dismiss announcement" onClick={() => { setHidden(true); try { sessionStorage.setItem("kriyvo-bar", "off"); } catch { /* storage unavailable */ } }} className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full text-ink-foreground/60 transition hover:text-ink-foreground"><X aria-hidden className="h-4 w-4" /></button>
  </div>;
}

export function AgencyHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <header className={`sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${scrolled || open ? "bg-background/92 shadow-[0_1px_0_var(--color-border)] backdrop-blur-md" : "bg-background/0"}`}>
    <nav aria-label="Main navigation" className="mx-auto flex max-w-[1240px] items-center justify-between gap-4 px-4 py-4 sm:px-6">
      <Link to="/" aria-label="Kriyvo AI home" className="shrink-0"><Wordmark /></Link>
      <div className="hidden items-center gap-1 text-[15px] lg:flex">{navigation.map(([label, to]) => <Link key={to} to={to} activeProps={{ className: "bg-stone text-foreground" }} className="rounded-full px-3.5 py-2 text-foreground/70 transition-colors hover:text-foreground">{label}</Link>)}</div>
      <div className="flex items-center gap-2">
        <Link to="/estimate" className="btn btn-light hidden !px-4 !py-2 !text-[15px] md:inline-flex">Get estimate</Link><a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-dark hidden !px-4 !py-2 !text-[15px] sm:inline-flex">Chat on WhatsApp</a>
        <button type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="grid h-11 w-11 place-items-center rounded-full bg-stone lg:hidden">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
      </div>
    </nav>
    {open && <nav aria-label="Mobile navigation" className="mx-auto max-w-[1240px] px-4 pb-6 sm:px-6 lg:hidden">{navigation.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block border-b border-border py-4 text-2xl font-light tracking-[-0.02em]" activeProps={{ className: "text-accent" }}>{label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="block py-4 text-2xl font-light tracking-[-0.02em] text-accent">Contact us</Link></nav>}
  </header>;
}

const PRODUCT_HUNT = "https://www.producthunt.com/products/kriyvo-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-kriyvo-ai";

export function ProductHuntBadge({ className = "" }: { className?: string }) {
  return <a href={PRODUCT_HUNT} target="_blank" rel="noopener noreferrer" className={`inline-block ${className}`}><img alt="Kriyvo AI - Websites & AI automation, built end to end | Product Hunt" width={250} height={54} loading="lazy" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1285887&theme=light&t=1792441879982" /></a>;
}

export function AgencyFooter() {
  return <footer className="mt-20 border-t border-border md:mt-44">
    <div className="mx-auto max-w-[1240px] px-4 pt-16 sm:px-6">
      <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Wordmark />
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-muted-foreground">Websites, AI chatbots, WhatsApp bots and automation, built end to end in Delhi.</p>
          <address className="mt-5 text-[15px] not-italic leading-relaxed text-muted-foreground">{ADDRESS_LINE}<br /><a href={`tel:${BUSINESS.phoneE164}`} className="hover:text-foreground">{BUSINESS.phone}</a><br /><a href={`mailto:${EMAIL}`} className="hover:text-foreground">{EMAIL}</a></address>
          <div className="mt-7 flex flex-wrap gap-3"><a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn btn-dark">Chat on WhatsApp <ArrowUpRight aria-hidden className="h-4 w-4" /></a><ProductHuntBadge className="[&_img]:h-[50px] [&_img]:w-auto" /></div>
          <div className="mt-4"><Socials /></div>
        </div>
        <div className="grid grid-cols-2 gap-6 md:contents">
        <ul className="grid content-start gap-0.5 text-[15px]">{footerLinks.slice(0, 7).map(([label, to]) => <li key={to}><Link to={to} className="inline-block py-1.5 text-muted-foreground transition-colors hover:text-foreground">{label}</Link></li>)}</ul>
        <ul className="grid content-start gap-0.5 text-[15px]">{footerLinks.slice(7).map(([label, to]) => <li key={to}><Link to={to} className="inline-block py-1.5 text-muted-foreground transition-colors hover:text-foreground">{label}</Link></li>)}</ul>
        </div>
      </div>
      <div className="mt-14 flex flex-col gap-3 text-[13px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Kriyvo AI · Freelance website designer, developer & AI automation engineer</p><p className="flex gap-5"><Link to="/privacy-policy" className="py-1.5 hover:text-foreground">Privacy Policy</Link><Link to="/terms" className="py-1.5 hover:text-foreground">Terms of Service</Link></p></div>
    </div>
    <p aria-hidden className="wordmark-fill mt-6 select-none overflow-hidden whitespace-nowrap px-2 text-center font-sans text-[25vw] font-semibold leading-[0.95] tracking-[-0.04em] pb-[0.14em]" style={{ backgroundImage: `linear-gradient(115deg, oklch(0.82 0.15 75 / 0.55), oklch(0.68 0.21 42 / 0.6) 55%, oklch(0.5 0.17 35 / 0.55)), url(${texture})`, filter: "brightness(1.35) saturate(1.1)" }}>kriyvo</p>
  </footer>;
}

/** Feeds the cursor position to whichever .btn is under it, for the soft light on hover. */
function useButtonLight() {
  useEffect(() => {
    const on = (e: PointerEvent) => {
      const b = (e.target as Element | null)?.closest?.(".btn") as HTMLElement | null;
      if (!b) return;
      const r = b.getBoundingClientRect();
      b.style.setProperty("--mx", `${e.clientX - r.left}px`);
      b.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", on, { passive: true });
    return () => document.removeEventListener("pointermove", on);
  }, []);
}

export function AgencyLayout({ children }: { children: ReactNode }) {
  useButtonLight();
  return <div className="min-h-screen overflow-x-clip"><AnnouncementBar /><AgencyHeader /><main>{children}</main><AgencyFooter /></div>;
}

// `label` is kept for call-site compatibility and used as the section's accessible name.
export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return <section aria-label={label} className="mx-auto max-w-[1240px] px-4 pb-14 pt-16 sm:px-6 md:pt-28"><h1 className="max-w-4xl text-[2.6rem] sm:text-6xl lg:text-[4.25rem]"><span className="line-in">{title}</span></h1><p className="mt-7 max-w-2xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "250ms" }}>{description}</p></section>;
}

const starters: [string, string][] = [
  ["A new website", "Hi Kriyvo AI, I'd like a new website for my business."],
  ["An AI chatbot", "Hi Kriyvo AI, I'd like an AI chatbot for my website."],
  ["A WhatsApp bot", "Hi Kriyvo AI, I'd like a WhatsApp bot to handle enquiries."],
  ["Automate a workflow", "Hi Kriyvo AI, I'd like to automate a workflow in my business."],
];
const waText = (t: string) => `https://wa.me/${BUSINESS.phoneE164.slice(1)}?text=${encodeURIComponent(t)}`;

export function ProjectCTA() {
  return <section className="mx-auto mt-12 max-w-[1240px] px-4 sm:px-6 md:mt-24">
    <div className="grid items-center gap-10 rounded-[28px] bg-stone px-6 py-12 md:px-14 md:py-16 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16">
      <div>
        <h2 className="text-4xl md:text-5xl">What are you building next?</h2>
        <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/70">A new website, a smarter workflow or a focused integration. Tell me in one line and I'll reply personally.</p>
        <div className="mt-8 flex flex-wrap gap-3"><Link to="/contact" className="btn btn-dark">Discuss your project <ArrowUpRight aria-hidden className="h-4 w-4" /></Link><Link to="/estimate" className="btn btn-light">Get an estimate</Link></div>
      </div>
      <div className="rounded-[22px] bg-card p-5 shadow-[0_30px_60px_-36px_oklch(0.25_0.03_60/0.45)] md:p-6">
        <div className="flex items-center gap-3 border-b border-border pb-4"><img src={mark} alt="" width={32} height={33} className="h-8 w-auto" /><span><span className="block text-[15px] font-medium">Kriyvo AI</span><span className="block text-[13px] text-muted-foreground">On WhatsApp · {BUSINESS.phone}</span></span></div>
        <p className="mt-5 w-fit max-w-[85%] rounded-2xl rounded-tl-md bg-stone px-4 py-2.5 text-[15px] leading-snug">Hi! What would you like to build?</p>
        <div className="mt-4 flex flex-col items-end gap-2">
          {starters.map(([label, text]) => <a key={label} href={waText(text)} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-2 rounded-2xl rounded-br-md bg-ink px-4 py-2.5 text-[15px] text-ink-foreground transition-transform duration-300 hover:-translate-x-1">{label}<ArrowUpRight aria-hidden className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" /></a>)}
        </div>
      </div>
    </div>
  </section>;
}

