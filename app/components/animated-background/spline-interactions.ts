import type { Application, SplineEvent } from "@splinetool/runtime";
import type { Dispatch, MutableRefObject, SetStateAction } from "react";
import type { Skill } from "@/app/data/constants";
import { isInputFocused } from "./utils";
import type { SkillResolver } from "./types";

type SetupSplineInteractionsParams = {
  splineApp?: Application;
  resolveSkill: SkillResolver;
  selectedSkillRef: MutableRefObject<Skill | null>;
  setSelectedSkill: Dispatch<SetStateAction<Skill | null>>;
};

export const setupSplineInteractions = ({
  splineApp,
  resolveSkill,
  selectedSkillRef,
  setSelectedSkill,
}: SetupSplineInteractionsParams) => {
  if (!splineApp) {
    return;
  }

  const handleMouseHover = (event: SplineEvent) => {
    if (selectedSkillRef.current?.name === event.target.name) {
      return;
    }

    if (event.target.name === "body" || event.target.name === "platform") {
      setSelectedSkill(null);
      selectedSkillRef.current = null;

      if (splineApp.getVariable("heading") && splineApp.getVariable("desc")) {
        splineApp.setVariable("heading", "");
        splineApp.setVariable("desc", "");
      }
      return;
    }

    const skill = resolveSkill(event.target.name);
    if (!skill) {
      return;
    }

    setSelectedSkill(skill);
    selectedSkillRef.current = skill;
  };

  splineApp.addEventListener("keyUp", () => {
    if (isInputFocused()) {
      return;
    }

    splineApp.setVariable("heading", "");
    splineApp.setVariable("desc", "");
  });

  splineApp.addEventListener("keyDown", (event) => {
    if (isInputFocused()) {
      return;
    }

    const skill = resolveSkill(event.target.name);
    if (!skill) {
      return;
    }

    setSelectedSkill(skill);
    selectedSkillRef.current = skill;
    splineApp.setVariable("heading", skill.label);
    splineApp.setVariable("desc", skill.shortDescription);
  });

  splineApp.addEventListener("mouseHover", handleMouseHover);
};
