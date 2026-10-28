import { Suspense } from "react";
import { ArrowUpRight, Star } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getGithubUsername, site } from "@/data/site";
import { getPublicRepos } from "@/lib/github";

/** GitHub's own language colors for the most common languages. */
const languageColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  PHP: "#4F5D95",
  Java: "#b07219",
  "C#": "#178600",
  "C++": "#f34b7d",
  C: "#555555",
  Go: "#00ADD8",
  Rust: "#dea584",
  Kotlin: "#A97BFF",
  Swift: "#F05138",
  Dart: "#00B4AB",
  Ruby: "#701516",
  Shell: "#89e051",
  Vue: "#41b883",
  "Jupyter Notebook": "#DA5B0B",
};

function formatUpdated(iso: string) {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

/** Hidden automatically until a GitHub username is configured. */
export function GitHubShowcase({ index = "04" }: { index?: string }) {
  const username = getGithubUsername();
  if (!username) return null;

  return (
    <section id="github" aria-labelledby="github-title" className="tone-white py-24 md:py-40">
      <div className="container-x">
        <SectionHeader
          id="github-title"
          index={index}
          label="Open Source"
          title={[<span key="1">From the</span>, <span key="2"><em>repository.</em></span>]}
          intro="Public repositories, pulled live from GitHub."
        />
        <Suspense fallback={<RepoSkeleton />}>
          <RepoList username={username} />
        </Suspense>
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex items-center gap-3 rounded-full border border-line-strong py-2 pl-5 pr-2 text-sm font-medium transition-colors duration-500 hover:border-fg hover:bg-fg hover:text-bg"
        >
          View all on GitHub
          <span className="flex size-8 items-center justify-center rounded-full bg-fg text-bg transition-transform duration-500 group-hover:rotate-45 group-hover:bg-bg group-hover:text-fg">
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        </a>
      </div>
    </section>
  );
}

async function RepoList({ username }: { username: string }) {
  const result = await getPublicRepos(username, site.featuredRepos);

  if (!result.ok) {
    return (
      <div role="status" className="border-y border-line-strong py-10">
        <p className="display text-2xl">{result.error}</p>
        <p className="mt-2 text-muted">You can still browse the repositories directly on GitHub.</p>
      </div>
    );
  }
  if (result.repos.length === 0) {
    return <p className="border-y border-line-strong py-10 text-muted">No public repositories yet.</p>;
  }

  return (
    <Stagger as="ol" className="border-t border-line-strong">
      {result.repos.map((r, i) => (
        <StaggerItem as="li" key={r.id} className="border-b border-line-strong">
          <a
            href={r.html_url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="Open repo"
            className="group relative grid grid-cols-[2rem_1fr_auto] items-start gap-x-4 gap-y-2 overflow-hidden py-6 md:grid-cols-[3.5rem_minmax(0,1.1fr)_minmax(0,1.4fr)_9rem_auto] md:items-center md:py-7"
          >
            <span aria-hidden className="absolute inset-0 origin-left scale-x-0 bg-ink transition-transform duration-700 ease-[var(--ease)] group-hover:scale-x-100" />
            <span className="eyebrow relative transition-colors duration-500 group-hover:!text-accent md:pl-3">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="display relative min-w-0 truncate text-[clamp(1.3rem,2.2vw,1.9rem)] transition-colors duration-500 group-hover:text-paper">
              {r.name}
            </span>
            <span className="relative col-start-2 line-clamp-2 text-sm leading-relaxed text-muted transition-colors duration-500 group-hover:text-paper/65 md:col-start-auto">
              {r.description ?? "No description provided."}
            </span>
            <span className="relative col-start-2 flex items-center gap-4 text-xs text-fg/75 transition-colors duration-500 group-hover:text-paper/80 md:col-start-auto">
              {r.language ? (
                <span className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="block size-2 rounded-full" style={{ background: languageColor[r.language] ?? "var(--gray)" }} />
                  {r.language}
                </span>
              ) : null}
              <span className="inline-flex items-center gap-1" aria-label={`${r.stargazers_count} stars`}>
                <Star className="size-3.5" aria-hidden /> {r.stargazers_count}
              </span>
              <span className="hidden xl:inline">{formatUpdated(r.pushed_at)}</span>
            </span>
            <ArrowUpRight
              aria-hidden
              className="relative col-start-3 row-start-1 mr-3 size-5 transition-all duration-500 ease-[var(--ease)] group-hover:rotate-45 group-hover:text-accent md:col-start-auto"
            />
          </a>
        </StaggerItem>
      ))}
    </Stagger>
  );
}

function RepoSkeleton() {
  return (
    <div className="border-t border-line-strong" aria-busy="true" aria-label="Loading repositories">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-[2rem_1fr] gap-4 border-b border-line-strong py-7 md:grid-cols-[3.5rem_1fr_1.4fr]">
          <div className="h-3 w-5 animate-pulse bg-tint" />
          <div className="h-5 w-2/3 animate-pulse bg-tint" />
          <div className="hidden h-3 w-full animate-pulse self-center bg-tint md:block" />
        </div>
      ))}
    </div>
  );
}
