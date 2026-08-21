"use client";

import { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import { WorldMap } from "@/components/map/WorldMap";
import { DestinationGrid } from "./DestinationGrid";
import { continents } from "@/data/continents";
import {
  filterDestinations,
  getAllDestinations,
  searchDestinations,
} from "@/lib/destinations";
import { useOdysseyStore } from "@/lib/store";
import type {
  Climate,
  ContinentSlug,
  Season,
  TravelStyle,
} from "@/types/destination";

const climates: Climate[] = [
  "temperate",
  "tropical",
  "arctic",
  "desert",
  "mediterranean",
  "alpine",
];
const seasons: Season[] = ["spring", "summer", "autumn", "winter"];
const travelStyles: TravelStyle[] = [
  "adventure",
  "culture",
  "nature",
  "luxury",
  "food",
  "photography",
];

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-1.5 text-xs font-medium capitalize tracking-wide transition-colors ${
        active
          ? "border-ink bg-ink text-paper dark:border-paper dark:bg-paper dark:text-ink"
          : "border-stone-300 text-stone-600 hover:border-ink hover:text-ink dark:border-stone-600 dark:text-stone-300 dark:hover:border-paper dark:hover:text-paper"
      }`}
    >
      {children}
    </button>
  );
}

type DestinationExplorerProps = {
  showMap?: boolean;
  initialContinent?: ContinentSlug | null;
};

const emptyCounts: Record<ContinentSlug, number> = {
  asia: 0,
  europe: 0,
  africa: 0,
  "north-america": 0,
  "south-america": 0,
  oceania: 0,
  antarctica: 0,
};

export function DestinationExplorer({
  showMap = false,
  initialContinent = null,
}: DestinationExplorerProps) {
  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState<ContinentSlug | null>(
    initialContinent,
  );
  const [climate, setClimate] = useState<Climate | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [travelStyle, setTravelStyle] = useState<TravelStyle | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);

  const favorites = useOdysseyStore((s) => s.favorites);
  const setCompanion = useOdysseyStore((s) => s.setCompanion);

  const counts = useMemo(() => {
    const map = { ...emptyCounts };
    for (const d of getAllDestinations()) map[d.continent] += 1;
    return map;
  }, []);

  const results = useMemo(() => {
    const base = query ? searchDestinations(query) : getAllDestinations();
    return filterDestinations(base, {
      continent: continent ?? undefined,
      climate: climate ?? undefined,
      season: season ?? undefined,
      travelStyle: travelStyle ?? undefined,
      favoritesOnly: savedOnly ? favorites : undefined,
    });
  }, [query, continent, climate, season, travelStyle, savedOnly, favorites]);

  const hasActiveFilters =
    continent || climate || season || travelStyle || savedOnly || query;

  function handleContinentSelect(slug: ContinentSlug) {
    const next = continent === slug ? null : slug;
    setContinent(next);
    if (next) {
      const name = continents.find((c) => c.slug === slug)?.name ?? slug;
      setCompanion("excited", `Let's explore ${name}!`);
    }
  }

  function clearAll() {
    setQuery("");
    setContinent(null);
    setClimate(null);
    setSeason(null);
    setTravelStyle(null);
    setSavedOnly(false);
  }

  return (
    <div className="flex flex-col gap-10">
      {showMap && (
        <WorldMap
          selected={continent}
          onSelect={handleContinentSelect}
          counts={counts}
        />
      )}

      <div className="flex flex-col gap-6">
        <div className="relative">
          <SearchIcon
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations…"
            aria-label="Search destinations"
            className="w-full rounded-full border border-stone-300 bg-transparent py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-ink dark:border-stone-600 dark:focus:border-paper"
          />
        </div>

        <div className="flex flex-col gap-3">
          <div role="group" aria-label="Filter by continent" className="flex flex-wrap gap-2">
            {continents
              .filter((c) => counts[c.slug] > 0)
              .map((c) => (
                <Chip
                  key={c.slug}
                  active={continent === c.slug}
                  onClick={() => handleContinentSelect(c.slug)}
                >
                  {c.name}
                </Chip>
              ))}
          </div>
          <div role="group" aria-label="Filter by climate" className="flex flex-wrap gap-2">
            {climates.map((c) => (
              <Chip
                key={c}
                active={climate === c}
                onClick={() => setClimate(climate === c ? null : c)}
              >
                {c}
              </Chip>
            ))}
          </div>
          <div role="group" aria-label="Filter by season" className="flex flex-wrap gap-2">
            {seasons.map((s) => (
              <Chip
                key={s}
                active={season === s}
                onClick={() => setSeason(season === s ? null : s)}
              >
                {s}
              </Chip>
            ))}
          </div>
          <div role="group" aria-label="Filter by travel style" className="flex flex-wrap gap-2">
            {travelStyles.map((t) => (
              <Chip
                key={t}
                active={travelStyle === t}
                onClick={() => setTravelStyle(travelStyle === t ? null : t)}
              >
                {t}
              </Chip>
            ))}
            <Chip active={savedOnly} onClick={() => setSavedOnly((v) => !v)}>
              ♥ Saved{favorites.length > 0 ? ` (${favorites.length})` : ""}
            </Chip>
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex w-fit items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-stone-500 hover:text-ink dark:hover:text-paper"
            >
              <X className="size-3.5" aria-hidden="true" />
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-stone-500">
        {results.length} destination{results.length === 1 ? "" : "s"}
      </p>

      <DestinationGrid
        destinations={results}
        emptyHint={["Japan", "Italy", "Iceland"]}
      />
    </div>
  );
}
