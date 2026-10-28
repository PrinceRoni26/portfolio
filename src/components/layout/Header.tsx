"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { ArrowDownToLine, ArrowUpRight } from "lucide-react";
import { Magnetic } from "@/components/ui/Magnetic";
import { navLinks, site } from "@/data/site";
import type { ResumeLink } from "@/lib/resume";

const ease = [0.22, 1, 0.36, 1] as const;

/** Which nav item each section belongs to (sections without a nav item map to the nearest one). */
const sectionToNav: Record<string, string> = {
  top: "/#top",
  about: "/#about",
  projects: "/#projects",
  creative: "/#creative",
  github: "/#creative",
  experience: "/#experience",
  skills: "/#experience",
  contact: "/#contact",
};

export function Header({ resume, github }: { resume: ResumeLink; github: string | null }) {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  // Hide while scrolling down, show again on the way up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - last) < 6) return;
      setHidden(y > last && y > 240);
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav item for the section in the middle of the viewport.
  useEffect(() => {
    const sections = Object.keys(sectionToNav)
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(sectionToNav[e.target.id]);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chip = "flex h-11 items-center rounded-full bg-ink text-paper";

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        style={{ viewTransitionName: "site-header" }}
        onFocusCapture={() => setHidden(false)}
        animate={{ y: hidden && !open ? "-110%" : "0%" }}
        transition={{ duration: reduce ? 0 : 0.5, ease }}
      >
        <motion.span
          aria-hidden
          className="absolute inset-x-0 top-0 block h-0.5 origin-left bg-accent"
          style={{ scaleX: progress }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="container-x flex items-center justify-between gap-3 pt-3 md:pt-4">
          <Link
            href="/#top"
            transitionTypes={["nav-back"]}
            className={`${chip} group gap-2 px-4 font-display text-[0.95rem] font-semibold tracking-tight`}
            aria-label={`${site.name}, home`}
            onClick={() => setOpen(false)}
          >
            {site.logo}
            <span className="block size-1.5 rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
          </Link>

          <nav aria-label="Primary" className={`${chip} hidden px-1.5 lg:flex`}>
            <ul className="flex items-center">
              {navLinks.map((l) => {
                const isActive = active === l.href;
                return (
                  <li key={l.href} className="relative">
                    <Link
                      href={l.href}
                      transitionTypes={["nav-back"]}
                      aria-current={isActive ? "true" : undefined}
                      className={`relative z-10 block rounded-full px-4 py-2 text-[0.82rem] transition-colors duration-300 ${
                        isActive ? "text-ink" : "text-paper/70 hover:text-paper"
                      }`}
                    >
                      {l.label}
                    </Link>
                    {isActive ? (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-paper"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={resume.href}
              download={resume.download || undefined}
              className={`${chip} hidden gap-2 px-4 text-[0.82rem] transition-colors duration-300 hover:bg-paper hover:text-ink sm:flex`}
            >
              {resume.available ? "Resume" : resume.label}
              <ArrowDownToLine className="size-3.5" aria-hidden />
            </a>
            <Magnetic strength={0.25}>
              <Link
                href="/#contact"
                transitionTypes={["nav-back"]}
                className="flex h-11 items-center gap-2 rounded-full bg-accent px-5 text-[0.82rem] font-medium text-white transition-colors duration-300 hover:bg-ink"
              >
                Let&apos;s talk
                <ArrowUpRight className="size-3.5" aria-hidden />
              </Link>
            </Magnetic>
            <button
              ref={toggleRef}
              type="button"
              className={`${chip} relative w-11 justify-center lg:hidden ${open ? "!bg-paper !text-ink" : ""}`}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden className="relative block h-3 w-[18px]">
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease)] ${
                    open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 block h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease)] ${
                    open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="tone-dark fixed inset-0 z-40 flex flex-col lg:hidden"
            initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 2.6rem) 2.2rem)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 2.6rem) 2.2rem)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 2.6rem) 2.2rem)" }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile" className="container-x flex flex-1 flex-col justify-between overflow-y-auto pb-8 pt-24">
              <ul>
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={reduce ? false : { y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.18 + 0.05 * i, duration: 0.7, ease }}
                    >
                      <Link
                        ref={i === 0 ? firstLinkRef : undefined}
                        href={l.href}
                        transitionTypes={["nav-back"]}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline justify-between py-3"
                      >
                        <span className="headline text-[clamp(2.6rem,12vw,4.5rem)] transition-colors duration-300 group-hover:text-accent group-active:text-accent">
                          {l.label}
                        </span>
                        <span className="eyebrow">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <motion.div
                className="space-y-6 pt-10"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6, ease }}
              >
                <a href={`mailto:${site.email}`} className="block break-all text-lg">
                  {site.email}
                </a>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={resume.href}
                    download={resume.download || undefined}
                    className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-white"
                  >
                    {resume.label}
                    <ArrowDownToLine className="size-4" aria-hidden />
                  </a>
                  <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-sm">
                    LinkedIn <ArrowUpRight className="size-3.5" aria-hidden />
                  </a>
                  {github ? (
                    <a href={github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-3 text-sm">
                      GitHub <ArrowUpRight className="size-3.5" aria-hidden />
                    </a>
                  ) : null}
                </div>
                <p className="eyebrow">{site.location}</p>
              </motion.div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
