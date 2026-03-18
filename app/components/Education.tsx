"use client";

import { motion } from "framer-motion";
import { AnimatedList } from "./ui/animated-list";
import { SpotlightCard } from "./ui/spotlight-card";

const education = [
 {
  institution: "Purwadhika Digital Technology School",
  degree: "Full Stack Web Developer Bootcamp",
  period: "09/2024 - 02/2025",
  description:
   "Completed an intensive program focused on the MERN stack (PostgreSQL, Express, React, Node.js) and Next.js. Developed production-ready web applications.",
 },
 {
  institution: "Brawijaya University",
  degree: "Bachelor's degree, Informatics Engineering",
  period: "2020 - 2024",
  description: "GPA 3.82/4.00",
 },
];

export function Education() {
 return (
  <section id="education" className="relative z-10 bg-zinc-50 py-20 dark:bg-zinc-900/50">
   <div className="container mx-auto px-4">
    <motion.div
     initial={{ opacity: 0, y: 20 }}
     whileInView={{ opacity: 1, y: 0 }}
     viewport={{ once: true, amount: 0.3 }}
     className="mb-16 text-center"
    >
     <h2 className="mb-4 text-2xl font-bold tracking-tight sm:text-3xl">Education</h2>
     <p className="mx-auto max-w-2xl text-zinc-600 dark:text-zinc-400">
      Academic background and professional training.
     </p>
    </motion.div>

    <AnimatedList className="mx-auto max-w-3xl">
     {education.map((edu) => (
      <SpotlightCard
       key={edu.institution}
       className="border-zinc-700/80 bg-zinc-950 p-6 text-zinc-50 md:p-7"
       spotlightColor="rgba(59, 130, 246, 0.2)"
      >
       <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
         <h3 className="text-xl font-semibold tracking-tight">
          {edu.institution}
         </h3>
         <p className="mt-1 font-medium text-zinc-300">
          {edu.degree}
         </p>
        </div>
        <span className="inline-flex w-fit items-center whitespace-nowrap rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 font-mono text-sm text-zinc-300">
         {edu.period}
        </span>
       </div>
       <p className="mt-5 text-zinc-300">
        {edu.description}
       </p>
      </SpotlightCard>
     ))}
    </AnimatedList>
   </div>
  </section>
 );
}
