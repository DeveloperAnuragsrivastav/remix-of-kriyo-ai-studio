import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";
import { ADDRESS_LINE, BUSINESS } from "@/lib/business";
import { pageMeta } from "@/lib/page-meta";

/*
 * Plain-language terms built only from how Kriyvo AI already describes its work on this site
 * (pricing notes, FAQs, process and handover pages). Owner/legal review pending: payment schedule,
 * refunds, liability and governing-law wording need the owner's decision before this is treated as final.
 */
export const Route = createFileRoute("/terms")({
  head: () => pageMeta("Terms of Service", "The terms for using kriyvoai.online and for website, chatbot and automation projects with Kriyvo AI: quotes, scope, third-party costs, handover and demos."),
  component: Terms,
});

const mail = <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>;

function Terms() {
  return <LegalPage
    title="Terms of Service"
    updated="21 October 2026"
    intro={<p>These terms cover your use of kriyvoai.online and projects you order from {BUSINESS.name}, {ADDRESS_LINE}. For every project, the written proposal or order agreed with you sets out the details, and it takes priority over this page where the two differ. Questions: {mail}.</p>}
    sections={[
      { id: "site", heading: "Using this website", body: <>
        <p>You may browse the site and use its tools and demos for your own evaluation. Please don't misuse them, for example by sending automated requests, trying to get around rate limits or human checks, or entering other people's personal data without permission.</p>
        <p>Articles and guides are general information, not professional advice for your specific situation.</p>
      </> },
      { id: "quotes", heading: "Prices and quotes", body: <>
        <p>Package prices shown on the <Link to="/pricing">pricing page</Link> are starting prices for the scope listed on each package. Custom websites, web apps, voice agents and larger AI systems are quoted to your scope.</p>
        <p>The estimator gives a starting price from the published packages to help you plan. It is not a binding quote. The final price, deliverables, milestones and exclusions are confirmed in writing before work starts.</p>
      </> },
      { id: "third-party", heading: "Third-party costs", body: <>
        <p>Unless your order says otherwise, these are not included in the build price and are paid to the provider:</p>
        <ul>
          <li>Domain names and hosting, which are bought in your name so you own them.</li>
          <li>AI model usage, hosting of AI or automation workflows and other third-party tools.</li>
          <li>WhatsApp Business API setup, provider fees and Meta messaging charges.</li>
        </ul>
        <p>These are explained before you order.</p>
      </> },
      { id: "scope", heading: "Scope, content and changes", body: <>
        <p>Work follows the scope written in your proposal. Anything outside it is agreed with you, with its price and timeline, before it is done.</p>
        <p>You provide your logo, text, photos, product details and access to the accounts the project needs. Delivery times assume this material is ready; if it isn't, the timeline moves accordingly. You confirm you have the right to use the material you provide.</p>
      </> },
      { id: "payment", heading: "Payment", body: <p>Payment terms and milestones are agreed before the build starts and written into your order.</p> },
      { id: "handover", heading: "Handover and ownership", body: <p>When the project is delivered and paid for, you receive the source files, logins and setup notes for what was built, as described in your order. Third-party software, themes, plugins and services used in the project stay under their own licences and terms.</p> },
      { id: "maintenance", heading: "Support and maintenance", body: <p>Support included with a package, such as one month of free maintenance on the business website and e-commerce plans, is described on that package. Further support or changes are agreed separately.</p> },
      { id: "demos", heading: "Live demos", body: <p>The live demos show how Kriyvo AI's systems work. They are provided as they are, may give inaccurate answers, have daily usage limits and may switch to a scripted version when a provider is unavailable. Bookings, tickets or confirmations shown in a demo are simulated. How demo information is handled is explained in the <Link to="/privacy-policy">Privacy Policy</Link>.</p> },
      { id: "contact", heading: "Contact", body: <p>{BUSINESS.name}, {ADDRESS_LINE}. Email {mail}, phone or WhatsApp <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phone}</a>.</p> },
    ]}
  />;
}
