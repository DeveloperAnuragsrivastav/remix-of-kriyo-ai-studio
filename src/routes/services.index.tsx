import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { AgencyLayout, PageIntro, ProjectCTA } from "@/components/AgencyLayout";
import { SectionHead } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { ServiceIndex } from "@/components/ServiceIndex";
import { services } from "@/lib/services-data";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/services/")({ head: () => pageMeta("Web Development & AI Automation Services", "AI automation, n8n workflows, LLM agents, website chatbots and custom web development from Kriyvo AI."), component: Services });

function Services() {
  return <AgencyLayout>
    <PageIntro label="Services" title="Websites, AI and automation" description="Start with your business need. I build websites, connect your tools and develop AI applications around a clearly defined task." />
    <section className="mx-auto max-w-[1240px] px-4 sm:px-6"><div className="border-t border-border"><ServiceIndex /></div></section>

    {/* Match a need to a service */}
    <section className="mx-auto mt-20 max-w-[1240px] px-4 sm:px-6 md:mt-36">
      <SectionHead title="Not sure which one you need?" text="Find the sentence that sounds like your business today." />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {services.map((s, i) => <Reveal key={s.slug} delay={(i % 2) * 80}>
          <Link to="/services/$slug" params={{ slug: s.slug }} className="group flex h-full flex-col justify-between gap-6 rounded-[22px] bg-stone p-7 transition-colors duration-300 hover:bg-[oklch(0.94_0.003_90)] md:p-8">
            <p className="font-display text-xl leading-snug">“{s.need}”</p>
            <span className="flex items-center justify-between gap-4 text-[15px]"><span><span className="text-muted-foreground">You need: </span>{s.title}</span><ArrowRight aria-hidden className="h-5 w-5 text-accent transition-transform group-hover:translate-x-1" /></span>
          </Link>
        </Reveal>)}
      </div>
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
