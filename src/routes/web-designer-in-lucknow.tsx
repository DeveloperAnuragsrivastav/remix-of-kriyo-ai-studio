import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webLucknow } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-lucknow")({
  head: () => localHead(webLucknow, webLucknow.areas.map(a => a.name)),
  component: () => <LocalPage page={webLucknow} />,
});
