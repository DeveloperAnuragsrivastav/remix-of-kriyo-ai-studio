import { useEffect, useRef } from "react";

/**
 * A project image that tilts toward the cursor in 3D with a soft glare, and drifts slightly
 * as it scrolls past. Mouse only; still on touch screens and under reduced motion.
 */
export function TiltImage({ src, alt, eager = false }: { src: string; alt: string; eager?: boolean }) {
  const card = useRef<HTMLDivElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const glare = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = card.current, pic = img.current, gl = glare.current;
    if (!el || !pic || !gl || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0, visible = false;

    // Scroll drift: the picture moves a little slower than the page.
    const drift = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const p = (r.top + r.height / 2 - innerHeight / 2) / innerHeight;
      pic.style.setProperty("--drift", `${(p * -28).toFixed(1)}px`);
    };
    const onScroll = () => { if (visible && !raf) raf = requestAnimationFrame(drift); };
    const io = new IntersectionObserver(([e]) => { visible = !!e?.isIntersecting; onScroll(); });
    io.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });

    const fine = window.matchMedia("(pointer: fine)").matches;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.transform = `perspective(1100px) rotateX(${((0.5 - y) * 7).toFixed(2)}deg) rotateY(${((x - 0.5) * 9).toFixed(2)}deg) scale(1.015)`;
      gl.style.opacity = "1";
      gl.style.background = `radial-gradient(520px circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.28), transparent 45%)`;
    };
    const leave = () => { el.style.transform = ""; gl.style.opacity = "0"; };
    if (fine) { el.addEventListener("pointermove", move); el.addEventListener("pointerleave", leave); }
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  return <div ref={card} className="relative overflow-hidden rounded-[24px] bg-stone shadow-[inset_0_0_0_1px_var(--color-border)] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] will-change-transform [transform-style:preserve-3d] hover:shadow-[0_40px_80px_-40px_oklch(0.2_0.02_60/0.45)]">
    <img ref={img} src={src} alt={alt} loading={eager ? "eager" : "lazy"} className="aspect-[16/10] w-full object-cover [transform:translateY(var(--drift,0px))_scale(1.08)]" />
    <div ref={glare} aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300" />
  </div>;
}
