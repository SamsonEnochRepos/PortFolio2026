"use client";

import { Command } from "cmdk";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useRef, useState } from "react";
import { showWriting, site } from "@/content/site";

function MatrixRain({ onDone }: { onDone: () => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const cols = Math.floor(canvas.width / 16);
    const drops = Array.from({ length: cols }, () => Math.random() * -50);
    const id = setInterval(() => {
      ctx.fillStyle = "rgba(0,0,0,0.09)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ff8a3d";
      ctx.font = "15px monospace";
      drops.forEach((y, i) => {
        ctx.fillText(String.fromCharCode(0x30a0 + Math.random() * 96), i * 16, y * 16);
        drops[i] = y * 16 > canvas.height && Math.random() > 0.975 ? 0 : y + 1;
      });
    }, 40);
    const stop = setTimeout(onDone, 5000);
    return () => {
      clearInterval(id);
      clearTimeout(stop);
    };
  }, [onDone]);
  return <canvas ref={ref} onClick={onDone} className="fixed inset-0 z-[95] bg-black/80" />;
}

const nav = [
  { label: "cd ~/home", href: "/" },
  { label: "cd ~/projects", href: "/#projects" },
  { label: "cd ~/experience", href: "/#experience" },
  { label: "cd ~/skills", href: "/#skills" },
  ...(showWriting ? [{ label: "cd ~/writing", href: "/blog" }] : []),
  { label: "cd ~/uses", href: "/uses" },
  { label: "cd ~/contact", href: "/#contact" },
];

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [matrix, setMatrix] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const router = useRouter();
  const { setTheme } = useTheme();

  const close = useCallback(() => {
    setOpen(false);
    setOutput([]);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        close();
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-palette", onOpen);
    };
  }, [close]);

  const go = (href: string) => {
    close();
    router.push(href);
  };

  const print = async (lines: string[], delay = 380) => {
    setOutput([]);
    for (const l of lines) {
      await sleep(delay);
      setOutput((o) => [...o, l]);
    }
  };

  const item =
    "flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 font-mono text-sm text-muted data-[selected=true]:bg-accent-soft data-[selected=true]:text-fg";
  const heading =
    "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-widest [&_[cmdk-group-heading]]:text-accent";

  return (
    <>
      {matrix && <MatrixRain onDone={() => setMatrix(false)} />}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-start justify-center bg-black/50 px-4 pt-[16vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
          >
            <motion.div
              initial={{ y: -16, scale: 0.97, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -10, scale: 0.98, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 26 }}
              className="w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-card shadow-2xl"
            >
              <Command label="Command menu" loop>
                <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                  <span className="size-2.5 rounded-full bg-red-400/80" />
                  <span className="size-2.5 rounded-full bg-yellow-400/80" />
                  <span className="size-2.5 rounded-full bg-green-400/80" />
                  <span className="ml-2 font-mono text-[11px] text-muted">~/portfolio — zsh</span>
                </div>
                <div className="flex items-center gap-2 border-b border-line px-4">
                  <span className="font-mono text-accent">❯</span>
                  <Command.Input
                    autoFocus
                    placeholder="type a command…  (try: sudo, matrix, theme)"
                    className="h-12 w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted/60"
                  />
                </div>

                {output.length > 0 && (
                  <div className="border-b border-line bg-bg/60 px-4 py-3 font-mono text-xs leading-relaxed text-muted">
                    {output.map((l, i) => (
                      <div key={i}>{l}</div>
                    ))}
                  </div>
                )}

                <Command.List className="max-h-72 overflow-y-auto p-2">
                  <Command.Empty className="px-3 py-6 text-center font-mono text-xs text-muted">
                    zsh: command not found
                  </Command.Empty>

                  <Command.Group heading="navigate" className={heading}>
                    {nav.map((n) => (
                      <Command.Item key={n.href} value={n.label} onSelect={() => go(n.href)} className={item}>
                        {n.label}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="theme" className={heading}>
                    {(["system", "dark", "light"] as const).map((t) => (
                      <Command.Item
                        key={t}
                        value={`theme ${t}`}
                        onSelect={() => {
                          setTheme(t);
                          print([`✓ theme set to ${t}`], 0);
                        }}
                        className={item}
                      >
                        theme {t}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="actions" className={heading}>
                    <Command.Item
                      value="copy email"
                      onSelect={() => {
                        navigator.clipboard?.writeText(site.email);
                        print([`✓ copied ${site.email}`], 0);
                      }}
                      className={item}
                    >
                      copy email
                    </Command.Item>
                    {site.socials.map((s) => (
                      <Command.Item
                        key={s.label}
                        value={`open ${s.label}`}
                        onSelect={() => window.open(s.href, "_blank", "noopener")}
                        className={item}
                      >
                        open {s.label.toLowerCase()}
                      </Command.Item>
                    ))}
                  </Command.Group>

                  <Command.Group heading="secrets" className={heading}>
                    <Command.Item
                      value="sudo hire-me"
                      onSelect={async () => {
                        await print([
                          "[sudo] password for recruiter: ••••••••",
                          "authenticating… ok",
                          "granting role: HIRING_MANAGER",
                          "opening mail client…",
                        ]);
                        await sleep(500);
                        window.location.href = `mailto:${site.email}?subject=Let's work together`;
                      }}
                      className={item}
                    >
                      sudo hire-me
                    </Command.Item>
                    <Command.Item
                      value="matrix"
                      onSelect={() => {
                        close();
                        setMatrix(true);
                      }}
                      className={item}
                    >
                      matrix
                    </Command.Item>
                    <Command.Item
                      value="whoami"
                      onSelect={() => print([site.name, `${site.role} · ${site.location}`], 200)}
                      className={item}
                    >
                      whoami
                    </Command.Item>
                  </Command.Group>
                </Command.List>
              </Command>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
