"use client";

import { useEffect, useState } from "react";

import { CheckIcon, CopyIcon, CrossIcon } from "@/components/icons";
import { profile } from "@/content/profile";

type CheckResult = {
  label: string;
  pass: boolean | null;
  detail?: string;
};

const CHECK_LABELS = [
  "Email address present and selectable",
  "Copy control is a keyboard-focusable button",
  "Résumé link resolves",
  "External links open in a new tab safely",
] as const;

/**
 * Contact trust rail: copy-to-clipboard email + an in-browser self-check.
 *
 * The self-check is the honest, static-export-compatible version of a
 * "test run" panel: EVERY assertion is about THIS page, executed in the
 * visitor's browser, verifiable in the moment. It must never claim
 * anything about employment history, test results, or coverage.
 *
 * Progressive enhancement: the server render shows every check as
 * "checking". With JS off they stay neutral — never a red X implying
 * something is broken.
 *
 * Copy behaviour follows the Primer clipboard pattern: a real <button>,
 * an accessible name, focus stays on the button, an initially-empty
 * aria-live region announces the outcome, and there is an explicit
 * failure path (clipboard writes fail outside secure contexts and
 * under enterprise policy — silent failure is worse than no button).
 */
export function ContactActions() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const [checks, setChecks] = useState<CheckResult[] | null>(null);

  async function copyEmail() {
    setCopyFailed(false);
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyFailed(true);
    }
  }

  useEffect(() => {
    async function run() {
      const results: CheckResult[] = [];

      const emailEl = document.querySelector("[data-email]");
      results.push({
        label: CHECK_LABELS[0],
        pass: !!emailEl?.textContent?.trim(),
      });

      const copyBtn = document.querySelector("[data-copy]");
      results.push({
        label: CHECK_LABELS[1],
        pass: copyBtn?.tagName === "BUTTON",
      });

      try {
        const res = await fetch("/resume.pdf", { method: "HEAD" });
        results.push({
          label: CHECK_LABELS[2],
          pass: res.ok,
          detail: res.ok ? undefined : `/resume.pdf returned ${res.status}`,
        });
      } catch {
        results.push({
          label: CHECK_LABELS[2],
          pass: false,
          detail: "could not reach /resume.pdf",
        });
      }

      const externals = [...document.querySelectorAll('a[target="_blank"]')];
      results.push({
        label: CHECK_LABELS[3],
        pass:
          externals.length > 0 &&
          externals.every((a) =>
            (a as HTMLAnchorElement).rel.split(" ").includes("noopener"),
          ),
      });

      setChecks(results);
    }
    run();
  }, []);

  const rows: CheckResult[] =
    checks ?? CHECK_LABELS.map((label) => ({ label, pass: null }));

  return (
    <div className="mt-8 flex flex-col gap-6">
      {/* Email row: raw address stays selectable; the button copies it. */}
      <div className="neu rounded-xl bg-raised p-5 shadow-neu">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="tag-mono text-muted">EMAIL</p>
            <p
              data-email
              className="mt-1 select-all break-all text-base text-ink"
            >
              {profile.email}
            </p>
          </div>
          <button
            type="button"
            data-copy
            onClick={copyEmail}
            aria-label="Copy email address"
            className="neu-sm inline-flex min-h-11 shrink-0 cursor-pointer items-center
                       justify-center gap-2 rounded-md border border-line-strong/50
                       bg-accent px-5 text-[0.9375rem] font-medium text-on-accent
                       shadow-neu-sm transition-[box-shadow,transform,background-color]
                       duration-150 ease-soft hover:brightness-110
                       active:shadow-neu-inset active:translate-y-px"
          >
            {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
        {/* Icon change carries non-color users, the label carries everyone,
            the live region carries screen readers. All three. */}
        <p aria-live="polite" className="mt-3 min-h-5 text-xs text-meta">
          {copied
            ? "Email address copied to clipboard."
            : copyFailed
              ? "Copy failed. Select the address above and press Ctrl+C."
              : ""}
        </p>
      </div>

      {/* Self-check: real assertions about this page, run live. */}
      <div className="neu-inset rounded-xl p-5">
        <h3 className="text-sm font-semibold text-ink">
          Contact actions · verified in your browser just now
        </h3>
        <ul aria-live="polite" className="mt-3 flex flex-col gap-2">
          {rows.map((c) => (
            <li key={c.label} className="flex items-center gap-2.5 text-sm">
              <span
                aria-hidden="true"
                className={`grid h-6 w-6 shrink-0 place-items-center rounded-full bg-base ${
                  c.pass === null
                    ? "text-muted"
                    : c.pass
                      ? "text-quality"
                      : "text-impact"
                }`}
              >
                {c.pass === null ? (
                  <span className="text-xs">…</span>
                ) : c.pass ? (
                  <CheckIcon size={13} />
                ) : (
                  <CrossIcon size={12} />
                )}
              </span>
              <span className="text-body">{c.label}</span>
              <span className="tag-mono text-muted">
                {c.pass === null
                  ? "checking"
                  : c.pass
                    ? "pass"
                    : "needs attention"}
              </span>
              {c.detail ? (
                <span className="text-xs text-muted">· {c.detail}</span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
