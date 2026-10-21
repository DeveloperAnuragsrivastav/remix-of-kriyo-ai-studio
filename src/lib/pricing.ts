import { BUSINESS } from "@/lib/business";

/** Fixed-price packages: websites, plus AI chatbots and automation. Anything larger is quoted to scope. */
export type Plan = { name: string; delivery: string; was: string; price: string; unit?: string; popular?: boolean; features: string[]; cta: string; note: string; enquiry: string };

export const CHATBOTS_FROM = "₹1,999";
export const AUTOMATION_FROM = "₹3,999";
export const WEBSITES_FROM = "₹999";

const wa = (text: string) => `https://wa.me/${BUSINESS.phoneE164.slice(1)}?text=${encodeURIComponent(text)}`;

export const websitePlans: Plan[] = [
  {
    name: "Landing page", delivery: "1–2 days", was: "₹2,999", price: "₹999", unit: "per page",
    features: ["Premium page design", "Mobile-friendly design", "On-page SEO setup", "Enquiry / contact form", "Social media integration", "Google Map integration", "WhatsApp integration"],
    cta: "Get started", note: "Domain & hosting not included",
    enquiry: "Hi Kriyvo AI, I'm looking for a landing page / single-page website (Landing page plan). How can we proceed?",
  },
  {
    name: "Business website", delivery: "3–5 days", was: "₹10,000", price: "₹4,999",
    features: ["Up to 5 pages", "Blog setup", "Mobile & SEO-friendly design", "Contact & enquiry forms", "WhatsApp & social media integration", "Google Map integration", "1 month free maintenance"],
    cta: "Book now", note: "No hidden or extra charges",
    enquiry: "Hi Kriyvo AI, I'm looking for a business website (Business website plan). How can we proceed?",
  },
  {
    name: "E-commerce store", delivery: "3–5 days", was: "₹25,000", price: "₹9,999", popular: true,
    features: ["WooCommerce store setup", "Payment gateway & shipping setup", "Order dashboard", "WhatsApp & social media integration", "Mobile & SEO-friendly design", "Contact & enquiry forms", "Google Map integration", "Popup offers + CTA sections", "1 month free maintenance"],
    cta: "Launch store", note: "No hidden or extra charges",
    enquiry: "Hi Kriyvo AI, I'm looking for an e-commerce store (E-commerce store plan). How can we proceed?",
  },
];

export const aiPlans: Plan[] = [
  {
    name: "Website AI chatbot", delivery: "1–2 days", was: "₹4,999", price: "₹1,999",
    features: ["AI chatbot integration on your website", "Trained on your business content", "Automated customer FAQs", "Lead capture & enquiry collection", "24/7 AI customer support", "Mobile-friendly chat widget", "WhatsApp & contact CTA integration"],
    cta: "Get started", note: "AI usage, hosting and third-party charges are extra where applicable.",
    enquiry: "Hi Kriyvo AI, I'd like an estimate.\n\nService: Website AI Chatbot",
  },
  {
    name: "WhatsApp AI chatbot", delivery: "2–4 days", was: "₹9,999", price: "₹4,999",
    features: ["WhatsApp Business API integration", "AI-powered automated replies", "Customer enquiry handling", "Lead capture & qualification", "Automated product & service information", "Custom conversation flows", "Human handover for complex queries", "Basic lead notifications"],
    cta: "Book now", note: "WhatsApp API setup, provider fees and messaging charges are extra where applicable.",
    enquiry: "Hi Kriyvo AI, I'd like an estimate.\n\nService: WhatsApp AI Chatbot",
  },
  {
    name: "AI business automation", delivery: "2–4 days", was: "₹9,999", price: "₹3,999",
    features: ["Automated lead collection", "Google Sheets & email automation", "Website form-to-CRM integration", "Automated follow-up reminders", "Basic n8n workflow setup", "Business process automation", "Notifications & data synchronisation", "Testing & deployment"],
    cta: "Get started", note: "Ideal for automating repetitive daily tasks. Third-party charges are extra.",
    enquiry: "Hi Kriyvo AI, I'd like an estimate.\n\nService: AI Business Automation",
  },
  {
    name: "Custom AI automation", delivery: "5–10 days", was: "₹24,999", price: "₹9,999",
    features: ["Custom AI-powered workflow development", "Advanced n8n & Python automation", "Custom business logic & processing", "Complex API & third-party integrations", "AI agents for specialised tasks", "Custom CRM & internal tool integration", "Multi-platform data synchronisation", "Error handling & workflow testing", "Deployment, source files & handover"],
    cta: "Discuss your project", note: "For specialised workflows and custom-built systems. Final pricing depends on complexity and scope.",
    enquiry: "Hi Kriyvo AI, I'd like an estimate.\n\nService: Custom AI Automation",
  },
];

export const plans = [...websitePlans, ...aiPlans];

export const planLink = (plan: Plan) => wa(plan.enquiry);

/** How an order runs, with how long each step takes. Shown on the pricing page. */
export const timeline: { step: string; time: string; text: string }[] = [
  { step: "Discovery call", time: "30–60 minutes", text: "A call or WhatsApp chat about your business, goals, audience and the pages or features you need." },
  { step: "Package & quote", time: "Same day", text: "You get the right package, the price and relevant past work, with every question answered before you commit." },
  { step: "Written proposal", time: "Within 24 hours", text: "Scope, deliverables, timeline and price in writing. Work starts only after you approve it." },
  { step: "Design & build", time: "1–5 days for websites, 1–10 days for AI", text: "Built section by section, with each part shared for your feedback before moving on." },
  { step: "Testing & revisions", time: "1–2 days", text: "Checked on mobile and desktop for speed and function, then your final changes are made." },
  { step: "Launch & handover", time: "Launch day", text: "Your site or workflow goes live, with logins, source files and a walkthrough handed over." },
];
