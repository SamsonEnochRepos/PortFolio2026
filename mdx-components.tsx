import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h2: (p) => <h2 className="mb-3 mt-10 text-2xl font-semibold tracking-tight" {...p} />,
  p: (p) => <p className="my-4 leading-relaxed text-muted" {...p} />,
  ul: (p) => <ul className="my-4 list-disc space-y-1.5 pl-5 text-muted marker:text-accent" {...p} />,
  ol: (p) => <ol className="my-4 list-decimal space-y-1.5 pl-5 text-muted marker:text-accent" {...p} />,
  a: (p) => <a className="text-accent underline underline-offset-4" {...p} />,
  code: (p) => <code className="rounded bg-accent-soft px-1.5 py-0.5 font-mono text-[0.9em] text-fg" {...p} />,
  pre: (p) => (
    <pre
      className="my-6 overflow-x-auto rounded-xl border border-line bg-card p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0"
      {...p}
    />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
