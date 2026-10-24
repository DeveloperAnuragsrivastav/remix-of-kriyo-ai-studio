import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { localHead } from "@/lib/local-pages";
import { whatsappChatbotDeveloperIndia } from "@/lib/seo-landing-pages";

export const Route = createFileRoute("/whatsapp-chatbot-developer-india")({
  head: () => localHead(whatsappChatbotDeveloperIndia, whatsappChatbotDeveloperIndia.areas.map(a => a.name)),
  component: () => <LocalPage page={whatsappChatbotDeveloperIndia} />,
});
