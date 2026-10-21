import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { AgencyLayout, PageIntro, ProjectCTA } from "@/components/AgencyLayout";
import { Reveal } from "@/components/Reveal";
import { TiltImage } from "@/components/TiltImage";
import { caseStudies } from "@/lib/kriyo-data";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/case-studies/")({ head: () => pageMeta("AI Automation Case Studies", "Explore Kriyvo AI project work in patient feedback automation, AI setup tools, outreach pipelines and real-time voice assistants."), component: CaseStudies });

/** Each study as a wide split: picture on one side, the problem and the build on the other, alternating. */
function CaseStudies() {
  return <AgencyLayout>
    <PageIntro label="Case studies" title="Inside the builds" description="The business need, what I built and how it was delivered. Four AI and automation systems, up close." />
    <section className="mx-auto max-w-[1240px] space-y-24 px-4 pb-8 sm:px-6 md:space-y-32">
      {caseStudies.map((c, i) => <Reveal key={c.slug}>
        <Link to="/case-studies/$slug" params={{ slug: c.slug }} className={`group grid items-center gap-8 md:grid-cols-2 md:gap-14 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
          <TiltImage src={c.image} alt={c.title} eager={i < 2} />
          <div>
            <h2 className="text-[1.9rem] md:text-[2.25rem]">{c.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-foreground/75">{c.summary}</p>
            <p className="mt-4 text-[15px] text-muted-foreground">{c.client} · {c.sector} · {c.stack.join(", ")}</p>
            <span className="btn btn-light mt-7">Read the case study <ArrowUpRight aria-hidden className="h-4 w-4" /></span>
          </div>
        </Link>
      </Reveal>)}
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
