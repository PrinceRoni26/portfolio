import fs from "node:fs";
import path from "node:path";
import { site } from "@/data/site";

export type ResumeLink =
  | { available: true; href: string; label: string; download: true }
  | { available: false; href: string; label: string; download: false };

/**
 * Returns a download link when /public/resume.pdf exists, otherwise a
 * mailto link so the button is never broken.
 */
export function getResumeLink(): ResumeLink {
  const file = path.join(process.cwd(), "public", site.resumePath.replace(/^\//, ""));
  if (fs.existsSync(file)) {
    return { available: true, href: site.resumePath, label: "Download Resume", download: true };
  }
  return {
    available: false,
    href: `mailto:${site.email}?subject=${encodeURIComponent("Resume request")}`,
    label: "Request Resume",
    download: false,
  };
}
