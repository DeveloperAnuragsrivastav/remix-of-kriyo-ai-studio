import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { webHyderabad, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/freelance-web-designer-in-hyderabad")({
  head: () => localHead(webHyderabad, ["Hyderabad", "Secunderabad", "Telangana"]),
  component: () => <LocalPage page={webHyderabad} />,
});
