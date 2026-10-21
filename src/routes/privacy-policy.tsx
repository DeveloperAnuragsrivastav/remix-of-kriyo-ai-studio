import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/page-meta";

/*
 * Written from what this site actually does (checked in the code and on the live site): no advertising or
 * tracking cookies, cookieless Cloudflare Web Analytics injected by the Cloudflare proxy, contact and estimate forms that only open WhatsApp, and live demos whose text goes
 * to the providers named below. Update this page whenever a form, demo, provider or tool changes.
 * Owner/legal review pending: see the audit notes for points that need a decision.
 */
export const Route = createFileRoute("/privacy-policy")({
  head: () => pageMeta("Privacy Policy", "How Kriyvo AI handles information on kriyvoai.online: what the contact forms, live demos and hosting collect, who processes it and how to reach us."),
  component: Privacy,
});

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;

function Privacy() {
  return <LegalPage
    title="Privacy Policy"
    updated="21 October 2026"
    intro={<p>This page explains what information kriyvoai.online ("the site") handles, why, and who else processes it. The site is run by {BUSINESS.name}, {ADDRESS_LINE}. Questions or requests: {mail}.</p>}
    sections={[
      { id: "summary", heading: "The short version", body: <ul>
        <li>The site uses no advertising or tracking cookies. Visits are counted with Cloudflare Web Analytics, which doesn't use cookies.</li>
        <li>The contact form and the project estimator do not send your details to us directly. They open WhatsApp with a message you can read and edit before you choose to send it.</li>
        <li>The live demos send what you type or say to the AI and voice providers listed below, only to produce the demo's answer.</li>
      </ul> },
      { id: "contact", heading: "Contact form, estimator and WhatsApp", body: <>
        <p>When you use the contact form or the estimator, the details you enter (for example your name, project type, budget range and message) are put into a WhatsApp message on your own device. Nothing is sent until you press send in WhatsApp. Messages you send us on WhatsApp, by phone or by email are used to reply to you and to quote and deliver your project.</p>
        <p>WhatsApp is operated by Meta and its own privacy policy applies to messages sent through it.</p>
      </> },
      { id: "demos", heading: "Live demos", body: <>
        <p>Some project pages have live demos. They are optional and only run when you start them.</p>
        <ul>
          <li><strong>Website assistant, WhatsApp funnel and patient-feedback demo:</strong> the text you type is sent to Groq to generate the reply or the classification. Please don't enter real patient, health or confidential information.</li>
          <li><strong>Voice receptionist:</strong> your browser's own speech recognition turns your voice into text (in some browsers this is done by the browser maker's service). The text is sent to Groq for the reply, and the reply is turned into speech by ElevenLabs. Your microphone is used only while the call is open, and audio of your voice is not sent to us.</li>
          <li><strong>Outreach invite demo:</strong> you give your public LinkedIn profile URL and an email address, with your consent. Apify reads the public profile once to write the invite, and the scraped result is deleted from Apify straight away. The invite is not stored on our side. If you ask for it by email, it is sent through Resend to the address you gave.</li>
        </ul>
        <p>Demo conversations are not saved to a database by us. Error messages may be written to the hosting logs described below.</p>
      </> },
      { id: "technical", heading: "Hosting, logs and abuse protection", body: <>
        <p>The site is hosted on Netlify and served through Cloudflare. Both process standard request data such as your IP address, browser type and the pages requested in order to serve the site and keep it secure.</p>
        <p>Cloudflare Web Analytics counts page views and measures page speed so we can see which pages are used and how fast they load. It does not use cookies or local storage, and it does not build a profile of you.</p>
        <p>To stop automated abuse of the live demos, the site counts requests per IP address (and, for the outreach demo, per LinkedIn URL and email address) for up to one day. These counters are kept in Upstash and expire automatically. The outreach demo may also show a Cloudflare Turnstile check, which Cloudflare uses to tell people from bots.</p>
      </> },
      { id: "cookies", heading: "Cookies and browser storage", body: <>
        <p>The site does not set analytics, advertising or tracking cookies. It stores one small value in your browser's session storage when you close the offer bar at the top of the page, so it stays closed for that visit. It is removed when you close the tab.</p>
        <p>Third-party services used on specific pages, such as Cloudflare Turnstile on the outreach demo, may use their own technologies as described in their policies.</p>
      </> },
      { id: "providers", heading: "Who processes information", body: <>
        <p>These services process information on our behalf for the purposes above. Some of them are located outside India.</p>
        <ul>
          <li>Netlify: website hosting</li>
          <li>Groq: AI replies and classification in the demos</li>
          <li>ElevenLabs: speech for the voice demo</li>
          <li>Apify: reading a public LinkedIn profile in the outreach demo</li>
          <li>Resend: sending the demo invite email</li>
          <li>Cloudflare: content delivery, cookieless Web Analytics and the Turnstile human check</li>
          <li>Upstash: short-lived rate-limit counters</li>
          <li>Meta (WhatsApp) and Google (Gmail): conversations you start with us</li>
        </ul>
      </> },
      { id: "retention", heading: "How long information is kept", body: <ul>
        <li>Rate-limit counters: up to one day.</li>
        <li>Demo inputs: not stored by us; see each provider's policy for their own handling.</li>
        <li>Project conversations and files you send us: kept for as long as needed to deliver and support your project, or until you ask us to delete them, unless we need to keep them for legal or accounting reasons.</li>
      </ul> },
      { id: "rights", heading: "Your choices and requests", body: <>
        <p>You can ask us what information we hold about you, ask for it to be corrected or deleted, or withdraw consent you gave for a demo, by writing to {mail}. We'll reply within a reasonable time.</p>
        <p>The site is not directed at children.</p>
      </> },
      { id: "changes", heading: "Changes to this policy", body: <p>If the site's forms, demos or providers change, this page will be updated and the date at the top will change. See also the <Link to="/terms">Terms of Service</Link>.</p> },
    ]}
  />;
}
