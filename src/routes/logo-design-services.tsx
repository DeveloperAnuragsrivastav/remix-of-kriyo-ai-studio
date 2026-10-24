import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { logoDesignServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/logo-design-services")({
  head: () => localHead(logoDesignServices, logoDesignServices.areas.map(a => a.name)),
  component: () => <LocalPage page={logoDesignServices} />,
});
