"use client";
import {
  Box,
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  PresentationControls,
  Sparkles,
  Stars,
  useGLTF,
} from "@react-three/drei";
import React from "react";
import Footer from "../modules/footer/Footer";

export default function Laptob({children}) {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );
  return (
    <>
      <Environment preset="city" />
      {/* <Stars speed={5} count={1000}/> */}
      <Sparkles scale={9} size={2} count={100} />
      <color args={["#241a1a"]} attach="background" />
      {/* <OrbitControls makeDefault /> */}
      <PresentationControls
        global
        rotation={[0.0, -0.5, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.3]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 20, tension: 100 }}
      >
        <Float rotationIntensity={0.4}>
          <primitive object={computer.scene} position={[0, 0.2, 3.7]}>
            <Html
            transform
            >
                
            </Html>
          </primitive>
        </Float>
      </PresentationControls>
      <ContactShadows position-y={-1.4} opacity={0.5} scale={10} blur={1} />
    </>
  );
}
