import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webDevBangalore } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/freelance-web-developer-in-bangalore")({
  head: () => localHead(webDevBangalore, webDevBangalore.areas.map(a => a.name)),
  component: () => <LocalPage page={webDevBangalore} />,
});
