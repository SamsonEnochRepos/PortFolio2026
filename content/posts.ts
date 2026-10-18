// PLACEHOLDER POSTS — each slug needs a matching file in content/posts/<slug>.mdx
export const posts = [
  {
    slug: "building-fast-ui",
    title: "Building interfaces that feel instant",
    date: "2026-09-12",
    read: "5 min",
    blurb: "Perceived performance tricks that matter more than raw benchmarks.",
  },
  {
    slug: "rag-in-practice",
    title: "RAG in practice: what actually moves the needle",
    date: "2026-08-03",
    read: "7 min",
    blurb: "Chunking, reranking and evals, ranked by impact.",
  },
  {
    slug: "why-i-use-rust",
    title: "Why a web developer picked up Rust",
    date: "2026-06-21",
    read: "4 min",
    blurb: "Notes from rewriting a slow service and what I learned.",
  },
];

export type Post = (typeof posts)[number];

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
