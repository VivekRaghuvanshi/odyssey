import Link from "next/link";
import { EditorialArt } from "@/components/ui/EditorialArt";
import { DestinationMedia } from "@/components/ui/DestinationMedia";
import { getDestinationBySlug } from "@/lib/destinations";
import type { JournalArticle } from "@/types/journal";
import type { ArtMotif } from "@/types/destination";

const fallbackPalette: [string, string] = ["#211d19", "#b8ac96"];
const fallbackMotif: ArtMotif = "waves";

type JournalCardProps = {
  article: JournalArticle;
  variant?: number;
  priority?: boolean;
};

export function JournalCard({ article, variant = 0, priority = false }: JournalCardProps) {
  const linked = getDestinationBySlug(article.destinationSlugs[0] ?? "");

  return (
    <Link
      href={`/journal/${article.slug}`}
      data-cursor="view"
      className="group flex flex-col gap-4"
    >
      <div className="aspect-[3/2] overflow-hidden rounded-2xl">
        {linked ? (
          <DestinationMedia
            destination={linked}
            alt={article.title}
            decorative
            variant={variant}
            priority={priority}
            sizes="(min-width: 640px) 50vw, 100vw"
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <EditorialArt
            palette={fallbackPalette}
            motif={fallbackMotif}
            variant={variant}
            className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105"
          />
        )}
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
          {article.category} · {article.readTime}
        </p>
        <h2 className="mt-2 font-display text-2xl leading-snug transition-colors group-hover:text-clay">
          {article.title}
        </h2>
        <p className="mt-2 text-sm text-stone-500">{article.excerpt}</p>
      </div>
    </Link>
  );
}
