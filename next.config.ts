import type { NextConfig } from "next";

/**
 * Static-export configuration.
 *
 * All four values are set HERE, on day one, not at deploy time. This is
 * deliberate: `output: 'export'` changes the behaviour of `next start`
 * (it hard-fails), of the image optimizer (it needs a server), and of
 * trailing-slash routing (static hosts serve directory indexes).
 *
 * Do NOT add `basePath`/`assetPrefix` — buy a domain and serve from apex.
 * Do NOT create `middleware.ts` — it is a hard error with static export.
 * Verify with `npm run serve` (npx serve out), NEVER `next start`.
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
