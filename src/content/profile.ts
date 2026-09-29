import type { Profile } from "@/types/content";

/** Verbatim from Yashu_Resume.pdf, page 1 header + Professional Summary. */
export const profile = {
  name: "MUNAGANURI YASASWINI",
  roles: [
    "Quality Analyst",
    "QA Automation Engineer",
    "API & AI/LLM Testing",
  ],
  summary:
    "Quality Analyst and QA Automation Engineer with nearly 1 year of professional experience spanning manual testing, Selenium automation, REST API validation, SQL backend verification, mobile testing, and AI/LLM application testing. Experienced across CRM, ERP, enterprise client, and AI-driven applications; recognized with a 33% merit-based salary increase within 7 months for QA delivery, defect detection, and prompt-engineering contributions. Strong in Agile test execution, defect lifecycle management, and release validation.",
  email: "yasaswini827@gmail.com",
  phone: "+91 9652983720",
  linkedin: "https://linkedin.com/in/yasaswini-munaganuri",
  github: "https://github.com/yasaswini-munaganuri",
} as const satisfies Profile;
