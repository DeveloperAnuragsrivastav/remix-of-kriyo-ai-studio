import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { crmServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/crm-development-services")({
  head: () => localHead(crmServices, crmServices.areas.map(a => a.name)),
  component: () => <LocalPage page={crmServices} />,
});
