import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

import roomScene from './mini_truck_model.glb'

export function Car2(props) {
  const { nodes, materials } = useGLTF(roomScene , true);
  return (
    <group {...props} dispose={null}>
      <group position={[0, 0.188, 0]}>
        <mesh
          geometry={nodes.Object_10.geometry}
          material={materials.material_0}
          position={[0, -0.188, 0]}
        />
        <mesh
          geometry={nodes.Object_12.geometry}
          material={materials.material_0}
          position={[0, -0.188, 0]}
        />
        <mesh
          geometry={nodes.Object_14.geometry}
          material={materials.material_0}
          position={[0, -0.188, 0]}
        />
        <mesh
          geometry={nodes.Object_16.geometry}
          material={materials.material_0}
          position={[0, -0.188, 0]}
        />
        <mesh
          geometry={nodes.Object_18.geometry}
          material={materials.material_0}
          position={[0, -0.188, 0]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.material_0}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_7.geometry}
        material={materials.material_0}
      />
    </group>
  )
}
