"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/app/lib/utils";
import ReactBitsParticles from "./ReactBitsParticles";

type AppLoadingGateProps = {
  children: ReactNode;
};

const LOADER_PARTICLE_COLORS = ["#f8fafc", "#d4d4d8", "#ffffff"];

const wait = (ms: number) =>
  new Promise<void>((resolve) => {
    window.setTimeout(resolve, ms);
  });

const waitForNextPaint = () =>
  new Promise<void>((resolve) => {
    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => resolve());
    });
  });

const waitForWindowLoad = (signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    if (document.readyState === "complete" || signal.aborted) {
      resolve();
      return;
    }

    const onLoad = () => {
      resolve();
    };

    const onAbort = () => {
      window.removeEventListener("load", onLoad);
      resolve();
    };

    signal.addEventListener("abort", onAbort, { once: true });
    window.addEventListener("load", onLoad, { once: true });
  });

const waitForFonts = async () => {
  const fontSet = document.fonts;

  if (!fontSet?.ready) {
    return;
  }

  try {
    await fontSet.ready;
  } catch {
    // Keep loader resilient if browser font loading fails.
  }
};

const preloadImage = (src: string) =>
  new Promise<void>((resolve) => {
    const img = new window.Image();
    let settled = false;

    const done = () => {
      if (settled) {
        return;
      }

      settled = true;
      resolve();
    };

    img.addEventListener("load", done, { once: true });
    img.addEventListener("error", done, { once: true });
    img.src = src;

    if (img.complete) {
      done();
    }
  });

export default function AppLoadingGate({ children }: AppLoadingGateProps) {
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isLoading]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setProgress((current) => {
        if (current >= targetProgress) {
          return current;
        }

        const remaining = targetProgress - current;
        const step =
          remaining > 30 ? 4 : remaining > 15 ? 2.2 : remaining > 6 ? 1.1 : 0.5;
        const next = Math.min(targetProgress, current + step);

        return Number(next.toFixed(1));
      });
    }, 32);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [isLoading, targetProgress]);

  useEffect(() => {
    if (!isLoading) {
      return;
    }

    let isCancelled = false;
    let completeTimeoutId: number | undefined;
    let exitTimeoutId: number | undefined;
    const controller = new AbortController();
    const startedAt = performance.now();

    const checkpoint = (value: number) => {
      if (isCancelled) {
        return;
      }

      setTargetProgress((current) => Math.max(current, value));
    };

    const finishLoading = () => {
      checkpoint(100);

      completeTimeoutId = window.setTimeout(() => {
        if (isCancelled) {
          return;
        }

        setIsExiting(true);

        exitTimeoutId = window.setTimeout(() => {
          if (isCancelled) {
            return;
          }

          setIsLoading(false);
        }, 420);
      }, 540);
    };

    const runBootSequence = async () => {
      checkpoint(10);
      await waitForNextPaint();

      checkpoint(28);
      await Promise.all([waitForFonts(), preloadImage("/dev-icon.png")]);

      checkpoint(58);
      await waitForWindowLoad(controller.signal);

      checkpoint(82);
      const elapsedMs = performance.now() - startedAt;
      const minimumBootMs = 1900;

      if (elapsedMs < minimumBootMs) {
        await wait(minimumBootMs - elapsedMs);
      }

      finishLoading();
    };

    void runBootSequence().catch(() => {
      finishLoading();
    });

    return () => {
      isCancelled = true;
      controller.abort();

      if (completeTimeoutId) {
        window.clearTimeout(completeTimeoutId);
      }

      if (exitTimeoutId) {
        window.clearTimeout(exitTimeoutId);
      }
    };
  }, [isLoading]);

  const overlay = isLoading ? (
    <div
      className={cn("retro-loader-overlay", isExiting && "retro-loader-overlay--exit")}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio experience"
    >
      <ReactBitsParticles
        className="retro-loader-particles"
        particleCount={120}
        particleSpread={11}
        speed={0.08}
        particleColors={LOADER_PARTICLE_COLORS}
        moveParticlesOnHover={false}
        alphaParticles
        particleBaseSize={95}
        sizeRandomness={0.75}
        cameraDistance={22}
        pixelRatio={1}
      />

      <div className="retro-loader-minimal">
        <p className="retro-loader-title">
          LOADING
          <span className="retro-loader-dots" aria-hidden="true">
            ...
          </span>
          <span className="retro-loader-dot-last" aria-hidden="true">
            .
          </span>
        </p>

        <div className="retro-loader-bar-frame" aria-hidden="true">
          <div className="retro-loader-bar">
            <div className="retro-loader-bar-inner">
              <div className="retro-loader-bar-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <span className="sr-only">{Math.round(progress)} percent loaded</span>
      </div>
    </div>
  ) : null;

  return (
    <div className="relative">
      <div
        aria-hidden={isLoading}
        className={cn(
          "transition-opacity duration-300",
          isLoading ? "pointer-events-none opacity-0" : "opacity-100",
        )}
      >
        {children}
      </div>

      {isLoading &&
        overlay}
    </div>
  );
}
