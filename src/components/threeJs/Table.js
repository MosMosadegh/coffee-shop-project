"use client";
// import React from "react";
// import {
//   Box,
//   ContactShadows,
//   Environment,
//   Float,
//   Html,
//   MeshReflectorMaterial,
//   OrbitControls,
//   Plane,
//   PresentationControls,
//   Sparkles,
//   useGLTF,
// } from "@react-three/drei";
// import { useControls } from "leva";

// export default function Table() {
//   const table = useGLTF(
//     "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf"
//   );
//   const {positionX,positionY,positionZ} = useControls({
//     positionX: {
//         value:  12.5,
//         min: -20,
//         max: 20,
//         step: 0.1,
//       },
//       positionY: {
//         value:  -96.5,
//         min: -100,
//         max: 60,
//         step: 0.1,
//       },
//       positionZ: {
//         value:  0,
//         min: -20,
//         max: 20,
//         step: 0.1,
//       },
//   })
//   return (
//     <>
//       <OrbitControls makeDefault />

//       {/* <Float rotationIntensity={0.4}> */}

//       <primitive object={table.scene} position={[positionX, positionY, positionZ]} scale={3} rotation-x={2}/>

//       {/* <mesh receiveShadow position-y={0} rotation-x={-Math.PI * 0.5} scale={10}>
//         <planeGeometry />
//         <meshStandardMaterial color="greenyellow" wireframe={false} />
//         <MeshReflectorMaterial
//           resolution={512}
//           blur={[1000, 1000]}
//           mixBlur={0.5}
//           mirror={0.75}
//           color="greenyellow"
//         />
//       </mesh> */}

//       {/* </Float> */}

//       {/* <ContactShadows position-y={-1.4} opacity={0.5} scale={10} blur={1} /> */}
//     </>
//   );
// }


/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
        
import React, { useRef } from 'react'
import { ContactShadows, useGLTF, 

 } from '@react-three/drei'


export default function Model(props) {
  const group = useRef()
  const { nodes, materials } = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf')
  return (
    <group ref={group} {...props} dispose={null}>
<group position={[0, -1.25, 0,]} scale={4} rotation-y={1.5} >
<mesh geometry={nodes.Cube007.geometry} material={materials.MetalBlack} />
<mesh geometry={nodes.Cube007_1.geometry} material={materials.DeskWood} />
</group>
<ContactShadows rotation={[0, 0, 0]} position={[.2,-3.7,0.1]} opacity={0.7} scale={15} blur={1} />
    </group>

  )
}

useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/desk/model.gltf')