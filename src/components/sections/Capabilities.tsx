"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import type { SkillGroup } from "@/types";

const ease = [0.22, 1, 0.36, 1] as const;

/**
 * Desktop: an index of capability groups; hovering or focusing one shows its
 * skills in the panel beside it. Mobile: every group is listed in full.
 */
export function Capabilities({ groups }: { groups: SkillGroup[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const current = groups[active];

  return (
    <>
      <div className="hidden gap-12 lg:grid lg:grid-cols-12">
        <div role="tablist" aria-label="Capability areas" aria-orientation="vertical" className="lg:col-span-7">
          {groups.map((g, i) => {
            const selected = i === active;
            return (
              <button
                key={g.title}
                id={`${id}-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={selected}
                aria-controls={`${id}-panel`}
                tabIndex={selected ? 0 : -1}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowDown" ? 1 : -1) + groups.length) % groups.length;
                    document.getElementById(`${id}-tab-${next}`)?.focus();
                  }
                }}
                className="group flex w-full items-baseline gap-6 border-b border-line-strong py-5 text-left first:border-t"
              >
                <span className={`eyebrow w-8 transition-colors duration-300 ${selected ? "!text-accent" : ""}`}>0{i + 1}</span>
                <span
                  className={`headline text-[clamp(2rem,3.6vw,3.4rem)] transition-all duration-500 ease-[var(--ease)] ${
                    selected ? "translate-x-3 text-fg" : "text-fg/25 group-hover:text-fg/60"
                  }`}
                >
                  {g.title}
                </span>
                <span className="eyebrow ml-auto tabular-nums">{String(g.skills.length).padStart(2, "0")}</span>
              </button>
            );
          })}
        </div>

        <div
          id={`${id}-panel`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-${active}`}
          className="lg:col-span-4 lg:col-start-9"
        >
          <div className="sticky top-28">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease }}
              >
                <p className="eyebrow mb-6">{current.title}</p>
                <ul className="flex flex-wrap gap-2">
                  {current.skills.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.04 * i, ease }}
                    >
                      <span className="inline-flex rounded-full border border-line-strong px-4 py-2 text-[0.95rem] transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-white">
                        {s}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ul className="lg:hidden">
        {groups.map((g, i) => (
          <li key={g.title} className="border-b border-line-strong py-6 first:border-t">
            <div className="flex items-baseline gap-4">
              <span className="eyebrow !text-accent">0{i + 1}</span>
              <h3 className="headline text-[clamp(1.6rem,7vw,2.4rem)]">{g.title}</h3>
            </div>
            <ul className="mt-4 flex flex-wrap gap-1.5">
              {g.skills.map((s) => (
                <li key={s} className="rounded-full border border-line-strong px-3 py-1.5 text-sm">
                  {s}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </>
  );
}
