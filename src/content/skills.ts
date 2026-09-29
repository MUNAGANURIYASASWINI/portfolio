import type { SkillGroup } from "@/types/content";

/**
 * The four "Technical Skills" groups from the resume, verbatim.
 * Order preserved from the PDF.
 */
export const skillGroups = [
  {
    id: "automation",
    label: "Automation",
    skills: [
      "Selenium WebDriver",
      "Java",
      "TestNG",
      "Maven",
      "Page Object Model (POM)",
      "Data-Driven Testing",
      "XPath",
      "Git",
      "GitHub",
    ],
  },
  {
    id: "testing",
    label: "Testing",
    skills: [
      "Functional",
      "Regression",
      "Smoke",
      "Sanity",
      "Exploratory",
      "Cross-Browser",
      "Mobile (iOS/Android)",
      "SDLC",
      "STLC",
      "Agile/Scrum",
    ],
  },
  {
    id: "api-ai",
    label: "API & AI Testing",
    skills: [
      "REST APIs",
      "Postman",
      "JSON",
      "HTTP Status Codes",
      "Payload/Header Validation",
      "Prompt Engineering",
      "LLM Testing",
    ],
  },
  {
    id: "database",
    label: "Database",
    skills: [
      "SQL",
      "MySQL",
      "DML/DDL",
      "SELECT/WHERE/JOIN",
      "Data Integrity",
      "UI-to-Database Validation",
    ],
  },
] as const satisfies readonly SkillGroup[];
