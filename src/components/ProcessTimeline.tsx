import { useEffect, useRef, useState } from "react";
import { SectionHead } from "@/components/Kit";
import { timeline } from "@/lib/pricing";

/** A typical business-website week, built from the package delivery times. */
const week: [string, string][] = [["Day 1", "Call & quote"], ["Day 2", "Proposal approved"], ["Days 3–6", "Build & revisions"], ["Day 7", "Launch"]];

/**
 * From first call to launch: a summary week on the left, and on the right a timeline whose line fills
 * as the visitor scrolls, lighting each step as it is reached.
 */
export function ProcessTimeline({ text = "A clear process, with how long each step takes." }: { text?: string }) {
  const list = useRef<HTMLOListElement>(null);
  const [fill, setFill] = useState(0);
  useEffect(() => {
    const el = list.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setFill(1); return; }
    let raf = 0;
    const on = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(() => { const r = el.getBoundingClientRect(); setFill(Math.max(0, Math.min(1, (innerHeight * 0.65 - r.top) / r.height))); }); };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); cancelAnimationFrame(raf); };
  }, []);

  return <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
    <div className="lg:sticky lg:top-28 lg:self-start">
      <SectionHead title="From first call to launch" text={text} />
      <div className="mt-10 rounded-[24px] bg-ink p-7 text-ink-foreground md:p-8">
        <p className="text-[14px] text-ink-foreground/60">A typical business website</p>
        <ol className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {week.map(([d, t], i) => <li key={d} className={`rounded-2xl px-3 py-4 ${i === week.length - 1 ? "bg-saffron text-ink" : "bg-ink-foreground/[0.08]"}`}>
            <p className={`text-[12px] ${i === week.length - 1 ? "text-ink/70" : "text-ink-foreground/55"}`}>{d}</p>
            <p className="mt-1.5 text-[14px] leading-snug">{t}</p>
          </li>)}
        </ol>
        <p className="mt-5 text-[14px] text-ink-foreground/55">AI and automation builds take 1–10 days depending on the package.</p>
      </div>
    </div>
    <ol ref={list} className="relative">
      <span aria-hidden className="absolute bottom-6 left-[11px] top-6 w-0.5 rounded-full bg-border" />
      <span aria-hidden className="absolute left-[11px] top-6 w-0.5 origin-top rounded-full bg-flame" style={{ height: `calc((100% - 3rem) * ${fill})` }} />
      {timeline.map((t, i) => {
        const on = fill >= (i + 0.25) / timeline.length;
        return <li key={t.step} className="relative pb-10 pl-12 last:pb-0">
          <span aria-hidden className={`absolute left-0 top-1 grid h-6 w-6 place-items-center rounded-full border-2 transition-colors duration-500 ${on ? "border-flame bg-flame" : "border-border bg-background"}`}><span className={`h-2 w-2 rounded-full ${on ? "bg-white" : "bg-border"}`} /></span>
          <div className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-55"}`}>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5"><h3 className="font-display text-[1.5rem] font-normal md:text-[1.75rem]">{t.step}</h3><span className="rounded-full bg-stone px-3 py-1 text-[13px] text-foreground/70">{t.time}</span></div>
            <p className="mt-2 max-w-lg text-[16px] leading-relaxed text-foreground/75">{t.text}</p>
          </div>
        </li>;
      })}
    </ol>
  </div>;
}
