import SmoothScroll from "./components/SmoothScroll";
import AnimatedBackground from "./components/AnimatedBackground";
import Particles from "./components/Particles";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Education } from "./components/Education";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Footer } from "./components/Footer";
import ElasticCursor from "./components/ui/ElasticCursor";

export default function Home() {
  return (
    <SmoothScroll>
      <ElasticCursor />
      <Particles quantity={40} />
      <AnimatedBackground />
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
  );
}
