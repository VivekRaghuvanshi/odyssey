import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

/**
 * SSR-safe reduced-motion detection. Unlike motion/react's useReducedMotion,
 * this always agrees with the server on the first client render (both return
 * false), then updates after mount — avoiding a hydration mismatch on any
 * component whose rendered output (not just an animation) depends on it.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
