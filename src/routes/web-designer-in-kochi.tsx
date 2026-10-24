import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webKochi } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-kochi")({
  head: () => localHead(webKochi, webKochi.areas.map(a => a.name)),
  component: () => <LocalPage page={webKochi} />,
});
