import { ViewTransition } from "react";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Creative } from "@/components/sections/Creative";
import { Experience } from "@/components/sections/Experience";
import { GitHubShowcase } from "@/components/sections/GitHubShowcase";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { getGithubUrl, getGithubUsername, site } from "@/data/site";
import { getResumeLink } from "@/lib/resume";
import { pageTransition } from "@/lib/transitions";

export default function HomePage() {
  const resume = getResumeLink();
  const github = getGithubUrl();
  // Section numbers shift by one when the GitHub section is hidden.
  const offset = getGithubUsername() ? 1 : 0;
  const n = (i: number) => String(i + offset).padStart(2, "0");

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    email: `mailto:${site.email}`,
    url: site.url,
    address: { "@type": "PostalAddress", addressLocality: "Cagayan de Oro", addressCountry: "PH" },
    alumniOf: "University of Science and Technology of Southern Philippines",
    worksFor: { "@type": "Organization", name: "Prodisenyo Builders Corp." },
    sameAs: [site.linkedin, ...(github ? [github] : [])],
  };

  return (
    <ViewTransition {...pageTransition}>
      <div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <Hero resume={resume} githubUrl={github} />
        <Marquee />
        <About />
        <Projects />
        <Creative />
        <GitHubShowcase index="04" />
        <Experience index={n(4)} />
        <Skills index={n(5)} />
        <Contact resume={resume} index={n(6)} />
      </div>
    </ViewTransition>
  );
}
