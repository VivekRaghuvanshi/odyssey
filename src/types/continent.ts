import type { ContinentSlug, MapPoint } from "./destination";

export type Continent = {
  slug: ContinentSlug;
  name: string;
  blurb: string;
  node: MapPoint;
};
