import { useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { TextureLoader } from "three";
import { ColliderBox } from "./useCollider";

export function Track(){
    const result =useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "/models/track.glb"
    );

    const colorMap = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "/textures/track.png"
    );

    useEffect(()=>{
        colorMap.anisotropy=16;
    },[colorMap]);

    let geometry = result.scene.children[0].geometry;

    return(
        <>
        <mesh geometry={geometry}>
            {/* <primitive object={geometry} attach={"geometry"}/> */}
            <meshBasicMaterial
             toneMapped={false}
             map={colorMap}
             />
        </mesh>
      </>
    )

}