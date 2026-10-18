// PLACEHOLDER CONTENT — swap these values with your own.
export const site = {
  name: "Samson Enoch",
  role: "AI Engineer & Full-Stack Developer",
  location: "Chennai, India",
  email: "samson6906@gmail.com",
  headline: "I build software that thinks, ships and scales.",
  intro:
    "Freelance full-stack developer in Chennai. 6x hackathon winner and SIH 2025 National Winner, with production software shipped during internships at Zoho Middle East, Nissan Middle East and IGME in Dubai.",
  launch: "2026-10-18T00:00:00+05:30",
  socials: [
    { label: "GitHub", href: "https://github.com/SamsonEnochRepos" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/samsonenochpj/" },
    { label: "X", href: "https://x.com/" },
  ],
};

/** Flip to true once you have articles: shows the home section, nav links and /blog routes. */
export const showWriting = false;

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  year: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  href: string;
  featured?: boolean;
  /** "soon" = repo is private/empty or details not written yet */
  status?: "soon";
};

const gh = (repo: string) => `https://github.com/SamsonEnochRepos/${repo}`;

export const projects: Project[] = [
  {
    slug: "cellintel",
    title: "CellIntel — CDR & Tower Dump Analysis",
    blurb:
      "A prototype for law-enforcement analysts that ingests call detail records and tower dumps, then maps movement, builds contact graphs and offers advanced filtering and phone lookups. Branded for Tamil Nadu Police.",
    year: "2026",
    stack: ["Python", "Flask", "PostgreSQL", "pandas", "NetworkX", "Leaflet", "ECharts", "Cytoscape.js"],
    metrics: [{ label: "License", value: "MIT" }, { label: "Stars", value: "1" }],
    href: gh("CELLINTEL"),
    featured: true,
  },
  {
    slug: "securewipe",
    title: "SecureWipe — Public Edition",
    blurb:
      "A learning-focused secure-erase tool with block-device detection, signed hash-chained wipe certificates (PDF, JSON, QR) and a Flask verification portal. The erase step is simulated, so it is safe to demo.",
    year: "2026",
    stack: ["Python", "Tkinter", "Flask", "RSA-2048", "SHA-256", "ReportLab"],
    metrics: [{ label: "Certificates", value: "RSA-signed" }, { label: "Stars", value: "2" }],
    href: gh("SecureWipe"),
  },
  {
    slug: "securewipe-microsd",
    title: "SecureWipe — MicroSD",
    blurb:
      "A command-line utility that securely erases files and removable media such as MicroSD cards with multi-pass random and zero overwrites, confirmation gates and progress tracking.",
    year: "2026",
    stack: ["Python", "CLI", "Forensics"],
    metrics: [{ label: "Overwrite", value: "multi-pass" }, { label: "Stars", value: "2" }],
    href: gh("SecureWipe_MicroSD"),
  },
  {
    slug: "visor",
    title: "VISOR — Touchless Windows Control",
    blurb:
      "Operate Windows with hand gestures and offline voice commands, with no keyboard, mouse or cloud. Runs from the system tray with a transparent HUD overlay and hot-reloading config.",
    year: "2026",
    stack: ["Python", "MediaPipe", "Vosk", "PyAutoGUI", "PyAudio"],
    metrics: [{ label: "Voice", value: "100% offline" }, { label: "Stars", value: "1" }],
    href: gh("Visor"),
  },
  {
    slug: "ev-ai",
    title: "EV AI",
    blurb: "Work in progress. Full write-up coming soon.",
    year: "2026",
    stack: ["AI"],
    metrics: [],
    href: gh("EV-AI"),
    status: "soon",
  },
  {
    slug: "write-right-ai",
    title: "Write Right AI",
    blurb: "Work in progress. Full write-up coming soon.",
    year: "2026",
    stack: ["AI"],
    metrics: [],
    href: "https://github.com/SamsonEnochRepos",
    status: "soon",
  },
  {
    slug: "custom-clm",
    title: "Custom CLM — Contract Lifecycle Management",
    blurb:
      "An enterprise Contract Lifecycle Management system built during my internship at IGME Information Technology, Dubai, with workflow automation, dashboards, authentication and database management.",
    year: "2026",
    stack: ["Full-stack", "Workflow automation", "Dashboards", "Auth", "Database design"],
    metrics: [{ label: "Built at", value: "IGME" }, { label: "Location", value: "Dubai" }],
    href: "#experience",
  },
];

export const experience = [
  {
    org: "Freelance",
    role: "Full-Stack Web Developer",
    period: "Ongoing",
    note: "Chennai · Building, fixing and maintaining fast, professional websites and web apps for businesses.",
  },
  {
    org: "IGME Information Technology",
    role: "Project Developer",
    period: "Jun 2026 — Jul 2026",
    note: "Dubai, UAE · Built enterprise IT solutions including a Contract Lifecycle Management (CLM) system and an IT Help Desk platform: scalable full-stack apps, workflow automation, dashboards, authentication and database management.",
  },
  {
    org: "Zoho Middle East & North Africa",
    role: "Low Code Developer (Intern)",
    period: "Jun 2025",
    note: "Dubai, UAE · Built a full School Management System in Zoho Creator with role-based dashboards, automated workflows (emails, attendance, approvals) and real-time transport tracking, using Deluge scripting.",
  },
  {
    org: "Nissan Middle East",
    role: "Frontend Developer (Intern)",
    period: "Jul 2024 — Aug 2024",
    note: "Dubai, UAE · Developed static HTML pages with JavaScript and created a new SharePoint site for the ISIT division.",
  },
];

export const education = [
  {
    org: "St. Joseph's College of Engineering",
    role: "Engineering student",
    period: "2024 — 2028",
    note: "Chennai, Tamil Nadu, India",
  },
];

export const hackathonWins = "6×";

export const achievements = [
  { event: "Smart India Hackathon 2025", result: "National Winner", tag: "SIH 2025", featured: true },
  { event: "HackIndia Spark 1", result: "Winner", tag: "Winner" },
  { event: "HackIndia", result: "National Finalist · 2nd Runner-Up", tag: "National" },
  { event: "Google DevFest on Campus", result: "Special Mention", tag: "Mention" },
  { event: "Cyberthon 2025", result: "Special Mention", tag: "Mention" },
];

export const skills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "Java", "SQL", "Deluge"],
  "AI / ML": ["PyTorch", "TensorFlow", "Computer Vision", "MLOps", "Intelligent automation"],
  Web: ["React", "Next.js", "Electron.js", "Tailwind", "Flask", "Django"],
  "Cloud & Tooling": ["Docker", "Linux Server", "PostgreSQL", "AWS", "Firebase", "Supabase", "Zoho Creator", "SharePoint"],
};

export const uses = [
  { group: "Hardware", items: ["Laptop — add yours", "Monitor — add yours", "Keyboard — add yours"] },
  { group: "Editor & Terminal", items: ["VS Code / Cursor", "Windows Terminal", "Geist Mono"] },
  { group: "Daily Software", items: ["Claude", "Figma", "Notion", "Linear"] },
];
