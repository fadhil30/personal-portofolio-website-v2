"use client";

import AnimatedBackground from "./AnimatedBackground";
import Particles from "./Particles";
import ElasticCursor from "./ui/ElasticCursor";

export default function EffectsLayer() {
  return (
    <>
      <ElasticCursor />
      <Particles quantity={40} />
      <AnimatedBackground />
    </>
  );
}
