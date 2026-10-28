import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CreativeGallery } from "./CreativeGallery";

export function Creative() {
  return (
    <section id="creative" aria-labelledby="creative-title" className="tone-light py-24 md:py-40">
      <div className="container-x">
        <SectionHeader
          id="creative-title"
          index="03"
          label="Creative Work"
          title={[<span key="1">Content made</span>, <span key="2">for <em>the feed.</em></span>]}
          intro="Social media graphics, reels, and campaign assets produced for real businesses — shown with their permission."
        />
        <Reveal>
          <CreativeGallery />
        </Reveal>
      </div>
    </section>
  );
}
