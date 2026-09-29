import { Section } from "@/components/sections/Section";
import { NeuMatrix } from "@/components/ui/NeuMatrix";
import { NeuMetric } from "@/components/ui/NeuMetric";
import { impactMetrics } from "@/content/impact";

export function Impact() {
  return (
    <Section id="impact" label="/01" title="Impact">
      {/* The six approved numbers. Nothing here is extrapolated — every
          value appears verbatim in the resume. */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {impactMetrics.map((m, i) => (
          <NeuMetric key={m.label} metric={m} index={i} />
        ))}
      </div>

      <div className="mt-12" data-reveal>
        <h3 className="text-xl text-ink">Test coverage by application</h3>
        <p className="mt-2 max-w-2xl text-sm text-meta">
          Every cell below is derived from the engagement records rather than
          hand-asserted, so the matrix cannot drift from the case studies it
          summarises.
        </p>
        <div className="mt-6">
          <NeuMatrix />
        </div>
      </div>
    </Section>
  );
}
