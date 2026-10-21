import { useEffect, useRef, useState, type ReactNode } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/* ---------- Hero code card that types itself out ---------- */
type Token = { t: string; c?: "kw" | "str" };
const S = (t: string): Token => ({ t, c: "str" });
const LINES: Token[][] = [
  [{ t: "const", c: "kw" }, { t: " kriyvo = {" }],
  [{ t: "  role: " }, S('"Web Developer + AI Engineer"'), { t: "," }],
  [{ t: "  stack: [" }, S('"Next.js"'), { t: ", " }, S('"WordPress"'), { t: ", " }, S('"n8n"'), { t: ", " }, S('"LLMs"'), { t: "]," }],
  [{ t: "  builds: [" }, S('"websites"'), { t: ", " }, S('"chatbots"'), { t: ", " }, S('"voice agents"'), { t: "]," }],
  [{ t: "  based: " }, S('"Delhi NCR · remote"'), { t: "," }],
  [{ t: "  status: " }, S('"booking new projects"')],
  [{ t: "};" }],
];
const TOTAL = LINES.flat().reduce((n, tok) => n + tok.t.length, 0);
const COLOR = { kw: "text-saffron", str: "text-[oklch(0.82_0.12_150)]" } as const;

export function TypingCode() {
  // Server render and reduced-motion users get the full card; the browser replays it as typing.
  const [shown, setShown] = useState(TOTAL);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    let n = 0;
    setShown(0);
    const id = window.setInterval(() => {
      n += 2;
      setShown(Math.min(n, TOTAL));
      if (n >= TOTAL) window.clearInterval(id);
    }, 22);
    return () => window.clearInterval(id);
  }, []);

  let left = shown;
  const done = shown >= TOTAL;
  return (
    <>
    <span className="sr-only">Kriyvo: web developer and AI engineer, building websites, chatbots and voice agents, based in Delhi NCR, booking new projects.</span>
    <pre aria-hidden="true" className="mt-5 min-h-[13.5rem] whitespace-pre-wrap break-words font-mono text-sm leading-7 text-ink-foreground/85 sm:whitespace-pre">
      <code>
        {LINES.map((line, i) => {
          if (left <= 0 && i > 0) return null;
          const parts = line.map((tok, j) => {
            const take = Math.max(0, Math.min(tok.t.length, left));
            left -= take;
            if (!take) return null;
            return <span key={j} className={tok.c ? COLOR[tok.c] : undefined}>{tok.t.slice(0, take)}</span>;
          });
          return <span key={i}>{parts}{i < LINES.length - 1 && left > 0 ? "\n" : ""}</span>;
        })}
        <span className={`ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-saffron ${done ? "animate-caret" : ""}`} />
      </code>
    </pre>
    </>
  );
}

/* ---------- Steps that light up one after another when scrolled into view ---------- */
export function StepSequence({ count, children }: { count: number; children: (active: boolean, i: number) => ReactNode }) {
  const ref = useRef<HTMLOListElement>(null);
  const [lit, setLit] = useState(-1);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") { setLit(count - 1); return; }
    let timer: number | undefined;
    const io = new IntersectionObserver(([e]) => {
      if (!e?.isIntersecting) return;
      io.disconnect();
      let i = 0;
      setLit(0);
      timer = window.setInterval(() => { i += 1; setLit(i); if (i >= count - 1) window.clearInterval(timer); }, 450);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => { io.disconnect(); window.clearInterval(timer); };
  }, [count]);
  return <ol ref={ref} className="mt-14 grid gap-10 md:grid-cols-4 md:gap-8">{Array.from({ length: count }, (_, i) => children(i <= lit, i))}</ol>;
}
