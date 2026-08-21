"use client";

import { useEffect, useRef } from "react";
import {
  AnimatePresence,
  motion,
  type TargetAndTransition,
  type Transition,
} from "motion/react";
import { useOdysseyStore, type CompanionMood } from "@/lib/store";

const bodyAnimation: Record<CompanionMood, TargetAndTransition> = {
  idle: { y: [0, -4, 0], rotate: 0, scale: 1 },
  excited: { y: [0, -10, 0], rotate: [0, -6, 6, 0], scale: 1.08 },
  exploring: { y: 0, rotate: [0, 12, -12, 0], scale: 1 },
  thinking: { y: 0, rotate: [0, -8, 0], scale: 1 },
  discovering: { y: [0, -6, 0], rotate: 0, scale: [1, 1.12, 1] },
  success: { y: [0, -12, 0], rotate: 0, scale: [1, 1.15, 1] },
};

const bodyTransition: Record<CompanionMood, Transition> = {
  idle: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  excited: { duration: 0.6, repeat: 2, ease: "easeInOut" },
  exploring: { duration: 1.2, repeat: Infinity, ease: "easeInOut" },
  thinking: { duration: 1.4, repeat: Infinity, ease: "easeInOut" },
  discovering: { duration: 0.8, repeat: 1, ease: "easeOut" },
  success: { duration: 0.7, repeat: 1, ease: "easeOut" },
};

const mouths: Record<CompanionMood, string> = {
  idle: "M -5 4 Q 0 7 5 4",
  excited: "M -6 3 Q 0 10 6 3",
  exploring: "M -5 4 Q 0 6 5 4",
  thinking: "M -4 5 L 4 5",
  discovering: "M -4 4 Q 0 4 4 4 Q 0 9 -4 4 Z",
  success: "M -6 3 Q 0 10 6 3",
};

export function OdysseyCompanion() {
  const mood = useOdysseyStore((s) => s.companionMood);
  const message = useOdysseyStore((s) => s.companionMessage);
  const setCompanion = useOdysseyStore((s) => s.setCompanion);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (mood === "idle") return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCompanion("idle"), 3500);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [mood, message, setCompanion]);

  return (
    <div className="pointer-events-none fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl bg-ink px-4 py-2 text-sm text-paper shadow-lg"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        viewBox="-25 -25 50 50"
        width={56}
        height={56}
        aria-hidden="true"
        animate={bodyAnimation[mood]}
        transition={bodyTransition[mood]}
        className="drop-shadow-lg"
      >
        <circle r={22} className="fill-ink" />
        <circle
          r={22}
          className="fill-none stroke-paper/20"
          strokeWidth={1}
        />
        {mood === "discovering" &&
          [0, 1, 2, 3].map((i) => (
            <motion.circle
              key={i}
              r={1.5}
              cx={Math.cos((i / 4) * Math.PI * 2) * 26}
              cy={Math.sin((i / 4) * Math.PI * 2) * 26}
              className="fill-sand"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          ))}
        <circle cx={-7} cy={-3} r={2.4} className="fill-paper" />
        <circle cx={7} cy={-3} r={2.4} className="fill-paper" />
        <path
          d={mouths[mood]}
          className="fill-none stroke-paper"
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      </motion.svg>
    </div>
  );
}
