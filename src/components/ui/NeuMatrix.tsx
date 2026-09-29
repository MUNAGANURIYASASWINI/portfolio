import { CheckIcon, CrossIcon } from "@/components/icons";
import { engagements } from "@/content/engagements";
import type { TestType } from "@/types/content";

/** The nine test types named in the resume's "Testing" skills group. */
const ALL_TEST_TYPES = [
  "Functional",
  "Regression",
  "Smoke",
  "Sanity",
  "Exploratory",
  "Cross-Browser",
  "Mobile",
  "API",
  "LLM",
] as const satisfies readonly TestType[];

const SHORT: Partial<Record<TestType, string>> = {
  "Cross-Browser": "Browser",
};

/**
 * The coverage matrix — this portfolio's centrepiece for credibility.
 *
 * A QA portfolio is judged on evidence, and the resume's evidence is
 * STRUCTURAL: which test types were applied to which application. The
 * matrix makes that visible, and every cell is derived from the
 * engagement data rather than hand-asserted, so it cannot drift from
 * the content.
 *
 * A real <table> with scoped headers is used deliberately: it is the
 * only construct that gives screen readers the row/column association
 * this information depends on.
 *
 * Cells are DEBOSSED (inset). Fifty inset cells read as a milled
 * surface; fifty raised ones would be shadow soup.
 */
export function NeuMatrix() {
  return (
    <div className="neu matrix overflow-hidden rounded-xl bg-raised shadow-neu">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[38rem] border-collapse">
          <caption className="sr-only">
            Test type coverage across the four applications tested at
            Biztechnosys Infotech, between November 2025 and August 2026.
          </caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-meta"
              >
                Test type
              </th>
              {engagements.map((e) => (
                <th
                  key={e.slug}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-ink"
                >
                  {SHORT[e.title as keyof typeof SHORT] ?? e.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ALL_TEST_TYPES.map((t) => (
              <tr key={t} className="border-t border-line/60">
                <th
                  scope="row"
                  className="whitespace-nowrap px-4 py-2.5 text-left text-sm text-body"
                >
                  {t}
                </th>
                {engagements.map((e, ci) => {
                  // `as const` narrows testTypes to a literal tuple, so
                  // `.includes()` would only accept that one member.
                  const covered = (e.testTypes as readonly TestType[]).includes(t);
                  // data-col drives the pure-CSS :has() column highlight.
                  return (
                    <td key={e.slug} className="px-4 py-2.5">
                      <span
                        data-col={ci}
                        className="neu-inset grid h-7 w-7 place-items-center rounded-md"
                        title={
                          covered
                            ? `${t} applied to ${e.title}`
                            : `${t} not listed for ${e.title}`
                        }
                      >
                        {covered ? (
                          <CheckIcon
                            size={14}
                            className="text-quality"
                          />
                        ) : (
                          <CrossIcon size={12} className="text-muted/50" />
                        )}
                      </span>
                      <span className="sr-only">
                        {covered ? "Applied" : "Not listed"}
                      </span>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
