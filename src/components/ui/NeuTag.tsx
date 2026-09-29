import type { ReactNode } from "react";

type NeuTagProps = {
  children: ReactNode;
  className?: string;
  /** Accent variant for a tag that marks something notable. */
  accent?: boolean;
};

/**
 * DEBOSSED, not raised — the counter-intuitive and important call.
 *
 * The resume yields ~40 skills plus per-engagement tags. Raised pills at
 * that density is "shadow soup": sixty extruded objects shred the surface
 * and the material illusion dies. Inset tags read as labels milled INTO
 * the material — calm, dense, scannable — and they make the raised cards
 * pop by contrast.
 *
 * Radius is `pill`, which is safe here because the inset shadow's 4px
 * offset is well under the radius.
 */
export function NeuTag({ children, className = "", accent = false }: NeuTagProps) {
  return (
    <span
      className={`neu-inset tag-mono inline-flex items-center rounded-pill px-2.5 h-6 ${
        accent ? "text-accent-text" : "text-body"
      } ${className}`}
    >
      {children}
    </span>
  );
}
