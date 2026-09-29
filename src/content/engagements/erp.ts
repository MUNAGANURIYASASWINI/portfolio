import type { Engagement } from "@/types/content";

/** "Selected Application Experience" — ERP entry, page 1 of the PDF. */
export const erp = {
  slug: "erp",
  title: "ERP Application",
  appType: "Enterprise System",
  client: "Biztechnosys Infotech",
  period: "Nov 2025 - Aug 2026",
  summary:
    "Regression and functional assurance for an enterprise resource planning system, where a single workflow error carries operational cost across resource allocation, project tracking and employee management.",
  testTypes: ["Functional", "Regression"],
  scenarioCoverage: [
    "Business Rule",
    "Field Validation",
    "Workflow Dependency",
    "Role-Based Access",
    "Integration",
  ],
  responsibilities: [
    "Conducted end-to-end functional and regression testing across resource allocation, project tracking, employee management, and related enterprise workflows.",
  ],
  highlights: [
    "Validated complex business rules, field-level validations, workflow dependencies, and role-based access controls across different user roles and permissions.",
    "Performed integration validation between modules and verified backend data consistency using SQL queries, helping identify critical defects before client acceptance and production release.",
  ],
  order: 2,
} as const satisfies Engagement;
