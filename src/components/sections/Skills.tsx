import { ArrowUpRight, BadgeCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { awards, education, languages, skillGroups } from "@/data/skills";
import { Capabilities } from "./Capabilities";

export function Skills({ index = "05" }: { index?: string }) {
  const groups = skillGroups.filter((g) => g.skills.length > 0);
  return (
    <section id="skills" aria-labelledby="skills-title" className="tone-white py-24 md:py-40">
      <div className="container-x">
        <SectionHeader
          id="skills-title"
          index={index}
          label="Capabilities"
          title={[<span key="1">What I</span>, <span key="2">work <em>with.</em></span>]}
          intro="Skills · education · recognition."
        />

        <Capabilities groups={groups} />

        <div className="mt-24 grid gap-px border border-line-strong bg-line-strong md:mt-32 md:grid-cols-3">
          <Reveal className="bg-bg p-7 md:p-9">
            <h3 className="eyebrow">Education</h3>
            <p className="display mt-8 text-[clamp(1.6rem,2.4vw,2.1rem)] leading-[1.02]">{education.degree}</p>
            <p className="mt-4 text-sm text-fg/80">{education.school}</p>
            <p className="eyebrow mt-2">{education.period}</p>
          </Reveal>
          <Reveal className="bg-bg p-7 md:p-9" delay={0.08}>
            <h3 className="eyebrow">Recognition</h3>
            <ul className="mt-6">
              {awards.map((a) => (
                <li key={a.title} className="border-b border-line last:border-0">
                  {a.href ? (
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${a.title}, ${a.detail} — ${a.hrefLabel ?? "verify credential"} (opens in a new tab)`}
                      className="group -mx-3 grid grid-cols-[1fr_auto] gap-4 rounded-lg px-3 py-4 transition-colors duration-300 hover:bg-fg/[0.04]"
                    >
                      <div>
                        <p className="font-medium">
                          <span className="link-underline">{a.title}</span>
                        </p>
                        <p className="mt-0.5 text-sm text-muted">{a.detail}</p>
                        <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-accent">
                          <BadgeCheck className="size-3.5" aria-hidden />
                          {a.hrefLabel ?? "Verify credential"}
                          <ArrowUpRight className="size-3 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                        </p>
                      </div>
                      <span className="eyebrow pt-1">{a.year}</span>
                    </a>
                  ) : (
                    <div className="grid grid-cols-[1fr_auto] gap-4 py-4">
                      <div>
                        <p className="font-medium">{a.title}</p>
                        <p className="mt-0.5 text-sm text-muted">{a.detail}</p>
                      </div>
                      <span className="eyebrow pt-1">{a.year}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="bg-bg p-7 md:p-9" delay={0.16}>
            <h3 className="eyebrow">Languages</h3>
            <ul className="mt-8 space-y-1">
              {languages.map((l) => (
                <li key={l} className="display text-[clamp(1.6rem,2.4vw,2.1rem)] leading-tight">
                  {l}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
