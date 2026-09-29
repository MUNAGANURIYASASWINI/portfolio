import { Section } from "@/components/sections/Section";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuTag } from "@/components/ui/NeuTag";
import { certifications } from "@/content/certifications";
import { education } from "@/content/education";

export function Education() {
  return (
    <Section id="education" label="/05" title="Certification & Education">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NeuCard className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-text">
            Certification
          </h3>
          {certifications.map((c) => (
            <div key={c.title}>
              <p className="text-base text-ink">{c.title}</p>
              <p className="mt-1 text-sm text-ai">{c.issuer}</p>
              <p className="tag-mono mt-2 inline-block text-muted">{c.year}</p>
            </div>
          ))}
        </NeuCard>

        <NeuCard className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-text">
            Education
          </h3>
          <div>
            <p className="text-base text-ink">{education.degree}</p>
            <p className="mt-1 text-sm text-meta">{education.institution}</p>
            <p className="text-sm text-meta">{education.location}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <NeuTag accent>{education.score}</NeuTag>
              <NeuTag>{education.outcome}</NeuTag>
            </div>
          </div>
        </NeuCard>
      </div>
    </Section>
  );
}
