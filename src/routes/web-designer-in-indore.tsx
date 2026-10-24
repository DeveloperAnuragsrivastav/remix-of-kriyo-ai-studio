import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webIndore } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-indore")({
  head: () => localHead(webIndore, webIndore.areas.map(a => a.name)),
  component: () => <LocalPage page={webIndore} />,
});
