import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GOOGLE_REVIEWS_URL, googleRating, googleReviews } from "@/lib/kriyo-data";

// Google's avatar palette, picked by name so each reviewer keeps the same colour.
const AVATAR = ["#1a73e8", "#e8710a", "#188038", "#a142f4", "#d93025", "#12b5cb"];
const avatarColor = (name: string) => AVATAR[[...name].reduce((n, c) => n + c.codePointAt(0)!, 0) % AVATAR.length];

function GoogleLogo({ className = "h-5 w-5" }: { className?: string }) {
  return <svg viewBox="0 0 48 48" aria-hidden className={className}><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" /><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" /><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" /><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" /></svg>;
}

function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return <span className="inline-flex gap-0.5" role="img" aria-label={`Rated ${rating} out of 5`}>{Array.from({ length: 5 }, (_, i) => <Star key={i} aria-hidden className={`${size} ${i < rating ? "fill-[#fbbc04] text-[#fbbc04]" : "text-border"}`} />)}</span>;
}

/** Google reviews in a single card, one at a time (no owner replies or dates, just the client's words). */
export function Testimonials({ title = "What our clients say" }: { title?: string }) {
  const reviews = googleReviews.filter(r => r.text);
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI(x => (x + 1) % reviews.length), 7000);
    return () => window.clearInterval(id);
  }, [paused, reviews.length]);
  const r = reviews[i]!;
  const go = (d: number) => setI(x => (x + d + reviews.length) % reviews.length);

  return <section id="reviews" className="mx-auto max-w-[1240px] px-4 pb-16 pt-24 sm:px-6 md:py-44">
    <Reveal className="text-center"><h2 className="text-[2.4rem] md:text-[3rem]">{title}</h2></Reveal>
    <Reveal delay={80}><div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} className="mt-14 rounded-[28px] bg-card p-6 shadow-[inset_0_0_0_1px_var(--color-border)] md:p-12">
      <div className="flex justify-center"><a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 text-[15px] text-muted-foreground hover:text-foreground"><GoogleLogo className="h-6 w-6" /><span className="text-foreground">{googleRating.score}</span><Stars rating={5} /><span>{googleRating.count} Google reviews</span></a></div>
      <blockquote key={i} aria-live="polite" className="mt-8 min-h-[7.5rem] text-lg leading-relaxed sm:text-xl leading-relaxed animate-stage md:text-2xl md:leading-[1.5]">{r.text?.replace(/\s*⭐+$/u, "")}</blockquote>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <div key={`p${i}`} className="flex items-center gap-4 animate-stage">
          <span aria-hidden className="grid h-14 w-14 shrink-0 place-items-center rounded-full text-xl font-medium text-white" style={{ background: avatarColor(r.name) }}>{[...r.name][0]?.toUpperCase()}</span>
          <span><span className="block text-[18px] font-medium">{r.name}</span><span className="mt-0.5 flex items-center gap-2 text-[14px] text-muted-foreground"><Stars rating={r.rating} size="h-3.5 w-3.5" />Google review</span></span>
        </div>
        <div className="flex w-full flex-wrap items-center gap-2 sm:w-auto sm:flex-nowrap">
          <button type="button" aria-label="Previous review" onClick={() => go(-1)} className="btn btn-light !h-11 !w-11 !p-0"><ChevronLeft aria-hidden className="h-5 w-5" /></button>
          <span className="w-12 text-center text-[14px] text-muted-foreground tabular">{i + 1} / {reviews.length}</span>
          <button type="button" aria-label="Next review" onClick={() => go(1)} className="btn btn-light !h-11 !w-11 !p-0"><ChevronRight aria-hidden className="h-5 w-5" /></button>
          <a href={GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer" className="btn btn-light w-full shrink-0 whitespace-nowrap sm:ml-2 sm:w-auto">Read on Google</a>
        </div>
      </div>
    </div></Reveal>
  </section>;
}
