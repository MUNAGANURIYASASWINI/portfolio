import {
  DownloadIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from "@/components/icons";
import { NeuButton } from "@/components/ui/NeuButton";
import { profile } from "@/content/profile";

/**
 * The page's single <h1>. The hero is text, not an image, so LCP is the
 * heading itself and nothing is gated on JS.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="mx-auto flex w-full max-w-5xl flex-col items-start px-6 pt-16 pb-8 sm:pt-24 sm:pb-12"
    >
      <p className="tag-mono text-accent-text">/work/crm · /work/erp · /work/honda</p>

      <h1
        id="hero-heading"
        data-reveal
        className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl"
      >
        {profile.name}
      </h1>

      <p
        data-reveal
        style={{ "--reveal-i": 1 } as React.CSSProperties}
        className="mt-3 max-w-2xl text-lg text-body"
      >
        {profile.roles.join("  ·  ")}
      </p>

      <p
        data-reveal
        style={{ "--reveal-i": 2 } as React.CSSProperties}
        className="mt-6 max-w-2xl text-base text-meta"
      >
        {profile.summary}
      </p>

      <div
        data-reveal
        style={{ "--reveal-i": 3 } as React.CSSProperties}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <NeuButton href="#contact" variant="primary">
          <MailIcon size={16} />
          Get in touch
        </NeuButton>

        <NeuButton href="/resume.pdf" variant="secondary" external>
          <DownloadIcon size={16} />
          Résumé (PDF)
        </NeuButton>

        <NeuButton href={profile.linkedin} variant="ghost" external ariaLabel="LinkedIn profile">
          <LinkedInIcon size={16} />
          LinkedIn
        </NeuButton>

        <NeuButton href={profile.github} variant="ghost" external ariaLabel="GitHub profile">
          <GitHubIcon size={16} />
          GitHub
        </NeuButton>
      </div>
    </section>
  );
}
