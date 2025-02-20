import { Float, Html, Text } from "@react-three/drei";
import { useState } from "react";

export default function Button3D({ position, onClick }) {
    const [hovered, setHovered] = useState(false);
  
    return (
        <Float rotationIntensity={1}>

        
      <mesh
        position={position}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 0.5, 0.2]} /> 
        <meshStandardMaterial color={hovered ? "hotpink" : "orange"} /> 
        <Text
          position={[0, 0, 0.11]} 
          fontSize={0.3}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Home
        </Text>
        
      </mesh>
      </Float>
    );
  }