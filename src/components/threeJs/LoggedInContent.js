
import { Suspense } from "react";
import { Environment } from "@react-three/drei";
import Button3D from "@/components/threeJs/Buttom3D";
import { useRouter } from "next/navigation";

export default function LoggedInContent() {
  const router = useRouter();
  const handleButtonClick = () => {
    router.push("/home");
  };
  return (
    <>
      <Environment
        preset="forest"
        background
        ground={{
          height: 6,
          radius: 20,
          scale: 192,
        }}
      />
      <Button3D position={[-3, 1.5, -1]} onClick={handleButtonClick} />
    </>
  );
}