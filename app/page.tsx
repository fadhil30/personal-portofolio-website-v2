import SmoothScroll from "./components/SmoothScroll";
import EffectsLayer from "./components/EffectsLayer";
import { PerformanceModeProvider } from "./components/PerformanceModeProvider";
import AppLoadingGate from "./components/AppLoadingGate";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <AppLoadingGate>
      <PerformanceModeProvider>
        <SmoothScroll>
          <EffectsLayer />
          <main className="min-h-screen bg-white/80 font-sans text-zinc-900 selection:bg-zinc-900 selection:text-white dark:bg-transparent dark:text-zinc-50 dark:selection:bg-white dark:selection:text-zinc-900">
            <Navbar />
            <Hero />
            <Education />
            <Experience />
            <Projects />
            <Skills />
            <Footer />
          </main>
        </SmoothScroll>
      </PerformanceModeProvider>
    </AppLoadingGate>
  );
}
