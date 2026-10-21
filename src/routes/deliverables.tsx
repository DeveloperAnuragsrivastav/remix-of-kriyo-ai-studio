import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { AgencyLayout, PageIntro, ProjectCTA } from "@/components/AgencyLayout";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/deliverables")({ head: () => pageMeta("What You Get: Project Deliverables", "Explore how Kriyvo AI scopes websites, AI integrations, documentation and project handover for freelance engagements."), component: Deliverables });
const items = [
  { title: "Your website or application", text: "The agreed pages, screens and customer journeys, built around your business content and design direction.", points: ["Agreed design and page scope", "Mobile and desktop layouts", "Forms, booking or enquiry flows", "Testing of the agreed journeys"] },
  { title: "Connected AI & workflows", text: "Purpose-built assistants and automations, connected to the business tools defined in your proposal.", points: ["Chat and voice conversations", "Document knowledge and search", "CRM and communication integrations", "Review points and human handoffs"] },
  { title: "Documentation & walkthrough", text: "A practical handover so your team understands what was delivered and how it fits into your existing work.", points: ["Setup and integration notes", "Agreed source files and assets", "A walkthrough of the project", "Third-party account dependencies"] },
  { title: "A clearly defined engagement", text: "Your proposal separates the build from hosting, third-party usage and future improvements.", points: ["Deliverables and exclusions", "Milestones and review points", "Client content and access needs", "Maintenance discussed separately"] },
];
function Deliverables() {
  return <AgencyLayout>
    <PageIntro label="Deliverables" title="Clear scope, a considered handover" description="Know what is included before development begins. Every engagement starts with an agreed brief, review points and a plan for what your team receives." />
    <section className="mx-auto max-w-[1240px] px-4 sm:px-6">
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item, i) => <Reveal key={item.title} delay={(i % 2) * 90} className={`rounded-[28px] p-8 md:p-10 ${i === 0 ? "bg-ink text-ink-foreground" : "bg-stone"}`}>
          <h2 className="font-display text-[1.75rem] font-normal md:text-[2.25rem]">{item.title}</h2>
          <p className={`mt-3 text-[16px] leading-relaxed ${i === 0 ? "text-ink-foreground/70" : "text-foreground/75"}`}>{item.text}</p>
          <ul className="mt-7 grid gap-2 sm:grid-cols-2">{item.points.map(point => <li key={point} className={`flex items-start gap-2.5 rounded-2xl px-4 py-3 text-[15px] ${i === 0 ? "bg-ink-foreground/[0.07]" : "bg-card"}`}><Check aria-hidden className={`mt-0.5 h-4 w-4 shrink-0 ${i === 0 ? "text-saffron" : "text-accent"}`} strokeWidth={2.5} />{point}</li>)}</ul>
        </Reveal>)}
      </div>
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
