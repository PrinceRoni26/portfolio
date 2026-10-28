"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Layers, Play, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { creativeCategories, creativeWork } from "@/data/creative";
import type { CreativeImage, CreativeItem, CreativeMedia } from "@/types";

type Filter = (typeof creativeCategories)[number];

const ease = [0.22, 1, 0.36, 1] as const;

/** Display names for categories (the data keeps its original values). */
const categoryLabel = (c: Filter | CreativeItem["category"]) =>
  c === "Social Media Graphics" ? "Social Media Design" : c;

const aspectClass: Record<CreativeItem["aspect"], string> = {
  "1/1": "aspect-square",
  "4/5": "aspect-[4/5]",
  "9/16": "aspect-[9/16]",
  "16/9": "aspect-video",
};

function formatDate(iso: string) {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** The image used for the grid thumbnail. */
function coverOf(m: CreativeMedia): CreativeImage {
  if (m.type === "gallery") return m.images[0];
  if (m.type === "video") return { src: m.poster, width: m.width, height: m.height };
  return m;
}

function ratioOf(item: CreativeItem) {
  if (item.media) {
    const c = coverOf(item.media);
    return c.width / c.height;
  }
  const [w, h] = item.aspect.split("/").map(Number);
  return w / h;
}

/** Short label under each card: the date if known, otherwise what kind of media it is. */
function cardLabel(item: CreativeItem) {
  if (!item.media) return "Soon";
  if (item.date) return formatDate(item.date);
  if (item.media.type === "gallery") return `${item.media.images.length} images`;
  return item.media.type === "video" ? (item.media.height > item.media.width ? "Reel" : "Video") : "Image";
}

function cursorLabel(item: CreativeItem) {
  if (item.media?.type === "video") return "Play";
  if (item.media?.type === "gallery") return "Open set";
  return "View";
}

function isVideoCategory(item: CreativeItem) {
  return item.media?.type === "video" || item.category === "Video Editing" || item.category === "Motion Graphics";
}

function Placeholder({ item, large = false }: { item: CreativeItem; large?: boolean }) {
  return (
    <div className="placeholder-grid relative flex h-full w-full flex-col justify-between p-4">
      <span className="eyebrow !text-[0.62rem]">{categoryLabel(item.category)}</span>
      {isVideoCategory(item) ? (
        <span className="mx-auto flex size-12 items-center justify-center rounded-full border border-line-strong bg-surface/80">
          <Play className="size-4 translate-x-px" aria-hidden />
        </span>
      ) : (
        <span className={`display mx-auto text-center text-fg/25 ${large ? "text-6xl" : "text-4xl"}`}>
          {item.aspect.replace("/", ":")}
        </span>
      )}
      <span className="eyebrow !text-[0.62rem]">Media coming soon</span>
    </div>
  );
}

/**
 * Thumbnail with a hover preview: video items start playing muted while the
 * mouse is over them. The video file is only requested on first hover.
 */
function Thumb({ item, hovered, sizes }: { item: CreativeItem; hovered: boolean; sizes: string }) {
  const m = item.media;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [armed, setArmed] = useState(false);
  // Mount the preview video on first hover and keep it afterwards.
  if (hovered && !armed && m?.type === "video") setArmed(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (hovered) v.play().catch(() => {});
    else v.pause();
  }, [hovered, m, armed]);

  if (!m) return <Placeholder item={item} />;
  const { src } = coverOf(m);
  return (
    <>
      <Image
        src={src}
        alt=""
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-[1.4s] ease-[var(--ease)] group-hover:scale-[1.04]"
      />
      {m.type === "video" && armed ? (
        <video
          ref={videoRef}
          src={m.src}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${hovered ? "opacity-100" : "opacity-0"}`}
        />
      ) : null}
      {m.type === "video" ? (
        <span
          className={`absolute bottom-3 left-3 flex size-10 items-center justify-center rounded-full bg-paper text-ink transition-all duration-500 ease-[var(--ease)] ${
            hovered ? "scale-75 opacity-0" : ""
          }`}
        >
          <Play className="size-3.5 translate-x-px" fill="currentColor" aria-hidden />
        </span>
      ) : null}
      {m.type === "gallery" ? (
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-xs font-medium text-ink">
          <Layers className="size-3.5" aria-hidden />
          {m.images.length}
        </span>
      ) : null}
    </>
  );
}

function useHover() {
  const [hovered, setHovered] = useState(false);
  const reduce = useReducedMotion();
  return {
    hovered: hovered && !reduce,
    bind: {
      onPointerEnter: (e: React.PointerEvent) => e.pointerType === "mouse" && setHovered(true),
      onPointerLeave: () => setHovered(false),
      onFocus: () => setHovered(true),
      onBlur: () => setHovered(false),
    },
  };
}

function Tile({ item, onOpen }: { item: CreativeItem; onOpen: (el: HTMLButtonElement) => void }) {
  const { hovered, bind } = useHover();
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      className="group block w-full text-left"
      aria-label={`Open ${item.title} for ${item.client}`}
      data-cursor={cursorLabel(item)}
      {...bind}
    >
      <span
        className={`relative block overflow-hidden bg-tint ${item.media ? "" : aspectClass[item.aspect]}`}
        style={item.media ? { aspectRatio: `${coverOf(item.media).width} / ${coverOf(item.media).height}` } : undefined}
      >
        <Thumb item={item} hovered={hovered} sizes="(min-width: 1024px) 33vw, 50vw" />
        <span className="absolute left-3 top-3 hidden translate-y-1 rounded-full bg-ink px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-paper opacity-0 transition-all duration-500 ease-[var(--ease)] group-hover:translate-y-0 group-hover:opacity-100 sm:block">
          {categoryLabel(item.category)}
        </span>
      </span>
      <span className="mt-3 flex items-baseline justify-between gap-3">
        <span className="line-clamp-2 text-[0.9rem] font-medium leading-snug transition-colors duration-300 group-hover:text-accent sm:text-[0.95rem]">
          {item.title}
        </span>
        <span className="eyebrow hidden shrink-0 sm:block">{cardLabel(item)}</span>
      </span>
      <span className="mt-0.5 block text-[0.8rem] text-muted sm:text-sm">{item.client}</span>
    </button>
  );
}

function FeaturedTile({ item, onOpen, index }: { item: CreativeItem; onOpen: (el: HTMLButtonElement) => void; index: number }) {
  const { hovered, bind } = useHover();
  const tall = ratioOf(item) < 1;
  return (
    <button
      type="button"
      onClick={(e) => onOpen(e.currentTarget)}
      className={`group relative block shrink-0 snap-start text-left md:w-auto ${tall ? "w-[58vw]" : "w-[84vw]"}`}
      aria-label={`Open featured work: ${item.title} for ${item.client}`}
      data-cursor={cursorLabel(item)}
      {...bind}
    >
      <span className="relative block overflow-hidden bg-tint" style={{ aspectRatio: String(ratioOf(item)) }}>
        <Thumb item={item} hovered={hovered} sizes={tall ? "(min-width: 768px) 20vw, 60vw" : "(min-width: 768px) 55vw, 85vw"} />
        <span className="absolute left-3 top-3 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-white">
          Featured 0{index + 1}
        </span>
      </span>
      <span className="mt-4 block">
        <span className="eyebrow block">{categoryLabel(item.category)} · {item.client}</span>
        <span className="display mt-1.5 block text-[clamp(1.25rem,2vw,1.75rem)] leading-tight transition-colors duration-300 group-hover:text-accent">
          {item.title}
        </span>
      </span>
    </button>
  );
}

export function CreativeGallery() {
  const [filter, setFilter] = useState<Filter>("All Work");
  const [active, setActive] = useState<{ item: CreativeItem; list: CreativeItem[] } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const featured = useMemo(
    () => creativeWork.filter((i) => i.featured).sort((a, b) => ratioOf(b) - ratioOf(a)),
    [],
  );

  // In "All Work" the featured pieces already sit above the grid.
  const items = useMemo(
    () =>
      filter === "All Work"
        ? creativeWork.filter((i) => !i.featured)
        : creativeWork.filter((i) => i.category === filter),
    [filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { "All Work": creativeWork.length };
    for (const i of creativeWork) c[i.category] = (c[i.category] ?? 0) + 1;
    return c;
  }, []);

  const open = (item: CreativeItem, list: CreativeItem[], el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setActive({ item, list });
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  const step = useCallback((dir: number) => {
    setActive((a) => {
      if (!a) return a;
      const i = a.list.findIndex((x) => x.id === a.item.id);
      return { ...a, item: a.list[(i + dir + a.list.length) % a.list.length] };
    });
  }, []);

  useEffect(() => {
    const d = dialogRef.current;
    if (active && d && !d.open) d.showModal();
  }, [active]);

  // Arrow keys move between works, except inside a multi-image set (which uses them for its images).
  useEffect(() => {
    if (!active || active.item.media?.type === "gallery") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  const position = active ? active.list.findIndex((x) => x.id === active.item.id) + 1 : 0;

  return (
    <>
      {featured.length ? (
        <div className="mb-20 md:mb-28">
          <div className="mb-5 flex items-baseline justify-between gap-4">
            <p className="eyebrow !text-fg">Featured</p>
            <p className="eyebrow hidden md:block">Hover to preview · click to watch</p>
          </div>
          <div
            className="no-scrollbar -mx-[var(--gutter)] flex snap-x snap-mandatory items-start gap-3 overflow-x-auto px-[var(--gutter)] md:mx-0 md:grid md:gap-5 md:overflow-visible md:px-0"
            style={{ gridTemplateColumns: featured.map((f) => `${ratioOf(f)}fr`).join(" ") }}
          >
            {featured.map((f, i) => (
              <FeaturedTile key={f.id} item={f} index={i} onOpen={(el) => open(f, featured, el)} />
            ))}
          </div>
        </div>
      ) : null}

      <div className="sticky top-[4.25rem] z-30 mb-10 md:top-[4.75rem]">
        <div
          role="group"
          aria-label="Filter creative work"
          className="no-scrollbar -mx-[var(--gutter)] flex overflow-x-auto px-[var(--gutter)] md:mx-0 md:px-0"
        >
          <div className="flex shrink-0 rounded-full bg-ink p-1 text-paper">
            {creativeCategories.map((c) => {
              const selected = filter === c;
              return (
                <button
                  key={c}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(c)}
                  className={`relative shrink-0 rounded-full px-4 py-2 text-[0.82rem] transition-colors duration-300 ${
                    selected ? "text-ink" : "text-paper/70 hover:text-paper"
                  }`}
                >
                  {selected ? (
                    <motion.span
                      layoutId="creative-filter"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  ) : null}
                  <span className="relative">
                    {categoryLabel(c)}
                    <sup className="ml-1 text-[0.62rem] opacity-60">{counts[c] ?? 0}</sup>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="border border-line py-16 text-center text-muted">No work in this category yet.</p>
      ) : (
        <motion.ul layout className="columns-2 gap-3 sm:gap-5 lg:columns-3 lg:gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item) => (
              <motion.li
                key={item.id}
                layout
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease }}
                className="mb-6 break-inside-avoid md:mb-8"
              >
                <Tile item={item} onOpen={(el) => open(item, items, el)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}

      <dialog
        ref={dialogRef}
        aria-labelledby="creative-dialog-title"
        onClose={() => {
          setActive(null);
          lastTrigger.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        className="tone-dark m-0 h-dvh max-h-none w-screen max-w-none p-0 backdrop:bg-ink/80"
      >
        {active ? (
          <div className="flex h-full flex-col lg:flex-row" onClick={(e) => e.target === e.currentTarget && close()}>
            <div
              className="relative flex min-h-0 flex-1 items-center justify-center p-4 pt-16 lg:p-12"
              onClick={(e) => e.target === e.currentTarget && close()}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.item.id}
                  className="flex h-full w-full items-center justify-center"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35, ease }}
                  onClick={(e) => e.target === e.currentTarget && close()}
                >
                  <MediaView item={active.item} />
                </motion.div>
              </AnimatePresence>
            </div>
            <aside className="flex max-h-[45dvh] flex-col overflow-y-auto border-t border-line p-6 lg:max-h-none lg:w-[25rem] lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-baseline justify-between gap-4 pr-14">
                <p className="eyebrow">{categoryLabel(active.item.category)}</p>
                <p className="eyebrow tabular-nums">
                  {String(position).padStart(2, "0")} / {String(active.list.length).padStart(2, "0")}
                </p>
              </div>
              <h3 id="creative-dialog-title" className="display mt-4 text-[2.4rem] leading-[0.95]">
                {active.item.title}
              </h3>
              <dl className="mt-6 space-y-4 text-sm">
                <div>
                  <dt className="eyebrow mb-1">Client</dt>
                  <dd>{active.item.client}</dd>
                </div>
                {active.item.media && active.item.date ? (
                  <div>
                    <dt className="eyebrow mb-1">Published</dt>
                    <dd>{formatDate(active.item.date)}</dd>
                  </div>
                ) : null}
                {active.item.tools.length ? (
                  <div>
                    <dt className="eyebrow mb-1">Tools</dt>
                    <dd>{active.item.tools.join(", ")}</dd>
                  </div>
                ) : null}
              </dl>
              <p className="mt-6 text-[0.95rem] leading-relaxed text-fg/80">{active.item.description}</p>
              {active.item.postUrl ? (
                <a href={active.item.postUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium">
                  <span className="link-underline">View original post</span>
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
              {active.list.length > 1 ? (
                <div className="mt-auto flex gap-2 pt-8">
                  <button
                    type="button"
                    onClick={() => step(-1)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong py-3 text-sm transition-colors hover:border-fg hover:bg-fg hover:text-bg"
                  >
                    <ArrowLeft className="size-4" aria-hidden /> Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => step(1)}
                    className="flex flex-1 items-center justify-center gap-2 rounded-full border border-line-strong py-3 text-sm transition-colors hover:border-fg hover:bg-fg hover:text-bg"
                  >
                    Next <ArrowRight className="size-4" aria-hidden />
                  </button>
                </div>
              ) : null}
            </aside>
            <button
              type="button"
              onClick={close}
              aria-label="Close preview"
              className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-accent hover:text-white"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>
        ) : null}
      </dialog>
    </>
  );
}

function MediaView({ item }: { item: CreativeItem }) {
  const m = item.media;
  if (!m) {
    return (
      <div className={`h-full max-h-[80dvh] max-w-full ${aspectClass[item.aspect]}`}>
        <Placeholder item={item} large />
      </div>
    );
  }
  if (m.type === "gallery") return <GalleryView title={item.title} images={m.images} />;
  if (m.type === "video") {
    return (
      <video
        key={m.src}
        src={m.src}
        poster={m.poster}
        controls
        autoPlay
        playsInline
        preload="metadata"
        width={m.width}
        height={m.height}
        className="max-h-full max-w-full bg-black object-contain"
      >
        Your browser does not support video playback.
      </video>
    );
  }
  return (
    <Image
      src={m.src}
      alt={item.title}
      width={m.width}
      height={m.height}
      sizes="(min-width: 1024px) 70vw, 100vw"
      className="h-auto max-h-full w-auto max-w-full object-contain"
    />
  );
}

function GalleryView({ title, images }: { title: string; images: CreativeImage[] }) {
  const [index, setIndex] = useState(0);
  const count = images.length;
  const go = useCallback((s: number) => setIndex((i) => (i + s + count) % count), [count]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const img = images[index];
  const navButton =
    "flex size-11 shrink-0 items-center justify-center rounded-full bg-paper text-ink transition-colors hover:bg-accent hover:text-white";

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <div className="flex min-h-0 w-full flex-1 items-center justify-center">
        <Image
          key={img.src}
          src={img.src}
          alt={`${title} — image ${index + 1} of ${count}`}
          width={img.width}
          height={img.height}
          sizes="(min-width: 1024px) 70vw, 100vw"
          className="h-auto max-h-full w-auto max-w-full object-contain"
        />
      </div>
      <div className="flex items-center gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous image" className={navButton}>
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <span className="min-w-14 text-center text-sm tabular-nums text-fg" aria-live="polite">
          {index + 1} / {count}
        </span>
        <button type="button" onClick={() => go(1)} aria-label="Next image" className={navButton}>
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
    </div>
  );
}
