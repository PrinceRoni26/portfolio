"use client";

import { useEffect, useRef } from "react";

/**
 * A quiet field of dots that bends away from the pointer (mouse or finger)
 * and tints blue around it. Plain canvas 2D, no libraries. It only animates
 * while on screen and the tab is visible, and draws a single static frame
 * when reduced motion is preferred.
 */
export function HeroField({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink = [17, 17, 17];
    const accent = [79, 107, 255];

    let w = 0;
    let h = 0;
    let gap = 28;
    let raf = 0;
    let running = false;
    let visible = true;
    // Pointer target and smoothed position, in canvas pixels.
    const target = { x: -9999, y: -9999, strength: 0 };
    const cur = { x: -9999, y: -9999, strength: 0 };
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const r = canvas.getBoundingClientRect();
      w = r.width;
      h = r.height;
      gap = w < 640 ? 24 : 30;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduce) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      const radius = Math.max(140, Math.min(w, h) * 0.28);
      cur.x += (target.x - cur.x) * 0.12;
      cur.y += (target.y - cur.y) * 0.12;
      cur.strength += (target.strength - cur.strength) * 0.08;

      const cols = Math.ceil(w / gap) + 1;
      const rows = Math.ceil(h / gap) + 1;
      const ox = (w - (cols - 1) * gap) / 2;
      const oy = (h - (rows - 1) * gap) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = ox + i * gap;
          let y = oy + j * gap;
          // Slow diagonal swell so the field feels alive without input.
          const wave = reduce ? 0 : Math.sin(i * 0.35 + j * 0.25 - t * 0.0011) * 0.5 + 0.5;
          let size = 0.9 + wave * 0.5;
          let mix = 0;
          let alpha = 0.16 + wave * 0.08;

          const dx = x - cur.x;
          const dy = y - cur.y;
          const d = Math.hypot(dx, dy);
          if (d < radius && cur.strength > 0.01) {
            const f = (1 - d / radius) ** 2 * cur.strength;
            const push = f * 22;
            x += (dx / (d || 1)) * push;
            y += (dy / (d || 1)) * push;
            size += f * 2.6;
            mix = Math.min(1, f * 1.6);
            alpha += f * 0.7;
          }

          const r = ink[0] + (accent[0] - ink[0]) * mix;
          const g = ink[1] + (accent[1] - ink[1]) * mix;
          const b = ink[2] + (accent[2] - ink[2]) * mix;
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${Math.min(alpha, 1)})`;
          ctx.fillRect(x - size / 2, y - size / 2, size, size);
        }
      }
    };

    const loop = (now: number) => {
      draw(now - start);
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      if (running || reduce || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const pause = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onPointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const inside = x >= 0 && y >= 0 && x <= r.width && y <= r.height;
      if (!inside) {
        target.strength = 0;
        return;
      }
      if (cur.strength < 0.02) {
        cur.x = x;
        cur.y = y;
      }
      target.x = x;
      target.y = y;
      target.strength = 1;
    };
    const onLeave = () => {
      target.strength = 0;
    };
    const onUp = (e: PointerEvent) => {
      if (e.pointerType === "touch") onLeave();
    };
    const onVisibility = () => (document.hidden ? pause() : play());

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) play();
      else pause();
    });
    io.observe(canvas);
    resize();

    if (!reduce) {
      window.addEventListener("pointermove", onPointer, { passive: true });
      window.addEventListener("pointerdown", onPointer, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("pointerup", onUp, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      play();
    }

    return () => {
      pause();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={`pointer-events-none block h-full w-full ${className}`} />;
}
