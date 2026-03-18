"use client";

import { cn } from "@/app/lib/utils";
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

export default function Home() {
 return (
  <SmoothScroll>
   <Particles quantity={40} />
   <AnimatedBackground />
   <main
    className={cn(
     "min-h-screen bg-white/80 dark:bg-transparent text-zinc-900 dark:text-zinc-50 font-sans selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-900"
    )}
   >
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
