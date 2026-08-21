"use client";

import { motion } from "motion/react";
import { continents } from "@/data/continents";
import type { ContinentSlug } from "@/types/destination";

type WorldMapProps = {
  selected: ContinentSlug | null;
  onSelect: (slug: ContinentSlug) => void;
  counts: Record<ContinentSlug, number>;
};

const connections: [ContinentSlug, ContinentSlug][] = [
  ["europe", "asia"],
  ["asia", "oceania"],
  ["africa", "europe"],
  ["africa", "south-america"],
  ["north-america", "europe"],
  ["north-america", "south-america"],
  ["south-america", "antarctica"],
  ["oceania", "antarctica"],
];

function nodeFor(slug: ContinentSlug) {
  return continents.find((c) => c.slug === slug)!;
}

export function WorldMap({ selected, onSelect, counts }: WorldMapProps) {
  return (
    <div className="relative aspect-[16/10] w-full">
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        {connections.map(([a, b]) => {
          const from = nodeFor(a);
          const to = nodeFor(b);
          return (
            <line
              key={`${a}-${b}`}
              x1={from.node.x}
              y1={from.node.y}
              x2={to.node.x}
              y2={to.node.y}
              stroke="currentColor"
              strokeWidth={0.15}
              className="text-stone-300 dark:text-stone-600"
            />
          );
        })}
      </svg>

      {continents.map((continent) => {
        const isSelected = selected === continent.slug;
        const count = counts[continent.slug] ?? 0;
        return (
          <button
            key={continent.slug}
            type="button"
            data-cursor="explore"
            onClick={() => onSelect(continent.slug)}
            aria-pressed={isSelected}
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2"
            style={{ left: `${continent.node.x}%`, top: `${continent.node.y}%` }}
          >
            <motion.span
              animate={{
                scale: isSelected ? 1.3 : 1,
              }}
              whileHover={{ scale: isSelected ? 1.3 : 1.15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-center justify-center rounded-full border transition-colors ${
                isSelected
                  ? "border-clay bg-clay text-paper"
                  : "border-stone-400 bg-paper text-ink group-hover:border-clay dark:bg-ink dark:text-paper"
              }`}
              style={{
                width: 12 + Math.min(count, 6) * 2,
                height: 12 + Math.min(count, 6) * 2,
              }}
            >
              {isSelected && (
                <motion.span
                  className="absolute inset-0 rounded-full border border-clay"
                  animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                />
              )}
            </motion.span>
            <span
              className={`whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.15em] transition-colors ${
                isSelected
                  ? "text-clay"
                  : "text-stone-500 group-hover:text-ink dark:group-hover:text-paper"
              }`}
            >
              {continent.name}
            </span>
          </button>
        );
      })}
    </div>
  );
}
