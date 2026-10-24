import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, Check } from "lucide-react";
import { BackLink, SectionHead } from "@/components/Kit";
import { Reveal } from "@/components/Reveal";
import { AgencyLayout, ProjectCTA } from "@/components/AgencyLayout";
import { articles } from "@/lib/blog-data";
import { pageMeta } from "@/lib/page-meta";
import { BUSINESS } from "@/lib/business";
import { services } from "@/lib/services-data";

function renderWithLinks(text: string): ReactNode {
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    parts.push(
      <Link key={match.index} to={href as any} className="text-accent underline underline-offset-4 hover:text-foreground">
        {label}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return parts.length > 0 ? parts : text;
}

/** Link each article to the service it most directly supports (internal linking for SEO and readers). */
function relatedService(slug: string, category: string) {
  const pick = /website-development|wordpress/.test(slug) ? "freelance-website-developer-noida"
    : /whatsapp|chatbot/.test(slug) ? "ai-chatbot-for-website"
    : /n8n|workflow|handover|pilot|feedback|human-review/.test(slug) ? "n8n-workflow-automation"
    : /voice|agent|llm|rag|gpt|rea-|engineer/.test(slug) ? "llm-ai-agent-development"
    : category === "AI perspectives" ? "ai-chatbot-for-website"
    : "ai-automation";
  return services.find(s => s.slug === pick);
}

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => { const article = articles.find(a => a.slug === params.slug); if (!article) throw notFound(); return article; },
  head: ({ loaderData }) => {
    const base = pageMeta(loaderData?.title ?? "Journal article", loaderData?.description ?? "Practical AI and automation reading from Kriyvo AI.", true);
    if (!loaderData) return base;
    const url = `${BUSINESS.url}/blog/${loaderData.slug}`;
    const schema = { "@context": "https://schema.org", "@graph": [
      { "@type": "BlogPosting", headline: loaderData.title, description: loaderData.description, url, mainEntityOfPage: url, image: `${BUSINESS.url}${loaderData.image}`, articleSection: loaderData.category, author: { "@id": `${BUSINESS.url}/#business` }, publisher: { "@id": `${BUSINESS.url}/#business` } },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BUSINESS.url}/` }, { "@type": "ListItem", position: 2, name: "Blog", item: `${BUSINESS.url}/blog` }, { "@type": "ListItem", position: 3, name: loaderData.title, item: url }] },
    ] };
    return { ...base, scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }] };
  },
  component: Article,
});

/** A thin bar under the header that fills as the article is read. */
function ReadingProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const on = () => { const h = document.documentElement; setP(Math.min(1, h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight))); };
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return <div aria-hidden className="fixed inset-x-0 top-[72px] z-30 h-0.5 bg-transparent"><div className="h-full origin-left bg-flame" style={{ transform: `scaleX(${p})` }} /></div>;
}

function Article() {
  const article = Route.useLoaderData();
  const related = articles.filter(a => !a.unlisted && a.slug !== article.slug && a.category === article.category).slice(0, 3);
  const svc = relatedService(article.slug, article.category);
  return <AgencyLayout>
    <ReadingProgress />
    <article className="mx-auto max-w-[1240px] px-4 pt-12 sm:px-6 md:pt-16">
      <BackLink to="/blog">All articles</BackLink>
      <h1 className="mt-10 max-w-4xl text-[1.9rem] sm:text-5xl lg:text-[3.5rem]"><span className="line-in">{article.title}</span></h1>
      <p className="mt-6 max-w-3xl text-lg leading-relaxed text-foreground/70">{article.description}</p>
      <p className="mt-5 text-[15px] text-muted-foreground">{article.category} · {article.readTime} min read · Kriyvo journal</p>
      <div className="mt-12 overflow-hidden rounded-[28px] bg-stone"><img src={article.image} alt="" width={1280} height={800} className="aspect-[16/8] w-full object-cover" /></div>
      <div className="mt-14 grid gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
        <div className="self-start lg:sticky lg:top-28">
          <p className="text-[15px] font-medium">In this article</p>
          <nav aria-label="Article contents" className="mt-4 space-y-1 border-l border-border">{article.sections.map((s, i) => <a key={s.heading} href={`#section-${i}`} className="-ml-px block border-l border-transparent py-1.5 pl-4 text-[14px] leading-relaxed text-muted-foreground transition-colors hover:border-flame hover:text-foreground">{s.heading}</a>)}</nav>
        </div>
        <div className="max-w-[44rem] space-y-14">
          {article.sections.map((s, i) => <section key={s.heading} id={`section-${i}`} className="scroll-mt-28">
            <h2 className="text-[1.75rem] md:text-[2.25rem]">{s.heading}</h2>
            {s.blocks.map((b, j) => typeof b === "string"
              ? <p key={j} className="mt-5 text-[18px] leading-[1.8] text-foreground/85">{renderWithLinks(b)}</p>
              : <ul key={j} className="mt-6 space-y-3">{b.map(li => <li key={li} className="flex gap-3 text-[18px] leading-relaxed text-foreground/85"><Check aria-hidden className="mt-1.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.5} />{renderWithLinks(li)}</li>)}</ul>)}
          </section>)}
          {svc && <div className="rounded-[24px] bg-ink p-8 text-ink-foreground md:p-10"><h2 className="text-[1.75rem] md:text-[2.25rem]">Need this built? {svc.title}</h2><p className="mt-3 leading-relaxed text-ink-foreground/75">{svc.description}</p><Link to="/services/$slug" params={{ slug: svc.slug }} className="btn mt-7 bg-ink-foreground text-ink">See the service <ArrowUpRight aria-hidden className="h-4 w-4" /></Link></div>}
          <p className="border-t border-border pt-6 text-[14px] leading-relaxed text-muted-foreground">Written for the Kriyvo journal. Product claims reported by third-party sources are not independent Kriyvo AI benchmarks.</p>
        </div>
      </div>
    </article>
    {related.length > 0 && <section className="mx-auto mt-24 max-w-[1240px] px-4 sm:px-6"><SectionHead title="Keep reading" /><div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">{related.map(a => <Reveal key={a.slug}><Link to="/blog/$slug" params={{ slug: a.slug }} className="group block"><div className="overflow-hidden rounded-[20px] bg-stone"><img src={a.image} alt="" width={1280} height={800} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]" /></div><h3 className="mt-4 font-display text-xl font-normal leading-snug transition-colors group-hover:text-accent">{a.title}</h3><p className="mt-2 text-[14px] text-muted-foreground">{a.readTime} min read</p></Link></Reveal>)}</div></section>}
    <ProjectCTA />
  </AgencyLayout>;
}
