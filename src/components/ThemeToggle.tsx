"use client";

import { useEffect, useState } from "react";

/**
 * Theme toggle.
 *
 * DELIBERATE: no `next-themes`. That package has had no release since
 * 2025-03-11, and it requires a client provider that must hydrate
 * BEFORE it can set the class — the classic source of theme flash.
 *
 * Instead, a ~20-line BLOCKING inline script in <head> (see layout.tsx)
 * sets `.dark` on <html> before first paint. This component only needs
 * to read the current state and write the user's explicit choice.
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    setMounted(true);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* private mode — the class still applies for this session */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className="neu-sm grid h-11 w-11 place-items-center rounded-md bg-raised text-accent-text
                 shadow-neu-sm transition-[box-shadow,transform] duration-150 ease-soft
                 active:shadow-neu-inset active:translate-y-px"
    >
      {/* Rendered only after mount to avoid a hydration mismatch. */}
      {mounted && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {isDark ? (
            <>
              <circle cx="8" cy="8" r="3.2" />
              <path d="M8 1.2v1.6M8 13.2v1.6M1.2 8h1.6M13.2 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M12.6 3.4l-1.1 1.1M4.5 11.5l-1.1 1.1" />
            </>
          ) : (
            <path d="M13.4 9.6A5.8 5.8 0 0 1 6.4 2.6a5.8 5.8 0 1 0 7 7Z" />
          )}
        </svg>
      )}
    </button>
  );
}
