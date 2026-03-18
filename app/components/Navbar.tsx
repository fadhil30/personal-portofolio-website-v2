"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import NextLink from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { config } from "@/app/data/config";
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const busyRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTlRef = useRef<gsap.core.Timeline | null>(null);

  useLayoutEffect(() => {
    const panel = panelRef.current;
    const layers = layerRefs.current.filter(Boolean);

    if (!panel) {
      return;
    }

    gsap.set([panel, ...layers], { xPercent: 100 });

    return () => {
      openTlRef.current?.kill();
      closeTlRef.current?.kill();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const onScroll = () => {
      setHasScrolled(window.scrollY > 16);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const openMenu = useCallback(() => {
    if (busyRef.current) {
      return;
    }

    const panel = panelRef.current;
    const layers = layerRefs.current.filter(Boolean);

    if (!panel) {
      return;
    }

    busyRef.current = true;
    closeTlRef.current?.kill();
    openTlRef.current?.kill();
    setIsOpen(true);

    gsap.set([panel, ...layers], { xPercent: 100 });

    const tl = gsap.timeline({
      onComplete: () => {
        busyRef.current = false;
      },
    });

    layers.forEach((layer, index) => {
      tl.to(
        layer,
        {
          xPercent: 0,
          duration: 0.5,
          ease: "power4.out",
        },
        index * 0.07,
      );
    });

    tl.to(
      panel,
      {
        xPercent: 0,
        duration: 0.65,
        ease: "power4.out",
      },
      layers.length * 0.07 + 0.05,
    );

    openTlRef.current = tl;
  }, []);

  const closeMenu = useCallback(() => {
    if (busyRef.current) {
      return;
    }

    const panel = panelRef.current;
    const layers = layerRefs.current.filter(Boolean);

    if (!panel) {
      return;
    }

    busyRef.current = true;
    openTlRef.current?.kill();
    closeTlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: () => {
        setIsOpen(false);
        busyRef.current = false;
      },
    });

    tl.to(panel, {
      xPercent: 100,
      duration: 0.3,
      ease: "power3.in",
    });

    layers
      .slice()
      .reverse()
      .forEach((layer, index) => {
        tl.to(
          layer,
          {
            xPercent: 100,
            duration: 0.3,
            ease: "power3.in",
          },
          index * 0.05,
        );
      });

    closeTlRef.current = tl;
  }, []);

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu();
      return;
    }

    openMenu();
  }, [closeMenu, isOpen, openMenu]);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => {
      window.removeEventListener("keydown", onEscape);
    };
  }, [closeMenu, isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-80 border-b transition-all duration-300 ${
          hasScrolled
            ? "border-zinc-200/40 bg-white/35 backdrop-blur-xl dark:border-zinc-800/40 dark:bg-zinc-950/35"
            : "border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80"
        }`}
      >
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <NextLink
            href="/"
            className="relative z-10"
            aria-label="Fadhil.dev home"
            onClick={() => {
              if (isOpen) {
                closeMenu();
              }
            }}
          >
            <Image
              src="/dev-icon.png"
              alt="Fadhil.dev"
              width={40}
              height={40}
              className="h-10 w-10 rounded-md object-cover"
              priority
            />
          </NextLink>

          <div className="flex items-center gap-2">
            {isOpen ? (
              <button
                onClick={toggleMenu}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 transition-colors dark:text-zinc-100"
                aria-label="Close menu"
                aria-expanded="true"
                aria-controls="staggered-menu-panel"
                type="button"
              >
                <span className="sr-only">Close menu</span>
                <span className="absolute block h-0.5 w-5 translate-y-0 rotate-45 rounded-full bg-current transition-all duration-300" />
                <span className="absolute block h-0.5 w-5 rounded-full bg-current opacity-0 transition-all duration-300" />
                <span className="absolute block h-0.5 w-5 translate-y-0 -rotate-45 rounded-full bg-current transition-all duration-300" />
              </button>
            ) : (
              <button
                onClick={toggleMenu}
                className="relative inline-flex h-10 w-10 items-center justify-center rounded-full text-zinc-900 transition-colors dark:text-zinc-100"
                aria-label="Open menu"
                aria-expanded="false"
                aria-controls="staggered-menu-panel"
                type="button"
              >
                <span className="sr-only">Open menu</span>
                <span className="absolute block h-0.5 w-5 -translate-y-1.5 rotate-0 rounded-full bg-current transition-all duration-300" />
                <span className="absolute block h-0.5 w-5 rounded-full bg-current opacity-100 transition-all duration-300" />
                <span className="absolute block h-0.5 w-5 translate-y-1.5 rotate-0 rounded-full bg-current transition-all duration-300" />
              </button>
            )}
          </div>
        </div>
      </motion.nav>

      <div
        className={`fixed inset-0 z-70 ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <button
          type="button"
          className={`absolute inset-0 h-full w-full transition-opacity duration-200 ${
            isOpen
              ? "bg-black/20 opacity-100 backdrop-blur-[2px]"
              : "bg-transparent opacity-0 backdrop-blur-none"
          }`}
          onClick={closeMenu}
          aria-label="Close menu backdrop"
        />

        <div
          ref={(node) => {
            layerRefs.current[0] = node;
          }}
          className="absolute inset-y-0 right-0 w-full bg-zinc-900 md:w-[82%]"
        />
        <div
          ref={(node) => {
            layerRefs.current[1] = node;
          }}
          className="absolute inset-y-0 right-0 w-full bg-zinc-800 md:w-[74%]"
        />
        <div
          ref={(node) => {
            layerRefs.current[2] = node;
          }}
          className="absolute inset-y-0 right-0 w-full bg-zinc-700 md:w-[66%]"
        />

        <aside
          id="staggered-menu-panel"
          ref={panelRef}
          className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-white px-8 pb-10 pt-24 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Navigation
          </p>

          <ul className="space-y-2">
            {config.navigation.map((item, index) => (
              <li key={item.label}>
                <NextLink
                  href={item.href}
                  onClick={closeMenu}
                  className="group flex items-end justify-between border-b border-zinc-200 py-3 text-2xl font-semibold transition-colors hover:text-zinc-600 dark:border-zinc-800 dark:hover:text-zinc-300 sm:text-3xl"
                >
                  <span>{item.label}</span>
                  <span className="text-sm font-medium text-zinc-400 transition-colors group-hover:text-zinc-500 dark:text-zinc-500 dark:group-hover:text-zinc-400">
                    {(index + 1).toString().padStart(2, "0")}
                  </span>
                </NextLink>
              </li>
            ))}
          </ul>

        </aside>
      </div>
    </>
  );
}
