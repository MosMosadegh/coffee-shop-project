"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import {
  Float,
  Html,
  OrbitControls,
  Sparkles,
  Text,
} from "@react-three/drei";
import { Leva } from "leva";
import Table from "@/components/threeJs/Table";
import Portal from "@/components/threeJs/Portal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button3D from "@/components/threeJs/Buttom3D";
import Laptob from "@/components/threeJs/Laptob";

function SceneContent() {
  const { camera } = useThree();
  const [cameraZ, setCameraZ] = useState(10);
  const sphereRef = useRef();

  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/home");
  };

  const handleDoubleClick = () => {
    setCameraZ((prevZ) => (prevZ === 10 ? 0.35 : 10));
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
  }, []); 

  const handlePointerMove = (event) => {
    if (sphereRef.current) {
      sphereRef.current.position.x += (Math.random() - 0.5) * 0.3;
      // sphereRef.current.position.y += (Math.random() - 0.5) * 0.2;
      sphereRef.current.position.z += (Math.random() - 0.5) * 0.3;
    }
  };


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
      <color args={["#241a1a"]} attach="background" />
       <rectAreaLight
              width={2.5}
              height={1.65}
              intensity={65}
              color={"#ff6900"}
              rotation={[0.1, Math.PI, 0]}
              position={[0, 0.55, -1.15]}
            />
      <Sparkles scale={9} size={4} count={100} />
      <Suspense>
        <Laptob />
      </Suspense>
      <Suspense>
        <Table />
      </Suspense>
      <Suspense>
        <Portal />
      </Suspense>

      <Button3D position={[-2, 2, -1]} onClick={handleButtonClick} />
      <Float>
        <Text
          font="/fonts/Sigmar-Regular.ttf"
          fontSize={1}
          position={[3.5, 0.75, -0.75]}
          rotation-y={-1.25}
          maxWidth={2}
          textAlign="center"
          color="#A03C3C"
          outlineWidth={0.05} 
          outlineColor="white"         >
          Mostafa Mosadegh
        </Text>
      </Float>
      <mesh
        ref={sphereRef}
        position={[-2, -0.5, 1.0]}
        onPointerEnter={handlePointerMove} // وقتی موس روی کره می‌رود
        onPointerMove={handlePointerMove} // وقتی موس روی کره حرکت می‌کند
      >
        <sphereGeometry args={[0.2, 32, 32]} /> 
        <meshStandardMaterial color="hotpink" />
      </mesh>
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
