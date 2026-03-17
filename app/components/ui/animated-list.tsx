"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/app/lib/utils";

interface AnimatedListProps extends React.HTMLAttributes<HTMLUListElement> {
 staggerDelay?: number;
 itemDuration?: number;
 once?: boolean;
 amount?: number;
}

const itemVariants = {
 hidden: { opacity: 0, y: 20 },
 visible: { opacity: 1, y: 0 },
};

export function AnimatedList({
 className,
 children,
 staggerDelay = 0.12,
 itemDuration = 0.45,
 once = true,
 amount = 0.2,
 ...props
}: AnimatedListProps) {
 const childArray = React.Children.toArray(children);

 return (
  <motion.ul
   className={cn("space-y-6", className)}
   initial="hidden"
   whileInView="visible"
   viewport={{ once, amount }}
   variants={{
    hidden: {},
    visible: {
     transition: {
      staggerChildren: staggerDelay,
     },
    },
   }}
   {...props}
  >
   {childArray.map((child, index) => (
    <motion.li
     key={
      React.isValidElement(child) && child.key != null
       ? String(child.key)
       : `animated-list-item-${index}`
     }
     variants={itemVariants}
     transition={{ duration: itemDuration, ease: [0.22, 1, 0.36, 1] }}
    >
     {child}
    </motion.li>
   ))}
  </motion.ul>
 );
}
