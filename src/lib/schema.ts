import { profile } from "@/content/profile";
import { engagements } from "@/content/engagements";

/**
 * JSON-LD Person schema, generated from the content modules so it can
 * never drift from the visible page.
 */
export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.roles.join(" | "),
    email: `mailto:${profile.email}`,
    // No telephone: the number was removed from the Contact section, so
    // the machine-readable schema must not re-expose it to scrapers.
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
    sameAs: [profile.linkedin, profile.github],
    knowsAbout: [
      "Software Quality Assurance",
      "Selenium WebDriver",
      "Test Automation",
      "REST API Testing",
      "Postman",
      "SQL",
      "AI/LLM Application Testing",
      "Defect Lifecycle Management",
    ],
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Kallam Haranadhareddy Institute of Technology",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "Prompt Engineering Fundamentals",
        credentialCategory: "certificate",
        recognizedBy: { "@type": "Organization", name: "Anthropic" },
      },
    ],
    // The four engagements, surfaced as a hasOccupation-style list.
    knowsLanguage: ["English"],
    description: `Quality Analyst and QA Automation Engineer with hands-on coverage across ${engagements.length} enterprise applications.`,
  };
}
