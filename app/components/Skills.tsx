"use client";

import { motion } from "framer-motion";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full min-h-[65dvh] overflow-hidden pointer-events-none md:h-[110dvh]"
    >
      <div className="z-10 mb-18 text-center md:sticky md:top-17.5 md:mb-70">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 sm:text-4xl md:text-7xl"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl px-4 text-base text-zinc-500 dark:text-zinc-400"
        >
          (hint: press a key)
        </motion.p>
      </div>
    </section>
  );
}
