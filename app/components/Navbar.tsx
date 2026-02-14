"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NextLink from "next/link";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/app/lib/utils";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Education", href: "#education" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Certificates", href: "#certificates" },
  { name: "Skills", href: "#skills" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <NextLink
          href="/"
          className="text-xl font-bold tracking-tighter z-50 relative"
        >
          Fadhil.dev
        </NextLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <NextLink
              key={item.name}
              href={item.href}
              className="text-sm font-medium hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
            >
              {item.name}
            </NextLink>
          ))}
          <NextLink
            href="#contact"
            className={cn(buttonVariants({ variant: "primary", size: "sm" }))}
          >
            Contact Me
          </NextLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden z-50 relative p-2 text-zinc-600 dark:text-zinc-300"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-white dark:bg-zinc-950 flex flex-col items-center justify-center gap-8 md:hidden"
            >
              {navItems.map((item) => (
                <NextLink
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                >
                  {item.name}
                </NextLink>
              ))}
              <NextLink
                href="#contact"
                onClick={() => setIsOpen(false)}
                className={cn(
                  buttonVariants({ variant: "primary", size: "lg" }),
                  "mt-4",
                )}
              >
                Contact Me
              </NextLink>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
