"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/**
 * A lanyard ID that hangs from the top of the hero and behaves like a
 * pendulum: it sways gently on its own, and visitors can grab, drag and
 * fling it. Physics runs in requestAnimationFrame and writes transforms
 * directly (no React re-renders per frame).
 */
export function HangingID({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const rig = useRef<HTMLDivElement>(null); // rotates around the anchor
  const strap = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const r = rig.current, s = strap.current, c = card.current, w = wrap.current;
    if (!r || !s || !c || !w) return;

    // --- size: scale the badge to the viewport height so it fits the open space
    // Fit the badge into the gap between the headline ([data-hero-line]) and
    // the 01–03 notes ([data-hero-note]); hide it if there isn't enough room.
    let L = 180; // lanyard length (px)
    const CARD_W = 214;
    const layout = () => {
      const h = window.innerHeight;
      const section = w.closest("section");
      const host = w.offsetParent as HTMLElement | null;
      let scale = Math.min(1, Math.max(0.62, h / 980));
      if (section && host) {
        const hostLeft = host.getBoundingClientRect().left;
        const lines = [...section.querySelectorAll<HTMLElement>("[data-hero-line]")];
        const notes = [...section.querySelectorAll<HTMLElement>("[data-hero-note]")].filter((n) => n.offsetParent);
        if (lines.length && notes.length) {
          const right = Math.max(...lines.map((l) => l.getBoundingClientRect().right));
          const left = Math.min(...notes.map((n) => n.getBoundingClientRect().left));
          const avail = left - right - 48;
          scale = Math.min(scale, avail / CARD_W);
          w.style.left = `${(right + left) / 2 - hostLeft}px`;
          const fits = scale >= 0.55;
          w.style.visibility = fits ? "visible" : "hidden";
          scale = Math.max(0.55, scale);
        }
      }
      w.style.setProperty("--id-scale", String(scale));
      L = Math.round(Math.min(230, Math.max(96, h * 0.2)));
    };
    layout();
    const relayout = window.setTimeout(layout, 1600); // after the headline animation settles
    document.fonts?.ready.then(layout);
    window.addEventListener("resize", layout);

    // --- pendulum state
    let theta = reduce ? 0 : 0.22; // start slightly displaced so it swings in
    let omega = 0;
    let stretch = 0;
    let dragging = false;
    let grabAngleOffset = 0;
    let last = performance.now();
    let lastPointer = { t: 0, a: 0 };
    let raf = 0;
    const G = 2600; // "gravity" (px/s²) — tuned for a lively but calm swing
    const DAMP = 1.15; // damping per second

    const anchor = () => {
      const b = w.getBoundingClientRect();
      return { x: b.left + b.width / 2, y: b.top };
    };

    const apply = (t: number) => {
      const idle = dragging || reduce ? 0 : Math.sin(t / 1000 * 1.15) * 0.035;
      const a = theta + idle;
      r.style.transform = `rotate(${a}rad)`;
      s.style.height = `${L + stretch}px`;
      // a little 3D tilt from angular velocity makes the card feel weighty
      const tilt = Math.max(-18, Math.min(18, -omega * 9));
      c.style.transform = `translateY(${L + stretch}px) rotateY(${tilt}deg) scale(var(--id-scale))`;
    };

    const step = (t: number) => {
      const dt = Math.min(0.033, (t - last) / 1000);
      last = t;
      if (!dragging && !reduce) {
        const len = (L + 150) / 1000 * 1000; // effective pendulum length incl. card
        const alpha = -(G / len) * Math.sin(theta) - DAMP * omega;
        omega += alpha * dt;
        theta += omega * dt;
        stretch += (0 - stretch) * Math.min(1, dt * 12);
      }
      apply(t);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);

    if (reduce) return () => { cancelAnimationFrame(raf); clearTimeout(relayout); window.removeEventListener("resize", layout); };

    // --- dragging
    const angleTo = (x: number, y: number) => { const o = anchor(); return Math.atan2(-(x - o.x), y - o.y); };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      c.setPointerCapture(e.pointerId);
      grabAngleOffset = theta - angleTo(e.clientX, e.clientY);
      lastPointer = { t: performance.now(), a: theta };
      c.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const o = anchor();
      const target = angleTo(e.clientX, e.clientY) + grabAngleOffset;
      theta = Math.max(-1.25, Math.min(1.25, target));
      const dist = Math.hypot(e.clientX - o.x, e.clientY - o.y);
      stretch = Math.max(-L * 0.25, Math.min(L * 0.35, (dist - (L + 140)) * 0.35));
      const now = performance.now();
      const dt = (now - lastPointer.t) / 1000;
      if (dt > 0.008) { omega = (theta - lastPointer.a) / dt; lastPointer = { t: now, a: theta }; }
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      omega = Math.max(-9, Math.min(9, omega)); // fling, but keep it sane
      c.releasePointerCapture?.(e.pointerId);
      c.style.cursor = "grab";
    };
    c.addEventListener("pointerdown", onDown);
    c.addEventListener("pointermove", onMove);
    c.addEventListener("pointerup", onUp);
    c.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(relayout);
      window.removeEventListener("resize", layout);
      c.removeEventListener("pointerdown", onDown);
      c.removeEventListener("pointermove", onMove);
      c.removeEventListener("pointerup", onUp);
      c.removeEventListener("pointercancel", onUp);
    };
  }, [reduce]);

  return (
    <div ref={wrap} className={`pointer-events-none absolute top-0 select-none ${className}`} style={{ width: 0, height: 0, left: "70%" }}>
      <div ref={rig} className="absolute left-0 top-0 origin-top" style={{ willChange: "transform" }}>
        {/* lanyard strap */}
        <div
          ref={strap}
          aria-hidden
          className="absolute left-1/2 top-0 w-[22px] -translate-x-1/2 overflow-hidden bg-[#111] shadow-[0_2px_10px_rgba(0,0,0,.18)]"
          style={{ height: 180 }}
        >
          <span className="absolute inset-y-0 left-[3px] w-px bg-[var(--accent)]/80" />
          <span className="absolute inset-y-0 right-[3px] w-px bg-[var(--accent)]/80" />
          <span className="absolute inset-x-0 bottom-2 flex flex-col items-center gap-3 font-mono text-[8px] font-medium tracking-[0.2em] text-white/70 [writing-mode:vertical-rl]">
            <span>PRM · PRM · PRM · PRM · PRM</span>
          </span>
        </div>

        {/* card (moves to the end of the strap) */}
        <div
          ref={card}
          className="pointer-events-auto absolute left-0 top-0 cursor-grab touch-none [perspective:800px]"
          style={{ transformOrigin: "50% 0", willChange: "transform", transform: "translateY(180px) scale(var(--id-scale, 1))" }}
          role="img"
          aria-label="ID card: Prince Roniver A. Magsalos, Software Developer and Creative Technologist, Cagayan de Oro, 2026. Drag to swing it."
        >
          <div className="relative -translate-x-1/2">
            {/* clip */}
            <div aria-hidden className="absolute left-1/2 top-[-18px] z-10 h-[26px] w-[34px] -translate-x-1/2 rounded-[6px] border-[3px] border-[#9a9a96] bg-[#cfcfca] shadow-[0_2px_4px_rgba(0,0,0,.2)]">
              <span className="absolute left-1/2 top-1 h-[8px] w-[14px] -translate-x-1/2 rounded-[3px] bg-[#7d7d79]" />
            </div>

            <div className="relative w-[214px] overflow-hidden rounded-[16px] border border-black/10 bg-[#fbfaf7] p-3.5 shadow-[0_24px_60px_-12px_rgba(17,17,17,.35),0_6px_16px_rgba(17,17,17,.12)]">
              {/* punched slot */}
              <span aria-hidden className="mx-auto mb-3 block h-[7px] w-[46px] rounded-full bg-[#e6e4de] shadow-[inset_0_1px_2px_rgba(0,0,0,.25)]" />

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#111] px-2.5 py-1 font-display text-[11px] font-bold tracking-tight text-white">
                  PRM <span className="size-[5px] rounded-full bg-[var(--accent)]" />
                </span>
                <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-black/55">ID · 2026</span>
              </div>

              <div className="relative mt-3 aspect-[3/4] overflow-hidden rounded-[10px] bg-[#ecebe6]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/id-photo.webp" alt="" draggable={false} className="h-full w-full object-cover object-top" />
                <span className="absolute bottom-2 left-2 rounded-full bg-[var(--accent)] px-2 py-[3px] font-mono text-[7.5px] uppercase tracking-[0.14em] text-white">
                  Verified
                </span>
              </div>

              <p className="mt-3 font-display text-[17px] font-bold uppercase leading-[1.02] tracking-[-0.01em] text-[#111]">
                Prince Roniver<br />A. Magsalos
              </p>
              <p className="mt-1.5 font-mono text-[8.5px] uppercase leading-[1.45] tracking-[0.12em] text-black/60">
                Software Developer &amp;<br />Creative Technologist
              </p>

              <div className="mt-3 flex items-end justify-between border-t border-black/10 pt-2.5">
                <div className="font-mono text-[8px] uppercase leading-[1.5] tracking-[0.14em] text-black/55">
                  <span className="block text-[var(--accent)]">Location</span>
                  Cagayan de Oro
                </div>
                <div className="text-right font-mono text-[8px] uppercase leading-[1.5] tracking-[0.14em] text-black/55">
                  <span className="block text-[var(--accent)]">Year</span>
                  2026
                </div>
              </div>

              {/* barcode */}
              <svg aria-hidden viewBox="0 0 186 22" className="mt-2.5 h-[22px] w-full" preserveAspectRatio="none">
                {Array.from({ length: 46 }, (_, i) => {
                  const wv = [1, 2, 1, 3, 1, 1, 2, 1, 2, 3][(i * 7) % 10];
                  return <rect key={i} x={i * 4.05} y="0" width={wv} height="22" fill="#111" />;
                })}
              </svg>
              <span aria-hidden className="absolute inset-y-0 right-0 w-[4px] bg-[var(--accent)]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
