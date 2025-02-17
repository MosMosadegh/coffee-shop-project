"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Box, OrbitControls, Sparkles } from "@react-three/drei";
import { Leva} from "leva";
import Laptob from "@/components/threeJs/Laptob";
import Table from "@/components/threeJs/Table";
import Portal from "@/components/threeJs/Portal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button3D from "@/components/threeJs/Buttom3D";


function SceneContent() {
  const { camera } = useThree();
  const [cameraZ, setCameraZ] = useState(10);

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/"); 
  };


  const handleDoubleClick = () => {
    setCameraZ((prevZ) => (prevZ === 10 ? 0.25 : 10));
  };

  useEffect(() => {
    camera.position.set(0, 0, cameraZ);
    camera.lookAt(0, 0, 0);
  }, [cameraZ, camera]);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      canvas.addEventListener("dblclick", handleDoubleClick);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener("dblclick", handleDoubleClick);
      }
    };
  }, []); // حذف وابستگی به cameraZ


  return (
    <>
      <OrbitControls
        makeDefault
        minDistance={0.1}
        maxDistance={5}
        minAzimuthAngle={-1}
        maxAzimuthAngle={1}
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        dampingFactor={0.009}
        rotateSpeed={0.3}
        target={[0, 0, 0]}
      />
      <Sparkles scale={9} size={2} count={100} />
      <color args={["#241a1a"]} attach="background" />
      <Laptob />
      <Table />
      <Portal />
      <Button3D position={[-2, 2, -1]} onClick={handleButtonClick} />
    </>
  );
}

export default function Scene() {
  const cameraSetting = {
    fov: 75,
    // zoom: 100,   //for orthographic
    near: 0.1,
    far: 200,
    // position: [-5, 3, 4],
  };

  return (
    <>
      {/* <div className="flex justify-center ">
        <h1 className="mt-3 font-extrabold text-3xl">Hello Mostafa</h1>
      </div> */}
      <Leva collapsed />
      <Canvas
        className=" w-dvw h-dvh"
        shadows
        gl={{
          antialias: true,

          // outputEncoding: THREE.sRGBEncoding,
        }}
        // orthographic
        camera={cameraSetting}
      >
        <SceneContent />
      </Canvas>
    </>
  );
}
