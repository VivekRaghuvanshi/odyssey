import Link from "next/link";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { getDestinationBySlug } from "@/lib/destinations";
import type { JournalArticle } from "@/types/journal";
import type { ArtMotif } from "@/types/destination";

const fallbackPalette: [string, string] = ["#211d19", "#b8ac96"];
const fallbackMotif: ArtMotif = "waves";

export function JournalCard({ article, variant = 0 }: { article: JournalArticle; variant?: number }) {
  const linked = getDestinationBySlug(article.destinationSlugs[0] ?? "");
  const palette = linked?.palette ?? fallbackPalette;
  const motif = linked?.motif ?? fallbackMotif;

  return (
    <Link
      href={`/journal/${article.slug}`}
      data-cursor="view"
      className="group flex flex-col gap-4"
    >
      <div className="aspect-[3/2] overflow-hidden rounded-2xl">
        <EditorialArt
          palette={palette}
          motif={motif}
          variant={variant}
          className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-400">
          {article.category} · {article.readTime}
        </p>
        <h3 className="mt-2 font-display text-2xl leading-snug transition-colors group-hover:text-clay">
          {article.title}
        </h3>
        <p className="mt-2 text-sm text-stone-500">{article.excerpt}</p>
      </div>
    </Link>
  );
}
