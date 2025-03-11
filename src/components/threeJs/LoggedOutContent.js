// components/threeJs/LoggedOutContent.js
import { Suspense } from "react";
import { color } from "@react-three/fiber";
import Portal from "@/components/threeJs/Portal";

export default function LoggedOutContent() {
  return (
    <Suspense>
      <color args={["#241a1a"]} attach="background" />
      <Portal />
    </Suspense>
  );
}