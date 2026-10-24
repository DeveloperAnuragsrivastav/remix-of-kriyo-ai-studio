import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { webMumbai, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/freelance-web-designer-in-mumbai")({
  head: () => localHead(webMumbai, ["Mumbai", "Navi Mumbai", "Thane", "Maharashtra"]),
  component: () => <LocalPage page={webMumbai} />,
});
