import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { delhiNcr, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/web-developer-delhi-ncr")({
  head: () => localHead(delhiNcr, ["Noida", "Greater Noida", "Ghaziabad", "Gurugram", "Faridabad", "Delhi NCR"]),
  component: () => <LocalPage page={delhiNcr} />,
});
