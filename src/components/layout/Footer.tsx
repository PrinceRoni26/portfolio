import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { getGithubUrl, navLinks, site } from "@/data/site";

export function Footer() {
  const github = getGithubUrl();
  const socials = [
    { label: "Email", href: `mailto:${site.email}` },
    { label: "LinkedIn", href: site.linkedin },
    ...(github ? [{ label: "GitHub", href: github }] : []),
  ];
  return (
    <footer className="tone-dark border-t border-line">
      <div className="container-x grid gap-10 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="headline text-[clamp(3rem,8vw,6.5rem)]">
            {site.logo}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            {site.role}, software developer, and digital creative based in {site.location}.
          </p>
        </div>
        <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
          <p className="eyebrow mb-4">Index</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} transitionTypes={["nav-back"]} className="link-underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="md:col-span-3">
          <p className="eyebrow mb-4">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="link-underline"
                  {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col justify-between gap-3 py-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>© {site.copyrightYear} {site.name}</p>
          <p>Designed &amp; built by Prince Roniver Magsalos</p>
          <Link href="/#top" transitionTypes={["nav-back"]} className="group inline-flex items-center gap-2 text-fg">
            Back to top
            <span className="flex size-7 items-center justify-center rounded-full border border-line-strong transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
              <ArrowUp className="size-3.5" aria-hidden />
            </span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
