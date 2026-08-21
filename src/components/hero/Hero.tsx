"use client";

import { motion, type Transition } from "motion/react";
import type { CSSProperties } from "react";
import { CtaLink } from "@/components/ui/CtaLink";

const lines = ["The world", "is waiting."];

const particles = [
  { left: "8%", top: "22%", size: 3, duration: 9, delay: 0 },
  { left: "18%", top: "68%", size: 2, duration: 11, delay: 1.2 },
  { left: "32%", top: "40%", size: 2, duration: 8, delay: 0.4 },
  { left: "52%", top: "78%", size: 3, duration: 12, delay: 2 },
  { left: "68%", top: "30%", size: 2, duration: 10, delay: 0.8 },
  { left: "82%", top: "60%", size: 3, duration: 9, delay: 1.6 },
  { left: "90%", top: "20%", size: 2, duration: 13, delay: 0.6 },
];

export function Hero() {
  const ease: Transition["ease"] = [0.16, 1, 0.3, 1];

  return (
    <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden bg-ink px-6 text-paper">
      <div
        aria-hidden="true"
        className="grain-overlay pointer-events-none absolute inset-0 opacity-[0.05]"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {particles.map((particle, i) => (
          <span
            key={i}
            className="particle absolute rounded-full bg-paper/50"
            style={
              {
                left: particle.left,
                top: particle.top,
                width: particle.size,
                height: particle.size,
                "--duration": `${particle.duration}s`,
                "--delay": `${particle.delay}s`,
              } as CSSProperties
            }
          />
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-sm font-medium uppercase tracking-[0.3em] text-stone-300"
      >
        Odyssey
      </motion.p>

      <h1 className="relative mt-6 max-w-4xl text-center font-display text-5xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
        {lines.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1, ease, delay: 0.15 + i * 0.15 }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className="relative mt-8 max-w-md text-center text-lg text-stone-200"
      >
        Explore the places that make our planet extraordinary.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="relative mt-12"
      >
        <CtaLink href="/explore" variant="outline">
          Begin Journey
        </CtaLink>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="absolute bottom-10 hidden flex-col items-center gap-2 text-xs uppercase tracking-[0.3em] text-stone-400 sm:flex"
      >
        <span>Scroll</span>
        <span className="h-10 w-px bg-stone-500/60" />
      </motion.div>
    </section>
  );
}
