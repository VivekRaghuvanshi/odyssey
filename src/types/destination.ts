export type ContinentSlug =
  | "asia"
  | "europe"
  | "africa"
  | "north-america"
  | "south-america"
  | "oceania"
  | "antarctica";

export type Climate =
  | "temperate"
  | "tropical"
  | "arctic"
  | "desert"
  | "mediterranean"
  | "alpine";

export type Season = "spring" | "summer" | "autumn" | "winter";

export type TravelStyle =
  | "adventure"
  | "culture"
  | "nature"
  | "luxury"
  | "food"
  | "photography";

export type ArtMotif =
  | "mountains"
  | "waves"
  | "dunes"
  | "forest"
  | "aurora"
  | "city";

/** [longitude, latitude], matching MapLibre's coordinate order. */
export type LngLat = [number, number];

export type GalleryImage = {
  id: string;
  caption: string;
  aspect: "portrait" | "landscape" | "square";
};

export type Destination = {
  id: string;
  slug: string;
  country: string;
  continent: ContinentSlug;
  tagline: string;
  description: string;
  culture: string;
  food: string;
  highlights: string[];
  bestTime: string;
  temperature: { low: number; high: number };
  climate: Climate;
  season: Season[];
  travelStyle: TravelStyle[];
  tags: string[];
  coordinates: LngLat;
  palette: [string, string];
  motif: ArtMotif;
  gallery: GalleryImage[];
};
