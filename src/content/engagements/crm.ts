import type { Engagement } from "@/types/content";

/** "Selected Application Experience" — CRM entry, page 1 of the PDF. */
export const crm = {
  slug: "crm",
  title: "CRM Application",
  appType: "Web & Mobile",
  client: "Biztechnosys Infotech",
  period: "Nov 2025 - Aug 2026",
  summary:
    "End-to-end quality coverage for a customer relationship platform spanning customer management, lead tracking, sales pipelines and real-time interaction workflows — validated identically on desktop browsers and on Android and iOS devices.",
  testTypes: [
    "Functional",
    "Regression",
    "Smoke",
    "Sanity",
    "Exploratory",
    "Cross-Browser",
    "Mobile",
  ],
  scenarioCoverage: [
    "Positive",
    "Negative",
    "Boundary",
    "Validation",
    "Business Rule",
  ],
  responsibilities: [
    "Executed end-to-end functional, regression, smoke, sanity, and exploratory testing across customer management, lead tracking, sales pipelines, and real-time interaction workflows.",
  ],
  highlights: [
    "Authored and executed 100+ structured test cases, covering positive, negative, boundary, validation, and business-rule scenarios; logged defects, performed retesting, and verified fixes through release closure.",
    "Performed cross-browser and Android/iOS mobile testing to validate responsive layouts, navigation, touch interactions, data consistency, and behavior across varying screen sizes and devices.",
  ],
  order: 1,
} as const satisfies Engagement;
