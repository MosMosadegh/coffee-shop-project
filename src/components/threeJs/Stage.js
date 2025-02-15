"use client";
import { Stage, OrbitControls, Html, Environment } from "@react-three/drei";
import { button, useControls } from "leva";
import React, { useRef } from "react";

export default function StageWay() {

      const { position, color, visible, clickMe } = useControls("sphere", {
        position: {
          value: { x: -2, y: 1 },
          step: 0.1,
          joystick: "invertY",
        },
        color: "orange",
        visible: true,
        myInterval: {
          min: 0,
          max: 10,
          value: [4, 5],
        },
        clickMe: button(() => {
          alert("hi I'm in");
        }),
        choice: { options: ["a", "b", "c"] },
      });
    
      const { scale } = useControls("cube", {
        scale: {
          value: 1.5,
          min: 0,
          max: 5,
          step: 0.1,
        },
      });

      const { endMapIntensity, endMapHeight, endMapRadius, endMapScale } =
          useControls("environment map", {
            endMapIntensity: { value: 3.5, min: 0, max: 12, step: 0.1 },
            endMapHeight: { value: 7, min: 0, max: 100, step: 1 },
            endMapRadius: { value: 20, min: 10, max: 1000, step: 1 },
            endMapScale: { value: 100, min: 10, max: 1000, step: 1 },
          });

  const cubeRef = useRef();
  const SphereRef = useRef();

  return (
    <>
      <OrbitControls makeDefault />
      <Environment
              // background //Preset must be one of: apartment, city, dawn, forest, lobby, night, park, studio, sunset, warehouse
              preset="sunset"
              background
              ground={{
                height: endMapHeight,
                radius: endMapRadius,
                scale: endMapScale,
              }}
            />

      <Stage preset={"upfront"}  environment={"sunset"} >
        <mesh
          ref={SphereRef}
          castShadow
          position={[position.x, position.y, 0]}
          visible={visible}
        >
          <sphereGeometry />
          <meshStandardMaterial color={color} />
          <Html
            position={[-1, 1, 0]}
            wrapperClass="label"
            center
            distanceFactor={7}
            occlude={[SphereRef, cubeRef]}
          >
            That's a Sphere 👍
          </Html>
        </mesh>
        <mesh
          ref={cubeRef}
          castShadow
          rotation-y={Math.PI * 0.25}
          position={[3, 1, 0]}
          scale={scale}
        >
          <boxGeometry />
          <meshStandardMaterial color="mediumpurple" wireframe={false} />
          {/* <TransformControls object={cubeRef} mode="translate" /> */}
        </mesh>
      </Stage>
    </>
  );
}
