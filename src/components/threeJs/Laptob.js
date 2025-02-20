"use client";
import React from "react";
import {
  ContactShadows,
  Environment,
  Html,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";



export default function Laptob() {
  const computer = useGLTF(
    "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf"
  );


  return (
        <>
          <Environment preset="city" />
       

          {/* <PresentationControls
            global
            rotation={[0.13, 0.9, 0]}
            polar={[-0.4, 0.2]}
            azimuth={[-1, 0.75]}
            config={{ mass: 2, tension: 400 }}
            snap={{ mass: 4, tension: 400 }}
          > */}
            {/* <Float rotationIntensity={0.4}> */}
              <rectAreaLight
                width={2.5}
                height={1.65}
                intensity={65}
                color={"#ff6900"}
                rotation={[0.1, Math.PI, 0]}
                position={[0, 0.55, -1.15]}
              />
              <primitive object={computer.scene} position-y={-1.2}>
                <Html
                  transform
                  wrapperClass="htmlScreen"
                  // distanceFactor={distanceFactor} // استفاده از مقدار کنترل‌شده توسط Leva
                  // position={[positionX, positionY, positionZ]} // استفاده از مقادیر کنترل‌شده توسط Leva
                  // rotation={[rotationX, rotationY, rotationZ]} //
                  distanceFactor={1.17} // تغییر اندازه بر اساس state
                  position={[0, 1.56, -1.4]} 
                  rotation-x={-0.256} 
                >

                    <iframe src="/" />

                </Html>
              </primitive>
            {/* </Float> */}
          {/* </PresentationControls> */}
          {/* <ContactShadows position-y={-1.4} opacity={0.5} scale={10} blur={1} /> */}
        </>

  );
}
