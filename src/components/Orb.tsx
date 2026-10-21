import { useEffect, useRef } from "react";

/**
 * The voice of the AI phone agent: a ball of orange light drawn on canvas.
 * `energy` (0–1) makes it swell and churn while the agent is speaking.
 * Pauses off-screen and holds still under reduced motion.
 */
export function Orb({ energy = 0.2, className = "" }: { energy?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const energyRef = useRef(energy);
  energyRef.current = energy;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0, visible = true, t = 0, e = energyRef.current;

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };
    size();
    const ro = new ResizeObserver(size);
    ro.observe(canvas);

    const blobs: [string, number, number, number, number][] = [
      ["255,170,110", 0.22, 0.31, 0.0, 0.62],
      ["255,92,20", 0.28, 0.23, 2.1, 0.58],
      ["214,52,10", 0.3, 0.37, 4.2, 0.5],
      ["255,206,120", 0.18, 0.43, 1.3, 0.42],
      ["255,128,90", 0.26, 0.19, 3.4, 0.46],
    ];

    const draw = () => {
      const w = canvas.width, h = canvas.height, s = Math.min(w, h), cx = w / 2, cy = h / 2;
      e += (energyRef.current - e) * 0.025;
      const R = s * 0.4 * (1 + Math.sin(t * (1.2 + e * 2.5)) * (0.004 + e * 0.018));
      ctx.clearRect(0, 0, w, h);
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "rgb(255,120,52)";
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";
      for (const [c, orbit, speed, phase, sz] of blobs) {
        const a = t * speed * 0.45 * (1 + e * 0.8) + phase;
        const x = cx + Math.cos(a) * R * orbit * (1 + e * 0.35);
        const y = cy + Math.sin(a * 1.3) * R * orbit * (1 + e * 0.35);
        const g = ctx.createRadialGradient(x, y, 0, x, y, R * sz);
        g.addColorStop(0, `rgba(${c},0.55)`);
        g.addColorStop(1, `rgba(${c},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = "source-over";
      const rim = ctx.createRadialGradient(cx, cy, R * 0.55, cx, cy, R);
      rim.addColorStop(0, "rgba(120,30,0,0)");
      rim.addColorStop(1, "rgba(120,30,0,0.3)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();
    };

    const loop = () => {
      cancelAnimationFrame(raf);
      const step = () => { if (!visible || document.hidden) return; t += 0.016; draw(); raf = requestAnimationFrame(step); };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver(([en]) => { visible = !!en?.isIntersecting; if (visible && !still) loop(); });
    io.observe(canvas);
    const onVis = () => { if (!document.hidden && visible && !still) loop(); };
    document.addEventListener("visibilitychange", onVis);
    draw();
    if (!still) loop();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return <canvas ref={ref} aria-hidden className={`block aspect-square ${className}`} />;
}
