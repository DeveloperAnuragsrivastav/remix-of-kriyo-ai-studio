import caseBmrc from "@/assets/case-bmrc.webp";
import caseGignaati from "@/assets/case-gignaati.webp";
import caseOutreach from "@/assets/case-outreach.webp";
import caseVoice from "@/assets/case-voice.webp";
import imgKoca from "@/assets/portfolio/koca-restaurant.webp";
import imgChatbot from "@/assets/portfolio/kriyvo-ai-chatbot.webp";
import imgAurum from "@/assets/portfolio/aurum-conventions-outreach.webp";
import imgGignaati from "@/assets/portfolio/gignaati-whatsapp-bot.webp";
import imgCalling from "@/assets/portfolio/automated-calling-agent.webp";
import imgBmrc from "@/assets/portfolio/bmrc-hospital-feedback.webp";


export const caseStudies: {
  client: string; slug: string; sector: string; title: string; summary: string; problem: string; built: string; steps: [string, string][]; decisions: { title: string; text: string }[]; results: string[]; stack: string[]; outcome: string; image: string;
}[] = [
  {
    client: "BMRC Hospital",
    slug: "bmrc-hospital",
    sector: "Healthcare operations",
    summary: "A multilingual feedback agent that reads patient feedback in any language, scores sentiment, opens a ticket and alerts the right team on Gmail — automatically.",
    steps: [["Feedback in", "Patients submit feedback in their own language through the intake form."], ["Sentiment scan", "OpenAI interprets the message and classifies sentiment and category."], ["Route", "n8n creates a tracked ticket in Supabase and assigns it to the right team."], ["Notify team", "The owning team gets a Gmail notification with the context they need to act."]],
    decisions: [{"title": "Connect interpretation to action", "text": "n8n is the workflow layer and OpenAI handles the language step. Keeping the model's interpretation separate from the routing rules means the categories and owners can change without rewriting prompts."}, {"title": "Make the outcome actionable", "text": "A sentiment score on its own still needs someone to move it between tools. The workflow ends in a routed ticket in Supabase and a Gmail notification — outputs an operations team can act on immediately."}, {"title": "Keep the scope operational", "text": "The system handles patient-feedback operations: triage, routing and escalation. It is deliberately not a clinical decision tool, which keeps it simple, auditable and safe to run."}],
    results: ["Multilingual feedback interpreted and classified automatically", "Every message becomes a tracked ticket with a clear owner", "Instant Gmail notifications to the responsible team", "No manual copying between forms, inboxes and spreadsheets"],
    title: "Connecting patient feedback to the right team",
    problem: "Patient feedback arrived in multiple languages and needed interpretation before it could reach the right operational team — a standalone sentiment score still left someone moving it between tools.",
    built: "An n8n workflow that interprets multilingual feedback with OpenAI, analyzes sentiment, routes tickets in Supabase and notifies the right team over Gmail — connecting language processing directly to action.",
    stack: ["n8n", "OpenAI", "Supabase", "Gmail API"],
    outcome: "Automated end-to-end feedback routing with sentiment analysis and instant notifications.",
    image: caseBmrc,
  },
  {
    client: "Gignaati",
    slug: "gignaati",
    sector: "AI tooling",
    summary: "A desktop app that turns a multi-step AI stack install — Docker, n8n and Ollama — into one click, with dependency checks and live health monitoring.",
    steps: [["One click", "The user starts setup from a simple Electron desktop interface."], ["Containers up", "Docker pulls and starts n8n and Ollama with the right configuration."], ["Health checks", "The app resolves missing dependencies and checks each service is actually ready."], ["Ready", "The AI workflow stack is up and usable, with status shown in the app."]],
    decisions: [{"title": "A desktop interface for a multi-step setup", "text": "Electron.js and Node.js put the whole installation sequence behind a single action, removing the separate manual steps where environments usually drift."}, {"title": "Containers as the foundation", "text": "Docker gives every machine the same n8n and Ollama setup. Containers make the install repeatable and easy to reset."}, {"title": "Health checks, not just exit codes", "text": "A process that started is not the same as a service that works. Health monitoring is built in, so the app only reports ready when the stack is genuinely usable."}],
    results: ["One-click deployment of n8n and Ollama", "Automatic dependency resolution", "Built-in health monitoring for every service", "Reported 85% reduction in deployment time"],
    title: "Simplifying AI tool setup with a desktop app",
    problem: "Setting up an AI stack meant manually installing dependencies, preparing containers and checking services — repeated steps that created inconsistent environments and setup errors.",
    built: "An Electron desktop app that automates Docker-based setup of n8n and Ollama, resolves dependencies and runs health checks behind a single starting action.",
    stack: ["Electron.js", "Docker", "Node.js", "Ollama"],
    outcome: "A repeatable setup process with dependency checks and service health monitoring.",
    image: caseGignaati,
  },
  {
    client: "Outreach automation",
    slug: "outreach-automation",
    sector: "B2B lead generation",
    summary: "An n8n and GPT-4 pipeline that enriches approved leads, writes personalised emails, sends them, follows up on WhatsApp and logs every step in Supabase.",
    steps: [["Approved lead data", "Authorised lead lists enter the workflow from the agreed sources."], ["Enrich", "Each lead is enriched with company and role context."], ["GPT draft", "GPT-4 writes a personalised email from that context."], ["Send + log", "Emails go out over SMTP, follow-ups over WhatsApp, and every run is logged in Supabase."]],
    decisions: [{"title": "The model is one step, not the system", "text": "GPT-4 writes the message; n8n and the connected services handle data movement and delivery. Clear responsibilities make the pipeline easy to debug and extend."}, {"title": "Track state per lead", "text": "Each lead has its own state in Supabase, so a failed step can be retried on its own instead of restarting the whole run — and nobody gets the same email twice."}, {"title": "Measure the right thing", "text": "Sending, delivery, replies and meetings are tracked separately, so volume is never confused with results."}],
    results: ["Research, drafting, sending and follow-up in one workflow", "Per-lead state tracking with safe retries", "Email and WhatsApp follow-ups automated", "Reported volume of 200+ personalised emails per day"],
    title: "Lead research and outreach in one workflow",
    problem: "Lead research, enrichment, message drafting and follow-up were disconnected manual tasks with no record of what had already happened to each lead.",
    built: "An n8n + GPT-4 pipeline that enriches authorized lead data, drafts personalized emails, sends through SMTP, follows up on WhatsApp and logs every execution in Supabase.",
    stack: ["n8n", "GPT-4", "Supabase", "SMTP", "Twilio"],
    outcome: "Connected research, email drafting, follow-up and execution records in one workflow.",
    image: caseOutreach,
  },
  {
    client: "Real-time voice agent",
    slug: "real-time-voice-agent",
    sector: "Voice AI",
    summary: "A real-time conversational voice agent that streams audio over WebSockets to OpenAI and speaks back — handling interruptions and dropped connections gracefully.",
    steps: [["Voice in", "Audio is captured and streamed as the caller speaks."], ["Stream", "A persistent WebSocket moves audio in small chunks, with no waiting for a full recording."], ["Reason", "OpenAI processes the conversation in real time."], ["Speak back", "The reply streams back as audio, and the caller can interrupt at any point."]],
    decisions: [{"title": "Streaming, not request-response", "text": "A persistent real-time connection lets audio move incrementally, which is what makes a voice conversation feel natural instead of walkie-talkie slow."}, {"title": "Latency is a multi-stage number", "text": "Capture, network, model and playback each add time. The system is designed so each stage can be measured and tuned on its own."}, {"title": "Design for the messy cases", "text": "Unclear speech, interruptions and dropped connections all have explicit handling, so the conversation recovers instead of breaking."}],
    results: ["Natural, streaming two-way voice conversations", "Interruption handling mid-response", "Automatic recovery from dropped connections", "Reported sub-200ms response latency"],
    title: "A real-time streaming voice assistant",
    problem: "Voice interactions need a continuous path from incoming audio to model processing and back — managing streaming state, interruptions, connection failures and per-stage latency.",
    built: "A real-time conversational voice agent over a persistent WebSocket connection with streaming audio and OpenAI integration, handling interruptions and failures gracefully.",
    stack: ["OpenAI", "WebSockets", "Streaming Audio"],
    outcome: "Streaming voice conversations with interruption handling and connection recovery.",
    image: caseVoice,
  },
];

export type Category = "Website Development" | "AI Chatbots & Agents" | "Automation Workflows" | "Voice AI";

export const projects: {
  client: string; slug: string; sector: string; category: Category; title: string; subtitle: string;
  description: string; overview: string; challenge: string; deliverables: string[]; stack: string[]; result: string; metric: string; image: string;
}[] = [
  {
    client: "KOCA (by Yuvraj Singh)", slug: "koca-restaurant-website", overview: "I designed and developed the digital brand experience for KOCA — Kitchen of Celebratory Arts, the celebratory culinary venue associated with cricket legend Yuvraj Singh. The site uses an immersive gold-on-black aesthetic, typographic branding and storytelling sections (The Story, The Stage, The Chapter, The Schedule, The Black Tie), ending in a frictionless 'Claim Your Table' reservation flow.", challenge: "A celebrity-linked venue needs a website that feels as premium as the room itself, while still making it effortless for a guest to book a table on a phone.", sector: "Celebrity Brand", category: "Website Development",
    title: "KOCA — Kitchen of Celebratory Arts",
    subtitle: "Luxury restaurant website & table booking for Yuvraj Singh's flagship venue",
    description: "An immersive gold-on-black digital brand experience with typographic storytelling sections and a frictionless 'Claim Your Table' reservation flow.",
    deliverables: ["Custom luxury visual design system", "Responsive frontend with micro-animations", "Seamless table reservation routing"],
    stack: ["React", "Next.js", "Tailwind CSS", "Luxury UI/UX"],
    result: "Restaurant storytelling and a table reservation journey brought together in one website.",
    metric: "Brand website", image: imgKoca,
  },
  {
    client: "Kriyvo AI", slug: "website-ai-chatbot", overview: "'Kriyvo Assistant' is a custom AI website chatbot. It greets visitors, answers questions from approved business content, qualifies inbound leads and offers quick-action buttons — Book a Demo, View Pricing, See Features — with every qualified conversation synced to the CRM.", challenge: "Visitors leave when they can't get a quick answer, and enquiries that do come in arrive without the details sales needs to follow up.", sector: "AI Startup", category: "AI Chatbots & Agents",
    title: "Intelligent Website Chatbot & Lead Assistant",
    subtitle: "Grounded knowledge, lead capture & direct CRM integration",
    description: "A website assistant that answers from business content, collects enquiry details and connects the conversation to a CRM.",
    deliverables: ["Branded responsive chat widget", "Instant grounded AI response engine", "Interactive quick-action pills"],
    stack: ["RAG Knowledge Base", "CRM Integration", "Conversational AI"],
    result: "A website enquiry flow that combines business answers, lead capture and CRM integration.",
    metric: "AI assistant", image: imgChatbot,
  },
  {
    client: "Aurum Conventions", slug: "aurum-conventions-outreach", overview: "A B2B outreach engine built in n8n with Pinecone. It ingests event-organiser data, embeds the venue's capability brochures in a vector database, researches each prospective corporate client, writes bespoke subject lines and pitch hooks with GPT-4, and sends responsive HTML emails — logging every run.", challenge: "Researching each prospect and writing a genuinely personal pitch took hours per lead, so outreach stayed small and generic.", sector: "B2B Event Venue", category: "Automation Workflows",
    title: "AI Personalized Cold Outreach Pipeline",
    subtitle: "From lead extraction & vector research to tailored email dispatch",
    description: "Autonomous B2B outreach engine: embeds venue brochures in Pinecone, researches prospects, writes bespoke hooks with GPT-4 and dispatches HTML emails with full run logging.",
    deliverables: ["Pinecone embedding pipeline", "Multi-node n8n research workflow", "Dynamic prompt chains for personalization"],
    stack: ["n8n", "OpenAI GPT-4", "Pinecone", "HTML Email"],
    result: "Prospect research, message drafting and email delivery connected in a single workflow.",
    metric: "Outreach workflow", image: imgAurum,
  },
  {
    client: "Gignaati", slug: "gignaati-whatsapp-bot", overview: "A custom WhatsApp conversational engine and full WhatsApp Business setup, connected to Meta Click-to-WhatsApp ads. The Python/FastAPI backend receives Meta webhooks, collects names and emails, offers budget-tier quick replies (Under ₹50k, ₹50k–₹1L, Above ₹1L), tags profiles in the CRM and hands the chat to a sales rep with an automatic 24-hour bot pause.", challenge: "Ad leads were landing in WhatsApp faster than the sales team could reply, and without any qualification the team couldn't tell serious buyers from browsers.", sector: "E-Commerce & Services", category: "AI Chatbots & Agents",
    title: "WhatsApp Bot & Lead Qualification Funnel",
    subtitle: "Click-to-WhatsApp ad automation with real-time sales handoff",
    description: "A Python/FastAPI WhatsApp engine wired to Meta ads: collects details, offers budget-tier buttons, tags CRM profiles and hands off to sales with an automatic 24h bot pause.",
    deliverables: ["WhatsApp Business integration", "FastAPI webhook handler & async router", "Interactive enquiry and budget-selection buttons"],
    stack: ["Python", "FastAPI", "WhatsApp Business API"],
    result: "WhatsApp enquiries collected, tagged and routed to sales with a human handoff.",
    metric: "WhatsApp enquiries", image: imgGignaati,
  },
  {
    client: "Confidential Enterprise", slug: "ai-phone-calling-agent", overview: "An autonomous AI phone agent for an enterprise client under NDA. Retell AI's voice engine is connected to a Qdrant vector database loaded with internal product and policy documents from Google Drive. The agent holds natural conversations, checks live calendar availability, books appointments into Google Calendar, and sends structured call summaries to the team's Telegram channel.", challenge: "Routine phone consultations and bookings tied up staff all day, and call details were lost once the call ended.", sector: "NDA Protected", category: "Voice AI",
    title: "Autonomous AI Phone Calling Agent",
    subtitle: "Retell AI, Qdrant RAG, calendar booking & Telegram transcripts",
    description: "A voice agent holding natural conversations grounded in internal docs, booking appointments in Google Calendar and dispatching call summaries to Telegram.",
    deliverables: ["Conversational phone assistant", "Drive → Qdrant knowledge pipeline", "Google Calendar scheduling integration"],
    stack: ["Retell AI", "Qdrant", "Google Calendar API", "Telegram Bot"],
    result: "A phone enquiry flow connected to business documents, calendar booking and call summaries.",
    metric: "Voice & scheduling", image: imgCalling,
  },
  {
    client: "BMRC Hospital", slug: "bmrc-patient-feedback-pipeline", overview: "An automated patient feedback and escalation system for BMRC Hospital. Patients scan QR codes placed across wards, OPD and reception to submit feedback on their phone. The n8n pipeline classifies the department (Cardiology, Pediatrics, OPD and more), evaluates severity — Critical, Neutral or Positive — with an LLM, and alerts the medical superintendent and department heads on WhatsApp and email, with human escalation checkpoints.", challenge: "Critical patient grievances sat in paper forms and inboxes for a day or more before reaching anyone who could fix them.", sector: "Healthcare AI", category: "Automation Workflows",
    title: "AI Patient Feedback & Escalation Pipeline",
    subtitle: "QR-triggered multilingual feedback, AI sentiment & instant escalation",
    description: "Patients scan ward QR codes to submit feedback; n8n classifies department and sentiment with LLMs and alerts superintendents via WhatsApp and email.",
    deliverables: ["QR code intake system", "6-step n8n automation with vector storage", "AI severity triage (Critical vs Routine)"],
    stack: ["n8n", "AI Sentiment", "WhatsApp API", "Supabase"],
    result: "Patient feedback classified by department and priority, then routed through team notifications.",
    metric: "Feedback routing", image: imgBmrc,
  },
];

export const process = [
  { phase: "Discovery", title: "Discuss your brief", text: "Understand your goal, audience, existing tools and the work you need." },
  { phase: "Proposal", title: "Agree scope & milestones", text: "Define deliverables, review points, dependencies and exclusions before the build." },
  { phase: "Development", title: "Build, review & refine", text: "Develop the agreed website or workflow and review progress together." },
  { phase: "Handover", title: "Launch & plan next steps", text: "Deliver the agreed files and documentation, with support scoped to your needs." },
];

export const WHATSAPP = "https://wa.me/918604050596?text=Hi%20Kriyvo%20AI%2C%20I%27d%20like%20to%20discuss%20a%20project.";

export const EMAIL = "kriyvo.ai@gmail.com";

export const stack: [string, string[]][] = [
  ["AI & LLM", ["OpenAI GPT-4", "Claude", "LangChain", "LangGraph", "RAG", "Ollama", "Vector DBs"]],
  ["Automation", ["n8n", "Make.com", "Zapier", "Webhooks", "AI agents"]],
  ["Frontend", ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]],
  ["Backend", ["Python", "FastAPI", "Node.js", "Express", "PHP", "REST APIs", "WebSockets"]],
  ["CMS", ["WordPress", "Custom themes", "Plugins", "Core PHP"]],
  ["Data", ["Supabase", "PostgreSQL", "MongoDB", "MySQL", "Pinecone", "Qdrant"]],
  ["DevOps", ["Docker", "AWS", "DigitalOcean", "Vercel", "Linux", "Electron"]],
];

// Client reviews, in the clients' own words (confirmed real and approved for naming by the site owner).
/** Reviews copied word for word from the Kriyvo AI Google Business Profile. Update when new ones arrive. */
export const GOOGLE_REVIEWS_URL = "https://share.google/6oMra4UtiBpgw1IDS";
export const googleRating = { score: "5.0", count: 5 };
export const googleReviews: { name: string; meta?: string; rating: number; text?: string; reply?: string }[] = [
  { name: "Rimjhim", rating: 5, text: "I had a great experience with Kriyvo AI for custom CRM development. They built my CRM at a very affordable price and delivered it quickly, including the backend at no extra cost. Their web development and software solutions are professional, reliable, and budget-friendly. If you're looking for custom CRM development, website development, or AI automation services in Delhi NCR, I highly recommend Kriyvo AI! ⭐⭐⭐⭐⭐" },
  { name: "saurabh Srivastav", meta: "3 reviews · 3 photos", rating: 5, text: "They have delivered my website in 2 days as I have expected great experience them highly recommend They have maded a table booking website Kriyvoai is highly recommend", reply: "Thank you so much for your kind words and recommendation! 😊 We're glad we could deliver your table booking website within 2 days, just as you expected. It was a pleasure working with you, and we truly appreciate your trust in Kriyvo AI. We look forward to helping you with your future projects! 🙌" },
  { name: "श्री नाथ सोनी", rating: 5, text: "Had a great experience with Kriyvo AI. Their AI solutions and services are really helpful. Professional work and a smooth overall experience. Definitely recommended for anyone looking for AI solutions for their business!", reply: "Thank you so much for your valuable feedback! 😊 We're happy to hear that you had a great experience with Kriyvo AI and found our AI solutions helpful for your business. We truly appreciate your trust and recommendation. Looking forward to working with you again and helping your business grow with smart AI automation! 🚀" },
  { name: "ratul Saxena", meta: "3 reviews", rating: 5, reply: "Thank you for the 5-star rating! ⭐⭐⭐⭐⭐ We truly appreciate your support and trust in Kriyvo AI. Looking forward to serving you again! 😊" },
];
