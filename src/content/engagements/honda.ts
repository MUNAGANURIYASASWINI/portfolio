import type { Engagement } from "@/types/content";

/** "Selected Application Experience" — Honda entry, page 1 of the PDF. */
export const honda = {
  slug: "honda",
  title: "Honda Enterprise Web Application",
  appType: "Enterprise Web",
  client: "Biztechnosys Infotech",
  period: "Nov 2025 - Aug 2026",
  summary:
    "Release-gate testing for an enterprise web application, prioritising high-risk workflows under compressed delivery timelines and holding defects through triage to deployment.",
  testTypes: ["Functional", "Regression", "Smoke", "Sanity", "Exploratory"],
  scenarioCoverage: ["Release Readiness", "User Journey", "Acceptance Criteria"],
  responsibilities: [
    "Performed end-to-end manual testing of core business workflows for an enterprise web application, validating functional requirements against expected user journeys and acceptance criteria.",
  ],
  highlights: [
    "Executed release-readiness, sanity, regression, and exploratory testing under tight delivery timelines, prioritizing high-risk workflows and verifying critical fixes before deployment.",
    "Collaborated with developers and project stakeholders during defect triage, reproducing issues with detailed test evidence and validating resolved defects against expected behavior.",
  ],
  order: 3,
} as const satisfies Engagement;
