import type { Engagement } from "@/types/content";

/**
 * "Selected Application Experience" — Corporate Portal & AI Chatbot,
 * page 2 of the PDF. This is the most differentiated engagement: it
 * is the only one combining REST API validation with AI/LLM behaviour
 * testing, and it pairs with the Anthropic Prompt Engineering cert.
 */
export const aiChatbot = {
  slug: "ai-chatbot",
  title: "Corporate Portal & AI Chatbot",
  appType: "Portal & AI",
  client: "Biztechnosys Infotech",
  period: "Nov 2025 - Aug 2026",
  summary:
    "Validation of a corporate portal alongside an integrated AI chatbot, testing the REST contract with Postman and the conversational layer through prompt-based scenarios covering response consistency, payload validity, latency and edge cases.",
  testTypes: ["Functional", "API", "LLM", "Exploratory"],
  scenarioCoverage: [
    "Edge Case",
    "Response Consistency",
    "Payload Validation",
    "Response Latency",
    "Schema",
  ],
  responsibilities: [
    "Validated corporate portal functionality across key navigation, content, forms, and user workflows, identifying functional and usability issues before release.",
  ],
  highlights: [
    "Performed REST API testing using Postman for the integrated AI chatbot, validating request methods, HTTP status codes, headers, JSON payload structures, and response schemas.",
    "Tested AI chatbot conversation flows using prompt-based scenarios, including response consistency, payload validation, response latency, and edge-case inputs to support reliable AI-assisted interactions.",
  ],
  order: 4,
} as const satisfies Engagement;
