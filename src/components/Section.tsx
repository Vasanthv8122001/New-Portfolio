import type { ReactNode } from "react";
import Reveal from "./Reveal";

// Centered section header (pill badge + large title), as in the reference design.
type SectionProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children: ReactNode;
  narrow?: boolean;
  className?: string;
};

export default function Section({ id, eyebrow, title, intro, children, narrow = false, className = "" }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`scroll-mt-16 py-20 sm:py-24 ${className}`}>
      <div className={`mx-auto w-full px-5 sm:px-8 ${narrow ? "max-w-5xl" : "max-w-6xl"}`}>
        <Reveal className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-4 inline-block rounded-full bg-accent-soft px-4 py-1 text-sm font-medium text-accent-text">{eyebrow}</p>
          <h2 id={`${id}-title`} className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">
            {title}
          </h2>
          <span aria-hidden="true" className="mx-auto mt-5 block h-1 w-16 rounded-full bg-gradient-to-r from-teal-400 via-sky-400 to-indigo-400" />
          {intro ? <p className="mt-4 text-muted">{intro}</p> : null}
        </Reveal>
        <div className="space-y-10">{children}</div>
      </div>
    </section>
  );
}
