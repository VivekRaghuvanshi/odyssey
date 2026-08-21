"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import * as maplibregl from "maplibre-gl";
import { useMapLibreMap } from "@/hooks/useMapLibreMap";
import type { Destination } from "@/types/destination";

type WorldMapProps = {
  destinations: Destination[];
};

function createMarkerElement(destination: Destination) {
  const el = document.createElement("button");
  el.type = "button";
  el.className = "group flex cursor-pointer items-center justify-center p-2.5";
  el.setAttribute("aria-label", `View ${destination.country}`);
  el.innerHTML = `
    <span aria-hidden="true" class="relative flex size-4 items-center justify-center">
      <span class="absolute inset-0 rounded-full bg-clay/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 animate-ping"></span>
      <span class="relative size-3 rounded-full border-2 border-paper bg-clay shadow transition-transform duration-300 group-hover:scale-125 group-focus-visible:scale-125"></span>
    </span>
  `;
  return el;
}

function createPopupContent(destination: Destination, onNavigate: () => void) {
  const wrapper = document.createElement("a");
  wrapper.href = `/destinations/${destination.slug}`;
  wrapper.tabIndex = -1;
  wrapper.className = "block cursor-pointer px-1 py-0.5";
  wrapper.innerHTML = `
    <p class="text-[10px] font-medium uppercase tracking-[0.15em] text-stone-600">${destination.continent.replace("-", " ")}</p>
    <p class="mt-0.5 font-semibold text-ink">${destination.country}</p>
    <p class="mt-0.5 text-xs text-stone-500">${destination.tagline}</p>
  `;
  wrapper.addEventListener("click", (event) => {
    event.preventDefault();
    onNavigate();
  });
  return wrapper;
}

export function WorldMap({ destinations }: WorldMapProps) {
  const { containerRef, map } = useMapLibreMap({ center: [10, 20], zoom: 1.3 });
  const router = useRouter();
  const markersRef = useRef<maplibregl.Marker[]>([]);

  useEffect(() => {
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = [];

    for (const destination of destinations) {
      const popup = new maplibregl.Popup({
        closeButton: false,
        offset: 14,
        maxWidth: "220px",
      }).setDOMContent(
        createPopupContent(destination, () =>
          router.push(`/destinations/${destination.slug}`),
        ),
      );

      const marker = new maplibregl.Marker({ element: createMarkerElement(destination) })
        .setLngLat(destination.coordinates)
        .setPopup(popup)
        .addTo(map);

      const el = marker.getElement();
      const show = () => marker.togglePopup();
      const hide = () => marker.togglePopup();
      el.addEventListener("mouseenter", show);
      el.addEventListener("mouseleave", hide);
      el.addEventListener("focus", show);
      el.addEventListener("blur", hide);
      el.addEventListener("click", () =>
        router.push(`/destinations/${destination.slug}`),
      );

      markersRef.current.push(marker);
    }

    if (destinations.length > 0) {
      const bounds = destinations.reduce(
        (b, d) => b.extend(d.coordinates),
        new maplibregl.LngLatBounds(destinations[0].coordinates, destinations[0].coordinates),
      );
      map.fitBounds(bounds, { padding: 60, maxZoom: 5, duration: 800 });
    }
  }, [map, destinations, router]);

  return (
    <div
      ref={containerRef}
      className="aspect-[16/10] w-full overflow-hidden rounded-2xl"
    />
  );
}
