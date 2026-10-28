"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";
import { experience } from "@/data/experience";

const ease = [0.22, 1, 0.36, 1] as const;

/** Career timeline whose rail fills in as the visitor scrolls through it. */
export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative">
      <span aria-hidden className="absolute bottom-0 left-[5px] top-2 w-px bg-line-strong md:left-[calc(25%+5px)]" />
      <motion.span
        aria-hidden
        className="absolute bottom-0 left-[5px] top-2 w-px origin-top bg-accent md:left-[calc(25%+5px)]"
        style={{ scaleY: reduce ? 1 : fill }}
      />
      {experience.map((job, i) => (
        <motion.li
          key={`${job.role}-${job.company}`}
          className="relative grid gap-4 pb-16 pl-9 last:pb-0 md:grid-cols-4 md:gap-0 md:pb-24 md:pl-0"
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.9, delay: i * 0.05, ease }}
        >
          <div className="md:pr-10 md:text-right">
            <p className="eyebrow !text-fg pt-0.5">{job.period}</p>
            {job.current ? (
              <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-accent px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-white">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/70 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-white" />
                </span>
                Current role
              </p>
            ) : null}
          </div>

          <span
            aria-hidden
            className={`absolute left-0 top-1 block size-[11px] rounded-full border-2 md:left-[25%] ${
              job.current ? "border-accent bg-accent" : "border-fg bg-bg"
            }`}
          />

          <div className="md:col-span-3 md:pl-14">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
              <div>
                <h3 className="display text-[clamp(1.9rem,3.4vw,3.1rem)] leading-[0.98]">{job.role}</h3>
                <p className="mt-3 text-sm text-muted">{job.company}</p>
              </div>
              <div>
                <p className="text-[1rem] leading-relaxed text-fg/85">{job.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {job.highlights.map((h) => (
                    <li key={h} className="grid grid-cols-[1.25rem_1fr] text-sm leading-relaxed text-muted">
                      <span aria-hidden className="mt-[0.55em] block size-1.5 rotate-45 bg-accent" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
