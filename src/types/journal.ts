export type JournalArticle = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  destinationSlugs: string[];
  readTime: string;
  publishedAt: string;
  category: string;
};
