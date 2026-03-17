"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

interface SmoothScrollProps {
 children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
 const lenisRef = useRef<Lenis | null>(null);

 useEffect(() => {
  const lenis = new Lenis({
   duration: 1.8,
   easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });
  lenisRef.current = lenis;

  let rafId: number;
  function raf(time: number) {
   lenis.raf(time);
   rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  return () => {
   cancelAnimationFrame(rafId);
   lenis.destroy();
  };
 }, []);

 return <>{children}</>;
}
