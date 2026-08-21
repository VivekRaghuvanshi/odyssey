import type { Continent } from "@/types/continent";

export const continents: Continent[] = [
  {
    slug: "asia",
    name: "Asia",
    blurb: "Ancient temples, neon cities, and mountains that touch the sky.",
    center: [90, 34],
    zoom: 2.4,
  },
  {
    slug: "europe",
    name: "Europe",
    blurb: "Cobblestone histories, fjords, and coastlines carved by time.",
    center: [15, 50],
    zoom: 3.2,
  },
  {
    slug: "africa",
    name: "Africa",
    blurb: "Desert light, wild horizons, and cities of ochre and gold.",
    center: [20, 2],
    zoom: 2.4,
  },
  {
    slug: "north-america",
    name: "North America",
    blurb: "Glacial wilderness and coastlines that stretch for days.",
    center: [-100, 45],
    zoom: 2.4,
  },
  {
    slug: "south-america",
    name: "South America",
    blurb: "Rainforest canopies and rhythms that move like the coastline.",
    center: [-60, -15],
    zoom: 2.6,
  },
  {
    slug: "oceania",
    name: "Oceania",
    blurb: "Islands, reefs, and light unlike anywhere else on earth.",
    center: [140, -25],
    zoom: 2.8,
  },
  {
    slug: "antarctica",
    name: "Antarctica",
    blurb: "The last silence. Still being mapped.",
    center: [0, -80],
    zoom: 2,
  },
];
