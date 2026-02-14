"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const education = [
  {
    institution: "Purwadhika Digital Technology School",
    degree: "Full Stack Web Developer Bootcamp",
    period: "09/2024 – 02/2025",
    description:
      "Completed an intensive program focused on the MERN stack (PostgreSQL, Express, React, Node.js) and Next.js. Developed production-ready web applications.",
  },
  {
    institution: "Brawijaya University",
    degree: "Bachelor's degree, Informatics Engineering",
    period: "2020 – 2024",
    description: "GPA 3.82/4.00",
  },
];

export function Education() {
  return (
    <section id="education" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Education</h2>
          <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Academic background and professional training.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto grid gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle className="text-xl">
                        {edu.institution}
                      </CardTitle>
                      <p className="text-zinc-600 dark:text-zinc-400 font-medium">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="text-sm text-zinc-500 font-mono whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      {edu.period}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {edu.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
