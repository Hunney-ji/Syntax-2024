import { useBox } from "@react-three/cannon";

const debug = true;

export function ColliderBox({ position, scale, color = "transparent" ,opacity="0"}) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
  }));

  return (
    debug && (
      <mesh position={position} castShadow receiveShadow>
        <boxGeometry args={scale} />
        <meshStandardMaterial color={color} opacity={opacity} transparent={true} />
      </mesh>
    )
  );
}
