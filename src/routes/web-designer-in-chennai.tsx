import { createFileRoute } from "@tanstack/react-router";
import { LocalPage } from "@/components/LocalPage";
import { webChennai, localHead } from "@/lib/local-pages";

export const Route = createFileRoute("/web-designer-in-chennai")({
  head: () => localHead(webChennai, ["Chennai", "Tamil Nadu"]),
  component: () => <LocalPage page={webChennai} />,
});
