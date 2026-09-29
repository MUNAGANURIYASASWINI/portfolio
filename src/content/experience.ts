import type { Experience } from "@/types/content";

/** "Professional Experience" — page 1 of the PDF, verbatim. */
export const experience = {
  title: "Quality Analyst",
  company: "Biztechnosys Infotech Private Limited",
  location: "Bangalore, India",
  period: "Nov 2025 - Aug 2026",
  bullets: [
    "Earned a 33% merit-based salary increase within 7 months for QA delivery, defect detection accuracy, and prompt-engineering contributions.",
    "Executed 250+ manual and API test cases per sprint across CRM, ERP, enterprise client, and AI applications, contributing to a 30%+ reduction in post-release defects through structured functional, regression, smoke, sanity, and exploratory testing.",
    "Automated critical regression workflows using Selenium WebDriver, Java, TestNG, Maven, and POM, improving repeatability and regression coverage.",
    "Validated REST APIs for the internal AI Bot with Postman, covering HTTP methods, 2xx/4xx/5xx responses, headers, JSON payloads, assertions, and negative scenarios.",
    "Converted BRDs and Agile user stories into traceable test cases, then logged, retested, and verified defects through release closure with developers.",
    "Performed SQL backend validation using SELECT, WHERE, and JOIN queries to reconcile UI transactions with stored data and verify data integrity.",
    "Validated AI-driven behavior through prompt/response testing, conversation-flow checks, payload verification, and response-latency checks.",
  ],
} as const satisfies Experience;
