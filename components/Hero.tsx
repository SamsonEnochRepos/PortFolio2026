"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useIntroDelay } from "@/lib/useIntroDelay";
import { projects, site } from "@/content/site";
import { CountUp } from "./CountUp";
import { popTransition } from "./Pop";
import { Magnetic } from "./Magnetic";
import { WordReveal } from "./WordReveal";

const marquee = ["TypeScript", "Python", "Next.js", "React", "PyTorch", "Go", "Rust", "PostgreSQL", "Docker", "AWS", "LLMs", "RAG"];

const stats = [
  { to: 6, suffix: "×", label: "Hackathons won", tone: "orange" },
  { to: 3, suffix: "", label: "Internships", tone: "blue" },
  { to: projects.filter((p) => p.status !== "soon").length, suffix: "", label: "Projects shipped", tone: "lime" },
];

export function Hero() {
  const delay = useIntroDelay();

  return (
    <section id="home" className="relative pt-10 pb-6 lg:pt-36">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[44rem] overflow-hidden">
        <div className="absolute -left-24 top-20 size-96 rounded-full bg-[var(--orange)] blur-[120px]" style={{ opacity: "var(--blob)" }} />
        <div className="absolute -right-24 top-40 size-[28rem] rounded-full bg-[var(--blue)] blur-[130px]" style={{ opacity: "var(--blob)" }} />
        <div className="absolute left-1/3 top-96 size-72 rounded-full bg-[var(--violet)] blur-[120px]" style={{ opacity: "calc(var(--blob) * 0.7)" }} />
      </div>
      <div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay, duration: 0.6 }}
        className="mb-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted"
      >
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full rounded-full bg-emerald-400 [animation:pulse-ring_2s_ease-out_infinite]" />
          <span className="relative size-2 rounded-full bg-emerald-400" />
        </span>
        Available for work · {site.location}
      </motion.div>

      <h1 className="max-w-3xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl xl:text-7xl">
        <WordReveal text={site.headline} delay={delay} />
      </h1>

      <motion.p
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={popTransition(delay + 0.5, 200, 15)}
        className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
      >
        {site.intro}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={popTransition(delay + 0.7, 200, 15)}
        className="mt-10 flex flex-wrap items-center gap-6"
      >
        <Magnetic>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-on-accent"
          >
            Say hi
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Magnetic>
        <button
          onClick={() => window.dispatchEvent(new Event("open-palette"))}
          className="hidden items-center gap-2 font-mono text-xs text-muted transition-colors hover:text-fg sm:flex"
        >
          <kbd className="rounded border border-line bg-card px-1.5 py-0.5">Ctrl</kbd>
          <kbd className="rounded border border-line bg-card px-1.5 py-0.5">K</kbd>
          to open the terminal
        </button>
      </motion.div>


      {/* intro animation (not whileInView): it plays once after the preloader, wherever the row sits on screen */}
      <div className="mt-12 flex flex-wrap gap-x-10 gap-y-6">
        {stats.map((st, i) => {
          const at = delay + 0.9 + i * 0.12;
          return (
            <motion.div
              key={st.label}
              initial={{ opacity: 0, scale: 0.5, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={popTransition(at)}
              className={`tone-${st.tone}`}
            >
              <div className="text-5xl font-extrabold tracking-tight text-[var(--tink)] sm:text-6xl">
                <CountUp to={st.to} suffix={st.suffix} startAt={at} />
              </div>
              <div className="mt-1 font-mono text-[11px] uppercase tracking-widest text-muted">{st.label}</div>
            </motion.div>
          );
        })}
      </div>
      </div>

      <div className="mt-20 overflow-hidden border-y border-line py-4 [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <div className="flex w-max gap-10 font-mono text-sm text-muted [animation:marquee_32s_linear_infinite] hover:[animation-play-state:paused]">
          {[...marquee, ...marquee].map((m, i) => (
            <span key={i} className="transition-colors hover:text-accent">
              {m}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
