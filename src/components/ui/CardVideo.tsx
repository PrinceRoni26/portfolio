"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useReducedMotion } from "motion/react";

type CardVideoProps = {
  /** Short, silent loop shown in the card (keep it small, ~1 MB). */
  teaser?: string;
  /** Full video with sound, played inline when the visitor clicks. */
  src: string;
  poster: string;
  title: string;
  duration?: string;
};

/**
 * Project-card video: plays a muted teaser loop while visible, then switches
 * to the full video with sound and controls when clicked.
 */
export function CardVideo({ teaser, src, poster, title, duration }: CardVideoProps) {
  const [playing, setPlaying] = useState(false);
  const reduce = useReducedMotion() ?? false;
  const wrap = useRef<HTMLDivElement>(null);
  const teaserRef = useRef<HTMLVideoElement>(null);
  const fullRef = useRef<HTMLVideoElement>(null);

  // Only run the teaser while the card is on screen.
  useEffect(() => {
    const v = teaserRef.current;
    if (!v || !wrap.current || reduce) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.35 },
    );
    io.observe(wrap.current);
    return () => io.disconnect();
  }, [reduce, playing]);

  useEffect(() => {
    if (playing) fullRef.current?.play().catch(() => {});
  }, [playing]);

  return (
    <div ref={wrap} className="relative aspect-[16/10] overflow-hidden bg-[#070707]">
      {playing ? (
        <video
          ref={fullRef}
          className="absolute inset-0 h-full w-full object-contain"
          controls
          playsInline
          preload="auto"
          poster={poster}
          aria-label={title}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group/play absolute inset-0 h-full w-full text-left"
          data-cursor="Play demo"
          aria-label={`Play ${title}${duration ? ` (${duration})` : ""} with sound`}
        >
          {/* With reduced motion the teaser simply never plays, so its poster shows. */}
          {teaser ? (
            <video
              ref={teaserRef}
              className="absolute inset-0 h-full w-full object-contain"
              src={teaser}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={poster} alt="" className="absolute inset-0 h-full w-full object-contain" />
          )}
          <span className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover/play:bg-black/20" />
          <span className="absolute bottom-4 left-4 inline-flex items-center gap-3 rounded-full bg-paper py-1.5 pl-1.5 pr-4 text-sm font-medium text-ink transition-colors duration-500 group-hover/play:bg-accent group-hover/play:text-white">
            <span className="flex size-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover/play:scale-110">
              <Play className="size-3.5 translate-x-px" fill="currentColor" aria-hidden />
            </span>
            Watch demo{duration ? ` · ${duration}` : ""}
          </span>
          <span className="eyebrow absolute right-4 top-3 !text-[0.6rem] !text-white/60">Sound on</span>
        </button>
      )}
    </div>
  );
}
