import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children in when they scroll into view. "Shown" lives in React state (not a class added by
 * hand) so a re-render that changes `className`, like opening an FAQ card, can never hide it again.
 */
export function Reveal({ children, delay = 0, className = "", as = "div" }: { children: ReactNode; delay?: number; className?: string; as?: "div" | "li" }) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const show = () => setShown(true);
    if (typeof IntersectionObserver === "undefined") { show(); return; }
    // Any pixel on screen reveals it, so tall blocks and fast scrolls never stay hidden.
    const io = new IntersectionObserver(
      // Also reveal anything already scrolled past (fast scrolls, jumping to a section from a link).
      ([e]) => { if (e && (e.isIntersecting || e.boundingClientRect.top < 0)) { show(); io.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px 10% 0px" },
    );
    io.observe(el);
    // Safety net: never leave content invisible if the observer does not fire.
    const t = window.setTimeout(show, 2500);
    return () => { io.disconnect(); window.clearTimeout(t); };
  }, []);
  return createElement(as, { ref, className: `reveal ${shown ? "is-in" : ""} ${className}`, style: { transitionDelay: `${delay}ms` } }, children);
}
