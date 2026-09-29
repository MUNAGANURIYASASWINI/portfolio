import type { Education } from "@/types/content";

/**
 * "Education" — page 2 of the PDF.
 *
 * NOTE: the PDF lists no coursework. None is invented here.
 */
export const education = {
  degree: "Bachelor of Technology (B.Tech)",
  institution: "Kallam Haranadhareddy Institute of Technology",
  location: "Guntur, Andhra Pradesh",
  outcome: "Graduated 2025",
  score: "CGPA: 8.46/10.0",
} as const satisfies Education;
