import type { Metadata } from "next";
import { JournalCard } from "@/components/journal/JournalCard";
import { getAllArticles } from "@/lib/journal";

export const metadata: Metadata = {
  title: "Journal",
  description: "Editorial stories from the ODYSSEY travel journal.",
};

export default function JournalPage() {
  const articles = getAllArticles();

  return (
    <main id="main-content" className="flex flex-1 flex-col px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
          Journal
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          Stories worth the scroll.
        </h1>
        <p className="mt-4 max-w-lg text-stone-500">
          Field notes and editorial features from across the collection.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2">
          {articles.map((article, i) => (
            <JournalCard key={article.id} article={article} variant={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
