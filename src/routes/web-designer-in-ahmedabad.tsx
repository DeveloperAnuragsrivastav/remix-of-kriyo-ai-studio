import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webAhmedabad } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-ahmedabad")({
  head: () => localHead(webAhmedabad, webAhmedabad.areas.map(a => a.name)),
  component: () => <LocalPage page={webAhmedabad} />,
});
