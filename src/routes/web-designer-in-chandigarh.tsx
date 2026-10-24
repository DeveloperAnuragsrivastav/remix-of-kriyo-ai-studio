import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webChandigarh } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-chandigarh")({
  head: () => localHead(webChandigarh, webChandigarh.areas.map(a => a.name)),
  component: () => <LocalPage page={webChandigarh} />,
});
