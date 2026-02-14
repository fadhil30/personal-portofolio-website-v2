"use client";

import { motion } from "framer-motion";

const hardSkills = [
  "Javascript",
  "Typescript",
  "Java",
  "Swift",
  "Dart",
  "PHP",
  "HTML & CSS",
  "React",
  "Next.js",
  "Vue.js",
  "Flutter",
  "Node.js",
  "Laravel",
  "MySQL",
  "PostgreSQL",
  "Prisma",
  "TailwindCSS",
  "Figma",
  "Office",
];

const softSkills = [
  "Problem Solving",
  "Work Ethic",
  "Creativity",
  "Communication",
  "Public Speaking",
  "Critical Thinking",
  "Analytical Thinking",
  "Teamwork",
  "Initiative",
  "Presentation",
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
};

export function Skills() {
  return (
    <section id="skills" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        {/* Hard Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Technical Skills
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            A comprehensive toolset for building scalable web and mobile
            applications.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-4xl mx-auto mb-20"
        >
          {hardSkills.map((skill) => (
            <motion.div
              key={skill}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="flex items-center justify-center p-4 bg-white dark:bg-zinc-800 rounded-xl shadow-sm border border-zinc-100 dark:border-zinc-700 font-medium text-zinc-800 dark:text-zinc-200"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Soft Skills
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        >
          {softSkills.map((skill) => (
            <motion.div
              key={skill}
              variants={item}
              className="px-6 py-2 bg-zinc-200 dark:bg-zinc-800 rounded-full font-medium text-zinc-700 dark:text-zinc-300"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
