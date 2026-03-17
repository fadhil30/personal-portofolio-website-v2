export enum SkillNames {
  // These values must match key object names inside the Spline scene.
  JS = "js",
  TS = "ts",
  HTML = "html",
  CSS = "css",
  REACT = "react",
  VUE = "vue",
  NEXTJS = "nextjs",
  TAILWIND = "tailwind",
  NODEJS = "nodejs",
  EXPRESS = "express",
  POSTGRES = "postgres",
  MONGODB = "mongodb",
  GIT = "git",
  DOCKER = "docker",
  JAVA = "aws",
  DART = "nginx",
  SWIFT = "vim",
  FLUTTER = "vercel",
  LARAVEL = "wordpress",
  PHP = "npm",
  MYSQL = "firebase",
  PRISMA = "linux",
  MYSQL_WORKBENCH = "prettier",
  GIT_ALT = "github",
}

export type Skill = {
  id: number;
  name: string;
  label: string;
  shortDescription: string;
  color: string;
  icon: string;
};

export const SKILLS: Record<SkillNames, Skill> = {
  [SkillNames.JS]: {
    id: 1,
    name: "js",
    label: "JavaScript",
    shortDescription:
      "The language of the web for interactive interfaces and logic.",
    color: "#f0db4f",
    icon: "/assets/skills-png/javascript-original.png",
  },
  [SkillNames.TS]: {
    id: 2,
    name: "ts",
    label: "TypeScript",
    shortDescription:
      "Type-safe JavaScript for more maintainable and scalable apps.",
    color: "#007acc",
    icon: "/assets/skills-png/typescript-original.png",
  },
  [SkillNames.HTML]: {
    id: 3,
    name: "html",
    label: "HTML",
    shortDescription:
      "Semantic structure for building accessible, standards-based pages.",
    color: "#e34c26",
    icon: "/assets/skills-png/html5-original.png",
  },
  [SkillNames.CSS]: {
    id: 4,
    name: "css",
    label: "CSS",
    shortDescription:
      "Styling language for layouts, responsiveness, and visual polish.",
    color: "#563d7c",
    icon: "/assets/skills-png/css3-original.png",
  },
  [SkillNames.REACT]: {
    id: 5,
    name: "react",
    label: "React",
    shortDescription:
      "Component-based library for fast and composable user interfaces.",
    color: "#61dafb",
    icon: "/assets/skills-png/react-white.png",
  },
  [SkillNames.VUE]: {
    id: 6,
    name: "vue",
    label: "Vue",
    shortDescription:
      "Progressive framework that is flexible, approachable, and fast.",
    color: "#41b883",
    icon: "/assets/skills-png/vuejs-white.png",
  },
  [SkillNames.NEXTJS]: {
    id: 7,
    name: "nextjs",
    label: "Next.js",
    shortDescription:
      "React framework for production apps with routing and SSR.",
    color: "#ffffff",
    icon: "/assets/skills-png/nextjs-white.png",
  },
  [SkillNames.TAILWIND]: {
    id: 8,
    name: "tailwind",
    label: "Tailwind CSS",
    shortDescription:
      "Utility-first CSS framework for rapid and consistent styling.",
    color: "#38bdf8",
    icon: "/assets/skills-png/tailwindcss-white.png",
  },
  [SkillNames.NODEJS]: {
    id: 9,
    name: "nodejs",
    label: "Node.js",
    shortDescription:
      "JavaScript runtime for building scalable backend services.",
    color: "#6cc24a",
    icon: "/assets/skills-png/nodejs-original.png",
  },
  [SkillNames.EXPRESS]: {
    id: 10,
    name: "express",
    label: "Express.js",
    shortDescription: "Minimal Node.js framework for APIs and web backends.",
    color: "#999999",
    icon: "/assets/skills-png/express-white.png",
  },
  [SkillNames.POSTGRES]: {
    id: 11,
    name: "postgres",
    label: "PostgreSQL",
    shortDescription:
      "Advanced relational database known for reliability and features.",
    color: "#336791",
    icon: "/assets/skills-png/postgresql-original.png",
  },
  [SkillNames.MONGODB]: {
    id: 12,
    name: "mongodb",
    label: "MongoDB",
    shortDescription:
      "Document database designed for flexible schema development.",
    color: "#13aa52",
    icon: "/assets/skills-png/mongodb-original.png",
  },
  [SkillNames.GIT]: {
    id: 13,
    name: "git",
    label: "Git",
    shortDescription:
      "Version control system for tracking and collaborating on code.",
    color: "#f34f29",
    icon: "/assets/skills-png/git-white.png",
  },
  [SkillNames.DOCKER]: {
    id: 14,
    name: "docker",
    label: "Docker",
    shortDescription:
      "Container platform for consistent development and deployment.",
    color: "#0db7ed",
    icon: "/assets/skills-png/docker-original.png",
  },
  [SkillNames.JAVA]: {
    id: 15,
    name: "aws",
    label: "Java",
    shortDescription:
      "General-purpose language used for backend and enterprise apps.",
    color: "#ed8b00",
    icon: "/assets/skills-png/java-original.png",
  },
  [SkillNames.DART]: {
    id: 16,
    name: "nginx",
    label: "Dart",
    shortDescription:
      "Language optimized for fast UI apps, especially with Flutter.",
    color: "#0175c2",
    icon: "/assets/skills-png/dart-original.png",
  },
  [SkillNames.SWIFT]: {
    id: 17,
    name: "vim",
    label: "Swift",
    shortDescription:
      "Modern language for building fast and safe iOS applications.",
    color: "#fa7343",
    icon: "/assets/skills-png/swift-original.png",
  },
  [SkillNames.FLUTTER]: {
    id: 18,
    name: "vercel",
    label: "Flutter",
    shortDescription:
      "Cross-platform SDK for high-performance mobile applications.",
    color: "#02569b",
    icon: "/assets/skills-png/flutter-original.png",
  },
  [SkillNames.LARAVEL]: {
    id: 19,
    name: "wordpress",
    label: "Laravel",
    shortDescription:
      "PHP framework with expressive syntax and robust tooling.",
    color: "#ff2d20",
    icon: "/assets/skills-png/laravel-original.png",
  },
  [SkillNames.PHP]: {
    id: 20,
    name: "npm",
    label: "PHP",
    shortDescription:
      "Server-side scripting language used for dynamic web apps.",
    color: "#777bb4",
    icon: "/assets/skills-png/php-original.png",
  },
  [SkillNames.MYSQL]: {
    id: 21,
    name: "firebase",
    label: "MySQL",
    shortDescription:
      "Popular relational database for transactional applications.",
    color: "#00758f",
    icon: "/assets/skills-png/mysql-original.png",
  },
  [SkillNames.PRISMA]: {
    id: 22,
    name: "linux",
    label: "Prisma",
    shortDescription:
      "Type-safe ORM for modern TypeScript and Node.js applications.",
    color: "#2d3748",
    icon: "/assets/skills-png/prisma-original.png",
  },
  [SkillNames.MYSQL_WORKBENCH]: {
    id: 23,
    name: "prettier",
    label: "Node.js",
    shortDescription:
      "JavaScript runtime for building scalable backend services.",
    color: "#6cc24a",
    icon: "/assets/skills-png/nodejs-original.png",
  },
  [SkillNames.GIT_ALT]: {
    id: 24,
    name: "github",
    label: "Vercel",
    shortDescription:
      "Cloud platform for deploying and scaling modern web apps.",
    color: "#111111",
    icon: "/assets/skills-png/vercel-white.svg",
  },
};

export type Experience = {
  id: number;
  startDate: string;
  endDate: string;
  title: string;
  company: string;
  description: string[];
  skills: SkillNames[];
};

export const EXPERIENCE: Experience[] = [
  {
    id: 1,
    startDate: "Jun 2025",
    endDate: "Present",
    title: "Jr. Web Developer",
    company: "ESCO Lifescience",
    description: [
      "Leading website maintenance and feature enhancement.",
      "Engineered custom hybrid translation system with DeepL API.",
      "Spearheaded 'Filtracheck' mobile app development with Flutter.",
    ],
    skills: [
      SkillNames.NEXTJS,
      SkillNames.LARAVEL,
      SkillNames.VUE,
      SkillNames.FLUTTER,
      SkillNames.MYSQL,
    ],
  },
  {
    id: 2,
    startDate: "Feb 2025",
    endDate: "May 2025",
    title: "Software Engineer Intern",
    company: "ESCO Lifescience",
    description: [
      "Developed internal web tools using React and Node.js.",
      "Migrated legacy components to modern frameworks.",
    ],
    skills: [SkillNames.REACT, SkillNames.NODEJS, SkillNames.TS],
  },
  {
    id: 3,
    startDate: "Feb 2023",
    endDate: "Jun 2023",
    title: "iOS Developer Intern",
    company: "M-Knows Consulting",
    description: [
      "Contributed to 'Kampus Gratis' LMS platform.",
      "Engineered core functionalities for user and admin interfaces.",
    ],
    skills: [SkillNames.SWIFT, SkillNames.FLUTTER, SkillNames.DART],
  },
];
