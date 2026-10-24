const SUFFIX = " | Kriyvo AI";
const MAX_TITLE = 60;
const MAX_DESC = 155;

/** Trim at a word boundary so Google doesn't cut the text mid-word. */
function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:—–-]\s*$/, "")}…`;
}

/** The brand suffix is added only when the whole title still fits in Google's ~60-character display. */
export function seoTitle(title: string) {
  if (title.length + SUFFIX.length <= MAX_TITLE) return title + SUFFIX;
  return clamp(title, MAX_TITLE);
}

export function pageMeta(title: string, description: string, article = false, exact = false) {
  const t = exact ? title : seoTitle(title);
  const d = exact ? description : clamp(description, MAX_DESC);
  return { meta: [
    { title: t },
    { name: "description", content: d },
    { property: "og:title", content: t },
    { property: "og:description", content: d },
    { property: "og:type", content: article ? "article" : "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] };
}
