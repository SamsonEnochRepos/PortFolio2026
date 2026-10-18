import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function Section({
  id,
  index,
  label,
  action,
  children,
}: {
  id: string;
  index: string;
  label: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-14">
      <Reveal>
        <div className="mb-6 flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted">
          <span>
            <span className="text-accent">{index}</span> / {label}
          </span>
          {action}
        </div>
      </Reveal>
      {children}
    </section>
  );
}
