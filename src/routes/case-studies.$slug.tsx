import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { BackLink, Btn, FactStrip, SectionHead, Split } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { TiltImage } from "@/components/TiltImage";
import { caseStudies, WHATSAPP } from "@/lib/kriyo-data";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => { const study = caseStudies.find(c => c.slug === params.slug); if (!study) throw notFound(); return study; },
  head: ({ loaderData }) => pageMeta(loaderData?.title ?? "Case study", loaderData?.summary ?? "Explore a Kriyvo AI project in detail."),
  component: Study,
});

const caseStudyServiceMap: Record<string, { label: string; to: string }> = {
  "bmrc-hospital": { label: "AI automation engineering", to: "/services/ai-automation" },
  "outreach-automation": { label: "n8n workflow automation", to: "/services/n8n-workflow-automation" },
};

function Study() {
  const study = Route.useLoaderData();
  const others = caseStudies.filter(c => c.slug !== study.slug).slice(0, 2);
  const relatedSvc = caseStudyServiceMap[study.slug];
  return <AgencyLayout>
    <article className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 md:pt-16">
      <BackLink to="/case-studies">All case studies</BackLink>
      <h1 className="mt-10 max-w-4xl text-[2.4rem] sm:text-6xl lg:text-[3.5rem]"><span className="line-in">{study.title}</span></h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "200ms" }}>{study.summary}</p>
      <div className="mt-12 animate-rise" style={{ animationDelay: "300ms" }}><TiltImage src={study.image} alt={study.title} eager /></div>
      <div className="mt-12">
        <FactStrip
          facts={[
            ["Client", study.client],
            ["Sector", study.sector],
            ...(relatedSvc ? [["Service", <Link key="svc" to={relatedSvc.to as any} className="text-accent underline underline-offset-4 hover:text-foreground">{relatedSvc.label}</Link>] as [string, any]] : [["Outcome", study.outcome] as [string, any]]),
            ["Stack", study.stack.join(", ")],
          ]}
        />
      </div>
      <div className="mt-4">
        <Split title="The problem"><p>{study.problem}</p></Split>
        <Split title="What I built"><p>{study.built}</p></Split>
      </div>
    </article>

    {/* How it works: the flow as a connected strip of steps */}
    <section className="mt-16 bg-ink py-20 text-ink-foreground md:py-28">
      <div className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Reveal><h2 className="text-[1.9rem] sm:text-[2.4rem] md:text-[3rem]">How it works</h2></Reveal>
        <ol className="mt-12 grid gap-4 md:grid-cols-4">
          {study.steps.map(([t, d], i) => <li key={t}><Reveal delay={i * 90} className="h-full rounded-[22px] bg-ink-foreground/[0.06] p-6">
            <span aria-hidden className={`block h-1 w-10 rounded-full ${i === study.steps.length - 1 ? "bg-flame" : "bg-ink-foreground/30"}`} />
            <h3 className="mt-5 text-xl">{t}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-ink-foreground/70">{d}</p>
          </Reveal></li>)}
        </ol>
      </div>
    </section>

    <section className="mx-auto max-w-[1240px] px-4 pt-20 sm:px-6 md:pt-28">
      <SectionHead title="Key technical decisions" />
      <div className="mt-6">{study.decisions.map(d => <Split key={d.title} title={d.title}><p>{d.text}</p></Split>)}</div>
    </section>

    <section className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6">
      <div className="grid gap-10 rounded-[28px] bg-stone p-8 md:grid-cols-[1fr_1.2fr] md:p-12">
        <div>
          <h2 className="text-3xl md:text-4xl">Results</h2>
          <p className="mt-4 text-lg leading-relaxed text-foreground/75">{study.outcome}</p>
          {relatedSvc && (
            <p className="mt-4 text-[15px] text-muted-foreground">
              Interested in a similar workflow? Explore my{" "}
              <Link to={relatedSvc.to as any} className="text-accent underline underline-offset-4 font-medium hover:text-foreground">
                {relatedSvc.label}
              </Link>{" "}
              service.
            </p>
          )}
          <Btn href={WHATSAPP} className="mt-8">Build something similar</Btn>
        </div>
        <ul className="space-y-4">{study.results.map(r => <li key={r} className="flex gap-3 text-lg leading-relaxed"><Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />{r}</li>)}</ul>
      </div>
    </section>

    <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6">
      <SectionHead title="More case studies" />
      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {others.map(c => <Reveal key={c.slug}><Link to="/case-studies/$slug" params={{ slug: c.slug }} className="group block">
          <TiltImage src={c.image} alt="" />
          <div className="mt-5 flex items-start justify-between gap-6"><div><h3 className="font-display text-xl font-normal md:text-2xl">{c.title}</h3><p className="mt-2 text-[15px] text-muted-foreground">{c.client}</p></div><span className="btn btn-light mt-1 !h-11 !w-11 shrink-0 !p-0"><ArrowUpRight aria-hidden className="h-5 w-5" /></span></div>
        </Link></Reveal>)}
      </div>
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
