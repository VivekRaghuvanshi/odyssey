"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

type CursorVariant = "default" | "view" | "explore";

const variantConfig: Record<
  CursorVariant,
  { size: number; label?: string }
> = {
  default: { size: 10 },
  view: { size: 64, label: "View" },
  explore: { size: 64, label: "Explore" },
};

function subscribePointerFine(callback: () => void) {
  const mql = window.matchMedia("(pointer: fine)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePointerFine() {
  return useSyncExternalStore(
    subscribePointerFine,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );
}

export function CustomCursor() {
  const enabled = usePointerFine();
  const [variant, setVariant] = useState<CursorVariant>("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400, mass: 0.3 });
  const springY = useSpring(y, { damping: 30, stiffness: 400, mass: 0.3 });

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-none");

    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const over = (event: PointerEvent) => {
      const target = (event.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]",
      );
      setVariant((target?.dataset.cursor as CursorVariant) ?? "default");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);

    return () => {
      document.documentElement.classList.remove("cursor-none");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const config = variantConfig[variant];

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{ width: config.size, height: config.size }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="absolute inset-0 rounded-full bg-paper" />
      {config.label && (
        <span className="relative text-[10px] font-medium uppercase tracking-[0.15em] text-ink">
          {config.label}
        </span>
      )}
    </motion.div>
  );
}
