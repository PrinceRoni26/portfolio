const items = [
  "Software Engineering",
  "Business Systems",
  "Workflow Automation",
  "Machine Learning",
  "Social Media Design",
  "Video Editing",
  "Motion Graphics",
];

/** Slow ticker between the hero and the rest of the page. Pauses on hover. */
export function Marquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center">
          <span className="headline whitespace-nowrap px-6 text-[clamp(1.6rem,3.6vw,3.25rem)] md:px-10">{t}</span>
          <span aria-hidden className="block size-2.5 rotate-45 bg-accent md:size-3" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee tone-dark overflow-hidden border-y border-ink py-5 md:py-7" role="region" aria-label="Practice areas">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
