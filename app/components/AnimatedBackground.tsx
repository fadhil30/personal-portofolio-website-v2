"use client";

import React, { Suspense, useCallback, useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill } from "@/app/data/constants";
import { Section, getKeyboardState } from "./animated-background-config";
import { applySkillIconsToKeyboard } from "./animated-background/apply-skill-icons";
import {
  SKILL_ICON_APPLY_DELAY_MS,
  SPLINE_SCENE_PATH,
} from "./animated-background/constants";
import { createKeycapsAnimation } from "./animated-background/keycap-animations";
import { setupScrollAnimations } from "./animated-background/scroll-animations";
import { getSkillForObjectName } from "./animated-background/skill-mapping";
import { setupSplineInteractions } from "./animated-background/spline-interactions";
import type { KeycapAnimations } from "./animated-background/types";
import { useMediaQuery } from "./animated-background/use-media-query";
import { sleep } from "./animated-background/utils";

gsap.registerPlugin(ScrollTrigger);

const AnimatedBackground = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);
  const revealInProgressRef = useRef(false);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [isReady, setIsReady] = useState(false);
  const keycapAnimationsRef = useRef<KeycapAnimations | null>(null);

  const clearScrollTriggers = useCallback(() => {
    scrollTriggersRef.current.forEach((trigger) => trigger.kill());
    scrollTriggersRef.current = [];
  }, []);

  const revealKeyboard = async ({ force = false }: { force?: boolean } = {}) => {
    if (!splineApp) return;
    if (revealInProgressRef.current) return;
    if (isReady && !force) return;

    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    revealInProgressRef.current = true;
    try {
      if (force) {
        setActiveSection("hero");
        keycapAnimationsRef.current?.stop();
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }

      kbd.visible = false;
      await sleep(400);
      kbd.visible = true;
      setIsReady(true);

      const currentState = getKeyboardState({ section: "hero", isMobile });
      gsap.fromTo(
        kbd.scale,
        { x: 0.01, y: 0.01, z: 0.01 },
        { ...currentState.scale, duration: 1.5, ease: "elastic.out(1, 0.6)" },
      );

      const allObjects = splineApp.getAllObjects();
      const keycaps = allObjects.filter((obj) => obj.name === "keycap");

      await sleep(900);

      if (isMobile) {
        const mobileKeyCaps = allObjects.filter(
          (obj) => obj.name === "keycap-mobile",
        );
        mobileKeyCaps.forEach((keycap) => {
          keycap.visible = true;
        });
      } else {
        const desktopKeyCaps = allObjects.filter(
          (obj) => obj.name === "keycap-desktop",
        );
        desktopKeyCaps.forEach(async (keycap, idx) => {
          await sleep(idx * 70);
          keycap.visible = true;
        });
      }

      keycaps.forEach(async (keycap, idx) => {
        keycap.visible = false;
        await sleep(idx * 70);
        keycap.visible = true;
        gsap.fromTo(
          keycap.position,
          { y: 200 },
          { y: 50, duration: 0.5, delay: 0.1, ease: "bounce.out" },
        );
      });
    } finally {
      revealInProgressRef.current = false;
    }
  };

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp || !splineContainer.current) return;

    setupSplineInteractions({
      splineApp,
      resolveSkill: getSkillForObjectName,
      selectedSkillRef,
      setSelectedSkill,
    });

    setupScrollAnimations({
      splineApp,
      isMobile,
      setActiveSection,
      addScrollTrigger: (trigger) => {
        scrollTriggersRef.current.push(trigger);
      },
      onIntroReplay: () => revealKeyboard({ force: true }),
    });

    keycapAnimationsRef.current = createKeycapsAnimation(splineApp);

    return () => {
      clearScrollTriggers();
      keycapAnimationsRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearScrollTriggers, isMobile, splineApp]);

  useEffect(() => {
    if (!splineApp || !isReady) return;
    const timeout = setTimeout(() => {
      void applySkillIconsToKeyboard(splineApp);
    }, SKILL_ICON_APPLY_DELAY_MS);

    return () => clearTimeout(timeout);
  }, [splineApp, isReady]);

  // Update skill label on hover
  useEffect(() => {
    if (!selectedSkill || !splineApp) return;
    splineApp.setVariable("heading", selectedSkill.label);
    splineApp.setVariable("desc", selectedSkill.shortDescription);
  }, [selectedSkill, splineApp]);

  // Handle rotation and keycap animations per section
  useEffect(() => {
    if (!splineApp) return;

    let rotateKeyboard: gsap.core.Tween | undefined;
    let teardownKeyboard: gsap.core.Tween | undefined;
    const kbd = splineApp.findObjectByName("keyboard");

    if (kbd) {
      rotateKeyboard = gsap.to(kbd.rotation, {
        y: Math.PI * 2 + kbd.rotation.y,
        duration: 10,
        repeat: -1,
        yoyo: true,
        yoyoEase: true,
        ease: "back.inOut",
        delay: 2.5,
        paused: true,
      });

      teardownKeyboard = gsap.fromTo(
        kbd.rotation,
        { y: 0, x: -Math.PI, z: 0 },
        {
          y: -Math.PI / 2,
          duration: 5,
          repeat: -1,
          yoyo: true,
          yoyoEase: true,
          delay: 2.5,
          immediateRender: false,
          paused: true,
        },
      );
    }

    const manageAnimations = async () => {
      if (activeSection !== "skills") {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }

      if (activeSection === "hero") {
        rotateKeyboard?.restart();
        teardownKeyboard?.pause();
      } else if (activeSection === "contact") {
        rotateKeyboard?.pause();
        await sleep(600);
        teardownKeyboard?.restart();
        keycapAnimationsRef.current?.start();
      } else {
        rotateKeyboard?.pause();
        teardownKeyboard?.pause();
        await sleep(600);
        keycapAnimationsRef.current?.stop();
      }
    };

    manageAnimations();

    return () => {
      rotateKeyboard?.kill();
      teardownKeyboard?.kill();
    };
  }, [activeSection, splineApp]);

  // Toggle Spline text object visibility based on active section
  useEffect(() => {
    if (!splineApp) return;
    const textDesktopDark = splineApp.findObjectByName("text-desktop-dark");
    const textDesktopLight = splineApp.findObjectByName("text-desktop");
    const textMobileDark = splineApp.findObjectByName("text-mobile-dark");
    const textMobileLight = splineApp.findObjectByName("text-mobile");
    if (
      !textDesktopDark ||
      !textDesktopLight ||
      !textMobileDark ||
      !textMobileLight
    )
      return;

    const hide = () => {
      textDesktopDark.visible = false;
      textDesktopLight.visible = false;
      textMobileDark.visible = false;
      textMobileLight.visible = false;
    };

    if (activeSection !== "skills") {
      hide();
    } else if (isMobile) {
      hide();
      textMobileLight.visible = true;
    } else {
      hide();
      textDesktopLight.visible = true;
    }
  }, [splineApp, isMobile, activeSection]);

  // Reveal keyboard on load
  useEffect(() => {
    if (!splineApp || isReady) return;
    revealKeyboard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splineApp]);

  return (
    <Suspense
      fallback={
        <div className="w-full h-screen fixed inset-0 flex items-center justify-center">
          <div className="animate-pulse text-zinc-400">Loading 3D scene...</div>
        </div>
      }
    >
      <Spline
        className="w-full h-full fixed"
        ref={splineContainer}
        onLoad={(app: Application) => setSplineApp(app)}
        scene={SPLINE_SCENE_PATH}
      />
    </Suspense>
  );
};

export default AnimatedBackground;
