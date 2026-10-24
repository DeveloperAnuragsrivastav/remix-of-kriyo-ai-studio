import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { reactServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/react-developer-services")({
  head: () => localHead(reactServices, reactServices.areas.map(a => a.name)),
  component: () => <LocalPage page={reactServices} />,
});
