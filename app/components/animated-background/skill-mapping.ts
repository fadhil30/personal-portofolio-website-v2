import { SKILLS, type SkillNames } from "@/app/data/constants";
import { KEY_SKILL_ALIASES } from "./constants";

export const getSkillForObjectName = (name: string) => {
  const directSkill = SKILLS[name as SkillNames];
  if (directSkill) {
    return directSkill;
  }

  const alias = KEY_SKILL_ALIASES[name];
  return alias ? SKILLS[alias] : undefined;
};
