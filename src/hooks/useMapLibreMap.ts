"use client";

import { useEffect, useRef, useState } from "react";
import * as maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { useResolvedTheme } from "./useResolvedTheme";
import type { LngLat } from "@/types/destination";

const STYLE_URLS = {
  light: "https://tiles.openfreemap.org/styles/positron",
  dark: "https://tiles.openfreemap.org/styles/dark",
};

// MapLibre resolves its Web Worker relative to its own bundled module URL,
// which Turbopack/webpack don't preserve — vector tiles silently never load
// without this. The file is copied to public/ by scripts/copy-maplibre-worker.mjs.
if (typeof window !== "undefined") {
  maplibregl.config.WORKER_URL = "/maplibre-gl-worker.mjs";
}

type UseMapLibreMapOptions = {
  center: LngLat;
  zoom: number;
  interactive?: boolean;
};

export function useMapLibreMap({ center, zoom, interactive = true }: UseMapLibreMapOptions) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<maplibregl.Map | null>(null);
  const theme = useResolvedTheme();
  const appliedStyleRef = useRef<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const initialStyle = STYLE_URLS[theme];
    appliedStyleRef.current = initialStyle;

    const instance = new maplibregl.Map({
      container: containerRef.current,
      style: initialStyle,
      center,
      zoom,
      interactive,
      cooperativeGestures: interactive,
      attributionControl: { compact: true },
    });

    if (interactive) {
      instance.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "top-right",
      );
    }

    setMap(instance);

    return () => {
      instance.remove();
      setMap(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    const nextStyle = STYLE_URLS[theme];
    if (appliedStyleRef.current === nextStyle) return;
    appliedStyleRef.current = nextStyle;
    map.setStyle(nextStyle);
  }, [map, theme]);

  return { containerRef, map };
}
