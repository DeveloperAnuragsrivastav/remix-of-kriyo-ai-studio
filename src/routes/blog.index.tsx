import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { AgencyLayout, PageIntro, ProjectCTA } from "@/components/AgencyLayout";
import { Segmented } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { articles } from "@/lib/blog-data";
import { pageMeta } from "@/lib/page-meta";
export const Route = createFileRoute("/blog/")({ head: () => pageMeta("AI Automation & Web Development Blog", "Practical articles on AI automation, n8n, voice agents, workflow design and production engineering from Kriyvo AI."), component: Blog });
const categories = ["All articles", "AI & automation", "Workflow design", "Voice AI", "Engineering", "AI perspectives", "Costs & hiring"];

function Blog() {
  const [category, setCategory] = useState("All articles");
  const [search, setSearch] = useState("");
  const featured = articles.find(a => a.slug === "multilingual-feedback-routing-workflow");
  const filtered = articles.filter(a => (category === "All articles" || a.category === category) && `${a.title} ${a.description}`.toLowerCase().includes(search.toLowerCase()));
  // The featured article sits above the grid; skip it in the unfiltered list so it is not shown twice.
  const grid = category === "All articles" && !search && featured ? filtered.filter(a => a.slug !== featured.slug) : filtered;
  return <AgencyLayout>
    <PageIntro label="Journal" title="Notes from building real systems" description="Practical reading on websites, AI and automation: what it costs, how it is built and what makes it dependable." />

    {featured && category === "All articles" && !search && <section className="mx-auto max-w-[1240px] px-4 pb-16 sm:px-6">
      <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group grid items-center gap-8 rounded-[28px] bg-stone p-4 md:grid-cols-[1.25fr_1fr] md:gap-12 md:p-6">
        <div className="overflow-hidden rounded-[20px]"><img src={featured.image} alt="Project review with feedback notes and workflow sketches" width={1280} height={800} className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.03]" /></div>
        <div className="pb-4 md:pb-0 md:pr-6">
          <h2 className="text-[1.9rem] leading-tight md:text-[2.25rem]">{featured.title}</h2>
          <p className="mt-4 text-[16px] leading-relaxed text-foreground/75">{featured.description}</p>
          <p className="mt-4 text-[15px] text-muted-foreground">Featured · {featured.category} · {featured.readTime} min read</p>
          <span className="btn btn-dark mt-7">Read the article <ArrowUpRight aria-hidden className="h-4 w-4" /></span>
        </div>
      </Link>
    </section>}

    <section className="mx-auto max-w-[1240px] px-4 pb-8 sm:px-6">
      <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
        <Segmented label="Article categories" options={categories} value={category} onChange={setCategory} />
        <label className="relative block w-full xl:w-72"><span className="sr-only">Search articles</span><Search aria-hidden className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles" className="h-12 w-full rounded-full bg-stone pl-11 pr-4 text-[15px] outline-none ring-flame/40 placeholder:text-muted-foreground focus:ring-2" /></label>
      </div>
      <p className="mt-6 text-[15px] text-muted-foreground" aria-live="polite">{filtered.length} articles</p>
      <div className="mt-8 grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
        {grid.map((a, i) => <Reveal key={a.slug} delay={(i % 3) * 70}><Link to="/blog/$slug" params={{ slug: a.slug }} className="group block">
          <div className="overflow-hidden rounded-[20px] bg-stone"><img src={a.image} alt={`${a.category} cover`} loading="lazy" width={1280} height={800} className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" /></div>
          <h2 className="mt-5 font-display text-xl font-normal leading-snug transition-colors group-hover:text-accent">{a.title}</h2>
          <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-foreground/70">{a.description}</p>
          <p className="mt-3 text-[14px] text-muted-foreground">{a.category} · {a.readTime} min read</p>
        </Link></Reveal>)}
      </div>
      {!filtered.length && <div className="py-20 text-center"><h2 className="text-2xl">No articles found</h2><button type="button" className="btn btn-light mt-6" onClick={() => { setSearch(""); setCategory("All articles"); }}>Clear filters</button></div>}
    </section>
    <ProjectCTA />
  </AgencyLayout>;
}
