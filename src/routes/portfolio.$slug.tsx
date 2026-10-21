import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowUpRight, Check, Play } from "lucide-react";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { BackLink, Btn, FactStrip, SectionHead, Split } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { TiltImage } from "@/components/TiltImage";
import { projects, WHATSAPP } from "@/lib/kriyo-data";
import { pageMeta } from "@/lib/page-meta";
import { OutreachPlayground } from "@/components/OutreachPlayground";
import { LiveDemo, demoForProject, type DemoKind } from "@/components/LiveDemos";

const liveCopy: Record<DemoKind, [string, string]> = {
  chatbot: ["Talk to the assistant", "Ask it about prices or delivery. It answers from real business facts and captures your details, live."],
  whatsapp: ["Go through the funnel", "Answer like a customer from an ad and watch the bot qualify you and update the CRM in real time."],
  feedback: ["Send feedback, in any language", "Write a complaint or a compliment. Watch AI translate it, classify it and alert the right department."],
  voice: ["Call the AI receptionist", "Speak to a live voice agent in your browser. It answers, checks availability and books."],
};

export const Route = createFileRoute("/portfolio/$slug")({
  loader: ({ params }) => { const project = projects.find(p => p.slug === params.slug); if (!project) throw notFound(); return project; },
  head: ({ loaderData }) => pageMeta(loaderData?.title ?? "Project", loaderData?.description ?? "A Kriyvo AI project."),
  component: Project,
});

function Project() {
  const p = Route.useLoaderData();
  const others = projects.filter(x => x.slug !== p.slug).slice(0, 2);
  return <AgencyLayout>
    <article className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 md:pt-16">
      <BackLink to="/portfolio">All projects</BackLink>
      <h1 className="mt-10 max-w-4xl text-[2.4rem] sm:text-6xl lg:text-[3.5rem]"><span className="line-in">{p.title}</span></h1>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/70 animate-rise" style={{ animationDelay: "200ms" }}>{p.subtitle}</p>
      <div className="mt-8 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "300ms" }}><Btn href={WHATSAPP}>Build something similar</Btn></div>

      {p.slug === "aurum-conventions-outreach" && <div className="mt-12 flex flex-col gap-6 rounded-[28px] bg-ink p-7 text-ink-foreground md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl">Let this pipeline write to you</h2>
          <p className="mt-3 leading-relaxed text-ink-foreground/75">Paste your LinkedIn profile and get a personalised invite in about 10 seconds. The same engine, running live.</p>
        </div>
        <OutreachPlayground />
      </div>}

      {demoForProject[p.slug] && <div className="mt-12 flex flex-col gap-6 rounded-[28px] bg-ink p-7 text-ink-foreground md:flex-row md:items-center md:justify-between md:p-10">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl">{liveCopy[demoForProject[p.slug]!][0]}</h2>
          <p className="mt-3 leading-relaxed text-ink-foreground/75">{liveCopy[demoForProject[p.slug]!][1]}</p>
        </div>
        <LiveDemo kind={demoForProject[p.slug]!} trigger={<button type="button" className="btn shrink-0 bg-ink-foreground text-ink"><Play aria-hidden className="h-3.5 w-3.5 fill-current" />Try it now</button>} />
      </div>}

      <div className="mt-12 animate-rise" style={{ animationDelay: "400ms" }}><TiltImage src={p.image} alt={p.title} eager /></div>
      <div className="mt-12"><FactStrip facts={[["Client", p.client], ["Service", p.category], ["Outcome", p.result], ["Stack", p.stack.join(", ")]]} /></div>

      <div className="mt-4">
        <Split title="The challenge"><p>{p.challenge}</p></Split>
        <Split title="What I built"><p>{p.overview}</p></Split>
        <Split title="What was delivered">
          <ul className="space-y-3">{p.deliverables.map(d => <li key={d} className="flex gap-3"><Check aria-hidden className="mt-2 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />{d}</li>)}</ul>
        </Split>
      </div>
    </article>

    <section className="mx-auto mt-16 max-w-[1240px] px-4 sm:px-6">
      <SectionHead title="More projects" />
      <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-2">
        {others.map(o => <Reveal key={o.slug}><Link to="/portfolio/$slug" params={{ slug: o.slug }} className="group block">
          <TiltImage src={o.image} alt="" />
          <div className="mt-5 flex items-start justify-between gap-6"><div><h3 className="font-display text-xl font-normal md:text-2xl">{o.title}</h3><p className="mt-2 text-[16px] text-foreground/75">{o.subtitle}</p></div><span className="btn btn-light mt-1 !h-11 !w-11 shrink-0 !p-0"><ArrowUpRight aria-hidden className="h-5 w-5" /></span></div>
        </Link></Reveal>)}
      </div>
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
