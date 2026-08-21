import type { Metadata } from "next";
import { DestinationExplorer } from "@/components/destinations/DestinationExplorer";

export const metadata: Metadata = {
  title: "Explore",
  description: "Explore the continents and choose your next destination.",
};

export default function ExplorePage() {
  return (
    <main id="main-content" className="flex flex-1 flex-col px-6 pb-24 pt-32 sm:px-10">
      <div className="mx-auto w-full max-w-6xl">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-400">
          Explore
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight tracking-tight sm:text-6xl">
          Pick a continent. See where it takes you.
        </h1>
        <p className="mt-4 max-w-lg text-stone-500">
          Select a continent on the map, or search and filter directly — the
          collection updates instantly either way.
        </p>

        <div className="mt-16">
          <DestinationExplorer showMap />
        </div>
      </div>
    </main>
  );
}
