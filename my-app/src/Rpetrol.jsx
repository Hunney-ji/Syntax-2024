import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import roomScene from './social_media_icons.glb'

export function Ghar(props) {
  const { nodes, materials } = useGLTF(roomScene , true);
  return (
    <group {...props} dispose={null}>
      <group scale={0.01}>
        <mesh
          geometry={nodes.Facebook_2_Facebook1_0.geometry}
          material={materials['Facebook.1']}
          position={[-104.839, 1.529, 0]}
        />
        <mesh
          geometry={nodes.Instagram_2_Instagram1_0.geometry}
          material={materials['Instagram.1']}
          position={[-83.81, 1.513, 0]}
        />
        <mesh
          geometry={nodes.Twitter_2_Twitter1_0.geometry}
          material={materials['Twitter.1']}
          position={[-62.47, 1.513, 0]}
        />
        <mesh
          geometry={nodes.Pinterest_2_Pinterest1_0.geometry}
          material={materials['Pinterest.1']}
          position={[-41.905, 1.513, 0]}
        />
        <group position={[-21.836, 1.611, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tik_2_Tok1_0.geometry}
            material={materials['Tok.1']}
            position={[21.836, -0.098, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Tok_2_Tok1_0.geometry}
            material={materials['Tok.1']}
            position={[0.669, 0.098, 0]}
          />
        </group>
        <mesh
          geometry={nodes.Youtube_2_Youtube_0.geometry}
          material={materials.Youtube}
          position={[-102.651, 23.654, 0]}
        />
        <mesh
          geometry={nodes.Twitch_2_Twitch1_0.geometry}
          material={materials['Twitch.1']}
          position={[-82.086, 23.654, 0]}
        />
        <mesh
          geometry={nodes.Discord_2_Discord1_0.geometry}
          material={materials['Discord.1']}
          position={[-60.746, 23.654, 0]}
        />
        <mesh
          geometry={nodes.Telegram_2_Telegram1_0.geometry}
          material={materials['Telegram.1']}
          position={[-39.405, 23.654, 0]}
        />
        <mesh
          geometry={nodes.Whatsap_2_Whatsap1_0.geometry}
          material={materials['Whatsap.1']}
          position={[-18.841, 23.654, 0]}
        />
      </group>
    </group>
  )
}

// useGLTF.preload('/social_media_icons.glb')