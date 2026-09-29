import { Section } from "@/components/sections/Section";
import { NeuCard } from "@/components/ui/NeuCard";
import { NeuTag } from "@/components/ui/NeuTag";
import { skillGroups } from "@/content/skills";

export function Skills() {
  return (
    <Section id="skills" label="/03" title="Technical Skills">
      <div
        data-anime="stagger"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        {skillGroups.map((group, gi) => (
          <NeuCard key={group.id} className="flex flex-col gap-4">
            <h3
              data-reveal
              style={{ "--reveal-i": gi } as React.CSSProperties}
              className="text-sm font-semibold uppercase tracking-wider text-accent-text"
            >
              {group.label}
            </h3>
            {/* Tags are DEBOSSED. At ~40 skills a raised pill would be
                shadow soup and the material illusion would collapse. */}
            <ul className="flex flex-wrap gap-2">
              {group.skills.map((s) => (
                <li key={s}>
                  <NeuTag>{s}</NeuTag>
                </li>
              ))}
            </ul>
          </NeuCard>
        ))}
      </div>
    </Section>
  );
}
