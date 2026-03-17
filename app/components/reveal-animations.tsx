"use client";

import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, Variant } from "framer-motion";
import { cn } from "@/app/lib/utils";

// BlurIn - Text appears with blur-to-clear transition
interface BlurInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: { hidden: Variant; visible: Variant };
}

export function BlurIn({
  children,
  className,
  delay = 0,
  duration = 0.8,
  variant,
}: BlurInProps) {
  const defaultVariants = {
    hidden: { filter: "blur(10px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  };
  const variants = variant || defaultVariants;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      transition={{ duration, delay }}
      variants={variants}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

// BoxReveal - Content slides in with a colored box overlay
interface BoxRevealProps {
  children: React.ReactNode;
  width?: string;
  delay?: number;
  boxColor?: string;
  duration?: number;
}

export function BoxReveal({
  children,
  width = "fit-content",
  delay = 0.5,
  boxColor = "#18181b",
  duration = 0.5,
}: BoxRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        width === "100%" ? "w-full" : "w-fit",
      )}
    >
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration, delay }}
      >
        {children}
      </motion.div>
      <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration, delay }}
        className="absolute top-1 bottom-1 left-0 right-0 z-20 box-reveal-overlay"
        {...(boxColor !== "#18181b" && {
          style: { "--box-reveal-color": boxColor } as React.CSSProperties,
        })}
      />
    </div>
  );
}

// RevealAnimation - Generic scroll-triggered reveal
interface RevealAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function RevealAnimation({
  children,
  className,
  delay = 0,
}: RevealAnimationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
