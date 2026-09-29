import { DownloadIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { ContactActions } from "@/components/sections/ContactActions";
import { Section } from "@/components/sections/Section";
import { NeuButton } from "@/components/ui/NeuButton";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section id="contact" label="/06" title="Contact">
      <p className="max-w-xl text-sm text-meta">
        The fastest route is email. The address below copies in one click,
        and the résumé is available as a PDF.
      </p>

      {/* Copy-to-clipboard email + live self-check. The phone number was
          deliberately removed: email is the hiring channel, and a visible
          personal number invites spam without adding trust. */}
      <ContactActions />

      <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <li>
          <NeuButton
            href="/resume.pdf"
            variant="primary"
            external
            className="w-full"
          >
            <DownloadIcon size={16} />
            Download résumé (PDF)
          </NeuButton>
          <p className="mt-2 text-xs text-muted">PDF · 2 pages</p>
        </li>
        <li>
          <NeuButton
            href={profile.linkedin}
            external
            ariaLabel="LinkedIn profile, opens in a new tab"
            className="w-full"
          >
            <LinkedInIcon size={16} />
            LinkedIn
          </NeuButton>
          <p className="mt-2 text-xs text-muted">Work history and experience</p>
        </li>
        <li>
          <NeuButton
            href={profile.github}
            external
            ariaLabel="GitHub profile, opens in a new tab"
            className="w-full"
          >
            <GitHubIcon size={16} />
            GitHub
          </NeuButton>
          {/* Honest gap statement. A bare GitHub button with zero public
              repos is a small negative; naming the gap converts it into a
              reason to email — and invents nothing. */}
          <p className="mt-2 text-xs text-muted">
            No public repos yet. Email me and I’ll walk you through a suite
            live.
          </p>
        </li>
      </ul>
    </Section>
  );
}
