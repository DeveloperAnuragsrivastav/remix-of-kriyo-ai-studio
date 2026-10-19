import caseBmrc from "@/assets/case-bmrc.jpg";
import caseGignaati from "@/assets/case-gignaati.jpg";
import caseOutreach from "@/assets/case-outreach.jpg";
import caseVoice from "@/assets/case-voice.jpg";

const IMG = "https://www.anuragsrivastav.in/media/portfolio/";

export const caseStudies: {
  client: string; title: string; problem: string; built: string; stack: string[]; outcome: string; image: string;
}[] = [
  {
    client: "BMRC Hospital",
    title: "Multilingual AI feedback routing",
    problem: "Patient feedback arrived in multiple languages and needed interpretation before it could reach the right operational team — a standalone sentiment score still left someone moving it between tools.",
    built: "An n8n workflow that interprets multilingual feedback with OpenAI, analyzes sentiment, routes tickets in Supabase and notifies the right team over Gmail — connecting language processing directly to action.",
    stack: ["n8n", "OpenAI", "Supabase", "Gmail API"],
    outcome: "Automated end-to-end feedback routing with sentiment analysis and instant notifications.",
    image: caseBmrc,
  },
  {
    client: "Gignaati",
    title: "One-click AI stack deployment",
    problem: "Setting up an AI stack meant manually installing dependencies, preparing containers and checking services — repeated steps that created inconsistent environments and setup errors.",
    built: "An Electron desktop app that automates Docker-based setup of n8n and Ollama, resolves dependencies and runs health checks behind a single starting action.",
    stack: ["Electron.js", "Docker", "Node.js", "Ollama"],
    outcome: "Reported 85% reduction in deployment time, with health monitoring built in.",
    image: caseGignaati,
  },
  {
    client: "Smartians AI",
    title: "AI outreach pipeline",
    problem: "Lead research, enrichment, message drafting and follow-up were disconnected manual tasks with no record of what had already happened to each lead.",
    built: "An n8n + GPT-4 pipeline that enriches authorized lead data, drafts personalized emails, sends through SMTP, follows up on WhatsApp and logs every execution in Supabase.",
    stack: ["n8n", "GPT-4", "Supabase", "SMTP", "Twilio"],
    outcome: "200+ personalized automated emails per day with full execution logging.",
    image: caseOutreach,
  },
  {
    client: "Swaran Soft",
    title: "Real-time AI voice agent",
    problem: "Voice interactions need a continuous path from incoming audio to model processing and back — managing streaming state, interruptions, connection failures and per-stage latency.",
    built: "A real-time conversational voice agent over a persistent WebSocket connection with streaming audio and OpenAI integration, handling interruptions and failures gracefully.",
    stack: ["OpenAI", "WebSockets", "Streaming Audio"],
    outcome: "Reported sub-200ms response latency in a streaming conversation workflow.",
    image: caseVoice,
  },
];

export type Category = "Website Development" | "AI Chatbots & Agents" | "Automation Workflows" | "Voice AI";

export const projects: {
  client: string; sector: string; category: Category; title: string; subtitle: string;
  description: string; deliverables: string[]; stack: string[]; result: string; metric: string; image: string;
}[] = [
  {
    client: "KOCA (by Yuvraj Singh)", sector: "Celebrity Brand", category: "Website Development",
    title: "KOCA — Kitchen of Celebratory Arts",
    subtitle: "Luxury restaurant website & table booking for Yuvraj Singh's flagship venue",
    description: "An immersive gold-on-black digital brand experience with typographic storytelling sections and a frictionless 'Claim Your Table' reservation flow.",
    deliverables: ["Custom luxury visual design system", "Responsive frontend with micro-animations", "Seamless table reservation routing"],
    stack: ["React", "Next.js", "Tailwind CSS", "Luxury UI/UX"],
    result: "A Michelin-calibre digital presence matching an iconic culinary landmark.",
    metric: "Michelin-calibre", image: IMG + "koca-restaurant.jpg",
  },
  {
    client: "Kriyvo AI", sector: "AI Startup", category: "AI Chatbots & Agents",
    title: "Intelligent Website Chatbot & Lead Assistant",
    subtitle: "Grounded knowledge, lead capture & direct CRM integration",
    description: "A custom AI assistant that greets visitors, answers with grounded knowledge, qualifies enterprise leads and offers Book a Demo / Pricing / Features actions synced to CRM.",
    deliverables: ["Branded responsive chat widget", "Instant grounded AI response engine", "Interactive quick-action pills"],
    stack: ["RAG Knowledge Base", "CRM Integration", "Conversational AI"],
    result: "Qualified inbound leads captured 24/7 with zero human latency.",
    metric: "24/7 lead capture", image: IMG + "kriyvo-ai-chatbot.jpg",
  },
  {
    client: "Aurum Conventions", sector: "B2B Event Venue", category: "Automation Workflows",
    title: "AI Personalized Cold Outreach Pipeline",
    subtitle: "From lead extraction & vector research to tailored email dispatch",
    description: "Autonomous B2B outreach engine: embeds venue brochures in Pinecone, researches prospects, writes bespoke hooks with GPT-4 and dispatches HTML emails with full run logging.",
    deliverables: ["Pinecone embedding pipeline", "Multi-node n8n research workflow", "Dynamic prompt chains for personalization"],
    stack: ["n8n", "OpenAI GPT-4", "Pinecone", "HTML Email"],
    result: "Hours of manual research replaced by 100% personalized automated outreach.",
    metric: "100% personalized", image: IMG + "aurum-conventions-outreach.jpg",
  },
  {
    client: "Gignaati", sector: "E-Commerce & Services", category: "AI Chatbots & Agents",
    title: "WhatsApp Bot & Lead Qualification Funnel",
    subtitle: "Click-to-WhatsApp ad automation with real-time sales handoff",
    description: "A Python/FastAPI WhatsApp engine wired to Meta ads: collects details, offers budget-tier buttons, tags CRM profiles and hands off to sales with an automatic 24h bot pause.",
    deliverables: ["WhatsApp Business setup & Meta verification", "FastAPI webhook handler & async router", "Interactive buttons boosting completion 3x"],
    stack: ["Python", "FastAPI", "WhatsApp Business API"],
    result: "Response time slashed from 4 hours to under 5 seconds.",
    metric: "4h → <5s", image: IMG + "gignaati-whatsapp-bot.jpg",
  },
  {
    client: "Confidential Enterprise", sector: "NDA Protected", category: "Voice AI",
    title: "Autonomous AI Phone Calling Agent",
    subtitle: "Retell AI, Qdrant RAG, calendar booking & Telegram transcripts",
    description: "A voice agent holding natural conversations grounded in internal docs, booking appointments in Google Calendar and dispatching call summaries to Telegram.",
    deliverables: ["Sub-250ms conversational latency", "Drive → Qdrant vectorization pipeline", "Google Calendar scheduling integration"],
    stack: ["Retell AI", "Qdrant", "Google Calendar API", "Telegram Bot"],
    result: "80%+ of incoming consultations and bookings automated.",
    metric: "80%+ automated", image: IMG + "automated-calling-agent.jpg",
  },
  {
    client: "BMRC Hospital", sector: "Healthcare AI", category: "Automation Workflows",
    title: "AI Patient Feedback & Escalation Pipeline",
    subtitle: "QR-triggered multilingual feedback, AI sentiment & instant escalation",
    description: "Patients scan ward QR codes to submit feedback; n8n classifies department and sentiment with LLMs and alerts superintendents via WhatsApp and email.",
    deliverables: ["QR code intake system", "6-step n8n automation with vector storage", "AI severity triage (Critical vs Routine)"],
    stack: ["n8n", "AI Sentiment", "WhatsApp API", "Supabase"],
    result: "Critical grievance response cut from 24+ hours to under 60 seconds.",
    metric: "24h → <60s", image: IMG + "bmrc-hospital-feedback.jpg",
  },
];

export const process = [
  { phase: "Research", title: "Discover & Scope", text: "Deep dive into goals, audience, manual bottlenecks and integration surfaces across APIs and databases." },
  { phase: "Blueprint", title: "Architect & Design", text: "Map system states, prompt boundaries, UI wireframes and fallback logic before production code." },
  { phase: "Engineering", title: "Build & Integrate", text: "Clean code, robust webhooks, vector databases and evaluation benchmarks with human review checkpoints." },
  { phase: "Production", title: "Launch & Handover", text: "Deployment with live monitoring, exception alerts, documentation and complete operational handover." },
];

export const WHATSAPP = "https://wa.me/918851800230?text=Hi%20Kriyo%20AI%2C%20I%27d%20like%20to%20discuss%20a%20project.";
