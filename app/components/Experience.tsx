"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    role: "Jr. Web Developer",
    company: "ESCO Lifescience",
    period: "06/2025 - Present", // Future date logic from resume? Keeping strictly as resume text.
    description:
      "Leading website maintenance and feature enhancement. Engineered custom hybrid translation system with DeepL API. Spearheaded 'Filtracheck' mobile app development.",
  },
  {
    role: "Software Engineer Intern",
    company: "ESCO Lifescience",
    period: "02/2025 - 05/2025",
    description:
      "Developed internal web tools using React and Node.js. Migrated legacy components to modern frameworks.",
  },
  {
    role: "iOS Developer Intern",
    company: "M-Knows Consulting",
    period: "02/2023 - 06/2023",
    description:
      "Contributed to 'Kampus Gratis' LMS platform. Engineered core functionalities for user and admin interfaces.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Work Experience
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 md:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800"
            >
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-50" />
              <div className="mb-1 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                {exp.period}
              </div>
              <h3 className="text-xl font-bold">{exp.role}</h3>
              <div className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">
                {exp.company}
              </div>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
