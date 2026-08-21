import type { MetadataRoute } from "next";
import { getAllDestinations } from "@/lib/destinations";
import { getAllArticles } from "@/lib/journal";

const staticRoutes = ["", "/explore", "/destinations", "/journal", "/about"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://odyssey.vercel.app";
  const now = new Date();

  const destinationRoutes = getAllDestinations().map((d) => ({
    url: `${base}/destinations/${d.slug}`,
    lastModified: now,
  }));

  const journalRoutes = getAllArticles().map((a) => ({
    url: `${base}/journal/${a.slug}`,
    lastModified: new Date(a.publishedAt),
  }));

  return [
    ...staticRoutes.map((route) => ({ url: `${base}${route}`, lastModified: now })),
    ...destinationRoutes,
    ...journalRoutes,
  ];
}
