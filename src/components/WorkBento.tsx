import { ArrowUpRight, Play } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { LiveDemo, demoForProject } from "@/components/LiveDemos";
import { OutreachPlayground } from "@/components/OutreachPlayground";
import { projects } from "@/lib/kriyo-data";

/**
 * Recent work as a bento: the flagship large, two projects stacked beside it, three in a row below.
 * Pictures stay clean; on hover the title rises in with "Try it now" (a live demo) and "View project".
 * Touch screens have no hover, so there the caption and buttons are always shown.
 */
const layout: [string, string][] = [
  ["koca-restaurant-website", "lg:col-span-4 lg:row-span-2"],
  ["website-ai-chatbot", "lg:col-span-2"],
  ["gignaati-whatsapp-bot", "lg:col-span-2"],
  ["aurum-conventions-outreach", "lg:col-span-2"],
  ["ai-phone-calling-agent", "lg:col-span-2"],
  ["bmrc-patient-feedback-pipeline", "lg:col-span-2"],
];

const tryBtn = <button type="button" className="btn btn-light !px-4 !py-2.5 !text-[15px]"><Play aria-hidden className="h-3.5 w-3.5 fill-current" />Try it now</button>;
const tryBtnDark = <button type="button" className="btn btn-dark !px-4 !py-2.5 !text-[15px]"><Play aria-hidden className="h-3.5 w-3.5 fill-current" />Try it now</button>;

function TryIt({ slug, onLight = false }: { slug: string; onLight?: boolean }) {
  const kind = demoForProject[slug];
  const t = onLight ? tryBtnDark : tryBtn;
  if (kind) return <LiveDemo kind={kind} trigger={t} />;
  if (slug === "aurum-conventions-outreach") return <OutreachPlayground trigger={t} />;
  if (slug === "koca-restaurant-website") return <a href="https://kocaofficial.com/" target="_blank" rel="noreferrer" className={`btn ${onLight ? "btn-dark" : "btn-light"} !px-4 !py-2.5 !text-[15px]`}>Visit the live site <ArrowUpRight aria-hidden className="h-4 w-4" /></a>;
  return null;
}

export function WorkBento() {
  // Tiles keep the screenshots' own 16:9 shape so nothing baked into them gets cropped;
  // the large tile spans two rows, which lands it on the same shape.
  return <div className="grid gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-6 lg:gap-y-4">
    {layout.map(([slug, span], i) => {
      const p = projects.find(x => x.slug === slug);
      if (!p) return null;
      const big = i === 0;
      const meta = `${p.client.replace(/ \(.*\)/, "")} · ${p.category}`;
      return <Reveal key={slug} delay={(i % 3) * 70} className={`${span} ${big ? "sm:col-span-2" : ""}`}>
        <div className={`group relative aspect-video overflow-hidden rounded-[22px] bg-ink lg:rounded-[24px] ${big ? "lg:aspect-auto lg:h-full" : ""}`}>
          <img src={p.image} alt={p.title} loading={i < 3 ? "eager" : "lazy"} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" />
          {/* Large screens: the caption rises in on hover (always shown where there is no hover) */}
          <div aria-hidden className="absolute inset-0 hidden bg-gradient-to-t from-black/85 via-black/35 to-transparent transition-opacity duration-500 lg:block [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:opacity-100" />
          <div className="absolute inset-x-0 bottom-0 hidden p-7 text-white transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] lg:block [@media(hover:hover)]:translate-y-4 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within:translate-y-0 [@media(hover:hover)]:group-focus-within:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0 [@media(hover:hover)]:group-hover:opacity-100">
            <h3 className={`font-display font-normal leading-tight ${big ? "text-[2.25rem]" : "text-xl"}`}><a href={`/portfolio/${p.slug}`} className="hover:underline">{p.title}</a></h3>
            <p className="mt-1.5 text-[14px] text-white/70">{big ? p.subtitle : meta}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <TryIt slug={p.slug} />
              <a href={`/portfolio/${p.slug}`} className="btn !bg-white/15 !px-4 !py-2.5 !text-[15px] text-white backdrop-blur-sm hover:!bg-white/25">View project</a>
            </div>
          </div>
        </div>
        {/* Phones and tablets: the caption sits under the picture, always visible */}
        <div className="mt-4 px-1 lg:hidden">
          <h3 className="font-display text-[1.5rem] font-normal leading-tight"><a href={`/portfolio/${p.slug}`}>{p.title}</a></h3>
          <p className="mt-1 text-[14px] text-muted-foreground">{meta}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <TryIt slug={p.slug} onLight />
            <a href={`/portfolio/${p.slug}`} className="btn btn-light !px-4 !py-2.5 !text-[15px]">View project</a>
          </div>
        </div>
      </Reveal>;
    })}
  </div>;
}
