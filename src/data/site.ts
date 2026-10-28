/**
 * Global site details. Edit these values to update the whole site.
 */
export const site = {
  name: "Prince Roniver A. Magsalos",
  shortName: "Prince Roniver Magsalos",
  logo: "PRM",
  title: "IT & Business Systems Specialist | Software Developer | Digital Creative",
  role: "IT & Business Systems Specialist",
  location: "Cagayan de Oro, Philippines",
  timeZone: "Asia/Manila",
  email: "magsalos.princeroniver@gmail.com",
  linkedin: "https://linkedin.com/in/princeronivermagsalos",
  /**
   * Your GitHub username, e.g. "princeroniver". Leave empty to hide the
   * GitHub showcase and GitHub links. You can also set GITHUB_USERNAME
   * in Vercel → Project → Settings → Environment Variables.
   */
  githubUsername: "",
  /** Repository names to pin first in the GitHub showcase. */
  featuredRepos: [] as string[],
  /** File in /public. Remove the file to switch buttons to "Resume on request". */
  resumePath: "/resume.pdf",
  copyrightYear: 2026,
  /** Your production URL, used for SEO, sitemap and Open Graph. */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://princeroniver.vercel.app",
  description:
    "Prince Roniver A. Magsalos is an IT & Business Systems Specialist and software developer in Cagayan de Oro, Philippines, building business systems, workflow automation, and digital marketing content.",
};

export function getGithubUsername(): string {
  return (process.env.GITHUB_USERNAME ?? site.githubUsername).trim();
}

export function getGithubUrl(): string | null {
  const username = getGithubUsername();
  return username ? `https://github.com/${username}` : null;
}

export const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Creative", href: "/#creative" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;
