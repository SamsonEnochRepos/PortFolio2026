"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { site } from "@/content/site";

const KEY = "pl-seen";

export function Preloader() {
  const [visible, setVisible] = useState(true);
  const [instant, setInstant] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = !!sessionStorage.getItem(KEY);
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen) {
      const t = setTimeout(() => {
        setInstant(true);
        setVisible(false);
      }, 0);
      return () => clearTimeout(t);
    }

    const start = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const p = Math.min(1, (t - start) / 1100);
      setCount(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(step);
      else setTimeout(() => setVisible(false), 200);
    };
    raf = requestAnimationFrame(step);
    // safety net: rAF is paused in background tabs, never leave the curtain up
    const failsafe = setTimeout(() => setVisible(false), 2500);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg p-6 sm:p-10"
          exit={instant ? { opacity: 0, transition: { duration: 0 } } : { y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="font-mono text-xs uppercase tracking-widest text-muted">
            {site.name} · {site.role}
          </div>
          <div className="flex items-end justify-between">
            <div className="font-mono text-xs text-muted">
              <span className="text-accent">❯</span> initializing portfolio…
            </div>
            <div className="text-7xl font-semibold tabular-nums tracking-tight sm:text-9xl">
              {String(count).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
