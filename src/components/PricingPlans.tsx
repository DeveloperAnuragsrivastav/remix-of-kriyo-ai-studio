import { ArrowUpRight, Check, Clock } from "lucide-react";
import { SwipeRow } from "@/components/Kit";
import { planLink, type Plan } from "@/lib/pricing";

export function PricingPlans({ plans }: { plans: Plan[] }) {
  const four = plans.length === 4;
  return <SwipeRow label="Price plans" at={four ? "md" : "lg"} grid={four ? "md:grid-cols-2 md:gap-6" : "lg:grid-cols-3 lg:gap-6"}>
    {plans.map(p => <div key={p.name} className={`relative flex w-full flex-col rounded-[28px] p-7 md:p-9 ${p.popular ? "bg-ink text-ink-foreground" : "bg-stone"}`}>
      <h3 className="flex items-center justify-between gap-3 text-2xl">{p.name}{p.popular && <span className="rounded-full bg-saffron px-3 py-1 font-sans text-[13px] font-medium text-ink">Popular</span>}</h3>

      <p className="mt-6 flex flex-wrap items-baseline gap-x-3">
        <span className={`text-lg line-through ${p.popular ? "text-ink-foreground/50" : "text-muted-foreground"}`}><span className="sr-only">Was </span>{p.was}</span>
        <b className="text-[3.25rem] font-light leading-none md:text-6xl tracking-[-0.04em] tabular">{p.price}</b>
        {p.unit && <span className={p.popular ? "text-ink-foreground/70" : "text-muted-foreground"}>{p.unit}</span>}
      </p>
      <p className={`mt-3 inline-flex items-center gap-1.5 text-[15px] ${p.popular ? "text-ink-foreground/70" : "text-muted-foreground"}`}><Clock aria-hidden className="h-4 w-4" />Delivery: {p.delivery}</p>
      <ul className="mt-7 space-y-3">
        {p.features.map(f => <li key={f} className="flex gap-3 text-[15px] leading-relaxed"><Check aria-hidden className={`mt-0.5 h-4 w-4 shrink-0 ${p.popular ? "text-saffron" : "text-accent"}`} strokeWidth={2.25} />{f}</li>)}
      </ul>
      <div className="mt-auto pt-8">
        <a href={planLink(p)} target="_blank" rel="noreferrer" className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-[15px] font-medium transition ${p.popular ? "bg-ink-foreground text-ink hover:bg-ink-foreground/85" : "bg-ink text-ink-foreground hover:bg-ink/85"}`}>{p.cta} <ArrowUpRight className="h-4 w-4" /></a>
        <p className={`mt-3 text-center text-sm ${p.popular ? "text-ink-foreground/60" : "text-muted-foreground"}`}>{p.note}</p>
      </div>
    </div>)}
  </SwipeRow>;
}
