"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

const options = [
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "light", label: "Light", icon: Sun },
] as const;

const subscribe = () => () => {};
export function useMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/** Segmented System / Dark / Light control. */
export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const active = mounted ? theme ?? "system" : "system";

  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-full border border-line bg-card p-1">
      {options.map(({ value, label, icon: Icon }) => (
        <button
          key={value}
          role="radio"
          aria-checked={active === value}
          aria-label={label}
          title={label}
          onClick={() => setTheme(value)}
          className={cn(
            "flex size-8 items-center justify-center rounded-full transition-colors",
            active === value ? "bg-accent text-on-accent" : "text-muted hover:text-fg",
          )}
        >
          <Icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
