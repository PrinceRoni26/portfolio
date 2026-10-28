import { ProjectCard } from "@/components/ui/ProjectCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { featuredProjects, otherProjects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="tone-dark py-24 md:py-40">
      <div className="container-x">
        <SectionHeader
          id="projects-title"
          index="02"
          label="Selected Work"
          title={[<span key="1">Systems built</span>, <span key="2">for <em>real operations.</em></span>]}
          intro="Enterprise software used inside a working construction company, a live website and staff portal for an interiors business, and an award-winning machine learning capstone."
        />

        <ol className="space-y-28 md:space-y-44">
          {featuredProjects.map((p, i) => (
            <li key={p.slug}>
              <ProjectCard project={p} index={i} flip={i % 2 === 1} />
            </li>
          ))}
        </ol>

        {otherProjects.length ? (
          <div className="mt-32 border-t border-line pt-10">
            <p className="eyebrow mb-12">More projects</p>
            <ol className="space-y-24">
              {otherProjects.map((p, i) => (
                <li key={p.slug}>
                  <ProjectCard project={p} index={featuredProjects.length + i} flip={i % 2 === 0} />
                </li>
              ))}
            </ol>
          </div>
        ) : null}
      </div>
    </section>
  );
}
