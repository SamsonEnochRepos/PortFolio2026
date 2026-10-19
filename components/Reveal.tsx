"use client";

import type { ReactNode } from "react";
import { Pop } from "./Pop";

/** Layout-level pop: a bigger, slower `Pop` for whole blocks (sections, cards, tiles). */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Pop from={0.9} y={32} margin={-60} stiffness={200} damping={16} delay={delay} className={className}>
      {children}
    </Pop>
  );
}
