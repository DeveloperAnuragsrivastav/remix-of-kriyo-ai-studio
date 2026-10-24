import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webNagpur } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-nagpur")({
  head: () => localHead(webNagpur, webNagpur.areas.map(a => a.name)),
  component: () => <LocalPage page={webNagpur} />,
});
