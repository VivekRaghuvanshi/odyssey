import type { Continent } from "@/types/continent";

export const continents: Continent[] = [
  {
    slug: "asia",
    name: "Asia",
    blurb: "Ancient temples, neon cities, and mountains that touch the sky.",
    node: { x: 72, y: 35 },
  },
  {
    slug: "europe",
    name: "Europe",
    blurb: "Cobblestone histories, fjords, and coastlines carved by time.",
    node: { x: 52, y: 25 },
  },
  {
    slug: "africa",
    name: "Africa",
    blurb: "Desert light, wild horizons, and cities of ochre and gold.",
    node: { x: 53, y: 55 },
  },
  {
    slug: "north-america",
    name: "North America",
    blurb: "Glacial wilderness and coastlines that stretch for days.",
    node: { x: 22, y: 30 },
  },
  {
    slug: "south-america",
    name: "South America",
    blurb: "Rainforest canopies and rhythms that move like the coastline.",
    node: { x: 30, y: 62 },
  },
  {
    slug: "oceania",
    name: "Oceania",
    blurb: "Islands, reefs, and light unlike anywhere else on earth.",
    node: { x: 82, y: 72 },
  },
  {
    slug: "antarctica",
    name: "Antarctica",
    blurb: "The last silence. Still being mapped.",
    node: { x: 50, y: 94 },
  },
];
