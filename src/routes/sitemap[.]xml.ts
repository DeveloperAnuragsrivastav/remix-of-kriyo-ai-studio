import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS } from "@/lib/business";
import { articles } from "@/lib/blog-data";
import { caseStudies, projects } from "@/lib/kriyo-data";
import { services } from "@/lib/services-data";
import { day2SeoPages } from "@/lib/seo-landing-pages";

const STATIC_PAGES = [
  "/",
  "/services",
  "/pricing",
  "/portfolio",
  "/case-studies",
  "/blog",
  "/about",
  "/estimate",
  "/contact",
  "/deliverables",
  "/working-together",
  "/website-developer-east-delhi",
  "/web-developer-delhi-ncr",
  "/ai-developer-in-bangalore",
  "/ai-developer-in-mumbai",
  "/freelance-web-designer-in-hyderabad",
  "/web-designer-in-chennai",
  "/ai-developer-in-delhi",
  "/freelance-web-designer-in-mumbai",
  ...day2SeoPages.map(p => p.path),
  "/privacy-policy",
  "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = [
          ...STATIC_PAGES,
          ...services.map(s => `/services/${s.slug}`),
          ...projects.map(p => `/portfolio/${p.slug}`),
          ...caseStudies.map(c => `/case-studies/${c.slug}`),
          ...articles.map(a => `/blog/${a.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map(p => `  <url><loc>${BUSINESS.url}${p === "/" ? "/" : p}</loc></url>`).join("\n")}\n</urlset>\n`;
        return new Response(body, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
