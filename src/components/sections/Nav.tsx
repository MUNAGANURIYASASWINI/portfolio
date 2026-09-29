import Link from "next/link";

import { ThemeToggle } from "@/components/ThemeToggle";
import { profile } from "@/content/profile";

/** Single h1 lives in Hero; nav links are anchors to the home sections. */
const LINKS = [
  { href: "/#impact", label: "Impact" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#engagements", label: "Work" },
  { href: "/#education", label: "Education" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/50 bg-base/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3"
      >
        <Link
          href="/"
          className="font-grotesk text-sm font-semibold tracking-tight text-ink no-underline"
        >
          YASASWINI
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="nav-link inline-flex min-h-11 items-center rounded-md px-3 text-sm text-meta
                           no-underline transition-colors duration-150 hover:text-accent-text"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden min-h-11 items-center rounded-md px-3 text-sm text-meta no-underline
                       transition-colors duration-150 hover:text-accent-text sm:inline-flex"
          >
            LinkedIn
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
