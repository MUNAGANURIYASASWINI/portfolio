import type { Engagement } from "@/types/content";

import { aiChatbot } from "./aiChatbot";
import { crm } from "./crm";
import { erp } from "./erp";
import { honda } from "./honda";

/**
 * All four engagements are from ONE employer. That is stated plainly on
 * every card rather than hidden — the honest framing is depth across
 * four domains, not breadth across four companies.
 */
export const engagements = [
  crm,
  erp,
  honda,
  aiChatbot,
] as const satisfies readonly Engagement[];

export function getEngagement(slug: string): Engagement | undefined {
  return engagements.find((e) => e.slug === slug);
}
