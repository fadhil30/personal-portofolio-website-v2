export type Section =
 | "hero"
 | "education"
 | "experience"
 | "projects"
 | "certificates"
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
   position: { x: 0, y: -200, z: 0 },
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
 certificates: {
  desktop: {
   scale: { x: 0.18, y: 0.18, z: 0.18 },
   position: { x: -280, y: -60, z: 0 },
   rotation: { x: Math.PI / 8, y: Math.PI / 4, z: 0 },
  },
  mobile: {
   scale: { x: 0.25, y: 0.25, z: 0.25 },
   position: { x: 0, y: 100, z: 0 },
   rotation: { x: Math.PI / 8, y: Math.PI / 4, z: 0 },
  },
 },
 contact: {
  desktop: {
   scale: { x: 0.22, y: 0.22, z: 0.22 },
   position: { x: 300, y: -80, z: 0 },
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

 const refWidth = isMobile ? 390 : 1280;
 const currentWidth = typeof window !== "undefined" ? window.innerWidth : refWidth;
 const multiplier = Math.min(Math.max(currentWidth / refWidth, 0.5), 1.15);

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
