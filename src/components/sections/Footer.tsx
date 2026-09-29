import { profile } from "@/content/profile";

export function Footer() {
  return (
    <footer className="border-t border-line/60 py-10">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-2 px-6 text-center">
        <p className="text-sm text-meta">{profile.name}</p>
        <p className="text-xs text-muted">
          Built with Next.js and Tailwind CSS. Content sourced from my résumé.
        </p>
      </div>
    </footer>
  );
}
