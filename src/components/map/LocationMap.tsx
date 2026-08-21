"use client";

import { useEffect } from "react";
import * as maplibregl from "maplibre-gl";
import { useMapLibreMap } from "@/hooks/useMapLibreMap";
import type { Destination } from "@/types/destination";

export function LocationMap({ destination }: { destination: Destination }) {
  const { containerRef, map } = useMapLibreMap({
    center: destination.coordinates,
    zoom: 4,
    interactive: false,
  });

  useEffect(() => {
    if (!map) return;

    const el = document.createElement("div");
    el.innerHTML = `<span class="relative flex size-4 items-center justify-center">
      <span class="absolute inset-0 rounded-full bg-clay/50 animate-ping"></span>
      <span class="relative size-3 rounded-full border-2 border-paper bg-clay shadow"></span>
    </span>`;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat(destination.coordinates)
      .addTo(map);

    return () => {
      marker.remove();
    };
  }, [map, destination.coordinates]);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stone-200 dark:border-stone-700">
      <div ref={containerRef} aria-hidden="true" className="h-full w-full" />
      <div className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-paper backdrop-blur-sm">
        {destination.country} · {destination.continent.replace("-", " ")}
      </div>
    </div>
  );
}
