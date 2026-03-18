import type { Application } from "@splinetool/runtime";
import { SKILLS } from "@/app/data/constants";
import { KEY_SKILL_ALIASES } from "./constants";
import type { SplineProxyObject, SplineProxyTextureLayer } from "./types";

const getTextureLayers = (node: SplineProxyObject): SplineProxyTextureLayer[] =>
  node.material?.layers?.filter(
    (layer): layer is SplineProxyTextureLayer =>
      layer?.type === "texture" && typeof layer.updateTexture === "function",
  ) ?? [];

export const applySkillIconsToKeyboard = async (splineApp?: Application) => {
  if (!splineApp) {
    return;
  }

  const allObjects = splineApp.getAllObjects() as unknown as SplineProxyObject[];
  const objectsByParent = new Map<string, SplineProxyObject[]>();

  allObjects.forEach((obj) => {
    if (!obj.parentUuid) {
      return;
    }

    const siblings = objectsByParent.get(obj.parentUuid) ?? [];
    siblings.push(obj);
    objectsByParent.set(obj.parentUuid, siblings);
  });

  const getDescendants = (rootUuid: string) => {
    const descendants: SplineProxyObject[] = [];
    const queue: string[] = [rootUuid];

    while (queue.length > 0) {
      const parentUuid = queue.shift();
      if (!parentUuid) {
        continue;
      }

      const children = objectsByParent.get(parentUuid) ?? [];
      children.forEach((child) => {
        descendants.push(child);
        queue.push(child.uuid);
      });
    }

    return descendants;
  };

  const applySkillToKey = async (keyName: string, skillIcon: string, skillColor: string, skillName: string) => {
    const keyRoot = allObjects.find((obj) => obj.name === keyName);
    if (!keyRoot) {
      return;
    }

    const candidates = [keyRoot, ...getDescendants(keyRoot.uuid)];
    const legendNodes = candidates.filter((node) => /legend/i.test(node.name));
    const preferredNodes = legendNodes.length > 0 ? legendNodes : candidates;
    const updates: Promise<void>[] = [];

    preferredNodes.forEach((node) => {
      const textureLayers = getTextureLayers(node);
      if (textureLayers.length === 0) {
        return;
      }

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
        updates.push(layer.updateTexture(skillIcon));
      });
    });

    if (updates.length > 0) {
      await Promise.all(updates);
    }

    const colorTargets = candidates.filter(
      (node) =>
        !/legend|icon|text/i.test(node.name) &&
        (/keycap/i.test(node.name) || node.name === skillName),
    );

    colorTargets.forEach((node) => {
      if (!node.color) {
        return;
      }
      node.color = skillColor;
    });
  };

  const tasks = Object.values(SKILLS).map((skill) =>
    applySkillToKey(skill.name, skill.icon, skill.color, skill.name),
  );
  const aliasTasks = Object.entries(KEY_SKILL_ALIASES).map(
    ([keyName, skillName]) => {
      const aliasedSkill = SKILLS[skillName];
      return applySkillToKey(
        keyName,
        aliasedSkill.icon,
        aliasedSkill.color,
        aliasedSkill.name,
      );
    },
  );

  await Promise.all([...tasks, ...aliasTasks]);
};
