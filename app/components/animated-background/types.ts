import type { Skill, SkillNames } from "@/app/data/constants";

export type KeySkillAliases = Record<string, SkillNames>;

export type KeycapAnimations = {
  start: () => void;
  stop: () => void;
};

export type SkillResolver = (name: string) => Skill | undefined;

export type SplineProxyTextureLayer = {
  type: "texture";
  updateTexture: (src: string | Uint8Array) => Promise<void>;
  texture?: { image?: { name?: string } };
};

export type SplineProxyObject = {
  name: string;
  uuid: string;
  parentUuid?: string;
  color?: string;
  material?: {
    layers?: Array<{
      type?: string;
      updateTexture?: (src: string | Uint8Array) => Promise<void>;
      texture?: { image?: { name?: string } };
    }>;
  };
};
