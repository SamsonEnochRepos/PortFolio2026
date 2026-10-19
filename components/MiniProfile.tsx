"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { asset } from "@/lib/asset";
import { popSpring } from "./Pop";
import { SocialLinks } from "./SocialLinks";

// matches Tailwind's `lg` breakpoint, where the full card is pinned instead
const SMALL_SCREEN = "(max-width: 1023px)";

/**
 * Phone / tablet version of the pinned profile card. The full card is too tall to stay on a
 * small screen, so once it scrolls out of view a compact copy pops up and stays at the bottom.
 */
export function MiniProfile({ targetId = "profile-card" }: { targetId?: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const mq = matchMedia(SMALL_SCREEN);
    let io: IntersectionObserver | undefined;

    // only observe on small screens; on desktop the bar is never needed
    const sync = () => {
      io?.disconnect();
      io = undefined;
      const el = document.getElementById(targetId);
      if (!mq.matches || !el) {
        setShow(false);
        return;
      }
      io = new IntersectionObserver(([entry]) => {
        // visible only once the full card has scrolled off the top
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      });
      io.observe(el);
    };

    const start = setTimeout(sync, 0);
    mq.addEventListener("change", sync);
    return () => {
      clearTimeout(start);
      mq.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, [targetId]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0, scale: 0.8 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.8 }}
          transition={popSpring(0, 280, 18)}
          className="fixed inset-x-3 bottom-3 z-40 flex items-center gap-3 rounded-2xl bg-[var(--inv-bg)] p-2.5 pr-3 text-[var(--inv-fg)] shadow-[0_20px_50px_-12px_color-mix(in_oklch,var(--orange)_55%,transparent)] md:mx-auto md:max-w-md lg:hidden"
        >
          <a href="#home" aria-label={`${site.name}, back to top`} className="flex min-w-0 flex-1 items-center gap-3">
            <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-[var(--blue)]">
              <Image
                src={asset("/images/blue.jpg")}
                alt=""
                fill
                sizes="44px"
                className="object-cover"
                style={{ objectPosition: "50% 25%" }}
              />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-extrabold tracking-tight">{site.name}</span>
              <span className="block truncate font-mono text-[10px] opacity-60">{site.role}</span>
            </span>
          </a>
          <div className="flex shrink-0 gap-0.5">
            <SocialLinks
              linkClass="flex size-9 items-center justify-center rounded-full text-[var(--orange)] transition-colors active:bg-[var(--orange)] active:text-white"
              iconClass="size-[17px]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
