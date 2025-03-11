// components/threeJs/Scene.js
"use client";

import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";
import GuidePanel from "@/components/threeJs/GuidePanel";
import SceneContent from "@/components/threeJs/SceneContent";

export default function Scene() {
  const cameraSetting = {
    fov: 75,
    near: 0.1,
    far: 200,
  };

  return (
    <>
      <Leva collapsed />
      <GuidePanel />
      <Canvas
        className="w-dvw h-dvh"
        shadows
        gl={{
          antialias: true,
        }}
        camera={cameraSetting}
      >
        <SceneContent />
      </Canvas>
    </>
  );
}
