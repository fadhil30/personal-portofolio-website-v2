"use client";

import { motion } from "framer-motion";
import { EXPERIENCE, SKILLS } from "@/app/data/constants";

const formatPeriod = (startDate: string, endDate: string) =>
  `${startDate} - ${endDate}`;

export function Experience() {
  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 bg-zinc-950/30 backdrop-blur-[3px]"
      />
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">
            Work Experience
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-12">
          {EXPERIENCE.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-6 md:pl-8 border-l-2 border-zinc-200 dark:border-zinc-800"
            >
              <div className="absolute -left-2.25 top-0 w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-50" />
              <div className="mb-1 text-sm text-zinc-500 dark:text-zinc-400 font-mono">
                {formatPeriod(exp.startDate, exp.endDate)}
              </div>
              <h3 className="text-xl font-bold">{exp.title}</h3>
              <div className="text-zinc-600 dark:text-zinc-300 font-medium mb-2">
                {exp.company}
              </div>
              <ul className="list-disc space-y-1 pl-5 text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {exp.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="mt-3 flex flex-wrap gap-2">
                {exp.skills.map((skillName) => (
                  <span
                    key={skillName}
                    className="rounded-md border border-zinc-200 px-2 py-1 text-xs font-medium text-zinc-600 dark:border-zinc-700 dark:text-zinc-300"
                  >
                    {SKILLS[skillName].label}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
