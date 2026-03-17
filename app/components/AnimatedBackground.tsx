"use client";

import React, { Suspense, useEffect, useRef, useState } from "react";
import { Application, SplineEvent } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const Spline = React.lazy(() => import("@splinetool/react-spline"));
import { Skill, SkillNames, SKILLS } from "@/app/data/constants";
import { Section, getKeyboardState } from "./animated-background-config";

gsap.registerPlugin(ScrollTrigger);

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(
    () => typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [query]);
  return matches;
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const AnimatedBackground = () => {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const splineContainer = useRef<HTMLDivElement>(null);
  const [splineApp, setSplineApp] = useState<Application>();
  const selectedSkillRef = useRef<Skill | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [isReady, setIsReady] = useState(false);

  const keycapAnimationsRef = useRef<{
    start: () => void;
    stop: () => void;
  } | null>(null);

  const applySkillIconsToKeyboard = async () => {
    if (!splineApp) return;

    type SplineProxyObject = {
      name: string;
      uuid: string;
      parentUuid?: string;
      color?: string;
      material?: {
        layers?: Array<{
          type?: string;
          updateTexture?: (src: string | Uint8Array) => Promise<void>;
        }>;
      };
    };

    const allObjects = splineApp.getAllObjects() as unknown as SplineProxyObject[];
    const objectsByParent = new Map<string, SplineProxyObject[]>();

    allObjects.forEach((obj) => {
      if (!obj.parentUuid) return;
      const siblings = objectsByParent.get(obj.parentUuid) ?? [];
      siblings.push(obj);
      objectsByParent.set(obj.parentUuid, siblings);
    });

    const getDescendants = (rootUuid: string) => {
      const descendants: SplineProxyObject[] = [];
      const queue: string[] = [rootUuid];
      while (queue.length > 0) {
        const parentUuid = queue.shift();
        if (!parentUuid) continue;
        const children = objectsByParent.get(parentUuid) ?? [];
        children.forEach((child) => {
          descendants.push(child);
          queue.push(child.uuid);
        });
      }
      return descendants;
    };

    const getTextureLayers = (node: SplineProxyObject) =>
      node.material?.layers?.filter(
        (
          layer,
        ): layer is {
          type: "texture";
          updateTexture: (src: string | Uint8Array) => Promise<void>;
          texture?: { image?: { name?: string } };
        } =>
          layer?.type === "texture" &&
          typeof layer.updateTexture === "function",
      ) ?? [];

    // Key object names in Spline map to SKILLS[*].name.
    const tasks = Object.values(SKILLS).map(async (skill) => {
      const keyRoot = allObjects.find((obj) => obj.name === skill.name);
      if (!keyRoot) return;

      const candidates = [keyRoot, ...getDescendants(keyRoot.uuid)];
      const legendNodes = candidates.filter((node) => /legend/i.test(node.name));
      const preferredNodes = legendNodes.length > 0 ? legendNodes : candidates;

      const updates: Promise<void>[] = [];
      preferredNodes.forEach((node) => {
        const textureLayers = getTextureLayers(node);
        if (textureLayers.length === 0) return;

        // Prefer icon-like layers if metadata is available.
        const iconLikeLayers = textureLayers.filter((layer) => {
          const imageName = layer.texture?.image?.name?.toLowerCase() ?? "";
          return (
            imageName.includes("icon") ||
            imageName.includes("legend") ||
            imageName.includes("modified.png")
          );
        });

        const targetLayers =
          iconLikeLayers.length > 0 ? iconLikeLayers : textureLayers;
        targetLayers.forEach((layer) => {
          updates.push(layer.updateTexture(skill.icon));
        });
      });

      if (updates.length > 0) {
        await Promise.all(updates);
      }

      // Set keycap base color from SKILLS[*].color (avoid tinting icon/legend layers).
      const colorTargets = candidates.filter(
        (node) =>
          !/legend|icon|text/i.test(node.name) &&
          (/keycap/i.test(node.name) || node.name === skill.name),
      );
      colorTargets.forEach((node) => {
        if (!node.color) return;
        node.color = skill.color;
      });
    });

    await Promise.all(tasks);
  };

  const handleMouseHover = (e: SplineEvent) => {
    if (!splineApp || selectedSkillRef.current?.name === e.target.name) return;

    if (e.target.name === "body" || e.target.name === "platform") {
      setSelectedSkill(null);
      selectedSkillRef.current = null;
      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
    } else {
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
      }
    }
  };

  const handleSplineInteractions = () => {
    if (!splineApp) return;

    const isInputFocused = () => {
      const el = document.activeElement;
      return (
        el &&
        (el.tagName === "INPUT" ||
          el.tagName === "TEXTAREA" ||
          (el as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      splineApp.setVariable("heading", "");
      splineApp.setVariable("desc", "");
    });
    splineApp.addEventListener("keyDown", (e) => {
      if (!splineApp || isInputFocused()) return;
      const skill = SKILLS[e.target.name as SkillNames];
      if (skill) {
        setSelectedSkill(skill);
        selectedSkillRef.current = skill;
        splineApp.setVariable("heading", skill.label);
        splineApp.setVariable("desc", skill.shortDescription);
      }
    });
    splineApp.addEventListener("mouseHover", handleMouseHover);
  };

  const createSectionTimeline = (
    triggerId: string,
    targetSection: Section,
    prevSection: Section,
    start = "top 50%",
  ) => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end: "bottom bottom",
        scrub: true,
        onEnter: () => {
          setActiveSection(targetSection);
          const state = getKeyboardState({ section: targetSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
        onLeaveBack: () => {
          setActiveSection(prevSection);
          const state = getKeyboardState({ section: prevSection, isMobile });
          gsap.to(kbd.scale, { ...state.scale, duration: 1 });
          gsap.to(kbd.position, { ...state.position, duration: 1 });
          gsap.to(kbd.rotation, { ...state.rotation, duration: 1 });
        },
      },
    });
  };

  const setupScrollAnimations = () => {
    if (!splineApp || !splineContainer.current) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    const heroState = getKeyboardState({ section: "hero", isMobile });
    gsap.set(kbd.scale, heroState.scale);
    gsap.set(kbd.position, heroState.position);

    createSectionTimeline("#education", "education", "hero");
    createSectionTimeline("#experience", "experience", "education");
    createSectionTimeline("#projects", "projects", "experience", "top 70%");
    createSectionTimeline("#certificates", "certificates", "projects");
    createSectionTimeline("#skills", "skills", "certificates");
    createSectionTimeline("#contact", "contact", "skills", "top 30%");
  };

  const getKeycapsAnimation = () => {
    if (!splineApp) return { start: () => {}, stop: () => {} };

    const tweens: gsap.core.Tween[] = [];
    const removePrevTweens = () => tweens.forEach((t) => t.kill());

    const start = () => {
      removePrevTweens();
      Object.values(SKILLS)
        .sort(() => Math.random() - 0.5)
        .forEach((skill, idx) => {
          const keycap = splineApp.findObjectByName(skill.name);
          if (!keycap) return;
          const t = gsap.to(keycap.position, {
            y: Math.random() * 200 + 200,
            duration: Math.random() * 2 + 2,
            delay: idx * 0.6,
            repeat: -1,
            yoyo: true,
            yoyoEase: "none",
            ease: "elastic.out(1,0.3)",
          });
          tweens.push(t);
        });
    };

    const stop = () => {
      removePrevTweens();
      Object.values(SKILLS).forEach((skill) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) return;
        const t = gsap.to(keycap.position, {
          y: 0,
          duration: 4,
          repeat: 1,
          ease: "elastic.out(1,0.7)",
        });
        tweens.push(t);
      });
      setTimeout(removePrevTweens, 1000);
    };

    return { start, stop };
  };

  const revealKeyboard = async () => {
    if (!splineApp) return;
    const kbd = splineApp.findObjectByName("keyboard");
    if (!kbd) return;

    kbd.visible = false;
    await sleep(400);
    kbd.visible = true;
    setIsReady(true);

    const currentState = getKeyboardState({ section: activeSection, isMobile });
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
  };

  // Initialize GSAP and Spline interactions
  useEffect(() => {
    if (!splineApp) return;
    handleSplineInteractions();
    setupScrollAnimations();
    keycapAnimationsRef.current = getKeycapsAnimation();
    return () => {
      keycapAnimationsRef.current?.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [splineApp, isMobile]);

  useEffect(() => {
    if (!splineApp || !isReady) return;
    const timeout = setTimeout(() => {
      void applySkillIconsToKeyboard();
    }, 1200);

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        scene="/assets/skills-keyboard.spline"
      />
    </Suspense>
  );
};

export default AnimatedBackground;
