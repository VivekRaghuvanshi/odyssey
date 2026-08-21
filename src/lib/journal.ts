import { journal } from "@/data/journal";
import type { JournalArticle } from "@/types/journal";

export function getAllArticles(): JournalArticle[] {
  return journal;
}

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journal.find((a) => a.slug === slug);
}
