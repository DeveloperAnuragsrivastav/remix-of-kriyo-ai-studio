/**
 * Live demos on the portfolio: the website assistant, the WhatsApp funnel, the patient-feedback
 * classifier and the voice receptionist. Everything that touches a key runs in createServerFn
 * handlers on the server; the browser only ever sees answers and audio.
 *
 * Keys (all optional; each demo falls back to a scripted version until its key is set):
 *   GROQ_API_KEY           Groq, for the assistant, the classifier and the receptionist's replies
 *   GROQ_CHAT_MODEL        model override (default openai/gpt-oss-120b)
 *   GROQ_FALLBACK_MODEL    tried when the main model is rate limited or down (default openai/gpt-oss-20b)
 *   ELEVENLABS_API_KEY     ElevenLabs text-to-speech for the receptionist's voice
 *   ELEVENLABS_VOICE_ID    voice to speak with
 *   ELEVENLABS_TTS_MODEL   TTS model (default eleven_flash_v2_5, the low-latency one)
 *
 * Fallbacks, so a demo never breaks when a key is missing, exhausted or the provider is down:
 *   Groq main model → Groq fallback model → scripted answers (the visitor still gets a sensible reply)
 *   ElevenLabs voice → the browser's own speech voice
 *   Over a visitor's daily share or the global cap → scripted answers (no more credit is spent)
 * A failed provider is skipped for a cool-down (see markDown) so visitors don't wait on a dead key.
 */
import { z } from "zod/v4";
import { createServerFn } from "@tanstack/react-start";
import { env, fail, guard, isDown, markDown, wrap } from "@/lib/demo-guards";
import { aiPlans, websitePlans } from "@/lib/pricing";
import { BUSINESS } from "@/lib/business";

type Msg = { role: "user" | "assistant"; content: string };

/** OpenAI-style strict schemas need every property required and no extra properties. */
function strict(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(strict);
  if (!node || typeof node !== "object") return node;
  const o = Object.fromEntries(Object.entries(node).filter(([k]) => k !== "$schema").map(([k, v]) => [k, strict(v)])) as Record<string, unknown>;
  if (o["type"] === "object" && o["properties"]) { o["required"] = Object.keys(o["properties"] as object); o["additionalProperties"] = false; }
  return o;
}

const groqReady = () => !!env("GROQ_API_KEY") && !isDown("groq");

/**
 * Asks Groq for JSON matching the schema, validated again with Zod. Tries the main model, then the
 * fallback model; returns null if neither answers, and the caller switches to its scripted reply.
 * Never throws for provider problems.
 */
async function structured<T extends z.ZodTypeAny>(system: string, messages: Msg[], schema: T, name: string): Promise<z.infer<T> | null> {
  const models = [...new Set([env("GROQ_CHAT_MODEL") || "openai/gpt-oss-120b", env("GROQ_FALLBACK_MODEL") || "openai/gpt-oss-20b"])];
  const jsonSchema = strict(z.toJSONSchema(schema));
  for (const [i, model] of models.entries()) {
    if (!groqReady()) return null;
    const last = i === models.length - 1;
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        signal: AbortSignal.timeout(15000),
        headers: { Authorization: `Bearer ${env("GROQ_API_KEY")}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: [{ role: "system", content: system }, ...messages],
          response_format: { type: "json_schema", json_schema: { name, strict: true, schema: jsonSchema } },
          reasoning_effort: "low",
          max_completion_tokens: 1500,
          temperature: 0.4,
        }),
      });
      if (!res.ok) {
        console.error("[demo] groq", model, res.status, (await res.text()).slice(0, 300));
        // A bad or exhausted key fails every model the same way: stop and cool down.
        if ([401, 402, 403].includes(res.status)) { markDown("groq", res.status); return null; }
        if (last) markDown("groq", res.status, res.headers.get("retry-after"));
        continue;
      }
      const body = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const parsed = schema.safeParse(JSON.parse(body.choices?.[0]?.message?.content ?? "null"));
      if (parsed.success) return parsed.data as z.infer<T>;
      console.error("[demo] groq output did not match schema", model, parsed.error.message.slice(0, 300));
    } catch (e) {
      console.error("[demo] groq", model, e instanceof Error ? e.message : e);
      if (last) markDown("groq", 0);
    }
  }
  return null;
}

/* ---------- 1. Website assistant: answers only from Kriyvo's own facts ---------- */

const KNOWLEDGE = [
  `Business: ${BUSINESS.name}, an independent web and AI studio in ${BUSINESS.locality}, ${BUSINESS.city}. Works remotely with clients in Delhi NCR, India and worldwide. No in-person meetings.`,
  `Contact: WhatsApp or call ${BUSINESS.phone}, email ${BUSINESS.email}. First consultation is free.`,
  `Website packages: ${websitePlans.map(p => `${p.name} ${p.price}${p.unit ? ` ${p.unit}` : ""}, delivered in ${p.delivery} (${p.features.join(", ")}; ${p.note})`).join(". ")}.`,
  `AI and automation packages: ${aiPlans.map(p => `${p.name} ${p.price}, delivered in ${p.delivery} (${p.features.join(", ")}; ${p.note})`).join(". ")}.`,
  "Voice / phone agents and custom web apps are quoted to scope after a short call.",
  "Process: discovery call (30–60 min), package and quote the same day, written proposal within 24 hours, build in 1–5 days for websites, 1–10 days for AI, testing and revisions 1–2 days, then launch with logins, source files and a walkthrough.",
  "Proof: 115+ projects delivered for 30+ clients, 5.0 rating on Google. Past work: KOCA restaurant website with table booking, a WhatsApp lead funnel for Gignaati, an AI phone agent that books appointments, an AI outreach pipeline for Aurum Conventions, and a patient feedback pipeline for BMRC Hospital.",
].join("\n");

const AssistantReply = z.object({
  reply: z.string().describe("The answer to show the visitor, 1-3 short sentences, plain text"),
  source: z.string().nullable().describe("Which fact the answer came from, e.g. 'Website packages', or null"),
  lead: z.object({ name: z.string().nullable(), phone: z.string().nullable(), email: z.string().nullable(), need: z.string().nullable() }).describe("Contact details the visitor has shared so far; null for anything not shared"),
});

const ASSISTANT_SYSTEM = `You are the website assistant for Kriyvo AI. Answer the visitor's questions using ONLY the facts below. If the facts don't cover the question, say you'll check with the team and ask for their WhatsApp number. Never invent prices, timelines, clients or guarantees. Keep replies short, warm and specific; quote exact prices from the facts. When the visitor sounds interested, ask for their name and WhatsApp number so the team can follow up. Reply in the visitor's language (English, Hindi or Hinglish).

FACTS:
${KNOWLEDGE}`;

type Turn = { role: "user" | "assistant"; text: string };

/** Scripted answers used until GROQ_API_KEY is set, so the demo still works. */
function scriptedAssistant(turns: Turn[]) {
  const q = turns.at(-1)?.text.toLowerCase() ?? "";
  const phone = q.match(/(?:\+?91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}/)?.[0] ?? null;
  const email = q.match(/[^\s@]+@[^\s@]+\.[a-z]{2,}/i)?.[0] ?? null;
  const lead = { name: null, phone, email, need: null };
  if (phone || email) return { reply: "Thank you! I've passed your details to the team. Expect a WhatsApp message shortly.", source: "Contact", lead };
  if (/price|cost|how much|kitna|kitne|charge|rate|₹|fees?|budget/.test(q)) return { reply: "Websites start at ₹999 per page; a 5-page business website is ₹4,999 and an e-commerce store ₹9,999. AI chatbots start at ₹1,999. Want a quote for your project?", source: "Website packages", lead };
  if (/time|days?|deliver|kab|how long/.test(q)) return { reply: "Landing pages take 1–2 days, business websites and stores 3–5 days, and chatbots 1–2 days. Shall I take your number so the team can confirm a date?", source: "Website packages", lead };
  if (/whatsapp|bot/.test(q)) return { reply: "A WhatsApp AI chatbot with Business API, lead qualification and human handover is ₹4,999, delivered in 2–4 days.", source: "AI and automation packages", lead };
  if (/where|location|office|delhi|noida|gurgaon/.test(q)) return { reply: "Kriyvo AI is based in New Ashok Nagar, Delhi, and works remotely with clients across Delhi NCR, India and worldwide.", source: "Business", lead };
  return { reply: "I can help with prices, delivery times and what's included. What would you like to build? If you share your WhatsApp number, the team will follow up personally.", source: null, lead };
}

export const askAssistant = createServerFn({ method: "POST" })
  .inputValidator((d: { turns: Turn[] }) => d)
  .handler(({ data }) => wrap(async () => {
    const turns = (Array.isArray(data.turns) ? data.turns : []).slice(-12).map(t => ({ role: t.role === "assistant" ? "assistant" as const : "user" as const, text: String(t.text ?? "").slice(0, 600) }));
    if (!turns.length || turns.at(-1)!.role !== "user") fail("Type a question to start.");
    const allowed = await guard("chat");
    const out = allowed && groqReady() ? await structured(ASSISTANT_SYSTEM, turns.map(t => ({ role: t.role, content: t.text })), AssistantReply, "assistant_reply") : null;
    return out ? { ...out, live: true } : { ...scriptedAssistant(turns), live: false };
  }));

/* ---------- 2. Patient feedback classifier ---------- */

const Classification = z.object({
  language: z.string().describe("Language the patient wrote in, e.g. Hindi, English, Hinglish, Tamil"),
  translation: z.string().describe("Faithful English translation (or the original if already English)"),
  sentiment: z.enum(["positive", "neutral", "negative"]),
  intent: z.enum(["complaint", "praise", "suggestion", "question", "emergency"]),
  department: z.enum(["Maintenance", "Nursing", "Doctors", "Billing", "Housekeeping", "Food services", "Reception", "Pharmacy", "Security", "Management"]),
  severity: z.enum(["critical", "high", "medium", "low"]),
  summary: z.string().describe("One-line summary for the department head, under 12 words"),
});

const CLASSIFY_SYSTEM = "You triage patient feedback for a hospital. Read the message (any language or script), translate it faithfully to English, and classify it so it can be routed to the right department head. Severity: critical = patient safety or care stopped, high = needs action today, medium = needs follow-up, low = no action needed. Base every field only on the message.";

function scriptedClassify(text: string) {
  const t = text.toLowerCase();
  const hindi = /[ऀ-ॿ]/.test(text) || /\b(nahi|hai|raha|kar|koi|bahut|accha|achha|kya)\b/.test(t);
  const pick = <T,>(pairs: [RegExp, T][], d: T) => pairs.find(([r]) => r.test(t))?.[1] ?? d;
  const department = pick<z.infer<typeof Classification>["department"]>([[/\bac\b|fan|light|paani|water|leak|broken|kharab/, "Maintenance"], [/nurse|sister/, "Nursing"], [/doctor|dr\b/, "Doctors"], [/bill|payment|charge|paisa/, "Billing"], [/clean|dirty|safai|toilet|washroom/, "Housekeeping"], [/food|khana|meal/, "Food services"]], "Management");
  const negative = /not|nahi|bad|worst|dirty|kharab|late|rude|koi sun nahi|broken|problem/.test(t);
  const positive = /good|great|thank|accha|achha|best|excellent|shukriya/.test(t);
  return {
    language: hindi ? "Hindi (Hinglish)" : "English",
    translation: hindi ? "(Translation needs the live AI model; showing the original)" : text,
    sentiment: negative ? "negative" as const : positive ? "positive" as const : "neutral" as const,
    intent: negative ? "complaint" as const : positive ? "praise" as const : "suggestion" as const,
    department,
    severity: negative ? (/since|subah|hours|ghante|koi sun nahi|nobody|urgent/.test(t) ? "critical" as const : "high" as const) : "low" as const,
    summary: negative ? `${department} issue reported by a patient` : positive ? "Patient praised the care" : "Patient shared a suggestion",
  };
}

export const classifyFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: { text: string }) => d)
  .handler(({ data }) => wrap(async () => {
    const text = String(data.text ?? "").trim().slice(0, 800);
    if (text.length < 4) fail("Write a line of feedback first.");
    const allowed = await guard("feedback");
    const out = allowed && groqReady() ? await structured(CLASSIFY_SYSTEM, [{ role: "user", content: text }], Classification, "feedback_triage") : null;
    return out ? { ...out, live: true } : { ...scriptedClassify(text), live: false };
  }));

/* ---------- 3. Voice receptionist: Groq decides what to say, ElevenLabs says it ---------- */

const ReceptionistReply = z.object({
  say: z.string().describe("What the receptionist says next: one or two short spoken sentences, no lists, no emoji"),
  booking: z.object({ name: z.string().nullable(), day: z.string().nullable(), time: z.string().nullable(), reason: z.string().nullable(), confirmed: z.boolean() }).describe("Appointment details gathered so far; confirmed is true only once the caller agreed to a day and time"),
});

const RECEPTIONIST_SYSTEM = `You are the AI phone receptionist for Sunrise Clinic, a demo clinic built by Kriyvo AI. You are on a live voice call, so speak naturally in one or two short sentences. Help the caller book an appointment: ask what it's for, which day and time suits them (the clinic is open Monday to Saturday, 9am to 7pm; offer two concrete slots), and their name. Confirm the booking back to them once you have a day, time and name, and say a confirmation will come on WhatsApp. If they ask something unrelated, answer briefly and steer back to booking. Reply in the caller's language (English, Hindi or Hinglish). This is a demo, so never ask for real medical details.`;

const GREETING = "Hello, thank you for calling Sunrise Clinic. I'm the AI receptionist. Would you like to book an appointment?";

/** ElevenLabs speech as a data URL, or null (the browser then speaks the line with its own voice). */
async function speak(text: string, allowed: boolean) {
  const key = env("ELEVENLABS_API_KEY"), voice = env("ELEVENLABS_VOICE_ID");
  if (!allowed || !key || !voice || isDown("elevenlabs")) return null;
  try {
    const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}?output_format=mp3_44100_64`, {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: { "xi-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify({ text, model_id: env("ELEVENLABS_TTS_MODEL") || "eleven_flash_v2_5", voice_settings: { stability: 0.5, similarity_boost: 0.75 } }),
    });
    if (!res.ok) { console.error("[voice] tts", res.status, (await res.text()).slice(0, 300)); markDown("elevenlabs", res.status, res.headers.get("retry-after")); return null; }
    return `data:audio/mpeg;base64,${Buffer.from(await res.arrayBuffer()).toString("base64")}`;
  } catch (e) {
    console.error("[voice] tts", e instanceof Error ? e.message : e);
    markDown("elevenlabs", 0);
    return null;
  }
}

/** A scripted receptionist used when Groq is unavailable: asks for whatever is still missing (reason, slot, name), then confirms. */
function scriptedReceptionist(turns: Turn[]) {
  const said = turns.filter(t => t.role === "user").map(t => t.text.trim());
  const all = said.join(" ");
  const askedName = /your name/i.test(turns.filter(t => t.role === "assistant").at(-1)?.text ?? "");
  const reason = said.find(t => !/^(yes|yeah|yep|yes please|haan|ha|han|sure|ok|okay|please|ji|hello|hi)\W*$/i.test(t)) ?? null;
  const day = all.match(/\b(today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|aaj|kal)\b/i)?.[0] ?? null;
  const time = all.match(/\b\d{1,2}(:\d{2})?\s?(am|pm)\b|\b(morning|afternoon|evening|subah|shaam)\b/i)?.[0] ?? null;
  const named = all.match(/(?:my name is|name is|i am|i'm|this is|mera naam)\s+([a-zऀ-ॿ]+)/i)?.[1];
  const name = named ?? (askedName ? said.at(-1)?.split(/\s+/).slice(-1)[0] ?? null : null);
  const cap = (w: string) => w[0]!.toUpperCase() + w.slice(1).toLowerCase();
  const dayOut = day ? cap(day) : null;
  if (!reason) return { say: "Sure, I can help with that. What is the appointment for?", booking: null };
  if (!dayOut && !time) return { say: "Thank you. I have Friday at 11 am or 4 pm available. Which suits you better?", booking: null };
  if (!name) return { say: "Perfect. And may I have your name, please?", booking: null };
  const when = `${dayOut ?? "Friday"} at ${time ?? "11 am"}`;
  return {
    say: `Done, ${cap(name)}. You're booked for ${when}. You'll get a confirmation on WhatsApp shortly. Anything else I can help with?`,
    booking: { name: cap(name), day: dayOut ?? "Friday", time: time ?? "11 am", reason: reason.slice(0, 60), confirmed: true },
  };
}

export const voiceTurn = createServerFn({ method: "POST" })
  .inputValidator((d: { turns: Turn[] }) => d)
  .handler(({ data }) => wrap(async () => {
    const turns = (Array.isArray(data.turns) ? data.turns : []).slice(-14).map(t => ({ role: t.role === "assistant" ? "assistant" as const : "user" as const, text: String(t.text ?? "").slice(0, 400) }));
    // The greeting opens the call and counts against the call limit; each reply counts against the turn limit.
    if (!turns.length) {
      const allowed = await guard("voiceCall");
      return { say: GREETING, booking: null, audio: await speak(GREETING, allowed), live: allowed && groqReady() };
    }
    if (turns.at(-1)!.role !== "user") fail("Say something to continue.");
    const allowed = await guard("voiceTurn");
    const out = allowed && groqReady() ? await structured(RECEPTIONIST_SYSTEM, turns.map(t => ({ role: t.role, content: t.text })), ReceptionistReply, "receptionist_reply") : null;
    const reply = out ?? scriptedReceptionist(turns);
    return { say: reply.say, booking: reply.booking, audio: await speak(reply.say, allowed), live: !!out };
  }));
