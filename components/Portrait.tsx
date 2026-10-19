"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Flame } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import { useIntroDelay } from "@/lib/useIntroDelay";
import { SocialLinks } from "./SocialLinks";

/**
 * Inverted photo card (light card on dark theme, dark card on light theme):
 * framed portrait, dashed orange arcs, flame badge, socials. Tilts toward the cursor.
 */
export function Portrait() {
  const delay = useIntroDelay() + 0.2;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const arcA = useTransform(scrollY, [0, 3000], [0, 360]);
  const arcB = useTransform(scrollY, [0, 3000], [0, -300]);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 140, damping: 18 });
  const sy = useSpring(py, { stiffness: 140, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-8, 8]);
  const rotateX = useTransform(sy, [0, 1], [8, -8]);
  const imgX = useTransform(sx, [0, 1], [-8, 8]);
  const imgY = useTransform(sy, [0, 1], [-8, 8]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotate: 4 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-[22rem]"
    >
      <motion.div
        ref={ref}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onPointerMove={(e) => {
          const r = ref.current!.getBoundingClientRect();
          px.set((e.clientX - r.left) / r.width);
          py.set((e.clientY - r.top) / r.height);
        }}
        onPointerLeave={() => {
          px.set(0.5);
          py.set(0.5);
        }}
        className="group relative overflow-hidden rounded-[28px] bg-[var(--inv-bg)] p-5 text-[var(--inv-fg)] shadow-[0_30px_80px_-30px_color-mix(in_oklch,var(--orange)_55%,transparent)]"
      >
        {/* dashed arcs */}
        <motion.svg
          aria-hidden
          viewBox="0 0 200 200"
          style={{ rotate: arcA }}
          className="pointer-events-none absolute -left-16 -top-16 size-48"
        >
          <circle cx="100" cy="100" r="92" fill="none" stroke="var(--orange)" strokeWidth="3" strokeDasharray="7 9" strokeLinecap="round" />
        </motion.svg>
        <motion.svg
          aria-hidden
          viewBox="0 0 200 200"
          style={{ rotate: arcB }}
          className="pointer-events-none absolute -bottom-20 -right-16 size-56"
        >
          <circle cx="100" cy="100" r="92" fill="none" stroke="var(--blue)" strokeWidth="3" strokeDasharray="7 9" strokeLinecap="round" />
        </motion.svg>

        {/* photo */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl [@media(min-width:1024px)_and_(max-height:780px)]:aspect-square bg-[var(--blue)]">
          <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-3">
            <Image
              src={asset("/images/blue.jpg")}
              alt={`Portrait of ${site.name}`}
              fill
              priority
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{ objectPosition: "50% 30%" }}
            />
          </motion.div>
        </div>

        {/* name + badge */}
        <div className="relative mt-5 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">{site.name}</h2>
          <div className="mx-auto mt-3 flex size-9 items-center justify-center rounded-full bg-[var(--orange)] text-white [animation:bob_3s_ease-in-out_infinite]">
            <Flame className="size-4" />
          </div>
          <p className="mt-3 text-sm font-medium leading-snug opacity-70">{site.role}</p>
          <p className="font-mono text-[11px] opacity-50">{site.location}</p>
        </div>

        {/* socials */}
        <div className="relative mt-4 flex justify-center gap-2">
          <SocialLinks
            magnetic
            linkClass="flex size-10 items-center justify-center rounded-full text-[var(--orange)] transition-colors hover:bg-[var(--orange)] hover:text-white"
            iconClass="size-[18px]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
