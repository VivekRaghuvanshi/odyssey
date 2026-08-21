import { getAllDestinations } from "@/lib/destinations";
import type { Destination } from "@/types/destination";

export function LocationMap({ destination }: { destination: Destination }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-200 bg-stone-50 dark:border-stone-700 dark:bg-stone-900">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {getAllDestinations().map((d) => (
          <circle
            key={d.id}
            cx={d.coordinates.x}
            cy={d.coordinates.y}
            r={d.id === destination.id ? 1.8 : 0.6}
            className={
              d.id === destination.id
                ? "fill-clay"
                : "fill-stone-300 dark:fill-stone-600"
            }
          />
        ))}
      </svg>
      <div className="absolute bottom-4 left-4 text-xs font-medium uppercase tracking-[0.2em] text-stone-500">
        {destination.country} · {destination.continent.replace("-", " ")}
      </div>
    </div>
  );
}
