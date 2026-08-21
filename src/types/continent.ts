import type { ContinentSlug, LngLat } from "./destination";

export type Continent = {
  slug: ContinentSlug;
  name: string;
  blurb: string;
  center: LngLat;
  zoom: number;
};
