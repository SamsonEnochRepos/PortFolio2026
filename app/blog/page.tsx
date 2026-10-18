import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { notFound } from "next/navigation";
import { formatDate, posts } from "@/content/posts";
import { showWriting } from "@/content/site";

export const metadata: Metadata = { title: "Writing" };

export default function Blog() {
  if (!showWriting) notFound();
  return (
    <div className="mx-auto max-w-4xl pt-40 pb-10">
      <Reveal>
        <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">
          <span className="text-accent">05</span> / Writing
        </p>
        <h1 className="mb-12 text-5xl font-semibold tracking-tight sm:text-6xl">Notes &amp; essays</h1>
      </Reveal>
      <div className="divide-y divide-line border-y border-line">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.06}>
            <Link
              href={`/blog/${p.slug}`}
              className="group relative grid gap-2 px-2 py-7 transition-colors hover:bg-card-hover sm:grid-cols-[8rem_1fr_auto] sm:gap-6"
            >
              <span className="font-mono text-xs text-muted">{formatDate(p.date)}</span>
              <div>
                <h2 className="text-xl font-medium transition-transform duration-300 group-hover:translate-x-2">{p.title}</h2>
                <p className="mt-1 text-sm text-muted">{p.blurb}</p>
              </div>
              <ArrowUpRight className="size-5 text-muted transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
