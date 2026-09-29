import Link from "next/link";

import { ArrowRightIcon } from "@/components/icons";
import { Section } from "@/components/sections/Section";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuTag } from "@/components/ui/NeuTag";
import { engagements } from "@/content/engagements";

/**
 * Preview cards. All four carry the same client name, stated plainly —
 * the honest framing is depth across four domains at one employer, and
 * hiding that would misrepresent the record.
 */
export function Engagements() {
  return (
    <Section
      id="engagements"
      label="/04"
      title="Application Experience"
    >
      <p className="-mt-4 max-w-2xl text-sm text-meta">
        Four enterprise applications tested at Biztechnosys Infotech between
        November 2025 and August 2026. Select one for the full case study.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {engagements.map((e, i) => (
          <NeuCard
            key={e.slug}
            as="article"
            interactive
            className="group flex flex-col gap-4"
          >
            <div data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl text-ink">{e.title}</h3>
                  <p className="mt-1 text-sm text-meta">{e.appType}</p>
                </div>
{/* No period badge: all four engagements share the same dates, so
                    repeating it four times is pure noise. The full
                    period appears on each case-study page. */}
              </div>

              <p className="mt-4 text-sm leading-relaxed text-body">{e.summary}</p>
            </div>

            <ul className="flex flex-wrap gap-2">
              {e.testTypes.slice(0, 5).map((t) => (
                <li key={t}>
                  <NeuTag>{t}</NeuTag>
                </li>
              ))}
              {e.testTypes.length > 5 && (
                <li>
                  <NeuTag accent>+{e.testTypes.length - 5}</NeuTag>
                </li>
              )}
            </ul>

            <Link
              href={`/work/${e.slug}/`}
              className="mt-auto inline-flex min-h-11 items-center gap-1.5 self-start
                         rounded-md px-2 text-sm font-medium text-accent-text no-underline
                         transition-transform duration-150 group-hover:translate-x-0.5"
            >
              Read case study
              <ArrowRightIcon size={14} />
              <span className="sr-only"> for {e.title}</span>
            </Link>
          </NeuCard>
        ))}
      </div>
    </Section>
  );
}
