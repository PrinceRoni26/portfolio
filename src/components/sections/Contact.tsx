import { ArrowUpRight } from "lucide-react";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { Magnetic } from "@/components/ui/Magnetic";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { getGithubUrl, site } from "@/data/site";
import type { ResumeLink } from "@/lib/resume";

export function Contact({ resume, index = "06" }: { resume: ResumeLink; index?: string }) {
  const github = getGithubUrl();
  const links = [
    { label: "LinkedIn", href: site.linkedin, external: true },
    ...(github ? [{ label: "GitHub", href: github, external: true }] : []),
    { label: resume.label, href: resume.href, external: false, download: resume.download },
  ];

  return (
    <section id="contact" aria-labelledby="contact-title" className="tone-dark relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-40">
      <div className="container-x">
        <div className="flex items-center gap-4">
          <span className="eyebrow !text-fg">({index})</span>
          <span className="h-px flex-1 bg-line-strong" />
          <span className="eyebrow !text-fg">Contact</span>
        </div>

        <h2 id="contact-title" className="headline mt-14 text-[clamp(3.2rem,12vw,12rem)] leading-[0.84]">
          <LineReveal lines={[<span key="1">Let&apos;s build</span>, <span key="2">something</span>, <span key="3"><em className="text-accent">meaningful.</em></span>]} />
        </h2>

        <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="max-w-md text-lg leading-relaxed text-fg/70">
              Whether it&apos;s a digital product, business system, or creative collaboration,
              I&apos;m always interested in solving interesting problems.
            </p>
            <p className="eyebrow mt-8">Based in {site.location}</p>
          </Reveal>

          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.15}>
            <Magnetic strength={0.12} className="w-full">
              <a
                href={`mailto:${site.email}`}
                data-cursor="Say hello"
                className="group flex w-full items-center justify-between gap-4 border-b border-line-strong pb-6 transition-colors duration-500 hover:border-accent"
              >
                <span className="display min-w-0 text-[clamp(1.2rem,2.35vw,2.4rem)] tracking-[-0.03em] [overflow-wrap:break-word] transition-colors duration-500 group-hover:text-accent">
                  {site.email.split("@")[0]}@<wbr />
                  {site.email.split("@")[1]}
                </span>
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-fg text-bg transition-all duration-500 ease-[var(--ease)] group-hover:rotate-45 group-hover:bg-accent group-hover:text-white md:size-16">
                  <ArrowUpRight className="size-5 md:size-6" aria-hidden />
                </span>
              </a>
            </Magnetic>
            <div className="mt-5">
              <CopyEmail email={site.email} />
            </div>
            <ul className="mt-10">
              {links.map((l) => (
                <li key={l.label} className="border-b border-line">
                  <a
                    href={l.href}
                    {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    {...("download" in l && l.download ? { download: true } : {})}
                    className="group flex items-center justify-between py-5 text-fg/80 transition-colors hover:text-fg"
                  >
                    <span className="display text-2xl transition-transform duration-500 ease-[var(--ease)] group-hover:translate-x-2">{l.label}</span>
                    <ArrowUpRight className="size-5 transition-all duration-500 group-hover:rotate-45 group-hover:text-accent" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
