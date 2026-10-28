import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic } from "./Magnetic";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "ghost";
  external?: boolean;
  download?: boolean;
  magnetic?: boolean;
  className?: string;
  transitionTypes?: string[];
  "aria-label"?: string;
};

const styles = {
  primary: "bg-fg text-bg border border-fg hover:bg-accent hover:border-accent hover:text-white",
  secondary: "border border-line-strong text-fg hover:border-fg hover:bg-fg hover:text-bg",
  accent: "bg-accent text-white border border-accent hover:bg-fg hover:border-fg hover:text-bg",
  ghost: "text-fg hover:text-accent",
};

/**
 * Pill button. The label slides up and is replaced by a copy of itself on
 * hover, which reads as a crisp "flip" without layout shift.
 */
export function Button({
  href,
  children,
  variant = "primary",
  external,
  download,
  magnetic = false,
  className = "",
  transitionTypes,
  ...rest
}: ButtonProps) {
  const cls = `group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-sm font-medium tracking-tight transition-colors duration-500 ease-[var(--ease)] ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span className="relative block overflow-hidden">
        <span className="flex items-center gap-2 transition-transform duration-500 ease-[var(--ease)] group-hover:-translate-y-full">
          {children}
        </span>
        <span aria-hidden className="absolute inset-0 flex translate-y-full items-center gap-2 transition-transform duration-500 ease-[var(--ease)] group-hover:translate-y-0">
          {children}
        </span>
      </span>
    </>
  );

  const isPlain = external || download || href.startsWith("mailto:") || href.endsWith(".pdf");
  const el = isPlain ? (
    <a
      href={href}
      className={cls}
      download={download || undefined}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={rest["aria-label"]}
    >
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} aria-label={rest["aria-label"]} transitionTypes={transitionTypes}>
      {inner}
    </Link>
  );

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
