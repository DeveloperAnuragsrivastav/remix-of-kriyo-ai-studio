import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { freelancerVsAgencyGuide } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/freelance-web-developer-vs-agency-india")({
  head: () => localHead(freelancerVsAgencyGuide, freelancerVsAgencyGuide.areas.map(a => a.name)),
  component: () => <LocalPage page={freelancerVsAgencyGuide} />,
});
