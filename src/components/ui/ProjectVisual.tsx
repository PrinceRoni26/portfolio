import Image from "next/image";
import type { Project } from "@/types";

/**
 * Shows the project screenshot when one is set, otherwise an abstract,
 * data-free illustration (safe for confidential work).
 */
export function ProjectVisual({
  project,
  priority = false,
  sizes = "(min-width: 768px) 50vw, 100vw",
  wide = false,
}: {
  project: Project;
  priority?: boolean;
  sizes?: string;
  wide?: boolean;
}) {
  const ratio = wide ? "aspect-[4/3] md:aspect-[16/8]" : "aspect-[4/3]";
  if (project.image) {
    return (
      <div className={`relative ${ratio} overflow-hidden bg-tint`}>
        <Image
          src={project.image}
          alt={project.imageAlt ?? `${project.title} screenshot`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-[var(--ease)] group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`Illustrative preview of ${project.title}`}
      className={`relative ${ratio} overflow-hidden bg-tint`}
    >
      <div className={`absolute ${wide ? "inset-[7%] md:inset-x-[18%]" : "inset-[7%]"} transition-transform duration-[1.2s] ease-[var(--ease)] group-hover:scale-[1.02]`}>
        {project.slug === "archivia" ? <SearchSketch /> : <DashboardSketch />}
      </div>
      <span className="eyebrow absolute bottom-2.5 left-4 !text-[0.6rem]">
        {project.confidential ? "Illustrative — confidential system" : "Illustrative preview"}
      </span>
    </div>
  );
}

function Bar({ w, className = "" }: { w: string; className?: string }) {
  return <span className={`block h-1.5 bg-line-strong ${className}`} style={{ width: w }} />;
}

function DashboardSketch() {
  const heights = [38, 62, 48, 80, 56, 70, 44, 90, 66, 52, 74, 60];
  return (
    <div className="flex h-full border border-line bg-surface shadow-[0_1px_0_var(--line)]">
      <aside className="hidden w-[22%] flex-col gap-3 border-r border-line p-[4%] sm:flex">
        <span className="mb-2 block h-2.5 w-1/2 bg-ink" />
        {[70, 55, 80, 60, 45, 65].map((w, i) => (
          <Bar key={i} w={`${w}%`} className={i === 1 ? "!bg-ink" : ""} />
        ))}
      </aside>
      <div className="flex flex-1 flex-col gap-[5%] p-[4%]">
        <div className="flex items-center justify-between">
          <Bar w="30%" className="!h-2.5 !bg-ink" />
          <span className="block h-4 w-12 border border-line" />
        </div>
        <div className="grid grid-cols-3 gap-[4%]">
          {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2 border border-line p-[8%]">
              <Bar w="50%" />
              <span className="display block text-[clamp(0.9rem,2vw,1.6rem)] leading-none text-ink/80">
                {["—", "—", "—"][i]}
              </span>
            </div>
          ))}
        </div>
        <div className="flex flex-1 items-end gap-[2%] border border-line p-[4%]">
          {heights.map((h, i) => (
            <span key={i} className={`block flex-1 ${i === 7 ? "bg-ink" : "bg-line-strong"}`} style={{ height: `${h}%` }} />
          ))}
        </div>
        <div className="space-y-2">
          {[90, 75, 82].map((w, i) => (
            <div key={i} className="flex items-center gap-3 border-b border-line pb-2">
              <span className="block size-2 rounded-full border border-muted" />
              <Bar w={`${w * 0.5}%`} />
              <Bar w="12%" className="ml-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchSketch() {
  const results = [
    { w: 72, score: 92 },
    { w: 64, score: 81 },
    { w: 80, score: 74 },
    { w: 58, score: 63 },
  ];
  return (
    <div className="flex h-full flex-col gap-[5%] border border-line bg-surface p-[6%]">
      <span className="display text-[clamp(1rem,2.6vw,2rem)] leading-none">Archivia</span>
      <div className="flex items-center gap-3 border border-ink px-3 py-[3%]">
        <span className="block size-2.5 rounded-full border border-ink" />
        <Bar w="45%" />
        <span className="ml-auto block h-1.5 w-1 animate-pulse bg-ink" />
      </div>
      <div className="flex-1 space-y-[4%]">
        {results.map((r, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto] items-center gap-4 border-b border-line pb-[3%]">
            <div className="space-y-2">
              <Bar w={`${r.w}%`} className="!bg-ink/70" />
              <Bar w={`${r.w - 22}%`} />
            </div>
            <div className="flex items-center gap-2">
              <span className="block h-1 w-16 bg-line">
                <span className="block h-full bg-ink" style={{ width: `${r.score}%` }} />
              </span>
              <span className="eyebrow tabular-nums !text-[0.6rem]">0.{r.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
