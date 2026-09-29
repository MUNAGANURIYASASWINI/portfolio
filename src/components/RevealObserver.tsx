"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal observer.
 *
 * DELIBERATE: no animation library. The motion is owned entirely by CSS
 * (see globals.css); this component only flips a `data-revealed`
 * attribute. It returns null and never triggers a React re-render, so it
 * costs effectively nothing at runtime.
 *
 * `rootMargin` fires reveals slightly BEFORE entry, which reads as
 * responsive rather than laggy.
 *
 * SAFETY: if IntersectionObserver is unavailable, everything is revealed
 * immediately. Combined with the reduced-motion block in globals.css,
 * content can never be left invisible.
 */
export function RevealObserver() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length === 0) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced || typeof IntersectionObserver === "undefined") {
      nodes.forEach((n) => n.setAttribute("data-revealed", ""));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 },
    );

    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
