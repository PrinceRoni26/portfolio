"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x flex min-h-[70dvh] flex-col justify-center pt-28">
      <p className="eyebrow">Something went wrong</p>
      <h1 className="display mt-6 text-[clamp(2.5rem,7vw,5.5rem)]">
        That didn&apos;t load <em className="italic">as expected.</em>
      </h1>
      <div className="mt-10 flex gap-3">
        <button type="button" onClick={reset} className="border border-ink bg-ink px-5 py-3 text-sm text-bg hover:bg-transparent hover:text-ink">
          Try again
        </button>
        <Link href="/" className="border border-line-strong px-5 py-3 text-sm hover:border-ink">Back to home</Link>
      </div>
    </section>
  );
}
