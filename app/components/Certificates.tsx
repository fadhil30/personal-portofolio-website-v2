"use client";

import { motion } from "framer-motion";
import { BadgeCheck } from "lucide-react";

const certificates = [
  {
    name: "SwiftUI & iOS Engineer",
    courses: ["The Complete App Development Bootcamp"],
    issuer: "BuildWithAngga",
    period: "11/2022 – 12/2022",
  },
  {
    name: "Flutter App Developer",
    courses: [
      "Dating Apps",
      "State Management Bloc",
      "Find House App Clean Architecture",
    ],
    issuer: "BuildWithAngga / Udemy",
    period: "02/2023 – 07/2023",
  },
  {
    name: "Dart Programming",
    courses: ["Dart Programming Bootcamp", "Flutter Mobile Apps Course"],
    issuer: "BuildWithAngga",
    period: "06/2023 – 07/2023",
  },
];

export function Certificates() {
  return (
    <section id="certificates" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Certificates
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                  <p className="text-sm text-zinc-500 mb-2">
                    {cert.issuer} • {cert.period}
                  </p>
                  <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
                    {cert.courses.map((course, i) => (
                      <li key={i}>• {course}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
