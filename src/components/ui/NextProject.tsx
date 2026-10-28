"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

/**
 * "Next project" band. With a mouse, a preview of the next project follows
 * the pointer while hovering.
 */
export function NextProject({
  href,
  title,
  category,
  preview,
}: {
  href: string;
  title: string;
  category: string;
  preview?: string;
}) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 160, damping: 22 });
  const sy = useSpring(y, { stiffness: 160, damping: 22 });

  return (
    <Link
      href={href}
      transitionTypes={["nav-forward"]}
      data-cursor="Next project"
      className="tone-dark group relative block overflow-hidden border-t border-line"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        x.set(e.clientX - r.left);
        y.set(e.clientY - r.top);
        setHover(true);
      }}
      onPointerLeave={() => setHover(false)}
    >
      {preview ? (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-0 hidden aspect-[16/10] w-[min(28rem,32vw)] overflow-hidden opacity-0 md:block"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
          animate={{ opacity: hover && !reduce ? 1 : 0, scale: hover && !reduce ? 1 : 0.85 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image src={preview} alt="" fill sizes="32vw" className="object-cover" />
        </motion.span>
      ) : null}
      <div className="container-x relative z-10 flex items-end justify-between gap-6 py-20 md:py-32">
        <div className="mix-blend-difference">
          <p className="eyebrow !text-paper/70">Next project · {category}</p>
          <p className="headline mt-5 text-[clamp(3rem,10vw,9rem)] text-paper">{title}</p>
        </div>
        <span className="mb-3 flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-transform duration-500 ease-[var(--ease)] group-hover:rotate-45 md:size-20">
          <ArrowUpRight className="size-6 md:size-8" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
