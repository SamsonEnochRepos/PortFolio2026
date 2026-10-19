"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/** Bouncy spring used for every "pop out" entrance (a little overshoot, then settles). */
export const popSpring = (delay = 0, stiffness = 260, damping = 15) =>
  ({ type: "spring", stiffness, damping, mass: 0.9, delay }) as const;

/** Full transition for a pop: spring on scale/position, quick fade on opacity (springs would overshoot it). */
export const popTransition = (delay = 0, stiffness = 260, damping = 15) => ({
  default: popSpring(delay, stiffness, damping),
  opacity: { duration: 0.4, delay },
});

/**
 * Pops an element out when it scrolls into view: scales up from `from` with a springy
 * overshoot while fading and rising. Use `as="span"` for inline chips.
 */
export function Pop({
  children,
  delay = 0,
  from = 0.8,
  y = 16,
  margin = -40,
  stiffness,
  damping,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  from?: number;
  y?: number;
  margin?: number;
  stiffness?: number;
  damping?: number;
  className?: string;
  as?: "div" | "span";
}) {
  const M = as === "span" ? motion.span : motion.div;
  return (
    <M
      className={className}
      initial={{ opacity: 0, scale: from, y }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: `${margin}px` }}
      transition={popTransition(delay, stiffness, damping)}
    >
      {children}
    </M>
  );
}
