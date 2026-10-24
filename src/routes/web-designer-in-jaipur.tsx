import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webJaipur } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-jaipur")({
  head: () => localHead(webJaipur, webJaipur.areas.map(a => a.name)),
  component: () => <LocalPage page={webJaipur} />,
});
