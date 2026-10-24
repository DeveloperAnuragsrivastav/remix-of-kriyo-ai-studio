import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { uiUxServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/ui-ux-design-services")({
  head: () => localHead(uiUxServices, uiUxServices.areas.map(a => a.name)),
  component: () => <LocalPage page={uiUxServices} />,
});
