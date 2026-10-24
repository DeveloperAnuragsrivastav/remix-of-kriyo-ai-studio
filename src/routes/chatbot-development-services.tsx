import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { chatbotServices } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/chatbot-development-services")({
  head: () => localHead(chatbotServices, chatbotServices.areas.map(a => a.name)),
  component: () => <LocalPage page={chatbotServices} />,
});
