"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight, Loader2, Check } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { FaLinkedinIn } from "react-icons/fa";
import { BoxReveal } from "./reveal-animations";
import { AnimatedInput, AnimatedTextarea } from "./ui/animated-input";
import { Button } from "./ui/button";
import { config } from "@/app/data/config";

function BottomGradient() {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-linear-to-r from-transparent via-white to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-linear-to-r from-transparent via-white/60 to-transparent" />
    </>
  );
}

export function Footer() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const subject = encodeURIComponent(`Portfolio Contact from ${fullName}`);
    const body = encodeURIComponent(
      `Name: ${fullName}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:${config.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFullName("");
      setEmail("");
      setMessage("");
      setTimeout(() => setSubmitted(false), 3000);
    }, 500);
  };

  const displayEmail = config.email.replace(/@/g, "(at)");

  return (
    <footer
      id="contact"
      className="relative min-h-screen overflow-hidden pb-10 text-white"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section Header - Sticky */}
        <div className="z-20 mb-8 md:sticky md:top-17.5 md:mb-32">
          <BoxReveal width="100%" delay={0.2}>
            <h2 className="text-center text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-8xl">
              LET&apos;S WORK
              <br />
              TOGETHER
            </h2>
          </BoxReveal>
        </div>

        {/* 2-column grid: form on left, right is empty for 3D keyboard */}
        <div className="mx-0 grid grid-cols-1 md:mx-4 md:grid-cols-2">
          <div className="mt-2 rounded-xl border border-zinc-700/60 bg-zinc-900/90 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-md md:mt-2">
            {/* Card Header */}
            <div className="p-5 pb-2 sm:p-6">
              <h3 className="mb-2 text-3xl font-bold md:text-4xl">
                Contact Form
              </h3>
              <p className="text-zinc-400 text-sm">
                Please contact me directly at{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${config.email}`}
                  className="text-zinc-200 font-semibold hover:text-white transition-colors"
                >
                  {displayEmail}
                </a>{" "}
                or drop your info here.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <Link href={config.social.github} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/25 text-white hover:bg-white/10 hover:text-white dark:border-white/25 dark:hover:bg-white/10"
                  >
                    <SiGithub size={20} />
                  </Button>
                </Link>
                <Link href={config.social.linkedin} target="_blank">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-white/25 text-white hover:bg-white/10 hover:text-white dark:border-white/25 dark:hover:bg-white/10"
                  >
                    <FaLinkedinIn size={20} />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Card Content - Form */}
            <div className="p-5 pt-4 sm:p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4 flex flex-col gap-2 md:flex-row md:gap-2">
                  <div className="flex flex-col space-y-2 w-full">
                    <label
                      htmlFor="fullname"
                      className="text-sm font-bold text-zinc-200"
                    >
                      Full name
                    </label>
                    <AnimatedInput
                      id="fullname"
                      placeholder="Your Name"
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col space-y-2 w-full">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold text-zinc-200"
                    >
                      Email Address
                    </label>
                    <AnimatedInput
                      id="email"
                      placeholder="you@example.com"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid w-full gap-1.5 mb-4">
                  <label
                    htmlFor="message"
                    className="text-sm font-bold text-zinc-200"
                  >
                    Your Message
                  </label>
                  <AnimatedTextarea
                    id="message"
                    placeholder="Tell me about your project,"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <p className="text-sm text-zinc-500">
                    I&apos;ll never share your data with anyone else. Pinky
                    promise!
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="relative group/btn bg-zinc-900 border border-zinc-700/60 block w-full text-white rounded-lg h-12 font-bold transition-all duration-300 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      <span>Please wait</span>
                    </div>
                  ) : submitted ? (
                    <div className="flex items-center justify-center text-green-400">
                      <Check className="mr-2 h-4 w-4" />
                      <span>Message Sent!</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center">
                      <span>Send Message</span>
                      <ChevronRight className="w-4 h-4 ml-4" />
                    </div>
                  )}
                  <BottomGradient />
                </button>
              </form>
            </div>
          </div>
          {/* Right column intentionally empty - 3D keyboard shows through */}
        </div>

        {/* Copyright */}
        <div className="mt-14 border-t border-white/10 pt-8 text-center md:mt-20">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Fadhil.dev. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
