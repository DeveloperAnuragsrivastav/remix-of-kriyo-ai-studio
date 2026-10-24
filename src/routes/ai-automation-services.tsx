import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { aiAutomationServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/ai-automation-services")({
  head: () => localHead(aiAutomationServices, aiAutomationServices.areas.map(a => a.name)),
  component: () => <LocalPage page={aiAutomationServices} />,
});
