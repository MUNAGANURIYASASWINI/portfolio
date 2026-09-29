import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import { RevealObserver } from "@/components/RevealObserver";
import { siteMetadata } from "@/lib/seo";
import { personSchema } from "@/lib/schema";

import "./globals.css";

/**
 * next/font self-hosts all three families at build time: no third-party
 * connection, automatic preload, automatic adjustFontFallback to kill
 * CLS. Three families is the ceiling — a fourth would wreck LCP.
 */
const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

/** In Next 16, `viewport` is exported separately from `metadata`. */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e5e9f0" },
    { media: "(prefers-color-scheme: dark)", color: "#2a2f3a" },
  ],
};

/**
 * With `output: 'export'` there is no request-time anything, so any use
 * of cookies()/headers() should be a BUILD failure, not a confusing
 * runtime one.
 */
export const dynamic = "error";

/**
 * Blocking, no-FOUC theme script. Runs before first paint, needs no
 * hydration, costs nothing. Replaces `next-themes`.
 *
 * It also sets `js-reveal` on <html>. That class gates the scroll-reveal
 * hidden state in globals.css, so content is only ever hidden when
 * JavaScript is genuinely running and able to reveal it again.
 */
const themeScript = `(function(){document.documentElement.classList.add('js-reveal');try{var s=localStorage.getItem('theme');var d=s?s==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;document.documentElement.classList.toggle('dark',d);}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${grotesk.variable} ${inter.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
      </head>
      <body className="min-h-dvh antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-1000
                     focus:rounded-md focus:bg-raised focus:px-4 focus:py-3 focus:text-ink
                     focus:shadow-neu focus:ring-neu"
        >
          Skip to main content
        </a>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
