import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { bestAiToolsMarketing } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/best-ai-tools-for-digital-marketing-in-2026-top-picks-for-success")({
  head: () => localHead(bestAiToolsMarketing, bestAiToolsMarketing.areas.map(a => a.name)),
  component: () => <LocalPage page={bestAiToolsMarketing} />,
});
