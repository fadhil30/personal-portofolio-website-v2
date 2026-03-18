"use client";

import { useEffect, useRef, useState } from "react";
import { usePerformanceMode } from "../PerformanceModeProvider";

type Point = {
  x: number;
  y: number;
};

const BASE_SIZE = 48;
const HOVER_PADDING = 18;

const HOVERABLE_SELECTOR = [
  "a",
  "button",
  "[role='button']",
  "summary",
  "label",
  ".cursor-can-hover",
].join(", ");

const NATIVE_CURSOR_SELECTOR = [
  "[data-no-custom-cursor='true']",
  "input",
  "textarea",
  "select",
  "[contenteditable='true']",
].join(", ");

const lerp = (from: number, to: number, amount: number) =>
  from + (to - from) * amount;

export default function ElasticCursor() {
  const [enabled, setEnabled] = useState(false);
  const { isPerformanceMode } = usePerformanceMode();
  const blobRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const targetRef = useRef<Point>({ x: 0, y: 0 });
  const currentRef = useRef<Point>({ x: 0, y: 0 });
  const previousRef = useRef<Point>({ x: 0, y: 0 });
  const hoverRectRef = useRef<DOMRect | null>(null);
  const hiddenRef = useRef(false);
  const movedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const cursorMq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateEnabled = () => {
      setEnabled(cursorMq.matches && !reduceMq.matches && !isPerformanceMode);
    };

    updateEnabled();
    cursorMq.addEventListener("change", updateEnabled);
    reduceMq.addEventListener("change", updateEnabled);

    return () => {
      cursorMq.removeEventListener("change", updateEnabled);
      reduceMq.removeEventListener("change", updateEnabled);
    };
  }, [isPerformanceMode]);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove("custom-cursor-enabled");
      return;
    }

    document.body.classList.add("custom-cursor-enabled");

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const blob = blobRef.current;
    const dot = dotRef.current;

    if (!blob || !dot) {
      return;
    }

    let rafId = 0;

    const setFromEvent = (event: MouseEvent) => {
      movedRef.current = true;
      targetRef.current.x = event.clientX;
      targetRef.current.y = event.clientY;

      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        hiddenRef.current = false;
        hoverRectRef.current = null;
        return;
      }

      hiddenRef.current = Boolean(target.closest(NATIVE_CURSOR_SELECTOR));

      const hoverEl = target.closest(HOVERABLE_SELECTOR);
      if (hoverEl instanceof HTMLElement) {
        hoverRectRef.current = hoverEl.getBoundingClientRect();
      } else {
        hoverRectRef.current = null;
      }
    };

    const animate = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const previous = previousRef.current;

      let desiredX = target.x;
      let desiredY = target.y;
      const hoverRect = hoverRectRef.current;

      if (hoverRect) {
        desiredX = hoverRect.left + hoverRect.width / 2;
        desiredY = hoverRect.top + hoverRect.height / 2;
      }

      current.x = lerp(current.x, desiredX, hoverRect ? 0.2 : 0.18);
      current.y = lerp(current.y, desiredY, hoverRect ? 0.2 : 0.18);

      const dx = current.x - previous.x;
      const dy = current.y - previous.y;
      previous.x = current.x;
      previous.y = current.y;

      const speed = Math.sqrt(dx * dx + dy * dy);
      const stretch = Math.min(speed / 38, 0.35);
      const angle = hoverRect ? 0 : (Math.atan2(dy, dx) * 180) / Math.PI;

      const width = hoverRect ? hoverRect.width + HOVER_PADDING : BASE_SIZE;
      const height = hoverRect ? hoverRect.height + HOVER_PADDING : BASE_SIZE;
      const radius = hoverRect ? 12 : 999;

      const opacity = movedRef.current && !hiddenRef.current ? 1 : 0;
      blob.style.opacity = `${opacity}`;
      dot.style.opacity = `${opacity}`;

      blob.style.width = `${Math.max(width, 22)}px`;
      blob.style.height = `${Math.max(height, 22)}px`;
      blob.style.borderRadius = `${radius}px`;
      blob.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleX(${1 + stretch}) scaleY(${1 - stretch * 0.6})`;

      dot.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", setFromEvent, { passive: true });
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", setFromEvent);
      window.cancelAnimationFrame(rafId);
    };
  }, [enabled]);

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div
        ref={blobRef}
        className="pointer-events-none fixed left-0 top-0 z-[999] h-12 w-12 -translate-x-1/2 -translate-y-1/2 border-2 border-black/90 transition-opacity duration-150 will-change-transform dark:border-white/90"
        style={{
          opacity: 0,
          backdropFilter: "invert(100%)",
        }}
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[1000] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full transition-opacity duration-150 will-change-transform"
        style={{
          opacity: 0,
          backdropFilter: "invert(100%)",
        }}
      />
    </>
  );
}
