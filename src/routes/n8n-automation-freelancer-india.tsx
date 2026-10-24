import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { n8nFreelancerIndia } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/n8n-automation-freelancer-india")({
  head: () => localHead(n8nFreelancerIndia, n8nFreelancerIndia.areas.map(a => a.name)),
  component: () => <LocalPage page={n8nFreelancerIndia} />,
});
