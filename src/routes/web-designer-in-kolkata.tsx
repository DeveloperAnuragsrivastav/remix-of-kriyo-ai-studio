import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webKolkata } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-kolkata")({
  head: () => localHead(webKolkata, webKolkata.areas.map(a => a.name)),
  component: () => <LocalPage page={webKolkata} />,
});
