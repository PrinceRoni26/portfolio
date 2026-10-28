import { ArrowUpRight } from "lucide-react";
import { Reveal, ScrollWords, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";

const areas = [
  {
    title: "Software Engineering",
    body: "Designing and developing modern web applications, internal business systems, and practical technical solutions.",
    href: "/#projects",
  },
  {
    title: "Business Systems & Automation",
    body: "Transforming manual processes into streamlined digital workflows — attendance, payroll, reporting, and project monitoring.",
    href: "/#experience",
  },
  {
    title: "Digital Creative & Marketing",
    body: "Producing social media graphics, marketing materials, reels, and other digital assets for real businesses.",
    href: "/#creative",
  },
];

const facts = [
  { label: "Education", value: "BS Information Technology, USTP" },
  { label: "Currently", value: "IT team, Prodisenyo Builders Corp." },
  { label: "Based in", value: "Cagayan de Oro, Philippines" },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="tone-light py-24 md:py-40">
      <div className="container-x">
        <SectionHeader
          id="about-title"
          index="01"
          label="About"
          title={[<span key="1">Where code meets</span>, <span key="2"><em>how a business</em></span>, <span key="3">actually runs.</span>]}
        />

        <ScrollWords
          className="display max-w-[22ch] text-[clamp(1.9rem,4.6vw,4.4rem)] !leading-[1.02] tracking-[-0.035em]"
          text="I sit with the people who run payroll, purchasing, and projects, find where their time goes, and turn it into systems that give it back."
        />

        <div className="mt-20 grid gap-14 md:mt-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-fg/80">
              <p>
                I&apos;m a BS Information Technology graduate from the University of Science and
                Technology of Southern Philippines. I joined Prodisenyo Builders Corp. as an intern
                and was retained afterward to keep building the company&apos;s internal software as
                part of its small IT team.
              </p>
              <p>
                Day to day, that means sitting with the people who run payroll, purchasing, and
                projects, understanding where their time goes, and turning that into systems that
                give it back. I use AI coding tools to move faster — and I still help with the
                company&apos;s social media, graphics, and reels.
              </p>
            </div>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              {facts.map((f) => (
                <div key={f.label} className="flex items-baseline justify-between gap-6 py-3.5 text-sm">
                  <dt className="eyebrow">{f.label}</dt>
                  <dd className="text-right">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Stagger as="ol" className="lg:col-span-6 lg:col-start-7">
            {areas.map((a, i) => (
              <StaggerItem as="li" key={a.title} className="border-t border-line-strong last:border-b">
                <a
                  href={a.href}
                  className="group relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 overflow-hidden py-7 md:grid-cols-[3.5rem_1fr_auto] md:py-9"
                >
                  <span aria-hidden className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[var(--ease)] group-hover:scale-y-100" />
                  <span className="eyebrow relative pt-2 transition-colors duration-500 group-hover:!text-accent md:pl-3">0{i + 1}</span>
                  <span className="relative">
                    <span className="display block text-[clamp(1.6rem,2.8vw,2.5rem)] leading-[1.02] transition-colors duration-500 group-hover:text-paper">
                      {a.title}
                    </span>
                    <span className="mt-3 block max-w-md text-[0.95rem] leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/65">
                      {a.body}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="relative mr-3 mt-1.5 size-5 transition-all duration-500 ease-[var(--ease)] group-hover:rotate-45 group-hover:text-accent"
                  />
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
