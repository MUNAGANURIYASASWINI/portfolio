import Link from "next/link";

import { NeuButton } from "@/components/ui/NeuButton";

export default function NotFound() {
  return (
    <main
      id="main"
      className="mx-auto flex min-h-dvh w-full max-w-2xl flex-col items-center justify-center gap-6 px-6 text-center"
    >
      <p className="tag-mono text-accent-text">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-ink">
        This page does not exist
      </h1>
      <p className="max-w-md text-sm text-meta">
        The link may be out of date. The four case studies are all reachable
        from the home page.
      </p>
      <NeuButton href="/" variant="primary">
        Back to home
      </NeuButton>
      <Link href="/#engagements" className="text-sm text-accent-text no-underline">
        Jump to Application Experience
      </Link>
    </main>
  );
}
