import { SectionHeader } from "@/components/ui/SectionHeader";
import { Timeline } from "./Timeline";

export function Experience({ index = "04" }: { index?: string }) {
  return (
    <section id="experience" aria-labelledby="experience-title" className="tone-light py-24 md:py-40">
      <div className="container-x">
        <SectionHeader
          id="experience-title"
          index={index}
          label="Experience"
          title={[<span key="1">From intern</span>, <span key="2">to <em>the IT team.</em></span>]}
          intro="Retained by Prodisenyo Builders Corp. after my internship to continue building the systems I started on."
        />
        <Timeline />
      </div>
    </section>
  );
}
