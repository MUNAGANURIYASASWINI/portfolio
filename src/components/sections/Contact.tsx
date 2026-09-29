import { GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/icons";
import { Section } from "@/components/sections/Section";
import { NeuButton } from "@/components/ui/NeuButton";
import { profile } from "@/content/profile";

export function Contact() {
  return (
    <Section id="contact" label="/06" title="Contact">
      <p className="max-w-xl text-sm text-meta">
        Open to entry-level Software Quality Engineer and QA Automation
        Engineer roles. The fastest route is email; the résumé is available
        as a PDF.
      </p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <li>
          <NeuButton href={`mailto:${profile.email}`} variant="primary" className="w-full">
            <MailIcon size={16} />
            {profile.email}
          </NeuButton>
        </li>
        <li>
          <NeuButton href={`tel:${profile.phone.replace(/\s/g, "")}`} className="w-full">
            <PhoneIcon size={16} />
            {profile.phone}
          </NeuButton>
        </li>
        <li>
          <NeuButton href={profile.linkedin} external className="w-full">
            <LinkedInIcon size={16} />
            LinkedIn
          </NeuButton>
        </li>
        <li>
          <NeuButton href={profile.github} external className="w-full">
            <GitHubIcon size={16} />
            GitHub
          </NeuButton>
        </li>
      </ul>
    </Section>
  );
}
