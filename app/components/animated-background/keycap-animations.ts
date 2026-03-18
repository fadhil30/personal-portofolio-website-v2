import type { Application } from "@splinetool/runtime";
import gsap from "gsap";
import { SKILLS } from "@/app/data/constants";
import type { KeycapAnimations } from "./types";

const noop = () => {};

export const createKeycapsAnimation = (
  splineApp?: Application,
): KeycapAnimations => {
  if (!splineApp) {
    return { start: noop, stop: noop };
  }

  const tweens: gsap.core.Tween[] = [];
  const removePrevTweens = () => {
    tweens.forEach((tween) => tween.kill());
  };

  const start = () => {
    removePrevTweens();

    Object.values(SKILLS)
      .sort(() => Math.random() - 0.5)
      .forEach((skill, index) => {
        const keycap = splineApp.findObjectByName(skill.name);
        if (!keycap) {
          return;
        }

        const tween = gsap.to(keycap.position, {
          y: Math.random() * 200 + 200,
          duration: Math.random() * 2 + 2,
          delay: index * 0.6,
          repeat: -1,
          yoyo: true,
          yoyoEase: "none",
          ease: "elastic.out(1,0.3)",
        });

        tweens.push(tween);
      });
  };

  const stop = () => {
    removePrevTweens();

    Object.values(SKILLS).forEach((skill) => {
      const keycap = splineApp.findObjectByName(skill.name);
      if (!keycap) {
        return;
      }

      const tween = gsap.to(keycap.position, {
        y: 0,
        duration: 4,
        repeat: 1,
        ease: "elastic.out(1,0.7)",
      });

      tweens.push(tween);
    });

    setTimeout(removePrevTweens, 1000);
  };

  return { start, stop };
};
