import type { MetadataRoute } from "next";

import { engagements } from "@/content/engagements";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com";

/** Required under `output: 'export'` — metadata routes must be static. */
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...engagements.map((e) => ({
      url: `${SITE_URL}/work/${e.slug}/`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
  ];
}
