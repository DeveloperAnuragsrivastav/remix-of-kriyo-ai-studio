import type { ReactNode } from "react";
import { AgencyLayout } from "@/components/AgencyLayout";

/** Plain, readable layout for policy pages: a title, the last-updated date, then numbered sections. */
export function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: ReactNode; sections: { id: string; heading: string; body: ReactNode }[] }) {
  return <AgencyLayout>
    <article className="mx-auto max-w-3xl px-4 pb-8 pt-16 sm:px-6 md:pt-24">
      <h1 className="text-[2.4rem] sm:text-6xl lg:text-[3.5rem]">{title}</h1>
      <p className="mt-4 text-[15px] text-muted-foreground">Last updated {updated}</p>
      <div className="mt-8 text-lg leading-[1.75] text-foreground/80">{intro}</div>
      <nav aria-label="On this page" className="mt-10 rounded-[22px] bg-stone p-6">
        <ol className="grid gap-1.5 text-[15px] sm:grid-cols-2">{sections.map((s, i) => <li key={s.id}><a href={`#${s.id}`} className="text-foreground/75 underline-offset-4 hover:text-foreground hover:underline">{i + 1}. {s.heading}</a></li>)}</ol>
      </nav>
      {sections.map((s, i) => <section key={s.id} id={s.id} className="scroll-mt-28 border-t border-border pt-10 mt-10">
        <h2 className="text-[1.75rem] md:text-[2.25rem]">{i + 1}. {s.heading}</h2>
        <div className="legal-body mt-5 space-y-4 text-[17px] leading-[1.75] text-foreground/80 [&_a]:text-accent [&_a]:underline [&_a]:underline-offset-4 [&_li]:ml-5 [&_li]:list-disc [&_li]:pl-1 [&_ul]:space-y-2">{s.body}</div>
      </section>)}
    </article>
  </AgencyLayout>;
}
