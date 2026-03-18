"use client";

import AnimatedBackground from "./AnimatedBackground";
import Particles from "./Particles";
import ElasticCursor from "./ui/ElasticCursor";
import { usePerformanceMode } from "./PerformanceModeProvider";

export default function EffectsLayer() {
  const { isPerformanceMode } = usePerformanceMode();

  return (
    <>
      <ElasticCursor />
      <Particles quantity={isPerformanceMode ? 16 : 40} />
      {!isPerformanceMode && <AnimatedBackground />}
    </>
  );
}
