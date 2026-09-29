"use client";

import { useEffect } from "react";

/**
 * Motion island — the site's ONLY animation runtime alongside CSS.
 *
 * animejs v4 is loaded via DYNAMIC import, deliberately:
 * 1. If the chunk fails to load, every catch path leaves content in
 *    its final visible state. An import failure can never blank the
 *    page — the same guarantee as the CSS reveal system.
 * 2. It stays out of First Load JS (loaded async after mount).
 *
 * Four jobs, one island (kept together so the 'use client' boundary
 * stays at exactly the allowlisted files):
 *
 * 1. Reveals — flips data-revealed on intersection (pure DOM, no lib).
 * 2. Count-up — overwrites [data-countup] numerals (pure rAF, no lib).
 * 3. Tilt + spotlight — pointer-driven --rx/--ry/--lx/--ly on
 *    [data-tilt], coalesced to one write per frame (pure rAF, no lib).
 * 4. animejs — magnetic buttons [data-magnetic] and staggered grid
 *    entrances [data-anime="stagger"]. Springs and orchestration are
 *    the two things CSS cannot do; everything else stays in CSS.
 *
 * Reduced motion or missing IntersectionObserver: jobs 1–3 degrade to
 * final states, job 4 never starts. Content is always visible.
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

    // 3. Tilt + spotlight position. One rAF-coalesced write per frame
    // covers --rx/--ry (tilt angle) and --lx/--ly (spotlight center),
    // so no extra listeners are needed for the glow.
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
            el.style.setProperty("--lx", `${((px + 0.5) * 100).toFixed(1)}%`);
            el.style.setProperty("--ly", `${((py + 0.5) * 100).toFixed(1)}%`);
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

    // 4. animejs: magnetic buttons + staggered entrances. Everything is
    // inside try/catch AND the dynamic import: if animejs fails to load
    // or throws, the page simply keeps its static final states.
    if (!reduced && canObserve) {
      let cancelled = false;
      cleanups.push(() => {
        cancelled = true;
      });

      import("animejs")
        .then(({ animate, stagger, spring, utils }) => {
          if (cancelled) return;

          // 4a. Magnetic buttons: pull toward the cursor, spring home.
          // anime x/y write `transform`, which composes with Tailwind's
          // `translate` property instead of fighting it.
          document
            .querySelectorAll<HTMLElement>("[data-magnetic]")
            .forEach((el) => {
              if (!finePointer) return;
              let raf = 0;
              const onMove = (e: PointerEvent) => {
                if (raf) return;
                raf = requestAnimationFrame(() => {
                  raf = 0;
                  const r = el.getBoundingClientRect();
                  const dx = e.clientX - (r.left + r.width / 2);
                  const dy = e.clientY - (r.top + r.height / 2);
                  animate(
                    el,
                    {
                      x: (dx / r.width) * 12,
                      y: (dy / r.height) * 12,
                      duration: 300,
                      ease: "outExpo",
                    },
                  );
                });
              };
              const onLeave = () => {
                animate(
                  el,
                  {
                    x: 0,
                    y: 0,
                    ease: spring({ bounce: 0.35, duration: 550 }),
                  },
                );
              };
              el.addEventListener("pointermove", onMove, {
                passive: true,
              });
              el.addEventListener("pointerleave", onLeave, {
                passive: true,
              });
              cleanups.push(() => {
                el.removeEventListener("pointermove", onMove);
                el.removeEventListener("pointerleave", onLeave);
                if (raf) cancelAnimationFrame(raf);
              });
            });

          // 4b. Staggered grid entrances. Initial state is set ONLY here
          // (JS provably running), so no-JS renders the final grid.
          // onComplete clears inline transform: anime writes
          // element.style.transform, which would otherwise override the
          // stylesheet tilt transform on cards.
          document
            .querySelectorAll<HTMLElement>('[data-anime="stagger"]')
            .forEach((group) => {
              const items = Array.from(group.children) as HTMLElement[];
              if (items.length === 0) return;
              utils.set(items, { opacity: 0, y: 18, scale: 0.97 });
              const io = new IntersectionObserver(
                (entries) => {
                  entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    io.disconnect();
                    animate(items, {
                      opacity: [0, 1],
                      y: [18, 0],
                      scale: [0.97, 1],
                      duration: 700,
                      delay: stagger(70),
                      ease: "outExpo",
                      onComplete: () => {
                        items.forEach((it) => {
                          it.style.transform = "";
                          it.style.opacity = "";
                        });
                      },
                    });
                  });
                },
                { threshold: 0.15 },
              );
              io.observe(group);
              cleanups.push(() => io.disconnect());
            });
        })
        .catch(() => {
          /* animejs failed to load: static final states remain. */
        });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return null;
}
