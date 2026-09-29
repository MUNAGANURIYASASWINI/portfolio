import { AlertIcon, CheckIcon, ClockIcon, ShieldIcon } from "@/components/icons";
import { Section } from "@/components/sections/Section";
import { NeuStep, type Step } from "@/components/ui/NeuStep";
import { experience } from "@/content/experience";

/** The defect lifecycle, taken from the resume's "logged, retested, and
 *  verified defects through release closure" and "verifying critical
 *  fixes before deployment". */
const DEFECT_LIFECYCLE: readonly Step[] = [
  {
    label: "Logged",
    detail: "Reported with reproduction steps and test evidence",
    icon: <AlertIcon size={14} />,
  },
  {
    label: "Retested",
    detail: "Re-executed against the fix during the same cycle",
    icon: <ClockIcon size={14} />,
  },
  {
    label: "Verified",
    detail: "Validated against expected behaviour with developers",
    icon: <CheckIcon size={14} />,
  },
  {
    label: "Closed",
    detail: "Signed off through release closure before deployment",
    icon: <ShieldIcon size={14} />,
  },
];

export function Experience() {
  return (
    <Section id="experience" label="/02" title="Professional Experience">
      <div className="neu rounded-xl bg-raised p-6 shadow-neu sm:p-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <div>
            <h3 className="text-xl text-ink">{experience.title}</h3>
            <p className="mt-1 text-sm text-meta">{experience.company}</p>
          </div>
          <p className="tag-mono text-muted">
            {experience.period} · {experience.location}
          </p>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {experience.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-body">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10" data-reveal>
        <h3 className="text-xl text-ink">Defect lifecycle</h3>
        <p className="mt-2 max-w-2xl text-sm text-meta">
          Defects were tracked from first report through to release closure,
          with retesting and verification performed alongside developers
          rather than handed off.
        </p>
        <div className="mt-6">
          <NeuStep steps={DEFECT_LIFECYCLE} />
        </div>
      </div>
    </Section>
  );
}
