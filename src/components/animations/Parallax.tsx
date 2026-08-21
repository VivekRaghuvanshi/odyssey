"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

export function Parallax({ children, className = "", strength = 60 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-strength, strength]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y: reduceMotion ? 0 : y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
