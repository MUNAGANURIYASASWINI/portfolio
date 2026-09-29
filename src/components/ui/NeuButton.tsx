import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type NeuButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

/**
 * The tactile press IS the interaction design language of this site, and
 * it is two declarations: swap the raised shadow for the inset one on
 * :active, and nudge the scale. No JavaScript, stays on the compositor.
 *
 * `.neu-sm` keeps the forced-colors fallback able to strip the shadow.
 * Every variant carries the interactive hairline border, because a
 * neumorphic shadow measures only ~1.4-1.6:1 against the base and can
 * never satisfy WCAG 1.4.11's 3:1 requirement for UI boundaries.
 */
const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-accent text-on-accent border border-line-strong/50 hover:brightness-110",
  secondary:
    "bg-raised text-accent-text border border-line-strong/60 hover:text-accent hover:shadow-neu-hover",
  ghost:
    "bg-transparent text-accent-text border border-line-strong/40 hover:bg-accent-wash",
};

const BASE =
  "neu-sm btn-glow inline-flex items-center justify-center gap-2 rounded-md px-5 min-h-11 " +
  "font-medium text-[0.9375rem] no-underline cursor-pointer select-none " +
  "shadow-neu-sm transition-[box-shadow,transform,background-color,color] duration-150 ease-soft " +
  "active:shadow-neu-inset active:translate-y-px";

export function NeuButton({
  children,
  href,
  variant = "secondary",
  className = "",
  external = false,
  ariaLabel,
  onClick,
  type = "button",
}: NeuButtonProps) {
  const classes = `${BASE} ${VARIANTS[variant]} ${className}`;

  // data-magnetic opts into the animejs magnetic pull (motion island).
  // translate (Tailwind hovers) and transform (anime x/y) are separate
  // properties, so they compose instead of fighting.
  if (href) {
    if (external) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={classes}
          data-magnetic=""
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={classes} data-magnetic="">
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      aria-label={ariaLabel}
      className={classes}
      data-magnetic=""
      onClick={onClick}
    >
      {children}
    </button>
  );
}
