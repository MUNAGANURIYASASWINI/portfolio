import type { Metric } from "@/types/content";

/**
 * The ONLY numbers permitted on this site.
 *
 * Every value below appears verbatim in Yashu_Resume.pdf. Nothing is
 * extrapolated, annualised, or inferred. If the resume does not state
 * a number, it does not go here.
 */
export const impactMetrics = [
  {
    value: "33%",
    label: "Merit-based increase",
    detail: "Recognised within 7 months for QA delivery and prompt-engineering contributions",
    kind: "impact",
    icon: "spark",
    countup: { to: 33, prefix: "", suffix: "%" },
  },
  {
    value: "250+",
    label: "Test cases per sprint",
    detail: "Manual and API, across CRM, ERP, enterprise and AI applications",
    kind: "volume",
    icon: "gauge",
    countup: { to: 250, prefix: "", suffix: "+" },
  },
  {
    value: "30%+",
    label: "Fewer post-release defects",
    detail: "Through structured functional, regression, smoke, sanity and exploratory testing",
    kind: "quality",
    icon: "shield",
    countup: { to: 30, prefix: "", suffix: "%+" },
  },
  {
    value: "100+",
    label: "Structured test cases",
    detail: "Authored and executed for the CRM application across six scenario classes",
    kind: "volume",
    icon: "target",
    countup: { to: 100, prefix: "", suffix: "+" },
  },
  {
    value: "4",
    label: "Enterprise applications",
    detail: "CRM, ERP, Honda enterprise web, and corporate portal with AI chatbot",
    kind: "impact",
    icon: "layers",
  },
  {
    value: "~1 yr",
    label: "Professional QA experience",
    detail: "Manual, Selenium automation, REST API, SQL backend and AI/LLM testing",
    kind: "volume",
    icon: "check",
  },
] as const satisfies readonly Metric[];
