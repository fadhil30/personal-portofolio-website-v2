export type Section =
  | "hero"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "contact";

const STATES: Record<
  Section,
  {
    desktop: {
      scale: { x: number; y: number; z: number };
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
    };
    mobile: {
      scale: { x: number; y: number; z: number };
      position: { x: number; y: number; z: number };
      rotation: { x: number; y: number; z: number };
    };
  }
> = {
  hero: {
    desktop: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 225, y: -100, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      // Shift right on phones to match Naresh-like hero composition.
      position: { x: 180, y: -140, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
  },
  education: {
    desktop: {
      scale: { x: 0.15, y: 0.15, z: 0.15 },
      position: { x: 300, y: -80, z: 0 },
      rotation: { x: Math.PI / 12, y: -Math.PI / 6, z: 0 },
    },
    mobile: {
      scale: { x: 0.2, y: 0.2, z: 0.2 },
      position: { x: 0, y: -250, z: 0 },
      rotation: { x: Math.PI / 12, y: -Math.PI / 6, z: 0 },
    },
  },
  experience: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI / 12, y: -Math.PI / 4, z: 0 },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI / 6, y: -Math.PI / 6, z: 0 },
    },
  },
  skills: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 12, z: 0 },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: 0, y: Math.PI / 6, z: 0 },
    },
  },
  projects: {
    desktop: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: -40, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
    mobile: {
      scale: { x: 0.3, y: 0.3, z: 0.3 },
      position: { x: 0, y: 150, z: 0 },
      rotation: { x: Math.PI, y: Math.PI / 3, z: Math.PI },
    },
  },
  contact: {
    desktop: {
      scale: { x: 0.22, y: 0.22, z: 0.22 },
      position: { x: 380, y: -180, z: 0 },
      rotation: { x: 0, y: 0, z: 0 },
    },
    mobile: {
      scale: { x: 0.25, y: 0.25, z: 0.25 },
      position: { x: 0, y: 100, z: 0 },
      rotation: { x: -Math.PI / 6, y: Math.PI / 6, z: 0 },
    },
  },
};

export function getKeyboardState({
  section,
  isMobile,
}: {
  section: Section;
  isMobile: boolean;
}) {
  const state = STATES[section];
  const base = isMobile ? state.mobile : state.desktop;
  const width = typeof window !== "undefined" ? window.innerWidth : 1280;

  // Matches Naresh's responsive method (clamped width multiplier), with an added
  // tablet range so keyboard doesn't look too small between mobile and laptop.
  const getMultiplier = () => {
    if (isMobile) {
      const mobileScale = width / 390;
      return Math.min(Math.max(mobileScale, 0.5), 0.6);
    }

    if (width < 1024) {
      const tabletScale = width / 1024;
      return Math.min(Math.max(tabletScale, 0.72), 0.9);
    }

    const desktopScale = width / 1280;
    return Math.min(Math.max(desktopScale, 0.9), 1.15);
  };
  const multiplier = getMultiplier();

  return {
    scale: {
      x: base.scale.x * multiplier,
      y: base.scale.y * multiplier,
      z: base.scale.z * multiplier,
    },
    position: {
      x: base.position.x * multiplier,
      y: base.position.y * multiplier,
      z: base.position.z,
    },
    rotation: base.rotation,
  };
}
