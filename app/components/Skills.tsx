"use client";

import { motion } from "framer-motion";

export function Skills() {
  return (
    <section
      id="skills"
      className="relative w-full min-h-screen md:h-[150dvh] pointer-events-none overflow-hidden"
    >
      <div className="sticky top-17.5 mb-96 text-center z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-7xl font-bold text-zinc-900 dark:text-zinc-50"
        >
          Tech Stack
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-3xl text-base text-zinc-500 dark:text-zinc-400"
        >
          (hint: press a key)
        </motion.p>
      </div>
    </section>
  );
}
