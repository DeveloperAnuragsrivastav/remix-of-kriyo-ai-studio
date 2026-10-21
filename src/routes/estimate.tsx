import { createFileRoute } from "@tanstack/react-router";
import { AgencyLayout, PageIntro } from "@/components/AgencyLayout";
import { ProjectPlanner } from "@/components/ProjectPlanner";
import { pageMeta } from "@/lib/page-meta";

export const Route = createFileRoute("/estimate")({
  head: () => pageMeta("Website & AI Project Cost Estimator", "Plan your website, chatbot, WhatsApp bot or automation project in a minute and get a personal estimate from Kriyvo AI on WhatsApp. Websites from ₹999."),
  component: Estimate,
});

function Estimate() {
  return <AgencyLayout>
    <PageIntro label="Estimator" title="Plan your project in a minute" description="Pick what you need, the features and your timeline. Your brief goes straight to WhatsApp and I'll reply personally with a price range." />
    <section className="mx-auto max-w-[1240px] px-4 sm:px-6 pb-24"><ProjectPlanner /></section>
  </AgencyLayout>;
}
