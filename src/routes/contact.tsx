import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { AgencyLayout } from "@/components/AgencyLayout";
import { WHATSAPP, EMAIL } from "@/lib/kriyo-data";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/contact")({ head: () => pageMeta("Contact a Web & AI Developer in Delhi", "Contact Kriyvo AI about a website, AI assistant or business automation project. Share your brief directly over WhatsApp."), component: Contact });

const serviceOptions = ["Custom website", "WordPress / PHP website", "AI chatbot for my website", "WhatsApp bot", "Voice / phone agent", "n8n or Python automation", "SEO or CRM automation", "Not sure yet"];
const field = "w-full rounded-2xl bg-stone px-4 text-[16px] outline-none ring-flame/40 placeholder:text-muted-foreground focus:ring-2";

function Contact() {
  const [name, setName] = useState(""); const [service, setService] = useState(serviceOptions[0]); const [brief, setBrief] = useState("");
  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: BUSINESS.phone, href: WHATSAPP, note: "Fastest. Send a line about your project." },
    { icon: Phone, label: "Call", value: BUSINESS.phone, href: `tel:${BUSINESS.phoneE164}`, note: "For a quick discovery call." },
    { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, note: "For briefs, files and documents." },
  ];
  return <AgencyLayout>
    <section className="relative">
      <div className="relative mx-auto grid max-w-[1240px] gap-12 px-4 pb-8 pt-16 sm:px-6 md:pt-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <h1 className="text-[2.6rem] sm:text-6xl lg:text-[4.25rem]">
            {["Let's talk about", "your next project"].map((l, i) => <span key={l} className="block overflow-hidden pb-[0.06em]"><span className="line-in" style={{ animationDelay: `${100 + i * 120}ms` }}>{l}</span></span>)}
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "350ms" }}>Tell me what you need, what's already in place and your timeline. I reply personally with the next step. The first consultation is free.</p>
          <ul className="mt-10 space-y-3 animate-rise" style={{ animationDelay: "450ms" }}>
            {channels.map(c => <li key={c.label}><a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="group flex items-center gap-4 rounded-[20px] bg-stone px-5 py-4 transition-colors duration-300 hover:bg-[oklch(0.94_0.003_90)]">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-ink-foreground"><c.icon aria-hidden className="h-5 w-5" /></span>
              <span className="min-w-0 flex-1"><span className="block text-[16px] font-medium">{c.label} · <span className="font-normal">{c.value}</span></span><span className="block text-[14px] text-muted-foreground">{c.note}</span></span>
              <ArrowUpRight aria-hidden className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a></li>)}
          </ul>
          <p className="mt-6 flex items-center gap-2 text-[15px] text-muted-foreground"><MapPin aria-hidden className="h-4 w-4 text-accent" />{ADDRESS_LINE} · working remotely with clients everywhere</p>
        </div>

        <form onSubmit={e => { e.preventDefault(); const url = new URL(WHATSAPP); url.searchParams.set("text", `Hi Kriyvo AI, I'm ${name}.\n\nProject type: ${service}\n\n${brief}`); window.open(url.toString(), "_blank", "noopener,noreferrer"); }}
          className="self-start rounded-[28px] bg-card p-7 shadow-[inset_0_0_0_1px_var(--color-border),0_40px_80px_-50px_oklch(0.25_0.03_60/0.4)] animate-rise md:p-10" style={{ animationDelay: "300ms" }}>
          <h2 className="text-[1.75rem] md:text-[2.25rem]">Send a short brief</h2>
          <p className="mt-2 text-[15px] text-muted-foreground">It opens in WhatsApp for you to review and send.</p>
          <div className="mt-8 space-y-5">
            <div><label htmlFor="name" className="mb-2 block text-[15px]">Your name</label><input id="name" value={name} onChange={e => setName(e.target.value)} required placeholder="Your name" autoComplete="name" className={`h-[52px] ${field}`} /></div>
            <div><label htmlFor="service" className="mb-2 block text-[15px]">What do you need?</label><select id="service" value={service} onChange={e => setService(e.target.value)} className={`h-[52px] ${field}`}>{serviceOptions.map(o => <option key={o}>{o}</option>)}</select></div>
            <div><label htmlFor="brief" className="mb-2 block text-[15px]">Project brief</label><textarea id="brief" value={brief} onChange={e => setBrief(e.target.value)} required placeholder="What are you looking to build? Any deadline or budget in mind?" className={`min-h-40 py-3.5 ${field}`} /></div>
            <button type="submit" className="btn btn-dark w-full !py-4">Continue on WhatsApp <ArrowUpRight aria-hidden className="h-4 w-4" /></button>
          </div>
        </form>
      </div>
    </section>
  </AgencyLayout>;
}
