import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AgencyLayout, PageIntro, ProjectCTA } from "@/components/AgencyLayout";
import { Segmented } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { TiltImage } from "@/components/TiltImage";
import { projects } from "@/lib/kriyo-data";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/portfolio/")({
  head: () => pageMeta("Portfolio: Websites, Chatbots & Automation", "Websites, AI chatbots, WhatsApp bots, voice agents and n8n automations built by Kriyvo AI for real businesses."),
  component: Portfolio,
});

const filters = ["All work", ...Array.from(new Set(projects.map(p => p.category)))];
const counts = Object.fromEntries(filters.map(f => [f, f === "All work" ? projects.length : projects.filter(p => p.category === f).length]));

function Portfolio() {
  const [filter, setFilter] = useState("All work");
  const shown = projects.filter(p => filter === "All work" || p.category === filter);
  return <AgencyLayout>
    <PageIntro label="Portfolio" title="Work running for real businesses" description="Websites, chatbots, automations and voice agents, from a celebrity restaurant brand to a hospital feedback system." />
    <section className="mx-auto max-w-[1240px] px-4 pb-8 sm:px-6">
      <Segmented label="Filter projects" options={filters} value={filter} onChange={setFilter} counts={counts} />
      <div key={filter} className="mt-12 grid animate-stage gap-x-8 gap-y-16 md:grid-cols-2">
        {shown.map((p, i) => <Reveal key={p.slug} className={i === 0 && shown.length > 2 ? "md:col-span-2" : ""}>
          <Link to="/portfolio/$slug" params={{ slug: p.slug }} className="group block">
            <TiltImage src={p.image} alt={p.title} eager={i < 2} />
            <div className="mt-5 flex items-start justify-between gap-6">
              <div>
                <h2 className={`font-display font-normal leading-snug ${i === 0 && shown.length > 2 ? "text-2xl md:text-[2.25rem]" : "text-xl md:text-2xl"}`}>{p.title}</h2>
                <p className="mt-2 max-w-xl text-[16px] leading-relaxed text-foreground/75">{p.subtitle}</p>
                <p className="mt-2 text-[14px] text-muted-foreground">{p.client} · {p.category}</p>
              </div>
              <span className="btn btn-light mt-1 !h-11 !w-11 shrink-0 !p-0"><ArrowUpRight aria-hidden className="h-5 w-5" /></span>
            </div>
          </Link>
        </Reveal>)}
      </div>
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
