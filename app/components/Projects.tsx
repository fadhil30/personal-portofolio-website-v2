"use client";

import { motion } from "framer-motion";
import { RevealAnimation } from "./reveal-animations";
import {
 Card,
 CardContent,
 CardDescription,
 CardHeader,
 CardTitle,
} from "./ui/card";

const projects = [
 {
  title: "Revamp RAG Chatbot",
  date: "01/2026",
  stack: ["Next.js", "Prisma", "PostgreSQL", "Docker"],
  description:
   "Revitalized front-end of RAG chatbot. Containerized application using Docker and optimized workflows.",
 },
 {
  title: "Assessment Escolab LMS",
  date: "01/2026",
  stack: ["Next.js", "MongoDB", "Clean Architecture"],
  description:
   "Engineered full-stack LMS for corporate training with Clean Architecture principles.",
 },
 {
  title: "Filtracheck App",
  date: "09/2025",
  stack: ["Flutter", "Dart"],
  description:
   "Cross-platform mobile utility for chemical safety calculations with custom algorithms.",
 },
 {
  title: "Translations Feature",
  date: "06/2025",
  stack: ["Laravel", "Vue.js", "DeepL API", "MySQL"],
  description:
   "Architected a custom hybrid localization system with automated translations and CMS overrides.",
 },
 {
  title: "Internal Corporate Chatbot",
  date: "03/2025",
  stack: ["Next.js", "Express", "OpenAI API"],
  description:
   "AI-driven analytics chatbot with RBAC for executive and sales teams.",
 },
 {
  title: "Approval Web App",
  date: "02/2025",
  stack: ["Next.js", "Express", "Node.js"],
  description:
   "Designed an internal validation system for centralized monitoring and approval of critical records.",
 },
 {
  title: "Freshbasket Groceries",
  date: "04/2025",
  stack: ["Next.js", "TailwindCSS"],
  description:
   "Scalable e-commerce platform for grocery market with location-based listings.",
 },
 {
  title: "Event Management Platform",
  date: "01/2025",
  stack: ["Next.js", "Node.js"],
  description:
   "Comprehensive ticketing and event discovery platform with dynamic promoter dashboards.",
 },
 {
  title: "Company Profile Website",
  date: "01/2025",
  stack: ["React", "TailwindCSS"],
  description:
   "Modern corporate web presence focusing on brand identity and responsive design.",
 },
 {
  title: "Auto Insight Blog",
  date: "01/2025",
  stack: ["Next.js", "Contentful CMS", "Vercel"],
  description:
   "Dynamic automotive blog using Headless CMS for streamlined content delivery.",
 },
 {
  title: "Personal Portfolio",
  date: "12/2024",
  stack: ["Next.js", "TailwindCSS", "Framer Motion"],
  description:
   "High-performance personal brand showcase with interactive animations.",
 },
 {
  title: "KampusGratis LMS",
  date: "02/2023",
  stack: ["Flutter", "Dart"],
  description:
   "Comprehensive cross-platform LMS mobile app for democratizing education.",
 },
];

export function Projects() {
 return (
  <section
   id="projects"
   className="relative py-20 bg-zinc-50/60 dark:bg-zinc-900/30 overflow-hidden"
  >
   <div className="relative z-10 container mx-auto px-4">
    <RevealAnimation className="text-center mb-16">
     <h2 className="text-3xl font-bold tracking-tight mb-4">
      Featured Projects
     </h2>
     <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
      A comprehensive list of projects demonstrating technical expertise
      in web and mobile development.
     </p>
    </RevealAnimation>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
     {projects.map((project, index) => (
      <motion.div
       key={project.title}
       initial={{ opacity: 0, y: 20 }}
       whileInView={{ opacity: 1, y: 0 }}
       viewport={{ once: true, amount: 0.1 }}
       transition={{ delay: index * 0.05 }}
      >
       <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="h-48 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
         Thumbnail
        </div>
        <CardHeader>
         <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{project.title}</CardTitle>
          <span className="text-xs text-zinc-500 font-mono pt-1">
           {project.date}
          </span>
         </div>
         <div className="flex flex-wrap gap-2 mb-2">
          {project.stack.map((tag) => (
           <span
            key={tag}
            className="px-2 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-700 dark:text-zinc-300"
           >
            {tag}
           </span>
          ))}
         </div>
        </CardHeader>
        <CardContent className="grow">
         <CardDescription className="text-sm">
          {project.description}
         </CardDescription>
        </CardContent>
       </Card>
      </motion.div>
     ))}
    </div>
   </div>
  </section>
 );
}
