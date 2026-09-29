import { Contact } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Engagements } from "@/components/sections/Engagements";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Impact } from "@/components/sections/Impact";
import { Nav } from "@/components/sections/Nav";
import { Skills } from "@/components/sections/Skills";

/**
 * Composition only. Sections change when the résumé changes; the
 * components in ui/ change when the design does. Keeping them separate
 * means a copy edit can never cause a design regression.
 */
export default function HomePage() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Impact />
        <Experience />
        <Skills />
        <Engagements />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
