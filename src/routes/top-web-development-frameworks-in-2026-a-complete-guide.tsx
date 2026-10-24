import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webFrameworksGuide } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/top-web-development-frameworks-in-2026-a-complete-guide")({
  head: () => localHead(webFrameworksGuide, webFrameworksGuide.areas.map(a => a.name)),
  component: () => <LocalPage page={webFrameworksGuide} />,
});
