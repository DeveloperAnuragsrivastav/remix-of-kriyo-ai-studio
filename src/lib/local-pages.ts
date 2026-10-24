import type { Faq } from "@/lib/service-faqs";
import { BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/page-meta";

/**
 * Location pages. One page for the home area (East Delhi) and one hub for the wider region,
 * rather than a near-identical page per city, which Google treats as doorway pages.
 */
export type ComparisonTable = {
  caption?: string;
  headers: string[];
  rows: string[][];
};

export type EditorialBlock = {
  heading: string;
  lead?: string;
  paragraphs: string[];
  bullets?: string[];
  highlight?: string;
};

export type ProcessStep = {
  step: string;
  title: string;
  desc: string;
};

export type PricingTier = {
  name: string;
  price: string;
  period?: string;
  desc: string;
  features: string[];
  isPopular?: boolean;
};

export type DeliverableItem = {
  title: string;
  desc: string;
  badge?: string;
  points?: string[];
};

export type LocalPage = {
  path: string;
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
  related?: { label: string; to: string };
  serviceType?: string;
  startingPrice?: string;
  startingOffer?: string;
  priceNote?: string;
  table?: ComparisonTable;
  editorialBlocks?: EditorialBlock[];
  processSteps?: ProcessStep[];
  pricingTiers?: PricingTier[];
  deliverables?: DeliverableItem[];
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

export const aiBangalore: LocalPage = {
  path: "/ai-developer-in-bangalore",
  name: "Freelance AI automation developer in Bangalore",
  metaTitle: "Freelance AI Automation Developer in Bangalore | Kriyvo AI",
  metaDescription: "Need AI automation in Bangalore? Kriyvo AI offers direct freelance chatbot, WhatsApp lead qualification, n8n and Python workflow projects.",
  title: "Freelance AI automation developer in Bangalore.",
  intro: "Bengaluru startups and product teams often have enquiries, support questions and routine handoffs spread across chat, forms and internal tools. Kriyvo AI helps address these bottlenecks with practical AI chatbots and workflow automation, scoped to your process rather than a one-size-fits-all package. Kriyvo AI is an independent freelance practice. You work one-to-one with the developer building your project, from initial discussion through implementation and testing. Projects for Bengaluru businesses are planned and delivered remotely, with online reviews and handover.",
  areasHeading: "Areas served across Bengaluru & Karnataka",
  areas: [
    { name: "Koramangala", note: "Startups & tech hubs" },
    { name: "Indiranagar", note: "Product & growth teams" },
    { name: "HSR Layout", note: "Early-stage & venture teams" },
    { name: "Whitefield", note: "IT corridors & enterprises" },
    { name: "Electronic City", note: "Tech parks & operations" },
    { name: "Jayanagar & JP Nagar" },
    { name: "Bellandur & Outer Ring Road" },
    { name: "Remote delivery across Bengaluru", note: "Direct online coordination" },
  ],
  sections: [
    {
      heading: "Chatbots and automation for Bengaluru teams",
      text: "Start with a concrete task: qualifying leads, answering repeat questions, routing requests or moving information between tools.\n\nDepending on your use case, a project may include: AI chatbots that answer from agreed FAQs or knowledge sources, collect details and pass conversations to a human when needed; WhatsApp lead qualification with relevant intent capture and routing for sales follow-up; n8n or Python workflow automation connecting lead intake, notifications, CRM, and routine data processing; and voice agents for suitable appointment call flows. We clarify the workflow, systems involved, and where a person should take over.",
    },
    {
      heading: "Scope, pricing and timelines",
      text: "A suitable starter AI-chatbot scope starts at ₹1,999. This is a starting price, not a promise that every feature or integration is included; final inclusions depend on requirements.\n\nAI and automation work typically takes 1–10 days, depending on complexity, integrations and testing. Websites are secondary: landing pages start at ₹999 and business websites at ₹4,999, with scope-dependent inclusions.",
    },
    {
      heading: "A direct, remote freelance process",
      text: "You collaborate directly with the independent developer building your solution. We begin with a focused discussion of your tools and current bottlenecks, define deliverables and timeline, then build, test and document your handover with full access and walkthrough.",
    },
  ],
  services: ["ai-automation", "ai-chatbot-for-website", "n8n-workflow-automation", "llm-ai-agent-development"],
  faqs: [
    { q: "Can you build a WhatsApp flow that qualifies leads?", a: "Yes. A suitable flow can ask agreed questions, collect details and route enquiries for follow-up. Setup depends on the process and integrations." },
    { q: "Do you work with Bengaluru companies in person?", a: "Projects are served remotely, with direct coordination between you and the independent freelancer." },
    { q: "How much does an AI chatbot cost?", a: "A suitable starter scope begins at ₹1,999. Price depends on knowledge sources and integrations; see the pricing page for inclusions." },
    { q: "How long does automation take?", a: "Typical AI and automation timelines are 1–10 days, depending on scope, integrations and testing. The timeline is confirmed after requirements are clear." },
  ],
  serviceType: "AI automation & chatbot development",
  startingPrice: "1999",
  startingOffer: "AI chatbot starter packages from ₹1,999",
  priceNote: "AI chatbots from ₹1,999",
};

export const aiMumbai: LocalPage = {
  path: "/ai-developer-in-mumbai",
  name: "AI automation freelancer in Mumbai",
  metaTitle: "AI Automation Freelancer in Mumbai | Kriyvo AI",
  metaDescription: "Practical AI chatbots, WhatsApp lead qualification and workflow automation for Mumbai businesses, delivered remotely by an independent freelancer.",
  title: "AI automation freelancer in Mumbai for better lead handling.",
  intro: "When enquiries arrive through your website, WhatsApp and social channels, slow or inconsistent follow-up can mean missed opportunities. Kriyvo AI helps Mumbai businesses improve lead handling with practical chatbots, routing and workflow automation. Kriyvo AI is an independent freelance practice. You work directly one-to-one with the developer from scoping through build and handover. Mumbai projects are coordinated remotely from discovery through launch.",
  areasHeading: "Serving businesses across Mumbai & MMR",
  areas: [
    { name: "Bandra & BKC", note: "Corporate & finance" },
    { name: "Andheri East & West", note: "Media, commercial & tech" },
    { name: "South Mumbai", note: "Nariman Point & Fort" },
    { name: "Lower Parel & Worli", note: "Studios & agencies" },
    { name: "Powai", note: "Startups & tech incubators" },
    { name: "Thane & Navi Mumbai" },
    { name: "Goregaon & Malad" },
    { name: "Remote delivery across MMR", note: "Direct 1-on-1 collaboration" },
  ],
  sections: [
    {
      heading: "Practical automation for your enquiry flow",
      text: "Each project is scoped to your process and tools. Depending on requirements, it may include website chatbots that answer common questions and collect contact details, WhatsApp lead qualification that directs suitable enquiries to the next step, CRM and lead routing to reduce repetitive copying, and n8n or Python workflows for handoffs and routine notifications. For Mumbai service businesses and professional practices, a useful flow captures requested services and callback details before routing to human staff.",
    },
    {
      heading: "Starting prices and timelines",
      text: "Suitable starter AI-chatbot scope starts at ₹1,999. Landing pages start at ₹999, business websites at ₹4,999, and e-commerce websites at ₹9,999. These are starting prices; final inclusions and cost depend on scope.\n\nA landing page typically takes 1–2 days; a business website, 3–5 days. AI and automation work usually takes 1–10 days, depending on scope, integrations and testing.",
    },
    {
      heading: "A direct, practical process",
      text: "Discuss where enquiries come from, what should happen next and which tasks are repetitive. Kriyvo AI helps define a suitable scope, confirm deliverables and timing, then builds and tests the agreed workflow for handover.",
    },
  ],
  services: ["ai-automation", "ai-chatbot-for-website", "n8n-workflow-automation", "llm-ai-agent-development"],
  faqs: [
    { q: "Do you work with businesses in Mumbai?", a: "Yes. Mumbai projects are served remotely, with communication and delivery handled online." },
    { q: "What can an AI automation freelancer help automate?", a: "Depending on your tools and requirements: chatbot enquiries, WhatsApp lead qualification, CRM or lead routing, and n8n or Python workflows." },
    { q: "How much does a chatbot or automation project cost?", a: "Suitable starter chatbot scope starts at ₹1,999. Integrations, channels, information sources and testing affect the quote; confirm inclusions via pricing." },
    { q: "How long does AI automation take?", a: "Typical work takes 1–10 days, depending on requirements, integrations and testing. The timeline is confirmed after scoping." },
  ],
  serviceType: "AI automation & chatbot development",
  startingPrice: "1999",
  startingOffer: "AI chatbot starter packages from ₹1,999",
  priceNote: "AI chatbots from ₹1,999",
};

export const webHyderabad: LocalPage = {
  path: "/freelance-web-designer-in-hyderabad",
  name: "Freelance web designer in Hyderabad",
  metaTitle: "Freelance Web Designer in Hyderabad | Kriyvo AI",
  metaDescription: "Conversion-focused websites for Hyderabad startups, SaaS, clinics and consultants. Work directly with Kriyvo AI, an independent freelancer, remotely.",
  title: "Freelance web designer in Hyderabad for websites that convert.",
  intro: "A website should do more than look polished: it should help visitors understand your offer and take the next step. Kriyvo AI works directly with Hyderabad businesses on websites and landing pages designed to turn interest into calls, bookings, or WhatsApp enquiries. For a startup, that may mean explaining an offer and capturing leads. A SaaS page can clarify product value and invite demo requests; a clinic site can simplify appointment enquiries; a consultant’s website can build trust and encourage contact. Kriyvo AI is an independent freelance practice. You work directly with the developer from brief to handover, with Hyderabad projects coordinated online.",
  areasHeading: "Serving businesses across Hyderabad & Telangana",
  areas: [
    { name: "Hitec City", note: "Tech & product startups" },
    { name: "Gachibowli", note: "Software & SaaS hubs" },
    { name: "Madhapur & Kondapur" },
    { name: "Jubilee Hills & Banjara Hills", note: "Clinics & premium brands" },
    { name: "Begumpet & Secunderabad" },
    { name: "Kukatpally & Miyapur" },
    { name: "Financial District" },
    { name: "Remote delivery across Hyderabad", note: "Direct developer updates" },
  ],
  sections: [
    {
      heading: "Web design shaped around your goal",
      text: "Page structure and functionality are scoped to your audience and desired action. Depending on the brief, a project may include mobile-first layouts, enquiry forms, WhatsApp links, and clear calls to action. Websites can use WordPress or PHP, or React/Next.js where appropriate. UI/UX and logo or brand design can also be discussed when relevant.",
    },
    {
      heading: "Starting prices and typical timelines",
      text: "Landing pages start at ₹999 (typical delivery 1–2 days). Business websites start at ₹4,999 (typical delivery 3–5 days). E-commerce projects start at ₹9,999. Suitable starter AI chatbot projects start at ₹1,999, taking 1–10 days depending on scope, integrations, and testing.\n\nThese are scope-dependent starting prices. WhatsApp lead qualification, CRM or lead handling, voice agents, and n8n/Python automation can be scoped separately.",
    },
    {
      heading: "Direct, remote collaboration",
      text: "Discuss the brief one-to-one with the independent freelancer behind Kriyvo AI. Agree on the audience, goals, scope, and timeline, then review the design and build before launch.",
    },
  ],
  services: ["freelance-website-developer-noida", "wordpress-php-development", "ai-chatbot-for-website", "n8n-workflow-automation"],
  faqs: [
    { q: "Do you work with clients in Hyderabad?", a: "Yes. Kriyvo AI serves Hyderabad projects remotely; no local office or in-person service is claimed." },
    { q: "How much does a website cost?", a: "Landing pages start at ₹999, business websites at ₹4,999, and e-commerce at ₹9,999. Final pricing depends on scope; see the pricing page for inclusions." },
    { q: "How long does a website take?", a: "A landing page typically takes 1–2 days and a business website 3–5 days, depending on scope, content, and feedback." },
    { q: "Can you add WhatsApp enquiries or automation?", a: "Yes, if relevant. Chatbots, WhatsApp lead qualification, CRM/lead handling, and automation can be scoped separately; integrations and testing affect timing." },
  ],
  serviceType: "Web development & design",
  startingPrice: "999",
  startingOffer: "Landing pages from ₹999",
  priceNote: "Websites from ₹999",
};

export const webChennai: LocalPage = {
  path: "/web-designer-in-chennai",
  name: "Freelance web designer in Chennai",
  metaTitle: "Freelance Web Designer in Chennai | Kriyvo AI",
  metaDescription: "Need a freelance web designer in Chennai? Get a mobile-friendly business website, landing page or e-commerce build with direct, remote service from Kriyvo AI.",
  title: "Freelance web designer in Chennai for business websites.",
  intro: "Kriyvo AI provides direct, one-to-one website design and development for Chennai businesses, working remotely from scope through build and handover. Kriyvo AI is the public brand of an independent freelance practice, and projects are coordinated online. A training institute may need clear course details and enquiry forms; a professional practice may need focused service pages; a retailer may want a product catalogue or online store. For manufacturers and IT businesses, the site can explain capabilities and make enquiries straightforward. The design and features are scoped to the business rather than added by default.",
  areasHeading: "Serving businesses across Chennai & Tamil Nadu",
  areas: [
    { name: "OMR (IT Corridor)", note: "Tech & service companies" },
    { name: "Guindy & Ekkattuthangal", note: "Commercial & industrial" },
    { name: "T. Nagar & Nungambakkam", note: "Retail & professional practices" },
    { name: "Anna Nagar" },
    { name: "Velachery & Adyar" },
    { name: "Ambattur Industrial Estate" },
    { name: "Porur & Mount Road" },
    { name: "Remote delivery across Chennai", note: "Direct developer updates" },
  ],
  sections: [
    {
      heading: "Website design and development for Chennai businesses",
      text: "Choose a landing page for one service or campaign, a business website for multiple services and essential company information, or an e-commerce build for selling products online. Projects may use WordPress or PHP, or React and Next.js where the requirements suit a custom build. UI/UX and logo or brand work are also available by scope.\n\nEnquiry handling can include an AI chatbot, WhatsApp lead qualification, CRM connections, or n8n/Python automation as optional additions.",
    },
    {
      heading: "Starting prices and typical timelines",
      text: "Landing pages start at ₹999 (typically 1–2 days). Business websites start at ₹4,999 (typically 3–5 days). E-commerce websites start at ₹9,999. Suitable starter AI-chatbot projects start at ₹1,999. AI and automation work typically takes 1–10 days, depending on scope, integrations and testing.",
    },
    {
      heading: "Remote collaboration, from brief to handover",
      text: "Share your business type, audience and website goals. Kriyvo AI will discuss a suitable scope, timeline and price directly with you. After the scope is agreed, design and development proceed with feedback, followed by checks of agreed functions and handover.",
    },
  ],
  services: ["freelance-website-developer-noida", "wordpress-php-development", "ai-chatbot-for-website", "n8n-workflow-automation"],
  faqs: [
    { q: "Do you work with clients in Chennai?", a: "Yes. Kriyvo AI serves Chennai projects remotely; this is not a Chennai office or in-person service location." },
    { q: "What does a website cost?", a: "Landing pages start at ₹999, business websites at ₹4,999 and e-commerce at ₹9,999. Final pricing depends on scope; see the pricing page for inclusions." },
    { q: "How long does a website take?", a: "Typical timings are 1–2 days for a landing page and 3–5 days for a business website. Scope, content and feedback can affect delivery." },
    { q: "Can you add a chatbot or WhatsApp lead flow?", a: "These can be scoped when suitable. Starter AI-chatbot work starts at ₹1,999; integrations and testing affect the final quote and timing." },
  ],
  serviceType: "Web development & design",
  startingPrice: "999",
  startingOffer: "Landing pages from ₹999",
  priceNote: "Websites from ₹999",
};

export const aiDelhi: LocalPage = {
  path: "/ai-developer-in-delhi",
  name: "Freelance AI developer in Delhi NCR",
  metaTitle: "Freelance AI Developer in Delhi NCR | Kriyvo AI",
  metaDescription: "Improve lead handling with chatbots, WhatsApp flows and automation. Work directly with an independent AI freelancer serving Delhi NCR.",
  title: "Freelance AI automation developer in Delhi NCR.",
  intro: "Website, WhatsApp and phone enquiries can be difficult to track consistently. Kriyvo AI helps Delhi NCR businesses improve lead handling with practical chatbots, qualification flows and workflow automation, shaped around your process. Kriyvo AI is an independent freelance practice based in New Ashok Nagar, Delhi. You work one-to-one with the developer from scoping through handover. Projects across Delhi NCR, including Noida and Gurgaon, are coordinated remotely.",
  areasHeading: "Where I work across Delhi NCR",
  areas: [
    { name: "Noida", note: "Sector 18, Sector 62 and Sector 63" },
    { name: "Gurgaon (Gurugram)", note: "Cyber City, Golf Course Road" },
    { name: "East Delhi", note: "Home base in New Ashok Nagar, Mayur Vihar, Laxmi Nagar" },
    { name: "South Delhi", note: "Saket, Nehru Place, Connaught Place" },
    { name: "Greater Noida", note: "Including Greater Noida West" },
    { name: "Ghaziabad & Faridabad" },
    { name: "North & West Delhi" },
    { name: "Direct studio & remote delivery" },
  ],
  sections: [
    {
      heading: "Chatbots, qualification and automation",
      text: "Choose a focused solution based on your enquiry flow, tools and goals. Suitable project elements include AI chatbots to answer common questions from agreed information and collect lead details, WhatsApp qualification to ask relevant questions and organise prospects for follow-up, CRM and lead workflows to reduce manual copying, and n8n and Python automation for repetitive tasks.\n\nNot every project needs every feature. Integrations, information sources and testing are agreed as part of the scope.",
    },
    {
      heading: "Timelines and project steps",
      text: "Typical delivery is 1–2 days for a landing page, 3–5 days for a business website, and 1–10 days for AI or automation work, depending on scope, integrations, content and testing. Starter AI chatbots begin at ₹1,999; landing pages start at ₹999, business websites at ₹4,999, and e-commerce websites at ₹9,999.",
    },
    {
      heading: "Direct freelance coordination",
      text: "You work directly with the developer in New Ashok Nagar, East Delhi. Projects across Delhi NCR are coordinated remotely or with online reviews, ensuring fast feedback and clear milestones without agency account managers.",
    },
  ],
  services: ["ai-automation", "ai-chatbot-for-website", "n8n-workflow-automation", "llm-ai-agent-development"],
  faqs: [
    { q: "Do you serve businesses across Delhi NCR?", a: "Yes. Work is delivered remotely across the region. The freelancer is based in New Ashok Nagar, Delhi." },
    { q: "What does an AI chatbot or automation project cost?", a: "Suitable starter AI-chatbot work starts at ₹1,999. Final pricing depends on workflow, integrations and testing. See pricing and share your requirements for a scope-based quote." },
    { q: "Can you connect a chatbot to WhatsApp or a CRM?", a: "Possibly, depending on the platforms, access and workflow. Share your tools to assess feasibility and scope before work begins." },
  ],
  serviceType: "AI automation & chatbot development",
  startingPrice: "1999",
  startingOffer: "AI chatbot starter packages from ₹1,999",
  priceNote: "AI chatbots from ₹1,999",
};

export const webMumbai: LocalPage = {
  path: "/freelance-web-designer-in-mumbai",
  name: "Freelance web designer in Mumbai",
  metaTitle: "Freelance Web Designer in Mumbai | Kriyvo AI",
  metaDescription: "Need a website in Mumbai? Kriyvo AI offers direct freelance design and development for landing pages, business sites and e-commerce, with remote delivery.",
  title: "Freelance web designer in Mumbai for business websites.",
  intro: "Need a professional website for your Mumbai business? Kriyvo AI works directly with you, one-to-one, as an independent freelance web designer. Projects for businesses and professionals in Mumbai are delivered remotely, with the design and build shaped around your goals and customers. This page focuses on website design and development: landing pages for a specific offer, business websites that explain your services, and e-commerce storefronts. Whether you work in retail, media, fintech, professional services or a startup, the project begins with what your site needs to communicate and help visitors do.",
  areasHeading: "Web design for businesses across Mumbai",
  areas: [
    { name: "Bandra, Khar & Santacruz", note: "Creative studios & retail" },
    { name: "Andheri & Juhu", note: "Media, production & agencies" },
    { name: "South Mumbai", note: "Fort, Colaba & Marine Lines" },
    { name: "Lower Parel & Worli", note: "Corporate & lifestyle brands" },
    { name: "Powai & Vikhroli", note: "Tech & venture hubs" },
    { name: "Malad, Kandivali & Borivali" },
    { name: "Thane & Navi Mumbai" },
    { name: "Remote delivery across Mumbai", note: "Direct developer updates" },
  ],
  sections: [
    {
      heading: "Landing pages, business sites and e-commerce",
      text: "Landing pages from ₹999 for a campaign or single service; business websites from ₹4,999 to present your business and collect enquiries; e-commerce websites from ₹9,999 for selling products online.\n\nDepending on your needs, the website may be built with WordPress/PHP or React/Next.js, with mobile-friendly layouts, enquiry forms, WhatsApp links, and SEO-ready structure.",
    },
    {
      heading: "A direct freelance process",
      text: "You discuss the brief directly with the independent freelancer building the website. First, agree on the site’s goals and requirements; then confirm the written scope, price and timeline. A landing page typically takes 1–2 days; a business website typically takes 3–5 days when content and approvals are ready.",
    },
    {
      heading: "Focused on web design",
      text: "The focus here is web design—not AI automation. Chatbots, WhatsApp lead qualification or workflow automation may be discussed separately as suitable add-ons, but are not assumed to come with a website package.",
    },
  ],
  services: ["freelance-website-developer-noida", "wordpress-php-development", "ai-chatbot-for-website", "n8n-workflow-automation"],
  faqs: [
    { q: "What does a freelance web designer in Mumbai charge?", a: "Landing pages start at ₹999, business websites at ₹4,999 and e-commerce websites at ₹9,999. Final inclusions and cost depend on scope; see pricing." },
    { q: "Can you work with my Mumbai business remotely?", a: "Yes. Kriyvo AI serves Mumbai projects remotely and coordinates online; this does not imply a Mumbai office or in-person service." },
    { q: "How long does a website take?", a: "A landing page typically takes 1–2 days and a business website 3–5 days, depending on scope and the availability of content and feedback." },
    { q: "Can I choose WordPress or a custom build?", a: "WordPress/PHP and React/Next.js are possible approaches. The suitable option depends on your site’s goals and features and can be agreed before work begins." },
  ],
  serviceType: "Web development & design",
  startingPrice: "999",
  startingOffer: "Landing pages from ₹999",
  priceNote: "Websites from ₹999",
};

/** Page meta plus Service, Breadcrumb and FAQ structured data for a location page. */
export function localHead(page: LocalPage, areaServed: string[]) {
  const url = `${BUSINESS.url}${page.path}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "Service", name: page.name, description: page.metaDescription, serviceType: page.serviceType ?? "Web development", url, provider: { "@id": `${BUSINESS.url}/#business` }, areaServed: areaServed.map(name => ({ "@type": "Place", name })), offers: { "@type": "Offer", priceCurrency: "INR", price: page.startingPrice ?? "999", description: page.startingOffer ?? "Website packages from ₹999 per page" } },
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BUSINESS.url}/` }, { "@type": "ListItem", position: 2, name: page.name, item: url }] },
    { "@type": "FAQPage", mainEntity: page.faqs.map(f => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
  ] };
  return { ...pageMeta(page.metaTitle, page.metaDescription), scripts: [{ type: "application/ld+json", children: JSON.stringify(schema) }] };
}
