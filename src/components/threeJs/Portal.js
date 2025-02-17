import {
  shaderMaterial,
  Sparkles,
  Center,
  useTexture,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { useFrame, extend } from "@react-three/fiber";
import { useRef } from "react";

import portalVertexShader from '!!raw-loader!./shaders/portal/vertex.glsl';
import portalFragmentShader from '!!raw-loader!./shaders/portal/fragment.glsl';



const PortalMaterial = shaderMaterial(
    {
        uTime: 0,
        uColorStart: new THREE.Color('#ffffff'),
        uColorEnd: new THREE.Color('#000000')
    },
    portalVertexShader,
    portalFragmentShader
)

extend({ PortalMaterial })

export default function Portal() {
  const { nodes } = useGLTF("./model/portal/portal.glb");

  const bakedTexture = useTexture("./model/portal/baked.jpg");
  bakedTexture.flipY = false;

  const portalMaterial = useRef()

  useFrame((state, delta) =>
  {
      portalMaterial.current.uTime += delta
  })

  return (
    <>
      <group scale={[60, 60, 60]} position={[1, 45, -85]}>
        <Center>
          <mesh geometry={nodes.baked.geometry}>
            <meshBasicMaterial map={bakedTexture} />
          </mesh>

          <mesh
            geometry={nodes.poleLightA.geometry}
            position={nodes.poleLightA.position}
          >
            <meshBasicMaterial color="#ffffe5" />
          </mesh>

          <mesh
            geometry={nodes.poleLightB.geometry}
            position={nodes.poleLightB.position}
          >
            <meshBasicMaterial color="#ffffe5" />
          </mesh>

          <mesh
            geometry={nodes.portalLight.geometry}
            position={nodes.portalLight.position}
            rotation={nodes.portalLight.rotation}
          >
            <portalMaterial ref={ portalMaterial } />
          </mesh>

          {/* <Sparkles
		        size={ 6 }
                scale={ [ 4, 2, 4 ] }
                position-y={ 1 }
                speed={ 0.2 }
                count={ 40 }
            /> */}
        </Center>
      </group>
    </>
  );
}
