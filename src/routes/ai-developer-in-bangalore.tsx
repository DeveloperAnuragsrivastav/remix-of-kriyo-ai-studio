import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { aiBangalore, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/ai-developer-in-bangalore")({
  head: () => localHead(aiBangalore, ["Bengaluru", "Bangalore", "Karnataka"]),
  component: () => <LocalPage page={aiBangalore} />,
});
