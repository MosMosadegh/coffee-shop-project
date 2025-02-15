"use client";

import { Canvas } from "@react-three/fiber";

import * as THREE from "three";
import { GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Leva } from "leva";
import StageWay from "./Stage";
import Laptob from "./Laptob";

export default function Scene() {
  const cameraSetting = {
    fov: 75,
    // zoom: 100,   //for orthographic
    near: 0.1,
    far: 200,
    position: [-5, 3, 4],
  };

  return (
    <>
      {/* <div className="flex justify-center ">
        <h1 className="mt-3 font-extrabold text-3xl">Hello Mostafa</h1>
      </div> */}
      <Leva collapsed />
      <Canvas
        className=" w-screen h-dvh"
        shadows
        gl={{
          antialias: true,

          outputEncoding: THREE.sRGBEncoding,
        }}
        // orthographic
        camera={cameraSetting}
        // onCreated={created} //Way 1
      >
        <Laptob />

        {/* <StageWay/> */}
      </Canvas>
    </>
  );
}
