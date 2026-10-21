import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { eastDelhi, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/website-developer-east-delhi")({
  head: () => localHead(eastDelhi, ["New Ashok Nagar", "Mayur Vihar", "Laxmi Nagar", "Preet Vihar", "Patparganj", "East Delhi"]),
  component: () => <LocalPage page={eastDelhi} />,
});
