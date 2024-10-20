import { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useRapier } from "@react-three/rapier";

export function Ramp() {
  const result = useLoader(GLTFLoader, process.env.PUBLIC_URL + "/models/ramp.glb");
  const geometry = result.scene.children[0].geometry;
  const vertices = geometry.attributes.position.array;
  const indices = geometry.index.array;

  const rampRef = useRef();

  // Create the ramp collider
  useRapier(() => {
    rampRef.current.addCollider("trimesh", { vertices, indices, isSensor: false });
  }, [vertices, indices]);

  // Adjust the ramp position (lowering it by 1 unit on the Y-axis)
  return <primitive ref={rampRef} object={result.scene} position={[0, -0.1, 0]} />;
}
