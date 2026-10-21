import { useMemo, useState } from "react";
import { ArrowUpRight, Bot, Check, Globe, MessageCircle, MonitorSmartphone, Phone, Search, Workflow } from "lucide-react";
import { WHATSAPP } from "@/lib/kriyo-data";

type Service = { id: string; label: string; icon: typeof Globe; scopeLabel?: string; scopes?: string[]; features: string[] };

const SERVICES: Service[] = [
  { id: "web", label: "Custom website", icon: MonitorSmartphone, scopeLabel: "How many pages?", scopes: ["1–5 pages", "6–15 pages", "16+ pages / web app"], features: ["Enquiry or booking forms", "Blog", "Online payments", "Multi-language", "CRM integration", "AI chatbot add-on"] },
  { id: "wp", label: "WordPress / PHP site", icon: Globe, scopeLabel: "What kind of work?", scopes: ["New WordPress site", "Fix or speed up a site", "Migrate an existing site"], features: ["WooCommerce shop", "Custom theme", "Custom plugin", "Speed & SEO fixes", "Forms & integrations"] },
  { id: "chat", label: "AI chatbot", icon: Bot, features: ["Website chat widget", "Answers from your documents", "Lead capture", "CRM sync", "Human handoff", "WhatsApp channel"] },
  { id: "wa", label: "WhatsApp bot", icon: MessageCircle, features: ["Lead qualification", "Meta click-to-WhatsApp ads", "CRM tagging", "Quick-reply buttons", "Human handoff"] },
  { id: "voice", label: "Voice / phone agent", icon: Phone, features: ["Inbound calls", "Outbound calls", "Calendar booking", "Answers from your documents", "Call summaries"] },
  { id: "auto", label: "Workflow automation", icon: Workflow, features: ["Lead processing", "Feedback routing", "Email & WhatsApp follow-ups", "CRM sync", "Reports & dashboards", "AI steps (GPT / Claude)"] },
  { id: "seo", label: "SEO & CRM automation", icon: Search, features: ["Content workflows", "Search Console reports", "CRM updates", "Live dashboards"] },
];
const TIMELINES = ["As soon as possible", "Within a month", "1–2 months", "Flexible"];
const BUDGETS = ["Under ₹5K", "₹5K–15K", "₹15K–30K", "₹30K–60K", "₹60K+", "Not sure yet"];

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button type="button" aria-pressed={on} onClick={onClick}
    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[15px] transition-colors duration-300 ${on ? "bg-ink text-ink-foreground" : "bg-stone hover:bg-border"}`}>
    {on && <Check aria-hidden className="h-3.5 w-3.5" strokeWidth={3} />}{children}
  </button>;
}

/** The starting price and delivery time, read only from the published packages; anything beyond them is quoted. */
function quote(id: string, scope: string | null, features: string[]): { price: string; days: string; note: string } {
  const q = (price: string, days: string, note: string) => ({ price, days, note });
  const custom = q("Quoted", "to scope", "Bigger than a package, so priced after a short call.");
  switch (id) {
    case "web":
      if (scope && scope !== "1–5 pages") return custom;
      if (features.includes("Online payments")) return q("₹9,999", "3–5 days", "E-commerce store package");
      return scope ? q("₹4,999", "3–5 days", "Business website package, up to 5 pages") : q("₹999", "1–2 days", "Per page, landing page package");
    case "wp":
      if (scope && scope !== "New WordPress site") return custom;
      return features.includes("WooCommerce shop") ? q("₹9,999", "3–5 days", "E-commerce store package") : q("₹4,999", "3–5 days", "Business website package");
    case "chat": return q("₹1,999", "1–2 days", "Website AI chatbot package");
    case "wa": return q("₹4,999", "2–4 days", "WhatsApp AI chatbot package");
    case "auto": return features.length > 3 || features.includes("AI steps (GPT / Claude)") ? q("₹9,999", "5–10 days", "Custom AI automation package") : q("₹3,999", "2–4 days", "AI business automation package");
    case "seo": return q("₹3,999", "2–4 days", "AI business automation package");
    default: return custom;
  }
}

function Step({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="border-t border-border pt-7">
      <legend className="float-left w-full font-display text-xl">{title}</legend>
      <div className="clear-both flex flex-wrap gap-2 pt-4">{children}</div>
    </fieldset>
  );
}

export function ProjectPlanner({ compact = false }: { compact?: boolean }) {
  const [serviceId, setServiceId] = useState(SERVICES[0]!.id);
  const service = SERVICES.find(s => s.id === serviceId)!;
  const [scope, setScope] = useState<string | null>(null);
  const [features, setFeatures] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string | null>(null);
  const [budget, setBudget] = useState<string | null>(null);
  const [name, setName] = useState("");

  const pickService = (id: string) => { setServiceId(id); setScope(null); setFeatures([]); };
  const toggle = (f: string) => setFeatures(x => x.includes(f) ? x.filter(y => y !== f) : [...x, f]);

  const lines = useMemo(() => [
    ["Service", service.label],
    ...(scope ? [[service.scopeLabel?.replace("?", "") ?? "Scope", scope]] : []),
    ...(features.length ? [["Features", features.join(", ")]] : []),
    ...(timeline ? [["Timeline", timeline]] : []),
    ...(budget ? [["Budget", budget]] : []),
  ] as [string, string][], [service, scope, features, timeline, budget]);

  const send = () => {
    const url = new URL(WHATSAPP);
    const body = lines.map(([k, v]) => `${k}: ${v}`).join("\n");
    url.searchParams.set("text", `Hi Kriyvo AI${name ? `, I'm ${name}` : ""}. I'd like an estimate:\n\n${body}`);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };



  const est = quote(serviceId, scope, features);
  return (
    <div className={`grid gap-10 ${compact ? "lg:grid-cols-[1.4fr_1fr]" : "lg:grid-cols-[1.5fr_1fr]"} lg:gap-14`}>
      <div className="space-y-7 rounded-[28px] bg-card p-6 shadow-[inset_0_0_0_1px_var(--color-border)] md:p-9">
        <fieldset>
          <legend className="float-left w-full font-display text-xl">What do you need?</legend>
          <div className="clear-both grid grid-cols-2 gap-2 pt-4 sm:grid-cols-3">
            {SERVICES.map(s => {
              const on = s.id === serviceId;
              return <button key={s.id} type="button" aria-pressed={on} onClick={() => pickService(s.id)}
                className={`flex items-center gap-2.5 rounded-2xl px-4 py-4 text-left text-[15px] transition-colors duration-300 ${on ? "bg-ink text-ink-foreground" : "bg-stone hover:bg-border"}`}>
                <s.icon aria-hidden className={`h-4 w-4 shrink-0 ${on ? "text-saffron" : "text-muted-foreground"}`} />{s.label}
              </button>;
            })}
          </div>
        </fieldset>
        {service.scopes && <Step title={service.scopeLabel!}>{service.scopes.map(s => <Chip key={s} on={scope === s} onClick={() => setScope(scope === s ? null : s)}>{s}</Chip>)}</Step>}
        <Step title="Which features? (pick any)">{service.features.map(f => <Chip key={f} on={features.includes(f)} onClick={() => toggle(f)}>{f}</Chip>)}</Step>
        <Step title="When do you need it?">{TIMELINES.map(t => <Chip key={t} on={timeline === t} onClick={() => setTimeline(timeline === t ? null : t)}>{t}</Chip>)}</Step>
        <Step title="Your budget range">{BUDGETS.map(b => <Chip key={b} on={budget === b} onClick={() => setBudget(budget === b ? null : b)}>{b}</Chip>)}</Step>
      </div>

      <div role="region" aria-label="Your brief" className="self-start rounded-[28px] bg-ink p-7 text-ink-foreground lg:sticky lg:top-28 md:p-9" aria-live="polite">
        <p className="text-[14px] text-ink-foreground/60">{est.price === "Quoted" ? "Price" : "Starts at"}</p>
        <div key={est.price + est.days} className="animate-stage">
          <p className="font-display text-6xl tracking-[-0.03em]">{est.price}</p>
          <p className="mt-2 text-[15px] text-ink-foreground/80">{est.price === "Quoted" ? est.days : `Ready in ${est.days}`}</p>
          <p className="mt-1 text-[14px] text-ink-foreground/55">{est.note}</p>
        </div>
        <h3 className="mt-8 text-xl">Your brief</h3>
        <dl className="mt-4 space-y-3 border-t border-ink-foreground/15 pt-4">
          {lines.map(([k, v]) => <div key={k} className="grid grid-cols-[6rem_1fr] gap-3 text-sm"><dt className="text-ink-foreground/60">{k}</dt><dd>{v}</dd></div>)}
        </dl>
        <label htmlFor="planner-name" className="mt-6 block text-sm text-ink-foreground/65">Your name (optional)</label>
        <input id="planner-name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" placeholder="Your name"
          className="mt-2 h-11 w-full rounded-xl border border-ink-foreground/20 bg-ink-foreground/5 px-3.5 text-sm text-ink-foreground placeholder:text-ink-foreground/40" />
        <button type="button" onClick={send} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-foreground px-6 py-4 text-[15px] font-medium text-ink transition hover:bg-ink-foreground/85">
          Get my estimate on WhatsApp <ArrowUpRight className="h-4 w-4" />
        </button>
        <p className="mt-3 text-sm leading-relaxed text-ink-foreground/60">Prices are from the published packages. I reply personally to confirm the final price and timeline. The button opens WhatsApp with your brief ready to review; nothing is sent until you press send. <a href="/privacy-policy#contact" className="text-ink-foreground/80 underline underline-offset-4 hover:text-ink-foreground">Privacy</a></p>
      </div>
    </div>
  );
}
