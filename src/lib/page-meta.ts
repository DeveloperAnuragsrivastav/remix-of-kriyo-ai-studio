export function pageMeta(title: string, description: string, article = false) {
  return { meta: [
    { title: `${title} — Kriyvo AI` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Kriyvo AI` },
    { property: "og:description", content: description },
    { property: "og:type", content: article ? "article" : "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}