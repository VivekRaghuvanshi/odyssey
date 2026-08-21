import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { Reveal } from "@/components/animations/Reveal";
import { getAllArticles, getArticleBySlug } from "@/lib/journal";
import { getDestinationBySlug } from "@/lib/destinations";
import type { ArtMotif } from "@/types/destination";

const fallbackPalette: [string, string] = ["#211d19", "#b8ac96"];
const fallbackMotif: ArtMotif = "waves";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: { title: article.title, description: article.excerpt },
  };
}

export default async function JournalArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  const linked = getDestinationBySlug(article.destinationSlugs[0] ?? "");
  const palette = linked?.palette ?? fallbackPalette;
  const motif = linked?.motif ?? fallbackMotif;
  const related = article.destinationSlugs
    .map((s) => getDestinationBySlug(s))
    .filter((d) => d !== undefined);

  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="relative flex min-h-[60vh] flex-col justify-end px-6 pb-16 pt-32 text-paper sm:px-10">
        <EditorialArt palette={palette} motif={motif} className="absolute inset-0 -z-10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/40 to-ink/40" />
        <div className="mx-auto w-full max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-paper/70">
            {article.category} · {article.readTime}
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-6xl">
            {article.title}
          </h1>
        </div>
      </section>

      <article className="px-6 py-16 sm:px-10">
        <Reveal className="mx-auto flex max-w-2xl flex-col gap-6 font-display text-xl leading-relaxed sm:text-2xl">
          {article.body.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </Reveal>

        {related.length > 0 && (
          <div className="mx-auto mt-16 flex max-w-2xl flex-wrap gap-3 border-t border-stone-200 pt-8 dark:border-stone-800">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
              Mentioned:
            </span>
            {related.map((d) => (
              <Link
                key={d!.id}
                href={`/destinations/${d!.slug}`}
                className="text-sm underline underline-offset-4 hover:text-clay"
              >
                {d!.country}
              </Link>
            ))}
          </div>
        )}
      </article>
    </main>
  );
}
