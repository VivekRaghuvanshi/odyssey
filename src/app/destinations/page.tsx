import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";

export const metadata: Metadata = {
  title: "Destinations",
  description: "Browse every destination in the ODYSSEY collection.",
};

export default function DestinationsPage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-500 dark:text-stone-400">
          Destinations
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          The full collection.
        </h1>
        <p className="mt-4 max-w-lg text-stone-500">
          Twelve places, searchable and filterable by climate, season, and
          travel style.
        </p>

        <div className="mt-16">
          <DestinationExplorer />
        </div>
      </div>
    </main>
  );
}
