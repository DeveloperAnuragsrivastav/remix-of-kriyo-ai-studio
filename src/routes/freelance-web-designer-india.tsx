import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webDesignerIndia } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/freelance-web-designer-india")({
  head: () => localHead(webDesignerIndia, webDesignerIndia.areas.map(a => a.name)),
  component: () => <LocalPage page={webDesignerIndia} />,
});
