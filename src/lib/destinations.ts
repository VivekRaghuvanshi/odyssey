import { destinations } from "@/data/destinations";
import type {
  Climate,
  ContinentSlug,
  Destination,
  Season,
  TravelStyle,
} from "@/types/destination";

export function getAllDestinations(): Destination[] {
  return destinations;
}

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}

export function getDestinationsByContinent(
  continent: ContinentSlug,
): Destination[] {
  return destinations.filter((d) => d.continent === continent);
}

export function searchDestinations(query: string): Destination[] {
  const q = query.trim().toLowerCase();
  if (!q) return destinations;
  return destinations.filter((d) => {
    const haystack = [
      d.country,
      d.tagline,
      ...d.highlights,
      ...d.tags,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

export type DestinationFilters = {
  continent?: ContinentSlug;
  climate?: Climate;
  season?: Season;
  travelStyle?: TravelStyle;
  favoritesOnly?: string[];
};

export function filterDestinations(
  list: Destination[],
  filters: DestinationFilters,
): Destination[] {
  return list.filter((d) => {
    if (filters.continent && d.continent !== filters.continent) return false;
    if (filters.climate && d.climate !== filters.climate) return false;
    if (filters.season && !d.season.includes(filters.season)) return false;
    if (
      filters.travelStyle &&
      !d.travelStyle.includes(filters.travelStyle)
    )
      return false;
    if (filters.favoritesOnly && !filters.favoritesOnly.includes(d.id))
      return false;
    return true;
  });
}
