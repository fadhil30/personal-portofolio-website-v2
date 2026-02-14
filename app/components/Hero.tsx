"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      id="about"
      className="pt-24 pb-12 md:pt-48 md:pb-32 overflow-hidden"
    >
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Photo Placeholder */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-zinc-100 dark:bg-zinc-800 mb-6 md:mb-8 overflow-hidden relative border-4 border-white dark:border-zinc-950 shadow-xl"
        >
          {/* Replace src with actual image */}
          <div className="w-full h-full flex items-center justify-center text-zinc-400">
            Photo
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6 bg-linear-to-b from-zinc-900 to-zinc-500 bg-clip-text text-transparent dark:from-white dark:to-zinc-500"
        >
          Hi, I&apos;m Fadhil.
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mb-8 md:mb-10 px-4"
        >
          A results-driven Web Developer and Informatics Engineering graduate.
          Specializing in React, Next.js, and scaling web applications.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
        >
          <Button size="lg" className="gap-2 w-full sm:w-auto">
            View Projects <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 w-full sm:w-auto"
          >
            Download Resume <Download className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
