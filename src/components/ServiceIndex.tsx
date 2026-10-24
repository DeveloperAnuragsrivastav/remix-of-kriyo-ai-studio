import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/kriyo-data";

/**
 * What Kriyvo builds, as a large index. Hovering a service shows the real project built with it,
 * floating at the cursor; on phones the project sits as a thumbnail in the row. No prices here:
 * those live in the pricing section.
 */
const rows: { name: string; line: string; href: string; project?: string }[] = [
  { name: "Custom websites", line: "Designed around your brand, fast on mobile, wired to your enquiries.", href: "/services/freelance-website-developer-noida", project: "koca-restaurant-website" },
  { name: "WordPress & PHP", line: "Sites your team can edit, plus fixes, speed work and migrations.", href: "/services/wordpress-php-development" },
  { name: "AI chatbots", line: "Answers from your own documents, captures the lead, hands over to you.", href: "/services/ai-chatbot-for-website", project: "website-ai-chatbot" },
  { name: "WhatsApp bots", line: "Qualifies ad leads on WhatsApp and passes warm ones to sales.", href: "/portfolio/gignaati-whatsapp-bot", project: "gignaati-whatsapp-bot" },
  { name: "Voice agents", line: "Answers calls, checks the calendar and books the appointment.", href: "/portfolio/ai-phone-calling-agent", project: "ai-phone-calling-agent" },
  { name: "Workflow automation", line: "n8n and Python flows that move leads, tickets and reports on their own.", href: "/services/n8n-workflow-automation", project: "aurum-conventions-outreach" },
  { name: "AI automation", line: "Reads, classifies and routes the work your team does by hand today.", href: "/services/ai-automation", project: "bmrc-patient-feedback-pipeline" },
];

export function ServiceIndex() {
  const wrap = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const find = (slug?: string) => projects.find(p => p.slug === slug);
  const shown = hover !== null ? find(rows[hover]!.project) : undefined;

  return <div ref={wrap} className="relative" onPointerMove={e => { const r = wrap.current!.getBoundingClientRect(); setPos({ x: e.clientX - r.left, y: e.clientY - r.top }); }} onPointerLeave={() => setHover(null)}>
    <ul>
      {rows.map((r, i) => {
        const p = find(r.project);
        return <li key={r.name}>
          <Link to={r.href as any} onPointerEnter={() => setHover(i)} className={`group grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-2 border-b border-border py-7 transition-colors duration-500 md:grid-cols-[1.1fr_1fr_auto] md:py-9 ${hover !== null && hover !== i ? "text-foreground/35" : ""}`}>
            <span className="font-display text-[1.9rem] font-normal leading-tight tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-2 md:text-[3rem]">{r.name}</span>
            <span className="col-span-2 row-start-2 max-w-md text-[16px] leading-relaxed text-muted-foreground md:col-span-1 md:row-start-auto">{r.line}{p && <span className="mt-1 block text-[14px] text-foreground/60">Built for {p.client.replace(/ \(.*\)/, "")}</span>}</span>
            <span className="flex items-center gap-3">
              {p && <img src={p.image} alt="" loading="lazy" className="h-14 w-20 rounded-lg object-cover md:hidden" />}
              <span className="grid h-12 w-12 place-items-center rounded-full bg-stone transition-colors duration-300 group-hover:bg-ink group-hover:text-ink-foreground"><ArrowUpRight aria-hidden className="h-5 w-5" /></span>
            </span>
          </Link>
        </li>;
      })}
    </ul>
    {/* Floating preview of the real project (pointer devices only) */}
    <div aria-hidden className="pointer-events-none absolute left-0 top-0 z-10 hidden w-[340px] md:block" style={{ transform: `translate(${pos.x + 28}px, ${pos.y - 120}px)`, transition: "transform 400ms cubic-bezier(.16,1,.3,1)" }}>
      <div className={`overflow-hidden rounded-2xl bg-ink shadow-[0_40px_80px_-30px_oklch(0.2_0.02_60/0.55)] transition-[opacity,scale] duration-300 ${shown ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}>
        {shown && <><img src={shown.image} alt="" className="aspect-[16/10] w-full object-cover" /><p className="px-4 py-3 text-[14px] text-ink-foreground">{shown.title}</p></>}
      </div>
    </div>
  </div>;
}
