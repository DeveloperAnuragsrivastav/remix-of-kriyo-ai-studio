import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webPune } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-pune")({
  head: () => localHead(webPune, webPune.areas.map(a => a.name)),
  component: () => <LocalPage page={webPune} />,
});
