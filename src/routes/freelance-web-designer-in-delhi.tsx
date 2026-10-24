import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webDelhi } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/freelance-web-designer-in-delhi")({
  head: () => localHead(webDelhi, webDelhi.areas.map(a => a.name)),
  component: () => <LocalPage page={webDelhi} />,
});
