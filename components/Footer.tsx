import Link from "next/link";
import { showWriting, site } from "@/content/site";
import { StatusStrip } from "./StatusStrip";
import { ThemeSwitch } from "./ThemeSwitch";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 pb-28 pt-10 lg:pb-10">
        <div className="flex flex-wrap items-start justify-between gap-8">
          <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-muted">
            <Link href="/#projects" className="hover:text-fg">Projects</Link>
            <Link href="/#experience" className="hover:text-fg">Experience</Link>
            {showWriting && (
              <Link href="/blog" className="hover:text-fg">Writing</Link>
            )}
            <Link href="/uses" className="hover:text-fg">Uses</Link>
            {site.socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {s.label}
              </a>
            ))}
          </div>
          <ThemeSwitch />
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <StatusStrip />
          <span className="font-mono text-xs text-muted">© {new Date().getFullYear()} {site.name}</span>
        </div>
      </div>
    </footer>
  );
}
