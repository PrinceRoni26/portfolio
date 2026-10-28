import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { NextProject } from "@/components/ui/NextProject";
import { ProjectVisual } from "@/components/ui/ProjectVisual";
import { projectTitleTransition, Tag } from "@/components/ui/ProjectCard";
import { MaskReveal, Parallax, Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { featuredProjects, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { pageTransition } from "@/lib/transitions";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} — ${site.shortName}`,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

/** Numbered chapter: the label sticks beside its content on large screens. */
function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-8 border-t border-line-strong py-14 md:py-20 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <p className="eyebrow !text-accent">{n}</p>
          <h2 className="headline mt-4 text-[clamp(2rem,3.6vw,3.4rem)]">{title}</h2>
        </div>
      </div>
      <Reveal className="lg:col-span-7 lg:col-start-6">{children}</Reveal>
    </section>
  );
}

export default async function CaseStudyPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();
  const cs = project.caseStudy;

  const idx = featuredProjects.findIndex((p) => p.slug === project.slug);
  const next = featuredProjects[(idx + 1) % featuredProjects.length];

  const links = [
    ...(project.liveUrl ? [{ label: "Visit the live site", href: project.liveUrl }] : []),
    ...(project.githubUrl ? [{ label: "Source on GitHub", href: project.githubUrl }] : []),
  ];

  const meta = [
    { label: "Year", value: project.year },
    ...(project.recognition ? [{ label: "Recognition", value: project.recognition }] : []),
    { label: "Type", value: project.type ?? (project.confidential ? "Internal company software" : "Project") },
  ];

  const chapters = ["The problem", "My role", "The solution", "Features", "Technology", "Challenges", "Outcome", "Links"];
  const n = (title: string) => String(chapters.indexOf(title) + 1).padStart(2, "0");

  return (
    <ViewTransition {...pageTransition}>
      <article className="tone-light">
        <div className="container-x pt-24 md:pt-32">
          <Link
            href="/#projects"
            transitionTypes={["nav-back"]}
            className="group inline-flex items-center gap-3 rounded-full border border-line-strong py-1.5 pl-1.5 pr-4 text-sm transition-colors duration-300 hover:border-fg hover:bg-fg hover:text-bg"
          >
            <span className="flex size-7 items-center justify-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:-translate-x-0.5 group-hover:bg-bg group-hover:text-fg">
              <ArrowLeft className="size-3.5" aria-hidden />
            </span>
            All projects
          </Link>

          <header className="mt-12 md:mt-16">
            <div className="flex items-center gap-4">
              <span className="eyebrow !text-fg">Case study</span>
              <span className="h-px flex-1 bg-line-strong" />
              <span className="eyebrow !text-fg text-right">{project.category}</span>
            </div>
            <ViewTransition name={projectTitleTransition(project.slug)} share="morph" default="none">
              <h1 className="headline mt-10 text-[clamp(3rem,12.5vw,12rem)] md:mt-14">{project.title}</h1>
            </ViewTransition>

            <div className="mt-12 grid gap-10 md:mt-16 lg:grid-cols-12">
              <Reveal className="lg:col-span-7" delay={0.1}>
                <p className="display text-[clamp(1.35rem,2.3vw,2rem)] !leading-[1.25] tracking-[-0.025em] text-fg/85">
                  {cs.introduction}
                </p>
              </Reveal>
              <Reveal className="lg:col-span-4 lg:col-start-9" delay={0.15}>
                <dl className="divide-y divide-line border-y border-line-strong text-sm">
                  {meta.map((m) => (
                    <div key={m.label} className="flex justify-between gap-6 py-3.5">
                      <dt className="eyebrow pt-0.5">{m.label}</dt>
                      <dd className="text-right">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </header>

          <MaskReveal className="mt-16 overflow-hidden border border-line md:mt-24">
            <Parallax range={10}>
              <ProjectVisual project={project} priority sizes="100vw" wide />
            </Parallax>
          </MaskReveal>
          {cs.visualNote ? <p className="mt-3 max-w-3xl text-xs leading-relaxed text-muted">{cs.visualNote}</p> : null}
        </div>

        {cs.video ? (
          <section id="demo" aria-labelledby="demo-title" className="tone-dark mt-16 scroll-mt-20 py-16 md:mt-24 md:py-24">
            <div className="container-x">
              <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4">
                <h2 id="demo-title" className="headline text-[clamp(2rem,4.5vw,4rem)]">
                  Watch <em>the demo</em>
                </h2>
                {cs.video.duration ? <span className="eyebrow">{cs.video.duration} · sound on</span> : null}
              </div>
              <Reveal as="figure">
                <div className="relative aspect-video overflow-hidden border border-line bg-black">
                  <video
                    className="h-full w-full"
                    controls
                    playsInline
                    preload="none"
                    poster={cs.video.poster}
                    aria-label={cs.video.title}
                  >
                    <source src={cs.video.src} type="video/mp4" />
                    Your browser does not support video playback.
                  </video>
                </div>
                {cs.video.caption ? (
                  <figcaption className="mt-4 max-w-3xl text-sm leading-relaxed text-muted">{cs.video.caption}</figcaption>
                ) : null}
              </Reveal>
            </div>
          </section>
        ) : null}

        <div className="container-x">
          {cs.gallery?.length ? (
            <div className="mt-16 grid gap-x-6 gap-y-12 md:mt-24 md:grid-cols-2">
              {cs.gallery.map((img, i) => (
                <figure
                  key={img.src}
                  // First image is full width; a lone image on the last row is too.
                  className={i === 0 || (i === cs.gallery!.length - 1 && cs.gallery!.length % 2 === 0) ? "md:col-span-2" : ""}
                >
                  <MaskReveal className="overflow-hidden border border-line bg-tint" delay={i === 0 ? 0 : ((i + 1) % 2) * 0.08}>
                    <Parallax range={8} className="relative aspect-[2/1]">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes={i === 0 ? "100vw" : "(min-width: 768px) 50vw, 100vw"}
                        className="object-cover object-top"
                      />
                    </Parallax>
                  </MaskReveal>
                  <figcaption className="mt-3 flex items-baseline gap-3">
                    <span className="eyebrow !text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="eyebrow">{img.caption}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : null}

          <div className="mt-20 md:mt-32">
            <Block n={n("The problem")} title="The problem">
              <p className="text-xl leading-relaxed text-fg/85">{cs.problem}</p>
            </Block>
            <Block n={n("My role")} title="My role">
              <p className="text-xl leading-relaxed text-fg/85">{cs.role}</p>
            </Block>
            <Block n={n("The solution")} title="The solution">
              <p className="text-xl leading-relaxed text-fg/85">{cs.solution}</p>
            </Block>
            <Block n={n("Features")} title="Features">
              <Stagger as="ul" className="grid gap-px border border-line-strong bg-line-strong sm:grid-cols-2">
                {cs.features.map((f, i) => (
                  <StaggerItem
                    as="li"
                    key={f.title}
                    className={`group bg-bg p-6 transition-colors duration-500 hover:bg-ink hover:text-paper ${
                      i === cs.features.length - 1 && cs.features.length % 2 === 1 ? "sm:col-span-2" : ""
                    }`}
                  >
                    <span className="eyebrow transition-colors duration-500 group-hover:!text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="display mt-5 text-xl leading-tight">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/65">
                      {f.description}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Block>
            <Block n={n("Technology")} title="Technology">
              {project.tech.length ? (
                <ul className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li key={t}>
                      <Tag>{t}</Tag>
                    </li>
                  ))}
                </ul>
              ) : null}
              {project.tags.length ? (
                <>
                  <p className={`eyebrow mb-3 ${project.tech.length ? "mt-8" : ""}`}>Key concepts</p>
                  <ul className="flex flex-wrap gap-2">
                    {project.tags.map((t) => (
                      <li key={t}>
                        <Tag>{t}</Tag>
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
            </Block>
            <Block n={n("Challenges")} title="Challenges">
              <ol className="space-y-10">
                {cs.challenges.map((c, i) => (
                  <li key={c.title} className="grid grid-cols-[2.5rem_1fr] gap-2">
                    <span className="display text-2xl text-fg/25">{i + 1}</span>
                    <div>
                      <h3 className="display text-2xl leading-tight">{c.title}</h3>
                      <p className="mt-3 leading-relaxed text-muted">{c.description}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Block>
            <Block n={n("Outcome")} title="Outcome">
              <ul className="space-y-6">
                {cs.outcome.map((o) => (
                  <li key={o} className="grid grid-cols-[1.75rem_1fr] border-b border-line pb-6 last:border-0">
                    <span aria-hidden className="mt-[0.6em] block size-2 rotate-45 bg-accent" />
                    <span className="display text-[clamp(1.3rem,2vw,1.75rem)] !leading-[1.25] tracking-[-0.02em]">{o}</span>
                  </li>
                ))}
              </ul>
            </Block>
            <Block n={n("Links")} title="Links">
              {links.length ? (
                <ul className="space-y-3">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 rounded-full bg-fg py-2 pl-5 pr-2 text-sm font-medium text-bg transition-colors duration-500 hover:bg-accent hover:text-white"
                      >
                        {l.label}
                        <span className="flex size-8 items-center justify-center rounded-full bg-bg text-fg transition-transform duration-500 group-hover:rotate-45">
                          <ArrowUpRight className="size-4" aria-hidden />
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-lg leading-relaxed text-muted">
                  {project.confidential
                    ? "This system is used internally and is not publicly accessible. I'm happy to walk through it in more detail in a conversation."
                    : "A public demo is not available yet. I'm happy to walk through it in a conversation."}{" "}
                  <a href={`mailto:${site.email}?subject=${encodeURIComponent(project.title)}`} className="link-underline text-fg">
                    Get in touch
                  </a>
                  .
                </p>
              )}
            </Block>
          </div>
        </div>

        {next && next.slug !== project.slug ? (
          <div className="mt-16 md:mt-24">
            <NextProject
              href={`/projects/${next.slug}`}
              title={next.title}
              category={next.category}
              preview={next.image ?? next.caseStudy?.video?.poster}
            />
          </div>
        ) : null}
      </article>
    </ViewTransition>
  );
}
