import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { aiMumbai, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/ai-developer-in-mumbai")({
  head: () => localHead(aiMumbai, ["Mumbai", "Navi Mumbai", "Thane", "Maharashtra"]),
  component: () => <LocalPage page={aiMumbai} />,
});
