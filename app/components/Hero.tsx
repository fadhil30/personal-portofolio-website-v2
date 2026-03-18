"use client";

import Link from "next/link";
import { File } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "./ui/button";
import { BlurIn, BoxReveal } from "./reveal-animations";
import { cn } from "@/app/lib/utils";
import { config } from "@/app/data/config";

const EXTERNAL_LINK_REL = "noopener noreferrer";

export function Hero() {
  return (
    <section
      id="about"
      className="relative w-full min-h-[70svh] overflow-hidden pb-4 pt-16 md:min-h-[calc(100dvh-2rem)] md:pb-0"
    >
      <div className="relative z-10 container mx-auto grid h-full items-center px-4 md:grid-cols-2">
        <div
          className={cn(
            "col-span-1 flex w-full flex-col items-center justify-start pt-2 sm:pt-6 md:justify-center md:pt-0 md:items-start",
            "px-4 md:px-20 lg:px-24 xl:px-28",
          )}
        >
          <div className="w-full max-w-xs sm:max-w-md">
            <BlurIn delay={0.7}>
              <p className="mb-3 text-left text-xl font-semibold text-zinc-500 dark:text-zinc-400 sm:text-2xl">
                Hi, I am
              </p>
            </BlurIn>

            <BlurIn delay={0.8}>
              <h1
                className={cn(
                  "text-left leading-none font-bold tracking-tighter",
                  "text-4xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl",
                  "text-zinc-900 dark:text-white",
                )}
              >
                Muhammad
                <br />
                Fadhil
              </h1>
            </BlurIn>

            <BlurIn delay={1}>
              <p className="mt-4 max-w-xs text-left text-base text-zinc-600 dark:text-zinc-400 sm:max-w-md sm:text-lg md:self-start">
                A results-driven Web Developer and Informatics Engineering
                graduate. Specializing in React, Next.js, and scaling web
                applications.
              </p>
            </BlurIn>

            <div className="mt-6 flex w-full max-w-xs flex-col gap-3 sm:w-fit sm:max-w-none">
              <BoxReveal delay={1.4} width="100%">
                <a href="/resume-muhammad-fadhil-hidayatullah.pdf" download>
                  <Button className="flex items-center gap-2 w-full">
                    <File size={20} />
                    Resume
                  </Button>
                </a>
              </BoxReveal>
              <div className="flex justify-center gap-3 md:justify-start">
                <BoxReveal delay={1.8}>
                  <div className="flex items-center gap-2">
                    <Link
                      href={config.social.github}
                      target="_blank"
                      rel={EXTERNAL_LINK_REL}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Open GitHub profile"
                      >
                        <SiGithub size={20} />
                      </Button>
                    </Link>
                    <Link
                      href={config.social.linkedin}
                      target="_blank"
                      rel={EXTERNAL_LINK_REL}
                    >
                      <Button
                        variant="outline"
                        size="icon"
                        aria-label="Open LinkedIn profile"
                      >
                        <FaLinkedinIn size={20} />
                      </Button>
                    </Link>
                  </div>
                </BoxReveal>
              </div>
            </div>
          </div>
        </div>

        {/* Right side is empty - the Spline keyboard fills this space via fixed positioning */}
        <div className="hidden md:block col-span-1" />
      </div>
    </section>
  );
}
