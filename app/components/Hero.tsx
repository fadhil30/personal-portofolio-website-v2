"use client";

import Link from "next/link";
import { File } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { Button } from "./ui/button";
import { BlurIn, BoxReveal } from "./reveal-animations";
import { cn } from "@/app/lib/utils";
import { config } from "@/app/data/config";

export function Hero() {
  return (
    <section
      id="about"
      className="relative w-full h-[calc(100dvh-4rem)] pt-24 overflow-hidden"
    >
      <div className="relative z-10 container mx-auto px-4 h-full grid md:grid-cols-2">
        <div
          className={cn(
            "col-span-1 flex flex-col justify-center items-center md:items-start",
            "px-4 md:px-20 lg:px-24 xl:px-28",
          )}
        >
          <BlurIn delay={0.8}>
            <h1
              className={cn(
                "leading-none font-bold tracking-tighter",
                "text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl",
                "text-zinc-900 dark:text-white",
              )}
            >
              Muhammad
              <br />
              Fadhil
            </h1>
          </BlurIn>

          <BlurIn delay={1}>
            <p className="md:self-start mt-4 text-base text-zinc-600 dark:text-zinc-400 sm:text-lg max-w-md">
              A results-driven Web Developer and Informatics Engineering
              graduate. Specializing in React, Next.js, and scaling web
              applications.
            </p>
          </BlurIn>

          <div className="mt-8 flex flex-col gap-3 w-fit">
            <Link href="https://drive.google.com/" target="_blank">
              <BoxReveal delay={1.4} width="100%">
                <Button className="flex items-center gap-2 w-full">
                  <File size={20} />
                  Resume
                </Button>
              </BoxReveal>
            </Link>
            <div className="flex gap-3">
              <BoxReveal delay={1.8}>
                <div className="flex items-center gap-2">
                  <Link href={config.social.github} target="_blank">
                    <Button variant="outline" size="icon">
                      <SiGithub size={20} />
                    </Button>
                  </Link>
                  <Link
                    href={config.social.linkedin}
                    target="_blank"
                  >
                    <Button variant="outline" size="icon">
                      <FaLinkedinIn size={20} />
                    </Button>
                  </Link>
                </div>
              </BoxReveal>
            </div>
          </div>
        </div>

        {/* Right side is empty — the Spline keyboard fills this space via fixed positioning */}
        <div className="hidden md:block col-span-1" />
      </div>
    </section>
  );
}
