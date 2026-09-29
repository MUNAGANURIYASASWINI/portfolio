"use client";

import { useState } from "react";

import { CheckIcon, CopyIcon } from "@/components/icons";
import { profile } from "@/content/profile";

/**
 * Copy-to-clipboard email row.
 *
 * Follows the Primer clipboard pattern: a real <button>, an accessible
 * name, focus stays on the button, an initially-empty aria-live region
 * announces the outcome, and there is an explicit failure path
 * (clipboard writes fail outside secure contexts and under enterprise
 * policy — silent failure is worse than no button).
 *
 * Icon change carries non-color users, the label carries everyone, the
 * live region carries screen readers. All three.
 */
export function ContactActions() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

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

  return (
    <div className="mt-8">
      {/* Raw address stays selectable; the button copies it. */}
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
            data-magnetic=""
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
        <p aria-live="polite" className="mt-3 min-h-5 text-xs text-meta">
          {copied
            ? "Email address copied to clipboard."
            : copyFailed
              ? "Copy failed. Select the address above and press Ctrl+C."
              : ""}
        </p>
      </div>
    </div>
  );
}
