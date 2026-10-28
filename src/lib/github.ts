import { cacheLife } from "next/cache";
import type { GitHubRepo } from "@/types";

export type GitHubResult =
  | { ok: true; repos: GitHubRepo[] }
  | { ok: false; error: string };

/**
 * Fetches public, non-fork repositories for a user. Runs on the server only.
 * An optional GITHUB_TOKEN (server env var, never NEXT_PUBLIC_) raises the
 * API rate limit; it is never sent to the browser.
 */
export async function getPublicRepos(
  username: string,
  featured: string[] = [],
): Promise<GitHubResult> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=pushed&type=owner`,
      { headers },
    );
    if (!res.ok) {
      return {
        ok: false,
        error: res.status === 404 ? "GitHub profile not found." : "GitHub is unavailable right now.",
      };
    }
    const data = (await res.json()) as GitHubRepo[];
    const pinned = featured.map((n) => n.toLowerCase());
    const repos = data
      .filter((r) => !r.fork && !r.archived)
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        html_url: r.html_url,
        homepage: r.homepage,
        language: r.language,
        stargazers_count: r.stargazers_count,
        fork: r.fork,
        archived: r.archived,
        pushed_at: r.pushed_at,
      }))
      .sort((a, b) => {
        const ai = pinned.indexOf(a.name.toLowerCase());
        const bi = pinned.indexOf(b.name.toLowerCase());
        if (ai !== -1 || bi !== -1) return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
        return b.stargazers_count - a.stargazers_count || b.pushed_at.localeCompare(a.pushed_at);
      })
      .slice(0, 6);
    return { ok: true, repos };
  } catch {
    return { ok: false, error: "GitHub is unavailable right now." };
  }
}
