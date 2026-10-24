import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { aiDelhi, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/ai-developer-in-delhi")({
  head: () => localHead(aiDelhi, ["Delhi", "New Delhi", "Noida", "Gurgaon", "Delhi NCR"]),
  component: () => <LocalPage page={aiDelhi} />,
});
