/**
 * Real buyer questions per service, answered with facts stated elsewhere on the site.
 * Rendered on each service page and published as FAQPage structured data.
 */
export type Faq = { q: string; a: string };

const SHARED: Faq[] = [
  { q: "How much does it cost?", a: "Website packages start at ₹999 per page, with a 5-page business website at ₹4,999 and an e-commerce store at ₹9,999 (see the pricing page). AI chatbots start at ₹1,999, WhatsApp AI chatbots at ₹4,999 and n8n automation at ₹3,999. Larger custom systems are quoted to scope, with the price fixed in a written proposal before work begins." },
  { q: "Do you work with clients outside Delhi?", a: "Yes. Kriyvo AI is based in New Ashok Nagar, New Delhi and works with clients across Delhi NCR, India and remotely worldwide. Briefs, reviews and handover all work over WhatsApp, email and video calls." },
];

export const serviceFaqs: Record<string, Faq[]> = {
  "ai-automation": [
    { q: "What business tasks can AI automation handle?", a: "Repeatable work that moves between tools: interpreting feedback, enriching and routing leads, drafting follow-ups, preparing reports and updating a CRM. Language models handle the reading and writing; ordinary code handles predictable data movement and rules." },
    { q: "Will a person still review the important decisions?", a: "Yes. Workflows include review points and exception handling for anything consequential, so a person approves the decisions that matter while routine steps run automatically." },
    { q: "How do we know if the automation is working?", a: "Every build starts as a pilot measured against a sample of your real manual tasks — correct outcomes, exceptions, processing time and cost per task — before it is expanded." },
    ...SHARED,
  ],
  "n8n-workflow-automation": [
    { q: "What is n8n and why use it?", a: "n8n is a workflow automation platform that connects apps and APIs through visual workflows, with room for custom code and AI steps. It keeps the logic easy to inspect and change, which makes it a good fit for business processes that evolve." },
    { q: "What happens when an API or step fails?", a: "Workflows are built with retry rules, stable identifiers and a visible place for unresolved errors, so a timeout doesn't create duplicate records or repeated messages." },
    { q: "Can n8n connect to my CRM, WhatsApp and email?", a: "Yes. n8n workflows can connect CRMs, Google Sheets, Gmail, WhatsApp, Telegram, webhooks and custom APIs. The exact integrations are agreed in your proposal." },
    ...SHARED,
  ],
  "llm-ai-agent-development": [
    { q: "What is the difference between a chatbot and an AI agent?", a: "A chatbot answers questions. An AI agent can also take actions — look up records, call tools, update systems — within limits you define. Agents are built with explicit states, restricted tools and approval steps rather than open-ended loops." },
    { q: "Do I need RAG (retrieval) for my use case?", a: "Only if the AI must answer from your own changing documents. Simple classification or extraction often needs a single structured model call; retrieval is added when answers must be grounded in approved content." },
    { q: "Which AI models do you use?", a: "Models such as OpenAI GPT and Anthropic Claude, with frameworks like LangChain and LangGraph and vector databases like Pinecone and Qdrant. The choice depends on the task, cost and data requirements." },
    ...SHARED,
  ],
  "ai-chatbot-for-website": [
    { q: "Will the chatbot make things up?", a: "It is built to answer from your approved content — website pages, brochures, PDFs and policies — with an honest fallback when the content can't support an answer, and a handoff to your team." },
    { q: "Can the chatbot capture leads?", a: "Yes. It can collect names, contact details and requirements, then send them to your CRM, email or WhatsApp so your team can follow up." },
    { q: "Can the same assistant work on WhatsApp?", a: "Yes. The same knowledge base can power a website widget and a WhatsApp assistant, with human handoff on both." },
    ...SHARED,
  ],
  "freelance-website-developer-noida": [
    { q: "Do you build custom websites or use templates?", a: "Custom. Each site is designed around your brand, audience and enquiry flow and built in React, Next.js or PHP — fast on mobile and connected to your forms, CRM and automations." },
    { q: "Can my website connect to WhatsApp and my CRM?", a: "Yes. Enquiry and booking forms can send leads straight to WhatsApp, email or your CRM, and can trigger automated follow-ups." },
    { q: "Will I own the website and its code?", a: "Yes. Source files, assets and setup documentation are agreed as part of the handover, along with a walkthrough of how everything works." },
    ...SHARED,
  ],
  "wordpress-php-development": [
    { q: "Can my team edit the WordPress site themselves?", a: "Yes. WordPress is set up so your team can update pages, posts and images on their own, with a structure that keeps the design consistent as content changes." },
    { q: "Can you fix or speed up my existing WordPress site?", a: "Yes. Speed improvements, bug fixes, plugin issues and migrations of existing WordPress or PHP sites are all part of this service." },
    { q: "When do you use custom PHP instead of a plugin?", a: "When an off-the-shelf plugin can't handle the job cleanly — custom forms, integrations, dashboards or data imports — a custom theme, plugin or core PHP and MySQL code is the more reliable option." },
    ...SHARED,
  ],
};
