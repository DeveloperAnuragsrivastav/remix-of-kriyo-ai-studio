import type { Faq } from "@/lib/service-faqs";
import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/page-meta";

/**
 * Location pages. One page for the home area (East Delhi) and one hub for the wider region,
 * rather than a near-identical page per city, which Google treats as doorway pages.
 */
export type LocalPage = {
  path: "/website-developer-east-delhi" | "/web-developer-delhi-ncr";
  name: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  areasHeading: string;
  areas: { name: string; note?: string }[];
  sections: { heading: string; text: string }[];
  services: string[];
  faqs: Faq[];
  related: { label: string; to: LocalPage["path"] };
};

export const eastDelhi: LocalPage = {
  path: "/website-developer-east-delhi",
  name: "Website designer and developer in East Delhi",
  metaTitle: "Website Designer & Developer in East Delhi | From ₹999",
  metaDescription: "Freelance website developer based in New Ashok Nagar, East Delhi. Custom and WordPress websites, chatbots and automation for local businesses. From ₹999.",
  title: "Website designer & developer in East Delhi.",
  intro: "Kriyvo AI is based in New Ashok Nagar, on the Noida border of East Delhi. I design and build websites, WordPress and PHP sites, chatbots and automations for shops, clinics, coaching centres, restaurants and service businesses nearby, and you work with me directly from brief to handover.",
  areasHeading: "Areas I work with in East Delhi",
  areas: [
    { name: "New Ashok Nagar", note: "Home base, next to the Blue Line metro" },
    { name: "Mayur Vihar Phase 1, 2 and 3" },
    { name: "Laxmi Nagar" },
    { name: "Preet Vihar" },
    { name: "Patparganj and IP Extension" },
    { name: "Vasundhara Enclave" },
    { name: "Kondli and Gharoli" },
    { name: "Shakarpur and Vinod Nagar" },
  ],
  sections: [
    { heading: "A local designer and developer, not a marketplace profile", text: "Search for a website designer or developer in East Delhi and most results are listings on freelancer marketplaces. Here you get one named developer with a real address, a published portfolio and a written proposal. The person you brief is the person who builds and hands over the site." },
    { heading: "What local businesses usually need", text: "A fast mobile site that shows up for local searches, a clear way to call or WhatsApp, enquiry or booking forms that reach the right person, and pages the owner can update. Where it helps, I add a chatbot that answers common questions or a WhatsApp flow that collects the details you need before you call back." },
    { heading: "How a project runs", text: "We start with a short call or WhatsApp chat about your business and the pages you need. You get a fixed-scope proposal listing deliverables, milestones and exclusions. During the build there are review points, and at the end you get the source files, logins and a walkthrough. All of it happens over WhatsApp, phone and video calls, so there is no need to travel." },
  ],
  services: ["freelance-website-developer-noida", "wordpress-php-development", "ai-chatbot-for-website", "n8n-workflow-automation"],
  faqs: [
    { q: "Are you actually based in East Delhi?", a: `Yes. Kriyvo AI is in ${BUSINESS.locality}, ${BUSINESS.city} ${BUSINESS.postalCode}, in East Delhi near the Noida border. The same address is on the Google Business Profile.` },
    { q: "How much does a website cost?", a: "Fixed website packages start at ₹999 per page; a 5-page business website is ₹4,999 and an e-commerce store ₹9,999. AI chatbots start at ₹1,999 and automation at ₹3,999. Larger custom builds are fixed in a written proposal." },
    { q: "Can you redesign or fix my existing website?", a: "Yes. Redesigns, WordPress fixes, speed improvements and moving a site to new hosting are all common projects." },
    { q: "Will my site show up on Google for local searches?", a: "Every site is built with clean page titles, descriptions, structured data and fast mobile loading, which is the technical groundwork for local search. Rankings also depend on your Google Business Profile, reviews and content, and I can advise on those." },
  ],
  related: { label: "Elsewhere in Delhi NCR? See Noida, Gurgaon and Ghaziabad", to: "/web-developer-delhi-ncr" },
};

export const delhiNcr: LocalPage = {
  path: "/web-developer-delhi-ncr",
  name: "Freelance website designer and developer in Delhi NCR",
  metaTitle: "Website Designer in Noida, Gurgaon & Delhi NCR | From ₹999",
  metaDescription: "Freelance web, WordPress and PHP developer for Noida, Gurgaon, Ghaziabad and Delhi NCR. Websites from ₹999, plus chatbots and n8n automation.",
  title: "Website designer & developer for Delhi NCR.",
  intro: "I design and build websites, WordPress and PHP sites, AI chatbots and workflow automation for businesses in Noida, Gurgaon, Ghaziabad and across Delhi NCR. Kriyvo AI is based in New Ashok Nagar, East Delhi, a short distance from Noida, and you work with the developer directly: no account managers and no outsourcing.",
  areasHeading: "Where I work across Delhi NCR",
  areas: [
    { name: "Noida", note: "Across the border from the studio, including Sector 18, Sector 62 and Sector 63" },
    { name: "Greater Noida", note: "Including Greater Noida West" },
    { name: "Ghaziabad", note: "Indirapuram, Vaishali and Kaushambi" },
    { name: "East Delhi", note: "The home area: Mayur Vihar, Laxmi Nagar, Preet Vihar" },
    { name: "Gurgaon (Gurugram)", note: "Including Cyber City, Sohna Road and Golf Course Road" },
    { name: "Faridabad and the rest of Delhi", note: "South, West and North Delhi included" },
  ],
  sections: [
    { heading: "Websites, WordPress and PHP", text: "Custom sites in React, Next.js or PHP for businesses that want a site built around their brand, and WordPress sites for teams that want to edit pages themselves. I also take on existing WordPress and PHP sites that need fixing, speeding up, extending or moving to new hosting." },
    { heading: "Chatbots, WhatsApp and automation", text: "Many NCR businesses get most of their enquiries on WhatsApp. I build website chatbots that answer from your own content, WhatsApp flows that qualify leads from ads, and n8n workflows that send enquiries into your CRM, sheet or inbox so nothing is copied by hand." },
    { heading: "One process, wherever you are", text: "Every project runs remotely over WhatsApp, phone and video calls, so a client in Gurgaon or Faridabad gets exactly the same service as one in Noida. Every project gets a fixed-scope proposal, review points during the build and a documented handover with source files." },
  ],
  services: ["freelance-website-developer-noida", "wordpress-php-development", "ai-chatbot-for-website", "n8n-workflow-automation", "ai-automation"],
  faqs: [
    { q: "Do you work with businesses in Noida and Gurgaon?", a: "Yes. Kriyvo AI is in New Ashok Nagar, East Delhi, next to Noida, and works with clients across Noida, Greater Noida, Ghaziabad, Gurgaon, Faridabad and Delhi." },
    { q: "Are you a freelancer or an agency?", a: "An independent studio run by one web developer and AI automation engineer. You brief, review and get your handover from the same person." },
    { q: "How much does a website cost in Delhi NCR?", a: "Fixed website packages start at ₹999 per page; a 5-page business website is ₹4,999 and an e-commerce store ₹9,999, delivered in 1–5 days. AI chatbots start at ₹1,999 and n8n automation at ₹3,999." },
    { q: "Do you build WordPress sites or only custom code?", a: "Both. WordPress suits teams that want to edit content themselves; custom React, Next.js or PHP suits sites with specific design or functionality needs. The proposal recommends one based on your brief." },
  ],
  related: { label: "Based in East Delhi? See the East Delhi page", to: "/website-developer-east-delhi" },
};

/** Page meta plus Service, Breadcrumb and FAQ structured data for a location page. */
export function localHead(page: LocalPage, areaServed: string[]) {
  const url = `${BUSINESS.url}${page.path}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: page.name, description: page.metaDescription, serviceType: "Web development", url, provider: { "@id": `${BUSINESS.url}/#business` }, areaServed: areaServed.map(name => ({ "@type": "Place", name })), offers: { "@type": "Offer", priceCurrency: "INR", price: "999", description: "Website packages from ₹999 per page" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BUSINESS.url}/` }, { "@type": "ListItem", position: 2, name: page.name, item: url }] },
    { "@type": "FAQPage", mainEntity: page.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ] };
  return { ...pageMeta(page.metaTitle, page.metaDescription), scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }] };
}
