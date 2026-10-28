import type { SkillGroup } from "@/types";

/**
 * Taken from the resume. Only list tools you can confidently discuss in an
 * interview. Groups with no skills are hidden automatically.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend Development",
    skills: ["Role-based dashboards", "Approval & reporting interfaces", "Responsive web interfaces"],
  },
  {
    title: "Backend Development",
    skills: ["Python", "SQL", "Role-based access control", "Workflow & approval logic", "Git", "GitHub"],
  },
  {
    title: "Databases",
    skills: ["MySQL", "MongoDB", "Firebase"],
  },
  {
    title: "AI & Machine Learning",
    skills: [
      "Machine learning",
      "scikit-learn",
      "Pandas",
      "TF-IDF",
      "SBERT semantic similarity",
      "AI-assisted development",
    ],
  },
  {
    title: "Business Analysis & Automation",
    skills: [
      "Requirements gathering",
      "Business process analysis",
      "Workflow automation",
      "Stakeholder communication",
      "Systems documentation",
      "Excel",
      "Expense & purchase tracking",
      "Data validation",
    ],
  },
  {
    title: "Design & Creative",
    skills: [
      "Social media graphics",
      "Reels & short-form video",
      "Facebook content management",
      "Campaign coordination",
      "Digital marketing support",
    ],
  },
];

export const education = {
  school: "University of Science and Technology of Southern Philippines",
  degree: "Bachelor of Science in Information Technology",
  period: "2022 – 2026",
};

export type Award = {
  title: string;
  detail: string;
  year: string;
  /** Optional verification link (e.g. a Credly badge). Opens in a new tab. */
  href?: string;
  hrefLabel?: string;
};

export const awards: Award[] = [
  {
    title: "Best Capstone Award",
    detail: "Archivia — ML-powered thesis archive",
    year: "2026",
    href: "https://lnkd.in/p/gBDJegeZ",
    hrefLabel: "See the LinkedIn post",
  },
  {
    title: "Introduction to Data Science",
    detail: "Cisco Networking Academy",
    year: "2026",
    href: "https://www.credly.com/badges/5b325cab-9442-4b83-9b88-5488f3951b9c",
    hrefLabel: "Verify on Credly",
  },
];

export const languages = ["English", "Tagalog"];
