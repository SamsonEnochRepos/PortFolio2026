import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { SpotlightCard } from "@/components/SpotlightCard";
import { uses } from "@/content/site";

export const metadata: Metadata = { title: "Uses" };

export default function Uses() {
  return (
    <div className="mx-auto max-w-4xl pt-40 pb-10">
      <Reveal>
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">06</span> / Uses
        </p>
        <h1 className="mb-4 text-5xl font-semibold tracking-tight sm:text-6xl">What I use</h1>
        <p className="mb-12 max-w-xl text-muted">The hardware, software and tools behind my day-to-day work.</p>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {uses.map((g, i) => (
          <Reveal key={g.group} delay={i * 0.06}>
            <SpotlightCard className={`tile tone-${["orange","blue","lime","violet","pink"][i % 5]} h-full p-6`}>
              <h2 className="mb-4 font-mono text-xs uppercase tracking-widest opacity-80">{g.group}</h2>
              <ul className="space-y-2.5">
                {g.items.map((item) => (
                  <li key={item} className="text-sm transition-transform duration-200 hover:translate-x-1">
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
