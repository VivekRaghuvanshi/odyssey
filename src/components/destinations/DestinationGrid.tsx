import { DestinationCard } from "./DestinationCard";
import type { Destination } from "@/types/destination";

type DestinationGridProps = {
  destinations: Destination[];
  emptyHint?: string[];
};

export function DestinationGrid({ destinations, emptyHint }: DestinationGridProps) {
  if (destinations.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-24 text-center">
        <p className="font-display text-2xl">No destination found.</p>
        {emptyHint && emptyHint.length > 0 && (
          <p className="text-sm text-stone-500">
            Try searching:{" "}
            {emptyHint.map((hint, i) => (
              <span key={hint}>
                <span className="text-ink dark:text-paper">{hint}</span>
                {i < emptyHint.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {destinations.map((destination, i) => (
        <DestinationCard
          key={destination.id}
          destination={destination}
          variant={i}
        />
      ))}
    </div>
  );
}
