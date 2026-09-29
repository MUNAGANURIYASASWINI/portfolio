"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal observer + all pointer/motion enhancements.
 *
 * DELIBERATE: no animation library. The motion is owned entirely by CSS
 * (see globals.css); this component only flips `data-revealed`
 * attributes, overwrites already-rendered numerals, and writes
 * pointer-driven custom properties. It returns null and never triggers
 * a React re-render, so it costs effectively nothing at runtime.
 *
 * Three jobs, one island (kept together so the 'use client' boundary
 * stays at exactly the allowlisted files):
 *
 * 1. Reveals — flips data-revealed on intersection. If reduced motion
 *    is set or IntersectionObserver is missing, reveals everything
 *    immediately so content can never be left invisible.
 * 2. Count-up — overwrites [data-countup] numerals on intersection.
 *    The FINAL value is server-rendered, so no-JS and reduced-motion
 *    users see the correct number instantly. Never runs otherwise.
 * 3. Tilt — pointer-driven --rx/--ry on [data-tilt], coalesced to one
 *    write per frame, getBoundingClientRect read only inside rAF
 *    (reading it per pointer event forces sync reflow and drops
 *    frames). Fine pointers without reduced motion only.
 */
export function RevealObserver() {
  useEffect(() => {
    const cleanups: Array<() => void> = [];
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    const canObserve = typeof IntersectionObserver !== "undefined";

    // 1. Reveals.
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]"),
    );
    if (nodes.length > 0) {
      if (reduced || !canObserve) {
        nodes.forEach((n) => n.setAttribute("data-revealed", ""));
      } else {
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
        cleanups.push(() => observer.disconnect());
      }
    }

    // 2. Count-up. threshold 0.4 so it fires once, meaningfully.
    if (!reduced && canObserve) {
      const counters = Array.from(
        document.querySelectorAll<HTMLElement>("[data-countup]"),
      );
      if (counters.length > 0) {
        const runCounter = (el: HTMLElement) => {
          const to = Number(el.dataset.countup);
          if (!Number.isFinite(to)) return;
          const prefix = el.dataset.prefix ?? "";
          const suffix = el.dataset.suffix ?? "";
          const t0 = performance.now();
          const DUR = 1400;
          const tick = (now: number) => {
            const p = Math.min(1, (now - t0) / DUR);
            const eased = 1 - Math.pow(1 - p, 4);
            el.textContent = `${prefix}${Math.round(to * eased)}${suffix}`;
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        };
        const counterObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                runCounter(entry.target as HTMLElement);
                counterObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.4 },
        );
        counters.forEach((c) => counterObserver.observe(c));
        cleanups.push(() => counterObserver.disconnect());
      }
    }

    // 3. Tilt.
    if (finePointer && !reduced) {
      document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((el) => {
        let raf = 0;
        const onMove = (e: PointerEvent) => {
          if (raf) return;
          raf = requestAnimationFrame(() => {
            raf = 0;
            const r = el.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - 0.5;
            const py = (e.clientY - r.top) / r.height - 0.5;
            el.style.setProperty("--rx", `${(-py * 4).toFixed(2)}deg`);
            el.style.setProperty("--ry", `${(px * 5).toFixed(2)}deg`);
          });
        };
        const onLeave = () => {
          el.style.setProperty("--rx", "0deg");
          el.style.setProperty("--ry", "0deg");
        };
        el.addEventListener("pointermove", onMove, { passive: true });
        el.addEventListener("pointerleave", onLeave, { passive: true });
        cleanups.push(() => {
          el.removeEventListener("pointermove", onMove);
          el.removeEventListener("pointerleave", onLeave);
          if (raf) cancelAnimationFrame(raf);
        });
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
