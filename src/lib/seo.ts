import type { Metadata } from "next";

import { profile } from "@/content/profile";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/** Primary CTA phrasing. `description` is the LinkedIn/OG preview copy. */
export const siteMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} | Quality Analyst & QA Automation Engineer`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Quality Analyst and QA Automation Engineer with hands-on Selenium automation, REST API validation, SQL backend verification, and AI/LLM application testing across CRM, ERP and enterprise applications.",
  keywords: [
    "Quality Analyst",
    "QA Automation Engineer",
    "Selenium WebDriver",
    "Test Automation",
    "REST API Testing",
    "Postman",
    "AI/LLM Testing",
    "SQL",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} | Quality Analyst & QA Automation Engineer`,
    description:
      "Selenium automation, REST API validation, SQL backend verification, and AI/LLM application testing across four enterprise applications.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} | Quality Analyst & QA Automation Engineer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Quality Analyst & QA Automation Engineer`,
    description:
      "Selenium automation, REST API validation, SQL backend verification, and AI/LLM application testing.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};
