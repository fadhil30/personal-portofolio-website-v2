import type { Application } from "@splinetool/runtime";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getKeyboardState, type Section } from "../animated-background-config";

type ScrollTimelineStart = string | number | (() => string | number);

type SetupScrollAnimationsParams = {
  splineApp?: Application;
  isMobile: boolean;
  setActiveSection: (section: Section) => void;
  addScrollTrigger: (trigger: ScrollTrigger) => void;
  onIntroReplay: () => Promise<void>;
};

type CreateSectionTimelineParams = {
  triggerId: string;
  targetSection: Section;
  previousSection: Section;
  start?: ScrollTimelineStart;
  end?: ScrollTimelineStart;
};

export const setupScrollAnimations = ({
  splineApp,
  isMobile,
  setActiveSection,
  addScrollTrigger,
  onIntroReplay,
}: SetupScrollAnimationsParams) => {
  if (!splineApp) {
    return;
  }

  const keyboard = splineApp.findObjectByName("keyboard");
  if (!keyboard) {
    return;
  }

  const moveKeyboardToSection = (section: Section) => {
    setActiveSection(section);
    const state = getKeyboardState({ section, isMobile });
    gsap.to(keyboard.scale, { ...state.scale, duration: 1 });
    gsap.to(keyboard.position, { ...state.position, duration: 1 });
    gsap.to(keyboard.rotation, { ...state.rotation, duration: 1 });
  };

  const createSectionTimeline = ({
    triggerId,
    targetSection,
    previousSection,
    start = "top 50%",
    end = "bottom bottom",
  }: CreateSectionTimelineParams) => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerId,
        start,
        end,
        scrub: true,
        onEnter: () => {
          moveKeyboardToSection(targetSection);
        },
        onLeaveBack: () => {
          moveKeyboardToSection(previousSection);
        },
      },
    });

    if (timeline.scrollTrigger) {
      addScrollTrigger(timeline.scrollTrigger);
    }
  };

  const heroState = getKeyboardState({ section: "hero", isMobile });
  gsap.set(keyboard.scale, heroState.scale);
  gsap.set(keyboard.position, heroState.position);

  createSectionTimeline({
    triggerId: "#education",
    targetSection: "education",
    previousSection: "hero",
  });
  createSectionTimeline({
    triggerId: "#experience",
    targetSection: "experience",
    previousSection: "education",
  });
  createSectionTimeline({
    triggerId: "#projects",
    targetSection: "projects",
    previousSection: "experience",
    start: "top 70%",
  });
  createSectionTimeline({
    triggerId: "#skills",
    targetSection: "skills",
    previousSection: "projects",
    start: "top 55%",
    end: () => `+=${isMobile ? 380 : 560}`,
  });
  createSectionTimeline({
    triggerId: "#contact",
    targetSection: "contact",
    previousSection: "skills",
    start: "top 30%",
    end: () => `+=${isMobile ? 300 : 420}`,
  });

  const introReplayTrigger = ScrollTrigger.create({
    trigger: "#about",
    start: "top 80%",
    onEnterBack: () => {
      void onIntroReplay();
    },
  });
  addScrollTrigger(introReplayTrigger);
};
