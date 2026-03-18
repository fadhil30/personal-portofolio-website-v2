type NavigationItem = {
  label: string;
  href: `#${string}`;
};

type SiteConfig = {
  title: string;
  description: {
    long: string;
    short: string;
  };
  author: string;
  email: string;
  siteUrl: string;
  social: {
    linkedin: string;
    github: string;
  };
  navigation: NavigationItem[];
};

const config: SiteConfig = {
  title: "Fadhil | Web Developer",
  description: {
    long: "Personal portfolio of Fadhil, a results-driven Web Developer and Informatics Engineering graduate specializing in React, Next.js, and scaling web applications.",
    short:
      "Web Developer specializing in React, Next.js, and modern web technologies.",
  },
  author: "Muhammad Fadhil",
  email: "fadhilh300501@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "",
  social: {
    linkedin: "https://www.linkedin.com/in/muhammad-fadhil-hidayatullah/",
    github: "https://github.com/fadhil30",
  },
  navigation: [
    { label: "About", href: "#about" },
    { label: "Education", href: "#education" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact Me", href: "#contact" },
  ],
};

export { config };
export type { NavigationItem, SiteConfig };
