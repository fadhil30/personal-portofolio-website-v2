"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

type PerformancePreference = "auto" | "on" | "off";

type PerformanceModeContextValue = {
  preference: PerformancePreference;
  isPerformanceMode: boolean;
  isAutoTriggered: boolean;
  setPreference: (preference: PerformancePreference) => void;
  cyclePreference: () => void;
};

type AutoDetectionResult = {
  enabled: boolean;
  reasons: string[];
};

const STORAGE_KEY = "portfolio-performance-preference";

const NEXT_PREFERENCE: Record<PerformancePreference, PerformancePreference> = {
  auto: "on",
  on: "off",
  off: "auto",
};

const PerformanceModeContext = createContext<PerformanceModeContextValue | null>(
  null,
);

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: {
    saveData?: boolean;
    effectiveType?: string;
    addEventListener?: (type: "change", listener: () => void) => void;
    removeEventListener?: (type: "change", listener: () => void) => void;
  };
};

const detectAutoPerformanceMode = (): AutoDetectionResult => {
  if (typeof window === "undefined") {
    return { enabled: false, reasons: [] };
  }

  const reasons: string[] = [];
  const nav = navigator as NavigatorWithHints;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reasons.push("reduced-motion");
  }

  if (typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4) {
    reasons.push("low-memory");
  }

  if (
    typeof navigator.hardwareConcurrency === "number" &&
    navigator.hardwareConcurrency <= 4
  ) {
    reasons.push("low-cpu");
  }

  if (nav.connection?.saveData) {
    reasons.push("save-data");
  }

  if (
    nav.connection?.effectiveType &&
    ["slow-2g", "2g", "3g"].includes(nav.connection.effectiveType)
  ) {
    reasons.push("slow-network");
  }

  return {
    enabled: reasons.length > 0,
    reasons,
  };
};

export function PerformanceModeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [preference, setPreference] = useState<PerformancePreference>("auto");
  const [, setEnvironmentVersion] = useState(0);
  const preferenceLoadedRef = useRef(false);

  useEffect(() => {
    const storedPreference = window.localStorage.getItem(STORAGE_KEY);
    let rafId: number | undefined;

    if (
      storedPreference === "auto" ||
      storedPreference === "on" ||
      storedPreference === "off"
    ) {
      rafId = window.requestAnimationFrame(() => {
        setPreference(storedPreference);
        preferenceLoadedRef.current = true;
      });
    } else {
      preferenceLoadedRef.current = true;
    }

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  useEffect(() => {
    if (!preferenceLoadedRef.current) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, preference);
  }, [preference]);

  useEffect(() => {
    const notifyEnvironmentUpdate = () => {
      setEnvironmentVersion((current) => current + 1);
    };

    const reduceMotionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const nav = navigator as NavigatorWithHints;
    const connection = nav.connection;

    reduceMotionMq.addEventListener("change", notifyEnvironmentUpdate);
    connection?.addEventListener?.("change", notifyEnvironmentUpdate);
    window.addEventListener("focus", notifyEnvironmentUpdate);

    return () => {
      reduceMotionMq.removeEventListener("change", notifyEnvironmentUpdate);
      connection?.removeEventListener?.("change", notifyEnvironmentUpdate);
      window.removeEventListener("focus", notifyEnvironmentUpdate);
    };
  }, []);

  const autoDetection = detectAutoPerformanceMode();

  const cyclePreference = useCallback(() => {
    setPreference((current) => NEXT_PREFERENCE[current]);
  }, []);

  const isPerformanceMode =
    preference === "on" || (preference === "auto" && autoDetection.enabled);

  const value = useMemo<PerformanceModeContextValue>(
    () => ({
      preference,
      isPerformanceMode,
      isAutoTriggered: autoDetection.enabled,
      setPreference,
      cyclePreference,
    }),
    [preference, isPerformanceMode, autoDetection.enabled, cyclePreference],
  );

  return (
    <PerformanceModeContext.Provider value={value}>
      {children}
    </PerformanceModeContext.Provider>
  );
}

export function usePerformanceMode() {
  const context = useContext(PerformanceModeContext);

  if (!context) {
    throw new Error(
      "usePerformanceMode must be used within a PerformanceModeProvider",
    );
  }

  return context;
}
