"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

interface SpotlightCardProps extends React.PropsWithChildren {
 className?: string;
 spotlightColor?: string;
}

export function SpotlightCard({
 className = "",
 spotlightColor = "rgba(255, 255, 255, 0.25)",
 children,
}: SpotlightCardProps) {
 const divRef = React.useRef<HTMLDivElement>(null);
 const [position, setPosition] = React.useState({ x: 0, y: 0 });
 const [opacity, setOpacity] = React.useState(0);

 const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
  if (!divRef.current) return;

  const rect = event.currentTarget.getBoundingClientRect();
  setPosition({
   x: event.clientX - rect.left,
   y: event.clientY - rect.top,
  });
 };

 return (
  <div
   ref={divRef}
   onMouseMove={handleMouseMove}
   onMouseEnter={() => setOpacity(1)}
   onMouseLeave={() => setOpacity(0)}
   className={cn(
    "relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 p-8",
    className,
   )}
  >
   <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-in-out"
    style={{
     opacity,
     background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 80%)`,
    }}
   />
   <div className="relative z-10 h-full">{children}</div>
  </div>
 );
}
