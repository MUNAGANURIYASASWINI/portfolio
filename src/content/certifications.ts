import type { Certification } from "@/types/content";

/** "Certification" — page 2 of the PDF. The resume lists exactly one. */
export const certifications = [
  {
    title: "Prompt Engineering Fundamentals",
    issuer: "Anthropic",
    year: "2026",
  },
] as const satisfies readonly Certification[];
