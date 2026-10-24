import { useId, useState, type ReactNode } from "react";
import { ArrowUpRight, Phone, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { BUSINESS } from "@/lib/business";
import { WHATSAPP } from "@/lib/kriyo-data";
import type { Faq } from "@/lib/service-faqs";
import mark from "@/assets/kriyvo-mark.webp";

/**
 * The site's one FAQ pattern: heading and a direct line to the builder on the left (sticky on desktop),
 * the questions on the right as soft cards that open smoothly. The first one starts open.
 */
export function FaqList({
  faqs,
  defaultOpen = 0,
  renderAnswer,
}: {
  faqs: Faq[];
  defaultOpen?: number | null;
  renderAnswer?: (text: string) => ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();
  return (
    <ul className="space-y-3">
      {faqs.map((f, i) => {
        const on = open === i;
        return (
          <Reveal
            as="li"
            key={f.q}
            delay={Math.min(i, 5) * 50}
            className={`rounded-[22px] transition-[background-color,box-shadow] duration-500 ${on ? "bg-card shadow-[0_24px_60px_-30px_oklch(0.2_0.02_60/0.35),inset_0_0_0_1px_var(--color-border)]" : "bg-stone hover:bg-[oklch(0.945_0.003_90)]"}`}
          >
            <h3 className="font-sans text-[17px] font-normal leading-snug md:text-lg">
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={on}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(on ? null : i)}
                className="flex w-full items-center gap-4 px-5 py-5 text-left md:gap-6 md:px-7 md:py-6"
              >
                <span
                  aria-hidden
                  className={`w-7 shrink-0 font-display text-[15px] tabular transition-colors ${on ? "text-accent" : "text-foreground/60"}`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{f.q}</span>
                <span
                  aria-hidden
                  className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "rotate-45 bg-ink text-ink-foreground" : "bg-card text-foreground"}`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              className={`grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.16,1,.3,1)] ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
            >
              <div className="overflow-hidden" inert={!on || undefined}>
                <p className="max-w-2xl px-5 pb-6 pl-[4.25rem] text-[16px] leading-relaxed text-foreground/75 md:px-7 md:pb-7 md:pl-[5.25rem]">
                  {renderAnswer ? renderAnswer(f.a) : f.a}
                </p>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}

/**
 * The site's one FAQ pattern: heading and a direct line to the builder on the left (sticky on desktop),
 * the questions on the right as soft cards that open smoothly. The first one starts open.
 */
export function FaqSection({ title = "Frequently asked questions", text, faqs, extra }: { title?: string; text?: ReactNode; faqs: Faq[]; extra?: ReactNode }) {
  return (
    <section className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <div className="lg:sticky lg:top-28 lg:self-start">
        <Reveal>
          <h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem]">{title}</h2>
          {text && <p className="mt-4 max-w-md text-lg leading-relaxed text-foreground/70">{text}</p>}
        </Reveal>
        <Reveal delay={120} className="mt-10 hidden lg:block"><AskCard />{extra}</Reveal>
      </div>
      <div>
        <FaqList faqs={faqs} />
        <div className="pt-3 lg:hidden"><AskCard /></div>
      </div>
    </section>
  );
}

/** A direct line to the person who builds it, so a question never dead-ends. */
function AskCard() {
  return <div className="relative overflow-hidden rounded-[24px] bg-ink p-7 text-ink-foreground">
    <div className="flex items-center gap-3"><img src={mark} alt="" width={36} height={38} className="h-9 w-auto" /><p className="text-[14px] text-ink-foreground/60">Kriyvo AI · {BUSINESS.phone}</p></div>
    <p className="mt-6 font-display text-2xl leading-snug">Still have a question?<br /><span className="text-ink-foreground/60">Ask the person who builds it.</span></p>
    <div className="mt-6 flex flex-wrap gap-2">
      <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn bg-ink-foreground text-ink">Ask on WhatsApp <ArrowUpRight aria-hidden className="h-4 w-4" /></a>
      <a href={`tel:${BUSINESS.phoneE164}`} className="btn bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/15"><Phone aria-hidden className="h-4 w-4" />Call</a>
    </div>
  </div>;
}
