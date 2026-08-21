"use client";

import dynamic from "next/dynamic";
import { useInView } from "@/hooks/useInView";
import type { Destination } from "@/types/destination";

const LocationMap = dynamic(
  () => import("./LocationMap").then((mod) => mod.LocationMap),
  { ssr: false },
);

const skeleton = (
  <div className="aspect-[16/9] w-full animate-pulse rounded-2xl border border-stone-200 bg-stone-100 dark:border-stone-700 dark:bg-stone-800" />
);

export function LocationMapLoader({ destination }: { destination: Destination }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref}>
      {inView ? <LocationMap destination={destination} /> : skeleton}
    </div>
  );
}
