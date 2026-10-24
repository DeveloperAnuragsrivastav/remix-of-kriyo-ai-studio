import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { whyHireFreelancerIndia } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/why-you-should-hire-a-freelance-web-designer-in-india-today")({
  head: () => localHead(whyHireFreelancerIndia, whyHireFreelancerIndia.areas.map(a => a.name)),
  component: () => <LocalPage page={whyHireFreelancerIndia} />,
});
