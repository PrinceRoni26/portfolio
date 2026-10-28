export type ProjectLink = {
  label: string;
  href: string;
};

export type CaseStudy = {
  introduction: string;
  problem: string;
  role: string;
  solution: string;
  features: { title: string; description: string }[];
  challenges: { title: string; description: string }[];
  outcome: string[];
  /** Notes shown in place of screenshots (e.g. confidentiality). */
  visualNote?: string;
  /** Extra screenshots shown below the hero image. Paths inside /public. */
  gallery?: { src: string; alt: string; caption: string }[];
  /** Demo or promo video shown near the top of the case study. Paths inside /public. */
  video?: { src: string; poster: string; title: string; duration?: string; caption?: string; teaser?: string };
};

export type Project = {
  slug: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  /** Technologies actually used. Leave empty rather than guessing. */
  tech: string[];
  /** Concepts / capabilities, shown when tech is not listed. */
  tags: string[];
  /** Path inside /public, e.g. "/images/projects/archivia.jpg". */
  image?: string;
  imageAlt?: string;
  liveUrl?: string;
  githubUrl?: string;
  /** Shown as "Type" on the case study, e.g. "Academic capstone project". */
  type?: string;
  recognition?: string;
  confidential?: boolean;
  featured: boolean;
  caseStudy?: CaseStudy;
};

export type CreativeCategory =
  | "Social Media Graphics"
  | "Video Editing"
  | "Motion Graphics"
  | "Marketing Campaigns"
  | "Brand Identity";

export type CreativeImage = { src: string; width: number; height: number };

export type CreativeMedia =
  | ({ type: "image" } & CreativeImage)
  /** Several images shown as one item, e.g. a carousel or a set of logos. */
  | { type: "gallery"; images: CreativeImage[] }
  | {
      type: "video";
      src: string;
      poster: string;
      width: number;
      height: number;
    };

export type CreativeItem = {
  id: string;
  title: string;
  client: string;
  description: string;
  category: CreativeCategory;
  tools: string[];
  /** ISO date, e.g. "2026-06-14". Omit if unknown. */
  date?: string;
  postUrl?: string;
  /** Omit while waiting for real media; a placeholder is rendered. */
  media?: CreativeMedia;
  /** Shown large at the top of the creative gallery. */
  featured?: boolean;
  /** Aspect ratio used for placeholders, e.g. "4/5", "9/16", "1/1". */
  aspect: "1/1" | "4/5" | "9/16" | "16/9";
};

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
};

export type SkillGroup = {
  title: string;
  skills: string[];
};

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};
