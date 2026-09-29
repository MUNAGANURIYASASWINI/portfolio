import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  label: string;
  /** The visible h2. */
  title: string;
  children: ReactNode;
  className?: string;
};

/**
 * Shared section shell. Keeps one `<h1>` on the page and a clean
 * h1 -> h2 -> h3 hierarchy everywhere else, with each `<section>`
 * explicitly labelled for screen readers via `aria-labelledby`.
 */
export function Section({
  id,
  label,
  title,
  children,
  className = "",
}: SectionProps) {
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={`mx-auto w-full max-w-5xl px-6 py-16 sm:py-20 ${className}`}
    >
      <div className="mb-10">
        <p className="tag-mono text-muted">{label}</p>
        <h2
          id={headingId}
          data-reveal
          className="mt-2 text-3xl font-bold tracking-tight text-ink"
        >
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
