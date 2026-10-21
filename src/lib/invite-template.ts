/**
 * Personalised invite email, built from a visitor's public LinkedIn profile.
 * Email-safe: table layout, inline styles, no external CSS or scripts. Every profile value is escaped.
 */
export type InviteProfile = {
  firstName: string; lastName: string; headline: string; about: string; location: string;
  company: string; role: string; industry: string; skills: string[]; photo: string;
};

const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

type Idea = { kind: string; title: string; text: string };
const IDEAS: { match: RegExp; idea: Idea }[] = [
  { match: /health|hospital|clinic|medical|patient|pharma/i, idea: { kind: "feedback", title: "Patient feedback that routes itself", text: "QR or WhatsApp feedback classified by AI and sent to the right department in seconds — like the system I built for BMRC Hospital." } },
  { match: /sales|growth|business development|bd\b|revenue|account exec|partnership/i, idea: { kind: "outreach", title: "Personalised outreach on autopilot", text: "An n8n + GPT pipeline that researches each prospect and writes a genuinely personal first message — the same engine that wrote this invite." } },
  { match: /market|brand|content|seo|social|growth/i, idea: { kind: "seo", title: "Content & SEO workflows", text: "Automated briefs, Search Console reporting and content pipelines that keep your marketing moving without extra headcount." } },
  { match: /founder|ceo|owner|director|co-founder|managing|entrepreneur|md\b/i, idea: { kind: "web", title: "A website that sells while you sleep", text: "A custom, fast website with an AI assistant that answers visitors from your own content and books calls straight into your calendar." } },
  { match: /recruit|talent|hr\b|human resources|people/i, idea: { kind: "hiring", title: "Hiring without the inbox chaos", text: "CV screening, candidate follow-ups and interview scheduling handled by a workflow, with you reviewing only the shortlist." } },
  { match: /support|customer success|service|operations|ops\b/i, idea: { kind: "support", title: "Support that never sleeps", text: "A chatbot or WhatsApp assistant grounded in your docs, handing tricky conversations to your team with full context." } },
  { match: /engineer|developer|cto|tech|software|data|ai\b|ml\b/i, idea: { kind: "agents", title: "Production AI agents", text: "Bounded LLM agents with LangGraph, retrieval and proper logging — built to run in production, not just demo well." } },
  { match: /real estate|property|restaurant|hotel|hospitality|event|venue/i, idea: { kind: "whatsapp", title: "Bookings and enquiries on WhatsApp", text: "Click-to-WhatsApp funnels that qualify leads, share brochures and hand serious buyers to your team instantly." } },
];
const DEFAULT_IDEAS: Idea[] = [
  { kind: "web", title: "A website that converts", text: "A custom, mobile-first website wired to your enquiry flow, CRM and WhatsApp." },
  { kind: "whatsapp", title: "WhatsApp lead funnels", text: "Leads qualified automatically and routed to the right person in real time." },
  { kind: "automation", title: "Workflow automation", text: "n8n and Python workflows that remove the copy-paste work between your tools." },
];

export function pickIdeas(p: InviteProfile): Idea[] {
  const text = `${p.headline} ${p.role} ${p.industry} ${p.about} ${p.skills.join(" ")}`;
  const picked: Idea[] = [];
  // One idea per kind, profile-matched ideas first, then sensible defaults.
  for (const idea of [...IDEAS.filter(i => i.match.test(text)).map(i => i.idea), ...DEFAULT_IDEAS]) {
    if (picked.length < 3 && !picked.some(p => p.kind === idea.kind)) picked.push(idea);
  }
  return picked;
}

export function buildInviteHtml(p: InviteProfile, siteUrl: string): string {
  const name = esc(p.firstName);
  const company = p.company ? esc(p.company) : "";
  const roleLine = [p.role && esc(p.role), company && `at ${company}`].filter(Boolean).join(" ");
  const ideas = pickIdeas(p);
  const site = esc(siteUrl.replace(/\/$/, ""));
  const wa = "https://wa.me/918604050596?text=" + encodeURIComponent(`Hi Kriyvo AI, I'm ${p.firstName}${p.company ? ` from ${p.company}` : ""}. I tried your outreach demo — let's talk.`);
  const opener = p.headline
    ? `I came across your profile — <em>${esc(p.headline)}</em> — and it's exactly the kind of work where a few well-built automations free up hours every week.`
    : `I took a look at your profile and put together a few ideas for where automation could save you real time.`;
  const skills = p.skills.length ? `<p style="margin:16px 0 0;font-size:14px;color:#6b6f7b;">Spotted on your profile: ${p.skills.map(esc).join(" · ")}</p>` : "";
  const photo = p.photo
    ? `<img src="${esc(p.photo)}" width="56" height="56" alt="" referrerpolicy="no-referrer" style="display:block;width:56px;height:56px;border-radius:50%;object-fit:cover;" />`
    : `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="56" height="56" align="center" bgcolor="#f4c873" style="border-radius:28px;font:600 22px/56px Helvetica,Arial,sans-serif;color:#1d1b18;">${name.charAt(0)}</td></tr></table>`;

  // Email-client rules this follows: single column, no negative margins (Gmail drops them), no flex/grid,
  // buttons are full-width table cells (bulletproof in Gmail/Outlook), and a mobile media query only tightens padding.
  const button = (href: string, label: string, dark: boolean) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px;"><tr>
    <td align="center" bgcolor="${dark ? "#1d1b18" : "#ffffff"}" style="border-radius:999px;${dark ? "" : "border:1px solid #d6d3cd;"}">
      <a href="${href}" target="_blank" style="display:block;padding:14px 20px;font:600 16px/20px Helvetica,Arial,sans-serif;color:${dark ? "#ffffff" : "#1d1b18"};text-decoration:none;border-radius:999px;">${label}</a>
    </td></tr></table>`;

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>An invite for ${name}</title>
<style>
  @media only screen and (max-width:480px){
    .px{padding-left:20px !important;padding-right:20px !important;}
    .hero{font-size:26px !important;line-height:1.2 !important;}
    .outer{padding:12px 8px !important;}
  }
</style></head>
<body style="margin:0;padding:0;background:#f4f4f2;-webkit-text-size-adjust:100%;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${name}, a few ideas I put together for ${company || "you"}.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f4f4f2;">
<tr><td class="outer" align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:#ffffff;border-radius:20px;">
  <tr><td class="px" style="background:#1d1b18;padding:26px 32px 30px;border-radius:20px 20px 0 0;">
    <p style="margin:0;font:600 18px Helvetica,Arial,sans-serif;color:#f5f4f1;">Kriyvo <span style="color:#ff6a2c;">AI</span></p>
    <p class="hero" style="margin:22px 0 0;font:400 30px/1.2 Georgia,'Times New Roman',serif;color:#f5f4f1;">Hi ${name}, here's what I'd build${company ? ` for <span style="color:#f4c873;">${company}</span>` : " for you"}.</p>
  </td></tr>
  <tr><td class="px" style="padding:22px 32px 0;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="64" valign="middle">${photo}</td>
      <td valign="middle" style="padding-left:12px;">
        <p style="margin:0;font:600 16px Helvetica,Arial,sans-serif;color:#1d1b18;">${name}${p.lastName ? " " + esc(p.lastName) : ""}</p>
        <p style="margin:2px 0 0;font:14px/1.4 Helvetica,Arial,sans-serif;color:#6b6a66;">${roleLine || esc(p.headline)}${p.location ? ` · ${esc(p.location)}` : ""}</p>
      </td>
    </tr></table>
  </td></tr>
  <tr><td class="px" style="padding:20px 32px 0;font:16px/1.6 Helvetica,Arial,sans-serif;color:#2c2b28;">
    <p style="margin:0;">${opener}</p>
    ${skills}
  </td></tr>
  <tr><td class="px" style="padding:22px 32px 0;">
    <p style="margin:0 0 12px;font:600 15px Helvetica,Arial,sans-serif;color:#1d1b18;">Three ideas for ${company || "you"}</p>
    ${ideas.map((i, n) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px;background:#f4f4f2;border-radius:14px;"><tr>
      <td width="40" valign="top" style="padding:16px 0 16px 16px;"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="26" height="26" align="center" bgcolor="#1d1b18" style="border-radius:13px;font:600 13px/26px Helvetica,Arial,sans-serif;color:#f4c873;">${n + 1}</td></tr></table></td>
      <td valign="top" style="padding:14px 16px 14px 10px;"><p style="margin:0;font:600 16px/1.35 Helvetica,Arial,sans-serif;color:#1d1b18;">${i.title}</p><p style="margin:4px 0 0;font:14px/1.55 Helvetica,Arial,sans-serif;color:#55534f;">${i.text}</p></td>
    </tr></table>`).join("")}
  </td></tr>
  <tr><td class="px" style="padding:12px 32px 0;font:16px/1.6 Helvetica,Arial,sans-serif;color:#2c2b28;">
    <p style="margin:0;">I'm the engineer behind Kriyvo AI. I design, code and automate end to end: websites, AI chatbots, WhatsApp bots, voice agents and n8n workflows. 115+ projects delivered, websites from ₹999 and AI chatbots from ₹1,999.</p>
    <p style="margin:12px 0 0;">Fun fact: <strong>this invite was written by the same outreach pipeline</strong> I'd build for you. It read your public profile and drafted this in seconds.</p>
  </td></tr>
  <tr><td class="px" style="padding:24px 32px 28px;">
    ${button(wa, "Book a free consultation", true)}
    ${button(`${site}/portfolio`, "See my work", false)}
  </td></tr>
  <tr><td class="px" style="background:#f4f4f2;padding:18px 32px;border-radius:0 0 20px 20px;font:12px/1.6 Helvetica,Arial,sans-serif;color:#8a8883;">
    You're receiving this because you tried the live outreach demo at <a href="${site}" style="color:#8a8883;">${site.replace(/^https?:\/\//, "")}</a> and asked for a copy. Your profile was used once to write this invite and was not stored.
  </td></tr>
</table>
</td></tr></table>
</body></html>`;
}
