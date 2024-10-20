import { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export const DynamicSphere = () => {
  const sphereRef = useRef();

  const handleCollisionEnter = () => {
    console.log("collidee");
};

  return (
    <RigidBody ref={sphereRef} mass={0.1} position={[-12, 1, 0]} friction={0} type='kinematicas' onCollisionEnter={handleCollisionEnter}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={'orange'} />
      </mesh>

    </RigidBody>
  );
};
