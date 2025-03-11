import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import gsap from "gsap";

export default function CameraController({ isLoggedIn, onCameraReset }) {
  const { camera, controls } = useThree();
  const cameraZ = useRef(10);

  const handleDoubleClick = () => {
    const targetZ = cameraZ.current === 10 ? 0.2 : 10;
    gsap.to(camera.position, {
      x: 0,
      y: -0.4,
      z: targetZ,
      duration: 2,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(0, 0, 0);
        controls.target.set(0, 0, 0);
        controls.update();
      },
      onComplete: () => {
        cameraZ.current = targetZ;
       
      },
    });
  };

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
  }, [camera, controls]);

  useEffect(() => {
    if (isLoggedIn) {
      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 10,
        duration: 2,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
          controls.target.set(0, 0, 0);
          controls.update();
        },
        onComplete: () => {
          onCameraReset(); 
        },
      });
    }
  }, [isLoggedIn, camera, onCameraReset]);

  return null;
}
