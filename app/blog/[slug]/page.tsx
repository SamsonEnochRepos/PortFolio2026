import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, posts } from "@/content/posts";
import { showWriting } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return { title: post?.title, description: post?.blurb };
}

export default async function Post({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!showWriting || !post) notFound();
  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);

  return (
    <article className="mx-auto max-w-2xl pt-40 pb-10">
      <Link href="/blog" className="mb-10 inline-flex items-center gap-2 font-mono text-xs text-muted hover:text-accent">
        <ArrowLeft className="size-3.5" /> all writing
      </Link>
      <p className="font-mono text-xs text-muted">
        {formatDate(post.date)} · {post.read}
      </p>
      <h1 className="mt-3 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">{post.title}</h1>
      <div className="mt-8">
        <Content />
      </div>
    </article>
  );
}
