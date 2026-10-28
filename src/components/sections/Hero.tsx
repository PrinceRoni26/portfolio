"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { HangingID } from "@/components/ui/HangingID";
import { HeroField } from "@/components/ui/HeroField";
import { site } from "@/data/site";
import type { ResumeLink } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

const lines = [
  { text: "I develop.", note: "Software engineering" },
  { text: "I optimize.", note: "Business systems & automation" },
  { text: "I create.", note: "Digital creative & marketing" },
];

function LocalTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-PH", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: site.timeZone,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="tabular-nums" suppressHydrationWarning>
      {time ?? "--:--"} PHT
    </span>
  );
}

/** Splits a line into letters that react individually to the pointer. */
function Letters({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) =>
        ch === " " ? (
          <span key={i} className="inline-block w-[0.28em]" />
        ) : (
          <span key={i} className="hero-char">
            {ch}
          </span>
        ),
      )}
    </>
  );
}

export function Hero({ resume, githubUrl }: { resume: ResumeLink; githubUrl: string | null }) {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease },
        };

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="tone-light relative flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-24 md:pb-10 md:pt-28"
    >
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.5 }}
      >
        <HeroField />
      </motion.div>

      {/* Hanging ID badge — lives in the open space between the headline and the 01–03 list */}
      <motion.div
        className="absolute inset-x-0 top-0 z-20 hidden h-0 lg:block"
        initial={reduce ? false : { y: -420 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 11, delay: 0.9 }}
      >
        <HangingID />
      </motion.div>

      <div className="container-x relative flex flex-1 flex-col">
        <motion.div {...fade(0)} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line-strong pb-3">
          <p className="eyebrow !text-fg">{site.name}</p>
          <p className="eyebrow hidden md:block">Software developer &amp; creative technologist</p>
          <p className="eyebrow">
            {site.location.split(",")[0]} — <LocalTime />
          </p>
        </motion.div>

        <div className="flex flex-1 flex-col justify-center py-[max(1.5rem,5svh)]">
          <h1 id="hero-title" className="headline text-[clamp(3.1rem,min(12.4vw,15.5svh),12.5rem)] leading-[0.84]">
            <span className="sr-only">I develop. I optimize. I create.</span>
            {lines.map((line, i) => (
              <span key={line.text} aria-hidden className="group relative block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="flex items-end justify-between gap-6"
                  initial={reduce ? false : { y: "108%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.13, ease }}
                >
                  <span data-hero-line className={`block ${i === 1 ? "md:pl-[8vw]" : i === 2 ? "md:pl-[3vw]" : ""}`}>
                    <Letters text={line.text} />
                  </span>
                  <span data-hero-note className="mb-[0.6em] hidden shrink-0 items-center gap-3 font-mono text-[0.72rem] font-normal normal-case tracking-[0.08em] text-muted transition-colors duration-500 group-hover:text-fg lg:flex">
                    <span className="text-accent">0{i + 1}</span>
                    <span className="uppercase">{line.note}</span>
                  </span>
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <div className="grid gap-8 border-t border-line-strong pt-6 md:grid-cols-12 md:items-end md:gap-6">
          <motion.div {...fade(0.75)} className="md:col-span-7 lg:col-span-5">
            <p className="text-lg leading-relaxed text-fg/80 md:text-xl md:leading-relaxed">
              I&apos;m Roniver, a software developer and creative technologist building smarter
              business systems, thoughtful digital experiences, and{" "}
              <span className="serif text-[1.15em] text-fg">creative solutions.</span>
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              <Button href="/#projects" magnetic>
                View featured work
                <ArrowDownRight className="size-4" aria-hidden />
              </Button>
              <Button href="/#contact" variant="secondary" magnetic>
                Get in touch
              </Button>
            </div>
          </motion.div>

          <motion.div {...fade(0.9)} className="flex items-end justify-between gap-6 md:col-span-5 md:col-start-8 lg:col-span-6 lg:col-start-7">
            <ul className="flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
              <li>
                <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1">
                  LinkedIn <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
              {githubUrl ? (
                <li>
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-1">
                    GitHub <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                </li>
              ) : null}
              <li>
                <a href={`mailto:${site.email}`} className="link-underline inline-flex items-center gap-1">
                  Email <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
              </li>
              <li>
                <a href={resume.href} download={resume.download || undefined} className="link-underline inline-flex items-center gap-1">
                  {resume.label}
                </a>
              </li>
            </ul>
            <a href="#about" className="group flex shrink-0 flex-col items-center gap-3" aria-label="Scroll to About">
              <span className="eyebrow [writing-mode:vertical-rl] transition-colors group-hover:!text-accent">Scroll</span>
              <span className="relative block h-14 w-px overflow-hidden bg-line">
                <span className="scroll-cue absolute inset-0 block bg-fg" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
