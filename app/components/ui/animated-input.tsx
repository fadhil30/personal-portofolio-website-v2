"use client";

import React from "react";
import { cn } from "@/app/lib/utils";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

interface AnimatedInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const AnimatedInput = React.forwardRef<
  HTMLInputElement,
  AnimatedInputProps
>(({ className, type, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            rgba(255, 255, 255, 0.15),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <input
        type={type}
        className={cn(
          "flex h-10 w-full border-none bg-zinc-800 text-white rounded-md px-3 py-2 text-sm",
          "placeholder:text-neutral-400",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "shadow-[0px_0px_1px_1px_rgba(82,82,91,0.8)]",
          "group-hover/input:shadow-none transition duration-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
AnimatedInput.displayName = "AnimatedInput";

interface AnimatedTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const AnimatedTextarea = React.forwardRef<
  HTMLTextAreaElement,
  AnimatedTextareaProps
>(({ className, ...props }, ref) => {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      style={{
        background: useMotionTemplate`
          radial-gradient(
            ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
            rgba(255, 255, 255, 0.15),
            transparent 80%
          )
        `,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="p-[2px] rounded-lg transition duration-300 group/input"
    >
      <textarea
        className={cn(
          "flex min-h-20 h-28 w-full border-none bg-zinc-800/90 text-white rounded-md px-3 py-2 text-sm resize-none",
          "placeholder:text-zinc-500",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "shadow-[0px_0px_1px_1px_rgba(63,63,70,0.5)]",
          "group-hover/input:shadow-none transition duration-400",
          className,
        )}
        ref={ref}
        {...props}
      />
    </motion.div>
  );
});
AnimatedTextarea.displayName = "AnimatedTextarea";
