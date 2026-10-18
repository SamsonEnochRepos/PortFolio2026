# Changelog

All notable changes to this project are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added
- Next.js 16 (App Router) + TypeScript + Tailwind v4 portfolio scaffold with Framer Motion, GSAP, Lenis, cmdk, next-themes and MDX.
- Dark-first design with a System / Dark / Light theme switcher (default: system).
- Floating magnifying dock nav, animated preloader, word-reveal hero, tech marquee.
- Ctrl/Cmd+K terminal-style command palette (navigation, theme, copy email, `sudo hire-me`, `matrix`, `whoami`).
- Spotlight/tilt project cards with hover reveal of stack and metrics.
- Hero photo card (`components/Portrait.tsx`, `public/images/blue.jpg`): inverted card (light on dark theme, dark on light theme) with a framed portrait, spinning dashed orange and blue arcs, flame badge, social icons and 3D cursor tilt.
- Vibrant, theme-adaptive colour system: orange, lime, blue, pink and violet tones that shift between dark and light themes; solid colour tiles for achievements, skills, uses and contact; tinted gradient project cards with a coloured top bar; coloured experience bars and period labels; soft colour glows behind the hero.
- Hero stat counters (hackathons won, internships, projects shipped) that count up on view (`components/CountUp.tsx`).
- Sections for projects, experience/education, skills, writing and contact; MDX blog (`/blog`, `/blog/[slug]`) and a Uses page (`/uses`), all with placeholder content in `content/`.
- Footer status strip with live Chennai time, uptime counter and Chennai weather (Open-Meteo, cached per session).
- `.claude/launch.json` dev server config.

- Real projects from GitHub in the Projects section: CellIntel, SecureWipe (public edition), SecureWipe MicroSD, VISOR, plus EV AI, Write Right AI and Custom CLM as "Soon" placeholders; CellIntel is a featured two-column card, cards open the repo in a new tab.

- Real identity and skills from the GitHub profile README (name, role, email, GitHub and LinkedIn links, skills grouped by Languages / AI-ML / Web / Cloud).

- Experience (Freelance, IGME, Zoho Middle East, Nissan Middle East), Education (St. Joseph's College of Engineering) and an Achievements & Hackathons section (SIH 2025 National Winner, HackIndia Spark 1 Winner, HackIndia National Finalist 2nd Runner-Up, Google DevFest on Campus and Cyberthon 2025 Special Mentions, plus a "6x hackathon winner" badge), sourced from the LinkedIn profile PDF and your list.
- Custom CLM project card now describes the IGME Contract Lifecycle Management system.

- Two-column home layout: the profile card stays pinned on the left (sticky from `lg` up) while hero, projects, experience, achievements, skills, writing and contact scroll on the right; the card's dashed arcs rotate with scroll and the card tilts toward the cursor. Stacks on mobile.

### Removed
- Writing is hidden for now via `showWriting = false` in `content/site.ts` (home section, dock, footer, command palette and `/blog` routes return 404); set it to `true` when articles are ready.
- Custom cursor ring, "blueprint" grid lens and x/y coordinate readout; the native cursor is used everywhere.

### Changed
- Page container widened to `max-w-6xl`; blog and Uses pages keep a narrower `max-w-4xl` column. Hero social icons removed (they live on the profile card).
- Accent colour changed from violet to orange (matches the portrait's lenses); added an `--on-accent` token so text on accent surfaces stays readable in both themes.
- Dock sized down on small screens so it fits a 375px viewport without horizontal scroll.
- Replaced the earlier orange-sunglasses portrait (`portrait.png`) with the blue portrait; hero converted to a two-column layout (text left, portrait right; stacked on mobile).

### Fixed
- Education block: heading moved out of the card (with a matching "Experience" heading), rows vertically centred and given even padding.
- Preloader now has a failsafe timeout so it can never stay on screen if animation frames are paused.
- Experience rows no longer overlap columns at narrow widths.
