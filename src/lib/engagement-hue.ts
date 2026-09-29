/**
 * Per-engagement decorative hues.
 *
 * Each engagement gets a wash (tinted pill background, ink text on top
 * at 7.25-12.89:1) and a strip (saturated thin accent, decorative).
 * Verified by scripts/palette.py. Meaning ALWAYS stays in the visible
 * label + icon — these hues are variety, never signal.
 *
 * Kept OUT of the content modules on purpose: hue is presentation
 * metadata, and the content files must stay verbatim-resume.
 */
export const ENGAGEMENT_HUE = {
  crm: { wash: "var(--nm-wash-crm)", strip: "var(--nm-strip-crm)" },
  erp: { wash: "var(--nm-wash-erp)", strip: "var(--nm-strip-erp)" },
  honda: { wash: "var(--nm-wash-honda)", strip: "var(--nm-strip-honda)" },
  "ai-chatbot": { wash: "var(--nm-wash-ai)", strip: "var(--nm-strip-ai)" },
} as const;

export type EngagementHue = keyof typeof ENGAGEMENT_HUE;
