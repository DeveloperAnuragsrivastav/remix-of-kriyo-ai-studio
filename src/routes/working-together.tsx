import { createFileRoute } from "@tanstack/react-router";
import { AgencyLayout, PageIntro, ProjectCTA } from "@/components/AgencyLayout";
import { process } from "@/lib/kriyo-data";
import { Reveal } from "@/components/Reveal";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/working-together")({ head: () => pageMeta("How a Freelance Web & AI Project Works", "From discovery and a fixed-scope proposal to build, review and handover: how website and AI automation projects with Kriyvo AI work, step by step."), component: WorkingTogether });
function WorkingTogether() {
  return <AgencyLayout>
    <PageIntro label="Working together" title="From your first idea to a finished project" description="A freelance engagement, not a software subscription. I define the work with you, agree the milestones and keep review points part of the process." />
    <section className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <ol className="space-y-4">
        {process.map((step, i) => <li key={step.phase}><Reveal delay={i * 70} className="grid items-start gap-4 rounded-[28px] bg-stone p-8 md:grid-cols-[0.35fr_1fr_1.1fr] md:gap-10 md:p-10">
          <p className="text-[15px] text-muted-foreground">{step.phase}</p>
          <h2 className="font-display text-[1.75rem] font-normal leading-tight md:text-[2.25rem]">{step.title}</h2>
          <p className="text-[17px] leading-relaxed text-foreground/75">{step.text}</p>
        </Reveal></li>)}
      </ol>
    </section>
    <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-10 rounded-[28px] bg-ink p-8 text-ink-foreground md:grid-cols-[0.9fr_1.1fr] md:p-12">
        <h2 className="text-[1.9rem] md:text-[2.25rem]">No surprises in the scope</h2>
        <div className="space-y-5 text-[17px] leading-relaxed text-ink-foreground/75"><p>Bring a new idea, an existing website or a workflow that needs improving. The proposal defines deliverables, dependencies and exclusions before the build starts.</p><p>Hosting, third-party accounts, API usage and maintenance are separate ongoing needs. Any extra work is discussed before it becomes part of the project.</p><p>Source files, documentation and a walkthrough are agreed as part of the handover. Support and follow-on improvements can be scoped to your needs.</p></div>
      </div>
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
