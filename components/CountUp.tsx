"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `to` once scrolled into view. `suffix` e.g. "×" or "+".
 * `startAt` = seconds after page load before counting may begin (so it syncs with an intro animation).
 */
export function CountUp({ to, suffix = "", startAt = 0 }: { to: number; suffix?: string; startAt?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const wait = Math.max(0, startAt - performance.now() / 1000);
    const c = animate(0, to, { duration: 1.4, delay: wait, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, to, startAt]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}
