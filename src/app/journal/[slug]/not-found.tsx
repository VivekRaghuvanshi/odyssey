import { CtaLink } from "@/components/ui/CtaLink";

export default function ArticleNotFound() {
  return (
    <main
      id="main-content"
      className="flex flex-1 flex-col items-center justify-center bg-ink px-6 py-32 text-center text-paper"
    >
      <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-400">
        404
      </p>
      <h1 className="mt-6 max-w-xl font-display text-4xl leading-tight tracking-tight sm:text-5xl">
        This story hasn&apos;t been written yet.
      </h1>
      <div className="mt-10">
        <CtaLink href="/journal" variant="outline">
          Return to Journal
        </CtaLink>
      </div>
    </main>
  );
}
