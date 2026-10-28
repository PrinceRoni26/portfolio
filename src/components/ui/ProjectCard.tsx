import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import type { Project } from "@/types";
import { CardVideo } from "./CardVideo";
import { Magnetic } from "./Magnetic";
import { ProjectVisual } from "./ProjectVisual";
import { MaskReveal, Parallax, Reveal } from "./Reveal";

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line-strong px-3 py-1 text-[0.74rem] tracking-tight text-fg/80">
      {children}
    </span>
  );
}

/** Shared name so the title morphs into the case study heading. */
export const projectTitleTransition = (slug: string) => `project-title-${slug}`;

/**
 * Large alternating project feature for the home page. The media side shows
 * the demo video (teaser loop, click for sound) or the screenshot.
 */
export function ProjectCard({ project, index, flip = false }: { project: Project; index: number; flip?: boolean }) {
  const badges = project.tech.length ? project.tech : project.tags;
  const caseHref = project.caseStudy ? `/projects/${project.slug}` : null;
  const n = String(index + 1).padStart(2, "0");
  const video = project.caseStudy?.video;

  const media = video ? (
    <Parallax range={8} className="h-full">
      <CardVideo teaser={video.teaser} src={video.src} poster={video.poster} title={video.title} duration={video.duration} />
    </Parallax>
  ) : caseHref ? (
    <Link
      href={caseHref}
      transitionTypes={["nav-forward"]}
      data-cursor="View project"
      aria-label={`View ${project.title} case study`}
      className="tone-light block"
    >
      <Parallax range={12}>
        <ProjectVisual project={project} sizes="(min-width: 1024px) 58vw, 100vw" />
      </Parallax>
    </Link>
  ) : (
    <div className="tone-light">
      <ProjectVisual project={project} sizes="(min-width: 1024px) 58vw, 100vw" />
    </div>
  );

  return (
    <article className="group/card grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2 lg:col-start-6" : ""}`}>
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <span className="eyebrow">{project.category}</span>
          <span className="eyebrow">{project.year}</span>
        </div>
        <MaskReveal className="overflow-hidden border border-line">{media}</MaskReveal>
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
        <Reveal>
          <p aria-hidden className="headline text-[clamp(4.5rem,11vw,10rem)] leading-[0.8] text-fg/10 transition-colors duration-700 group-hover/card:text-accent">
            {n}
          </p>
        </Reveal>
        <ViewTransition name={projectTitleTransition(project.slug)} share="morph" default="none">
          <h3 className="headline mt-5 text-[clamp(2.4rem,4.6vw,4.4rem)]">
            {caseHref ? (
              <Link href={caseHref} transitionTypes={["nav-forward"]} data-cursor="View project" className="transition-colors duration-300 hover:text-accent">
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
        </ViewTransition>
        <Reveal delay={0.05}>
          {project.recognition ? (
            <p className="serif mt-4 flex items-center gap-2 text-xl text-fg">
              <span aria-hidden className="block size-2 rotate-45 bg-accent" />
              {project.recognition}
            </p>
          ) : null}
          <p className="mt-5 max-w-lg text-[1rem] leading-relaxed text-muted">{project.summary}</p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label={project.tech.length ? "Technologies" : "Key concepts"}>
            {badges.map((b) => (
              <li key={b}>
                <Tag>{b}</Tag>
              </li>
            ))}
          </ul>

          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            {caseHref ? (
              <Magnetic strength={0.2}>
                <Link
                  href={caseHref}
                  transitionTypes={["nav-forward"]}
                  className="group/btn inline-flex items-center gap-3 rounded-full bg-fg py-2 pl-5 pr-2 font-medium text-bg transition-colors duration-500 hover:bg-accent hover:text-white"
                >
                  View case study
                  <span className="flex size-8 items-center justify-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover/btn:rotate-45">
                    <ArrowUpRight className="size-4" aria-hidden />
                  </span>
                </Link>
              </Magnetic>
            ) : null}
            {caseHref && video ? (
              <Link href={`${caseHref}#demo`} transitionTypes={["nav-forward"]} className="inline-flex items-center gap-1.5 text-fg/75 hover:text-fg">
                <Play className="size-3.5" aria-hidden />
                <span className="link-underline">Watch demo{video.duration ? ` (${video.duration})` : ""}</span>
              </Link>
            ) : null}
            {project.liveUrl ? (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg/75 hover:text-fg">
                <span className="link-underline">Live site</span>
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : null}
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-fg/75 hover:text-fg">
                <span className="link-underline">GitHub</span>
                <ArrowUpRight className="size-3.5" aria-hidden />
              </a>
            ) : project.confidential ? (
              <span className="text-muted">Private company code</span>
            ) : null}
          </div>
        </Reveal>
      </div>
    </article>
  );
}
