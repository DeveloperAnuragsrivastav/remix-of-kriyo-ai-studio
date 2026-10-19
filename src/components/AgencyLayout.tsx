import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WHATSAPP } from "@/lib/kriyo-data";
import mark from "@/assets/kriyvo-mark.png";

const navigation = [
  ["Services", "/services"], ["Deliverables", "/deliverables"],
  ["Case studies", "/case-studies"], ["Working together", "/working-together"], ["Blog", "/blog"],
] as const;

export function AgencyHeader() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-xl">
    <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
      <Link to="/" aria-label="Kriyvo AI home" className="flex shrink-0 items-center gap-2"><img src={mark} alt="" className="h-7 w-auto" /><span className="font-display text-xl font-semibold">kriyvo<span className="text-accent">.ai</span></span></Link>
      <div className="hidden items-center gap-5 text-sm lg:flex">{navigation.map(([label, to]) => <Link key={to} to={to} activeProps={{ className: "text-accent" }} className="transition hover:text-accent">{label}</Link>)}</div>
      <div className="flex items-center gap-2"><Button asChild variant="outline" className="hidden sm:inline-flex"><Link to="/contact">Let's talk <ArrowUpRight /></Link></Button><Button variant="outline" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)} className="lg:hidden">{open ? <X /> : <Menu />}</Button></div>
    </nav>
    {open && <nav aria-label="Mobile navigation" className="border-t border-border bg-background px-6 py-4 lg:hidden">{navigation.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="block py-3 text-sm" activeProps={{ className: "text-accent" }}>{label}</Link>)}<Link to="/contact" onClick={() => setOpen(false)} className="block py-3 text-sm text-accent">Contact us</Link></nav>}
  </header>;
}

export function AgencyFooter() {
  return <footer className="border-t border-border bg-secondary/40">
    <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-[1.5fr_1fr_1fr]">
      <div><Link to="/" className="font-display text-3xl">kriyvo<span className="text-accent">.ai</span></Link><p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">Freelance web development, AI assistants and business automation.</p></div>
      <div><p className="mb-4 text-xs font-semibold text-muted-foreground">EXPLORE</p><div className="grid gap-3 text-sm">{navigation.map(([label, to]) => <Link key={to} to={to} className="hover:text-accent">{label}</Link>)}</div></div>
      <div><p className="mb-4 text-xs font-semibold text-muted-foreground">START A CONVERSATION</p><Link to="/contact" className="text-sm hover:text-accent">Discuss your project ↗</Link><a href={WHATSAPP} target="_blank" rel="noreferrer" className="mt-3 block text-sm hover:text-accent">WhatsApp ↗</a></div>
    </div><div className="mx-auto max-w-6xl border-t border-border px-6 py-6 text-xs text-muted-foreground">© 2026 Kriyvo AI · Freelance digital project partner</div>
  </footer>;
}

export function AgencyLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen"><AgencyHeader /><main>{children}</main><AgencyFooter /></div>;
}

export function PageIntro({ label, title, description }: { label: string; title: string; description: string }) {
  return <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 md:pt-24"><p className="text-sm font-medium text-accent">{label}</p><h1 className="mt-5 max-w-4xl text-4xl leading-tight md:text-6xl">{title}</h1><p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p></section>;
}

export function ProjectCTA() {
  return <section className="mt-16 bg-ink text-ink-foreground"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center"><div><h2 className="text-3xl md:text-4xl">What are you working on next?</h2><p className="mt-3 text-ink-foreground/70">A new website, a smarter workflow, or a focused integration.</p></div><Button asChild variant="secondary" size="lg"><Link to="/contact">Discuss your project <ArrowUpRight /></Link></Button></div></section>;
}