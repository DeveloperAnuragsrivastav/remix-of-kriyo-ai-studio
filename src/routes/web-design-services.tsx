import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { webDesignServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/web-design-services")({
  head: () => localHead(webDesignServices, webDesignServices.areas.map(a => a.name)),
  component: () => <LocalPage page={webDesignServices} />,
});
