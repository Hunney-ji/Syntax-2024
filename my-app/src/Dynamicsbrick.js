import { useRef } from 'react';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';
import { Box } from '@react-three/drei';

export const Dynamicbox = ({ position, color = 'orange',scale }) => {
  const boxRef = useRef();

  const handleCollisionEnter = () => {
    console.log("Collision detected");
  };

  return (
    <RigidBody
      ref={boxRef}
      mass={0.2}
      friction={0}
      position={position}
      type="kinematics"
      onCollisionEnter={handleCollisionEnter}
    >
      <Box args={scale}>
        <meshStandardMaterial color={color} />
      </Box>
    </RigidBody>
  );
};
