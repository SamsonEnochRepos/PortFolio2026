"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import type { Project } from "@/content/site";

const tones = ["orange", "blue", "lime", "violet", "pink"] as const;

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const tone = tones[index % tones.length];
  const ref = useRef<HTMLAnchorElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 180, damping: 18 });
  const sy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(sx, [0, 1], [-7, 7]);
  const rotateX = useTransform(sy, [0, 1], [7, -7]);

  return (
    <motion.a
      ref={ref}
      href={project.href}
      {...(project.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
        ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
        ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`spotlight tone-${tone} group relative flex flex-col justify-between overflow-hidden p-6 ${project.featured ? "min-h-80 md:col-span-2" : "min-h-72"}`}
    >
      <div className="flex items-start justify-between font-mono text-xs text-muted">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1.5 origin-left scale-x-[0.3] bg-[var(--tbg)] transition-transform duration-500 group-hover:scale-x-100" />
        <span className="flex items-center gap-3">
          {project.year}
          {project.status === "soon" && (
            <span className="rounded-full border border-line px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--tink)]">Soon</span>
          )}
          {project.featured && (
            <span className="rounded-full bg-[var(--tbg)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[var(--tfg)]">Featured</span>
          )}
        </span>
        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[var(--tink)]" />
      </div>

      <div className="transition-transform duration-500 group-hover:-translate-y-24">
        <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">{project.blurb}</p>
      </div>

      {/* revealed on hover: the stack and metrics behind the project */}
      <div className="absolute inset-x-6 bottom-6 translate-y-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="rounded-full border border-line bg-[var(--tsoft)] px-2.5 py-0.5 font-mono text-[11px] text-[var(--tink)]">
              {s}
            </span>
          ))}
        </div>
        <div className="flex gap-6 font-mono text-xs text-muted">
          {project.metrics.map((m) => (
            <span key={m.label}>
              <span className="text-fg">{m.value}</span> {m.label}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
