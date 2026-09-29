import type { ReactNode } from "react";

export type Step = {
  label: string;
  detail: string;
  icon: ReactNode;
};

type NeuStepProps = {
  steps: readonly Step[];
};

/**
 * The defect lifecycle, rendered as raised -> inset steps.
 *
 * Source: the resume's "logged, retested, and verified defects through
 * release closure" and "verifying critical fixes before deployment".
 * The final step is inset (debossed) to signal terminal state — the
 * defect is closed, milled into the record.
 */
export function NeuStep({ steps }: NeuStepProps) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <li key={step.label} className="flex flex-1 items-center gap-3">
            <div
              className={`neu flex-1 rounded-lg p-3 ${
                isLast ? "neu-inset" : "shadow-neu-sm"
              }`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-xs font-semibold ${
                    isLast ? "bg-inset text-quality" : "bg-inset text-accent-text"
                  }`}
                >
                  {i + 1}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className={isLast ? "text-quality" : "text-accent-text"}>
                    {step.icon}
                  </span>
                  <span className="text-sm text-ink">{step.label}</span>
                </span>
              </div>
              <p className="mt-2 text-xs text-meta">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
