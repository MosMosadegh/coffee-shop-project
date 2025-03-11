
"use client";

import { Suspense, useRef, useState } from "react";
import { Float, Html, OrbitControls, Sparkles, Text } from "@react-three/drei";
import { useAuth } from "@/context/AuthContext";
import CameraController from "@/components/threeJs/CameraController";
import LoggedInContent from "@/components/threeJs/LoggedInContent";
import LoggedOutContent from "@/components/threeJs/LoggedOutContent";
import Laptob from "@/components/threeJs/Laptob";
import Table from "@/components/threeJs/Table";
import TypeWriterText from "@/components/threeJs/TypeWriter/TypeWriter";

export default function SceneContent() {
  const { isLoggedIn } = useAuth();
  const [showEnvironment, setShowEnvironment] = useState(false);
  const sphereRef = useRef();

  const handlePointerMove = (event) => {
    if (sphereRef.current) {
      sphereRef.current.position.x += (Math.random() - 0.5) * 0.3;
      sphereRef.current.position.z += (Math.random() - 0.5) * 0.3;
    }
  };

  return (
    <>
      <OrbitControls
        makeDefault
        minDistance={0.1}
        maxDistance={7}
        minAzimuthAngle={-1}
        maxAzimuthAngle={1}
        minPolarAngle={0.5}
        maxPolarAngle={1.5}
        dampingFactor={0.009}
        rotateSpeed={0.3}
        target={[0, 0, 0]}
      />
      <CameraController
        isLoggedIn={isLoggedIn}
        onCameraReset={() => setShowEnvironment(true)}
      />
      <Sparkles scale={9} size={4} count={100} />
      <Suspense>
        <Laptob />
      </Suspense>
      <Suspense>
        <Table />
      </Suspense>
      <rectAreaLight
        width={2.5}
        height={1.65}
        intensity={65}
        color={"#ff6900"}
        rotation={[0.1, Math.PI, 0]}
        position={[0, 0.55, -1.15]}
      />
      {!isLoggedIn && <LoggedOutContent />}
      {isLoggedIn && showEnvironment && <LoggedInContent />}
      <Float>
        <TypeWriterText
          texts={["Portfolio Mostafa Mosadegh", "Frontend Developer"]}
        />
      </Float>
      <mesh
        ref={sphereRef}
        position={[-2, -0.5, 1.0]}
        onPointerEnter={handlePointerMove}
        onPointerMove={handlePointerMove}
      >
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
    </>
  );
}