import { Trophy } from "lucide-react";
import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Magnetic } from "@/components/Magnetic";
import { MiniProfile } from "@/components/MiniProfile";
import { Pop } from "@/components/Pop";
import { Portrait } from "@/components/Portrait";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SpotlightCard } from "@/components/SpotlightCard";
import { formatDate, posts } from "@/content/posts";
import { achievements, education, hackathonWins, experience, projects, showWriting, site, skills } from "@/content/site";

const tones = ["orange", "blue", "lime", "violet", "pink"] as const;

export default function Home() {
  return (
    <div className="grid gap-10 lg:grid-cols-[22rem_minmax(0,1fr)] lg:gap-14">
      {/* profile card: static on desktop while the content scrolls past it */}
      <aside id="profile-card" className="pt-32 lg:sticky lg:top-28 lg:mt-36 lg:self-start lg:pt-0">
        <Portrait />
      </aside>

      <MiniProfile />

      <div className="min-w-0">
      <Hero />

      <Section id="projects" index="01" label="Projects">
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Section>

      <Section id="experience" index="02" label="Experience & Education">
        <Reveal>
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="text-[var(--orange)]">●</span> Experience
          </h3>
          <div className="spotlight divide-y divide-line overflow-hidden">
            {experience.map((e, i) => (
              <div
                key={e.org + e.role}
                className={`tone-${tones[i % 5]} group relative grid gap-1 px-6 py-5 transition-colors hover:bg-card-hover sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_9rem] sm:gap-6`}
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-[var(--tbg)] transition-all duration-300 group-hover:w-2" />
                <div>
                  <div className="font-medium transition-transform duration-300 group-hover:translate-x-1">{e.org}</div>
                  <div className="text-sm text-muted">{e.role}</div>
                </div>
                <p className="text-sm leading-relaxed text-muted">{e.note}</p>
                <span className="font-mono text-xs font-medium text-[var(--tink)] sm:text-right">{e.period}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.08} className="mt-10">
          <h3 className="mb-3 font-mono text-xs uppercase tracking-widest text-muted">
            <span className="text-[var(--violet)]">●</span> Education
          </h3>
          <div className="spotlight divide-y divide-line overflow-hidden">
            {education.map((e, i) => (
              <div
                key={e.org + e.role}
                className={`tone-${tones[(i + 3) % 5]} group relative grid gap-1 px-6 py-6 sm:items-center transition-colors hover:bg-card-hover sm:grid-cols-[minmax(0,1fr)_minmax(0,2fr)_9rem] sm:gap-6`}
              >
                <span className="absolute inset-y-0 left-0 w-1 bg-[var(--tbg)] transition-all duration-300 group-hover:w-2" />
                <div>
                  <div className="font-medium transition-transform duration-300 group-hover:translate-x-1">{e.org}</div>
                  <div className="text-sm text-muted">{e.role}</div>
                </div>
                <p className="text-sm leading-relaxed text-muted">{e.note}</p>
                <span className="font-mono text-xs font-medium text-[var(--tink)] sm:text-right">{e.period}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section
        id="achievements"
        index="03"
        label="Achievements & Hackathons"
        action={
          <span className="normal-case tracking-normal">
            <span className="rounded-full bg-[var(--orange)] px-2.5 py-0.5 font-semibold text-white">{hackathonWins}</span> hackathon winner
          </span>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {achievements.map((a, i) => (
            <Reveal key={a.event} delay={(i % 2) * 0.08} className={a.featured ? "sm:col-span-2" : ""}>
              <SpotlightCard className={`tile tone-${a.featured ? "orange" : tones[(i % 4) + 1]} group flex h-full flex-col justify-between ${a.featured ? "min-h-56 p-8" : "min-h-44 p-6"}`}>
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-widest">
                  <span className="rounded-full bg-[var(--tfg)] px-2.5 py-0.5 text-[var(--tbg)]">{a.tag}</span>
                  <Trophy className="size-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-125" />
                </div>
                <div className="mt-8">
                  <h3
                    className={`font-semibold tracking-tight ${a.featured ? "text-4xl sm:text-5xl" : "text-xl"}`}
                  >
                    {a.result}
                  </h3>
                  <p className="mt-1 text-sm opacity-75">{a.event}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section id="skills" index="04" label="Skills & Stack">
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(skills).map(([group, items], i) => (
            <Reveal key={group} delay={i * 0.06}>
              <SpotlightCard className={`tile tone-${tones[i % 5]} h-full p-6`}>
                <h3 className="mb-4 font-mono text-xs uppercase tracking-widest opacity-80">{group}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((s, j) => (
                    <Pop as="span" key={s} delay={j * 0.045} from={0.4}
                      className="rounded-full bg-[color-mix(in_oklch,var(--tfg)_16%,transparent)] px-3 py-1 text-sm font-medium transition-[translate,background-color,color] duration-200 hover:-translate-y-0.5 hover:bg-[var(--tfg)] hover:text-[var(--tbg)]"
                    >
                      {s}
                    </Pop>
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </Section>

      {showWriting && (
      <Section
        id="writing"
        index="05"
        label="Writing"
        action={
          <Link href="/blog" className="transition-colors hover:text-accent">
            All essays →
          </Link>
        }
      >
        <div className="divide-y divide-line border-y border-line">
          {posts.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.06}>
              <Link
                href={`/blog/${p.slug}`}
                className="group grid gap-2 px-2 py-6 transition-colors hover:bg-card-hover sm:grid-cols-[8rem_1fr_auto] sm:gap-6"
              >
                <span className="font-mono text-xs text-muted">{formatDate(p.date)}</span>
                <div>
                  <h3 className="font-medium transition-transform duration-300 group-hover:translate-x-2">{p.title}</h3>
                  <p className="mt-1 text-sm text-muted">{p.blurb}</p>
                </div>
                <span className="font-mono text-xs text-muted">{p.read}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
      )}

      <Section id="contact" index={showWriting ? "06" : "05"} label="Contact">
        <Reveal>
          <SpotlightCard className="tile tone-orange flex flex-col items-start gap-8 p-8 sm:p-12">
            <h2 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Let&apos;s build something worth shipping.
            </h2>
            <Magnetic>
              <a
                href={`mailto:${site.email}`}
                className="inline-block rounded-full bg-[var(--tfg)] px-7 py-3.5 text-sm font-semibold text-[var(--tbg)] transition-transform hover:scale-105"
              >
                {site.email}
              </a>
            </Magnetic>
          </SpotlightCard>
        </Reveal>
      </Section>
      </div>
    </div>
  );
}
