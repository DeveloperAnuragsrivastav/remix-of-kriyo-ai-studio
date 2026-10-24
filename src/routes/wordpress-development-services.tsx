import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { wordpressServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/wordpress-development-services")({
  head: () => localHead(wordpressServices, wordpressServices.areas.map(a => a.name)),
  component: () => <LocalPage page={wordpressServices} />,
});
