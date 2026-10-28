import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="tone-light">
      <div className="container-x flex min-h-[80dvh] flex-col justify-center pt-28">
        <p className="eyebrow">Error 404</p>
        <h1 className="headline mt-6 text-[clamp(3rem,10vw,9rem)]">
          This page <em>doesn&apos;t exist.</em>
        </h1>
        <div className="mt-10">
          <Button href="/" magnetic>
            Back to home
          </Button>
        </div>
      </div>
    </section>
  );
}
