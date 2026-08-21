// MapLibre GL JS resolves its Web Worker script relative to its own bundled
// module URL, which breaks under Turbopack/webpack (vector tiles silently
// never load — see useMapLibreMap.ts). Serving the worker as a static asset
// and pointing maplibregl.config.WORKER_URL at it works around this. This
// script keeps public/maplibre-gl-worker.mjs in sync with the installed
// package version; it runs automatically via the "postinstall" npm script.
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "node_modules", "maplibre-gl", "dist");
const destDir = join(__dirname, "..", "public");

// The worker imports maplibre-gl-shared.mjs as a sibling module at runtime,
// so both files must be served from the same public path.
const files = ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"];

if (!existsSync(destDir)) mkdirSync(destDir, { recursive: true });

for (const file of files) {
  const src = join(distDir, file);
  if (!existsSync(src)) {
    console.warn("[copy-maplibre-worker] source file not found, skipping:", src);
    continue;
  }
  copyFileSync(src, join(destDir, file));
  console.log(`[copy-maplibre-worker] copied to public/${file}`);
}
