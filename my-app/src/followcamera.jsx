import * as THREE from "three"
import { useFrame } from "@react-three/fiber";

export function FollowCamera ({ carRef }){
    useFrame((state) => {
      if (carRef.current) {
        const carPosition = carRef.current.translation();
        const carRotation = carRef.current.rotation(); 
  
        const offset = new THREE.Vector3(3, 2, 3); 
        // const quaternion = new THREE.Quaternion(carRotation.x, carRotation.y, carRotation.z, carRotation.w); 
  
        // offset.applyQuaternion(quaternion);
  
        
        state.camera.position.set(
          carPosition.x + offset.x,
          carPosition.y + offset.y,
          carPosition.z + offset.z
        );
  
        
        state.camera.lookAt(carPosition.x, carPosition.y, carPosition.z);
      }
    });
  
    return null;
  };