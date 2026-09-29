import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NeuCard } from "@/components/ui/NeuCard";
import { ENGAGEMENT_HUE } from "@/lib/engagement-hue";
import { NeuTag } from "@/components/ui/NeuTag";
import { engagements, getEngagement } from "@/content/engagements";
import { profile } from "@/content/profile";

/** All four slugs are known at build time, so the set is static. */
export const dynamicParams = false;

export function generateStaticParams() {
  return engagements.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = getEngagement(slug);
  if (!e) return {};
  return {
    title: `${e.title} | Case Study`,
    description: e.summary,
    alternates: { canonical: `/work/${e.slug}/` },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const engagement = getEngagement(slug);
  if (!engagement) notFound();

  const index = engagements.findIndex((e) => e.slug === slug);
  const prev = engagements[index - 1];
  const next = engagements[index + 1];

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line/50 bg-base/85 backdrop-blur-md">
        <nav
          aria-label="Primary"
          className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-3"
        >
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-md px-2 text-sm
                       text-meta no-underline transition-colors duration-150 hover:text-accent-text"
          >
            <ArrowLeftIcon size={14} />
            All work
          </Link>
          <p className="font-grotesk text-sm font-semibold tracking-tight text-ink">
            {profile.name}
          </p>
          <ThemeToggle />
        </nav>
      </header>

      <main id="main" className="mx-auto w-full max-w-5xl px-6 py-12 sm:py-16">
        <header>
          <p>
            <span
              className="tag-mono inline-flex h-6 items-center rounded-pill px-2.5 text-ink"
              style={{
                background:
                  ENGAGEMENT_HUE[engagement.slug as keyof typeof ENGAGEMENT_HUE]
                    .wash,
              }}
            >
              {engagement.appType}
            </span>
          </p>
          <h1
            data-reveal
            className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl"
          >
            {engagement.title}
          </h1>
          <p className="tag-mono mt-3 text-muted">
            {engagement.client} · {engagement.period}
          </p>
          <p className="mt-6 max-w-2xl text-base text-body">{engagement.summary}</p>
        </header>

        <NeuCard className="mt-10 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-text">
              Test types applied
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {engagement.testTypes.map((t) => (
                <li key={t}>
                  <NeuTag accent>{t}</NeuTag>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-text">
              Scenario coverage
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {engagement.scenarioCoverage.map((s) => (
                <li key={s}>
                  <NeuTag>{s}</NeuTag>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-accent-text">
              Responsibilities
            </h2>
            <ul className="mt-3 flex flex-col gap-2">
              {engagement.responsibilities.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-body">
                  <span
                    aria-hidden="true"
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </NeuCard>

        <section aria-labelledby="highlights-heading" className="mt-10">
          <h2 id="highlights-heading" className="text-xl text-ink">
            Notable work
          </h2>
          <ul className="mt-4 flex flex-col gap-4">
            {engagement.highlights.map((h, i) => (
              <li key={h}>
                <NeuCard
                  as="div"
                  reveal={i}
                  className="text-sm leading-relaxed text-body"
                >
                  {h}
                </NeuCard>
              </li>
            ))}
          </ul>
        </section>

        <nav
          aria-label="Case study pagination"
          className="mt-14 flex items-center justify-between gap-4 border-t border-line/60 pt-8"
        >
          {prev ? (
            <Link
              href={`/work/${prev.slug}/`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm
                         text-accent-text no-underline transition-transform duration-150 hover:-translate-x-0.5"
            >
              <ArrowLeftIcon size={14} />
              {prev.title}
            </Link>
          ) : (
            <span />
          )}

          {next ? (
            <Link
              href={`/work/${next.slug}/`}
              className="inline-flex min-h-11 items-center gap-2 rounded-md px-2 text-sm
                         text-accent-text no-underline transition-transform duration-150 hover:translate-x-0.5"
            >
              {next.title}
              <ArrowRightIcon size={14} />
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </main>

      <footer className="border-t border-line/60 py-10">
        <div className="mx-auto w-full max-w-5xl px-6 text-center">
          <p className="text-xs text-muted">
            Client references are described at the level of the published
            résumé. No internal or confidential detail is included.
          </p>
        </div>
      </footer>
    </>
  );
}
