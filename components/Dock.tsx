"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Briefcase, Command, FolderGit2, Home, Mail, Monitor, Moon, PenLine, Sun, Wrench } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useRef, type ComponentType } from "react";
import { showWriting } from "@/content/site";
import { useMounted } from "./ThemeSwitch";

type Item = { href?: string; icon: ComponentType<{ className?: string }>; label: string; onClick?: () => void };

function DockItem({ mouseX, item }: { mouseX: MotionValue<number>; item: Item }) {
  const ref = useRef<HTMLDivElement>(null);
  const distance = useTransform(mouseX, (v) => {
    const b = ref.current?.getBoundingClientRect();
    return b ? v - b.x - b.width / 2 : 999;
  });
  const size = useSpring(useTransform(distance, [-120, 0, 120], [34, 56, 34]), {
    mass: 0.1,
    stiffness: 200,
    damping: 14,
  });
  const Icon = item.icon;
  const inner = <Icon className="size-[45%]" />;
  const cls =
    "flex size-full items-center justify-center rounded-full text-muted transition-colors hover:bg-accent-soft hover:text-accent";

  return (
    <motion.div ref={ref} style={{ width: size, height: size }} className="group relative">
      {item.href ? (
        <Link href={item.href} aria-label={item.label} className={cls}>
          {inner}
        </Link>
      ) : (
        <button aria-label={item.label} onClick={item.onClick} className={cls}>
          {inner}
        </button>
      )}
      <span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-card px-2 py-1 font-mono text-[11px] opacity-0 transition-opacity group-hover:opacity-100">
        {item.label}
      </span>
    </motion.div>
  );
}

export function Dock() {
  const mouseX = useMotionValue(Infinity);
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const current = mounted ? theme ?? "system" : "system";
  const next = current === "system" ? "dark" : current === "dark" ? "light" : "system";
  const ThemeIcon = current === "dark" ? Moon : current === "light" ? Sun : Monitor;

  const items: Item[] = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/#projects", icon: FolderGit2, label: "Projects" },
    { href: "/#experience", icon: Briefcase, label: "Experience" },
    { href: "/#skills", icon: Wrench, label: "Skills" },
    ...(showWriting ? [{ href: "/blog", icon: PenLine, label: "Writing" }] : []),
    { href: "/#contact", icon: Mail, label: "Contact" },
    { icon: Command, label: "Command menu (Ctrl K)", onClick: () => window.dispatchEvent(new Event("open-palette")) },
    { icon: ThemeIcon, label: `Theme: ${current} → ${next}`, onClick: () => setTheme(next) },
  ];

  return (
    <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2" aria-label="Primary">
      <motion.div
        onPointerMove={(e) => mouseX.set(e.clientX)}
        onPointerLeave={() => mouseX.set(Infinity)}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, type: "spring", stiffness: 120, damping: 16 }}
        className="flex h-14 items-center gap-0.5 rounded-full border border-line bg-card/80 px-2 backdrop-blur-xl sm:h-16 sm:gap-1 sm:px-3"
      >
        {items.map((item) => (
          <DockItem key={item.label} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </nav>
  );
}
