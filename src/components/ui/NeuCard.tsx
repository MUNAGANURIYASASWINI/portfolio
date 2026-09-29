import type { ReactNode } from "react";

type NeuCardProps = {
  children: ReactNode;
  className?: string;
  /** Set true when the card is a link/clickable target — adds the hairline
   *  border required by WCAG 1.4.11, which shadows alone can never meet. */
  interactive?: boolean;
  as?: "div" | "article" | "section" | "li";
  id?: string;
  /** Opt into the scroll-reveal system. `index` staggers via --reveal-i. */
  reveal?: number;
  /**
   * Saturated accent bar across the card top (decorative only).
   * Pass a CSS color, e.g. an engagement strip var. Sits inside the
   * padding at inset-x-6, where the card edge is flat, so it never
   * fights the 24px corner radius.
   */
  bar?: string;
};

/**
 * Raised surface — the primary content container.
 *
 * Uses the `.neu` class so the forced-colors fallback can strip the
 * shadow and restore a real border. Radius is `rounded-xl` (24px)
 * because the 6px shadow offset demands radius >= 2x offset.
 */
export function NeuCard({
  children,
  className = "",
  interactive = false,
  as: Tag = "div",
  id,
  reveal,
  bar,
}: NeuCardProps) {
  const base =
    "neu relative bg-raised rounded-xl p-6 transition-[box-shadow,transform,scale] duration-200 ease-soft";

  const interactiveStyles = interactive
    ? "neu-interactive shadow-neu border border-line-strong/60 hover:shadow-neu-hover hover:-translate-y-0.5 focus-within:ring-neu"
    : "shadow-neu";

  return (
    <Tag
      id={id}
      {...(reveal !== undefined ? { "data-reveal": "" } : {})}
      {...(interactive ? { "data-tilt": "" } : {})}
      style={
        reveal !== undefined
          ? ({ "--reveal-i": reveal } as React.CSSProperties)
          : undefined
      }
      className={`${base} ${interactiveStyles} ${className}`}
    >
      {bar ? (
        <span
          aria-hidden="true"
          className="absolute inset-x-6 top-0 h-1 rounded-full"
          style={{ background: bar }}
        />
      ) : null}
      {children}
    </Tag>
  );
}
