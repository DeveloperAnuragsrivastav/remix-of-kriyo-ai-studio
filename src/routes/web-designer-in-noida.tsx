import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webNoida } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-designer-in-noida")({
  head: () => localHead(webNoida, webNoida.areas.map(a => a.name)),
  component: () => <LocalPage page={webNoida} />,
});
