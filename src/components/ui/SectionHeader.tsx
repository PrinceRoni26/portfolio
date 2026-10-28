import type { ReactNode } from "react";
import { LineReveal, Reveal } from "./Reveal";

type SectionHeaderProps = {
  index: string;
  label: string;
  /** Each entry is one masked line of the heading. */
  title: ReactNode[];
  intro?: ReactNode;
  id?: string;
};

/** Section opener: an indexed label rule, then an oversized headline. */
export function SectionHeader({ index, label, title, intro, id }: SectionHeaderProps) {
  return (
    <div className="mb-16 md:mb-24">
      <div className="flex items-center gap-4">
        <span className="eyebrow !text-fg">({index})</span>
        <span className="h-px flex-1 bg-line-strong" />
        <span className="eyebrow !text-fg">{label}</span>
      </div>
      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:items-end">
        <h2 id={id} className="headline text-[clamp(2.75rem,8.2vw,8.5rem)] lg:col-span-9">
          <LineReveal lines={title} />
        </h2>
        {intro ? (
          <Reveal delay={0.15} className="lg:col-span-3 lg:pb-3">
            <p className="max-w-sm text-[0.95rem] leading-relaxed text-muted">{intro}</p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
