import { Cylinder, Environment, OrbitControls , PerspectiveCamera, Text } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { Track } from "./Track";
import { Ground } from "./Ground";
// import { Car } from "./car";
import React, { useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Box, Plane } from '@react-three/drei';
import * as THREE from 'three';
import { FollowCamera } from "./followcamera";
import { Car2 } from "./car";
// import { Maze } from "./Maze";

// Define a schema for the names




// const Ground = () => (
//     <RigidBody type="fixed">
//       <Plane args={[500, 500]} position={[0, -0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//         <meshStandardMaterial transparent={true} />
//       </Plane>
//     </RigidBody>
//   );

const TextOnSurface = ({ position, text, rotation ,color , fontSize="0.2"}) => {
  return (
    <Text
      position={position} // Position of the text in 3D space
      rotation={rotation} // Rotation of the text
      fontSize={fontSize} // Size of the text
      color={color} // Color of the text
      anchorX="center" // Anchor point on the X axis
      anchorY="middle" // Anchor point on the Y axis
    >
      {text}
    </Text>
  );
};


// const Maze2 = ()=>{
//   return (
//     <RigidBody position={[-2,0,-15]} mass={0} friction={0.8} linearDamping={0.1} angularDamping={0.1}>
//       <group scale={[0.3, 0.3, 0.3]} >
//       <Maze />
//     </group>
//     </RigidBody>
    
//   );
  
// }

const Car = ({ carRef ,setAmbientLightIntensity , setShowPopup}) => {
  const speed = 2;
  const turnSpeed = 0.04;
  const [moveDirection, setMoveDirection] = useState({ forward: false, backward: false, left: false, right: false });
  const promptShown = useRef(false);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null); 
  const moveCar = () => {
    if (carRef.current) {
      const velocity = carRef.current.linvel();
      const rotation = carRef.current.rotation();
      const quaternion = new THREE.Quaternion(rotation.x, rotation.y, rotation.z, rotation.w);
      const forwardVector = new THREE.Vector3(0, 0, -1).applyQuaternion(quaternion);

      if (moveDirection.forward) {
        carRef.current.setLinvel({ 
          x: forwardVector.x * speed, 
          y: velocity.y, 
          z: forwardVector.z * speed 
        }, true);
      }
      if (moveDirection.backward) {
        carRef.current.setLinvel({ 
          x: -forwardVector.x * speed, 
          y: velocity.y, 
          z: -forwardVector.z * speed 
        }, true);
      }

      const euler = new THREE.Euler().setFromQuaternion(quaternion, 'YXZ');
      if (moveDirection.left) {
        euler.y += turnSpeed;
        carRef.current.setRotation(new THREE.Quaternion().setFromEuler(euler), true);
      }
      if (moveDirection.right) {
        euler.y -= turnSpeed;
        carRef.current.setRotation(new THREE.Quaternion().setFromEuler(euler), true);
      }
    }
  };
  useFrame(() => {
    if (carRef.current) {
      const position = carRef.current.translation();
      if (position.x <=-7.2 && position.x >= -7.8 && position.z <= -2.5 && position.z>=-3.7 ) {

        console.log("Condition met");
        const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
        window.open('https://github.com/', '_blank');
        }}
        window.addEventListener('keydown', handleEnterPress);

        return () => {
          window.removeEventListener('keydown', handleEnterPress);
        };
      }
      else if (position.x >=-7.2 && position.x <= -6.5 && position.z <= -3.7 && position.z>=-5.0 ) {

        console.log("Condition met2");
        const handleEnterPress = (event) => {
        if (event.key === 'Enter') {
        window.open('https://codeforces.com/profile/Krishbansal333', '_blank');
        }}
        window.addEventListener('keydown', handleEnterPress);

        return () => {
          window.removeEventListener('keydown', handleEnterPress);
        };
      }
      else if(position.x <=-1-12 && position.x >= -1.6-12 && position.z <= -3.5+39 && position.z >= -5.0 + 39 )  {
        if (!startTime) {
          setStartTime(Date.now());
          console.log("Timer started");
        }
      }
      else if(position.x >=13-12 && position.x <= 16-12 && position.z <= -31+39 && position.z >= -34+39 ){
        if (startTime && !promptShown.current) {
          promptShown.current = true; 
        console.log("Condition met4");
        setEndTime(Date.now());
        const elapsedTime = (Date.now() - startTime) / 1000;
        console.log(`Timer ended. Elapsed time: ${elapsedTime} seconds`);
        // window.open('https://codeforces.com/profile/Krishbansal333', '_blank');
        alert(`Timer ended. Elapsed time: ${elapsedTime} seconds`);

        const name=prompt('enter');

        if (name && name.trim() !== "") {
          // Send the name to your Express server
          fetch('https://syntax-2024-server.vercel.app/api/names', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name.trim(), time: elapsedTime })
          })
          .then(response => {
            if (response.ok) {
              console.log(`Name added: ${name.trim()}`);
            } else {
              alert('Failed to add name.');
            }
          })
          .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
          });
        } else {
          alert('Invalid name. Please try again.');
        }

      }
    }
     
    
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(moveCar, 16);
    return () => clearInterval(interval);
  }, [moveDirection]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setMoveDirection((prev) => ({ ...prev, forward: true }));
        break;
      case 'ArrowDown':
        setMoveDirection((prev) => ({ ...prev, backward: true }));
        break;
      case 'ArrowLeft':
        setMoveDirection((prev) => ({ ...prev, left: true }));
        break;
      case 'ArrowRight':
        setMoveDirection((prev) => ({ ...prev, right: true }));
        break;
      case 'w':
        setMoveDirection((prev) => ({ ...prev, forward: true }));
        break;
      case 's':
        setMoveDirection((prev) => ({ ...prev, backward: true }));
        break;
      case 'a':
        setMoveDirection((prev) => ({ ...prev, left: true }));
        break;
      case 'd':
        setMoveDirection((prev) => ({ ...prev, right: true }));
        break;
      default:
        break;
    }
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setMoveDirection((prev) => ({ ...prev, forward: false }));
        break;
      case 'ArrowDown':
        setMoveDirection((prev) => ({ ...prev, backward: false }));
        break;
      case 'ArrowLeft':
        setMoveDirection((prev) => ({ ...prev, left: false }));
        break;
      case 'ArrowRight':
        setMoveDirection((prev) => ({ ...prev, right: false }));
        break;
      case 'w':
        setMoveDirection((prev) => ({ ...prev, forward: false }));
        break;
      case 's':
        setMoveDirection((prev) => ({ ...prev, backward: false }));
        break;
      case 'a':
        setMoveDirection((prev) => ({ ...prev, left: false }));
        break;
      case 'd':
        setMoveDirection((prev) => ({ ...prev, right: false }));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <RigidBody ref={carRef} position={[-9, 0.34, 38]} mass={0} friction={0.8} linearDamping={0.1} angularDamping={0.1}>
      <group scale={[0.3, 0.3, 0.3]}>
        <Car2 />
      </group>
    </RigidBody>
  );
};

const LoadingPlaceholder = () => (
  <TextOnSurface
    position={[0, 0, 0]} // Center the loading text
    text="Loading..."
    rotation={[0, 0, 0]}
    color="Black"
    fontSize="0.5"
  />
);

export function Scene(){
    const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.5);
    const [spotlightIntensity, setSpotlightIntensity] = useState(0.5); 
    const [showPopup, setShowPopup] = useState(false);
    const carRef = useRef(); 

    const [topNames, setTopNames] = useState([]); // State to store the top names
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const fetchTopNames = async () => {
      try {
        console.log("object")
        const response = await fetch('https://syntax-2024-server.vercel.app/api/names/top');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setTopNames(data); // Update state with fetched data
      } catch (err) {
        console.error('Error fetching top names:', err);
        setError(err.message); // Update error state
      } finally {
        setLoading(false); // Set loading to false after fetch attempt
      }
    };

    fetchTopNames(); // Call the fetch function
  }, []); // Run once on mount

  if (loading) {
    return <LoadingPlaceholder />; // Display loading placeholder while fetching
  }
    // if (loading) {
    //   return <p>Loading...</p>; // Display a loading message while fetching data
    // }
    return (
        <Suspense fallback={null}>
            <Environment 
              files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
              background={"both"}
              />
              <ambientLight intensity={ambientLightIntensity} />
              <spotLight
                position={[-12, 1, 0]} // Initial position, will be updated in useFrame
                angle={Math.PI / 4}
                penumbra={1}
                intensity="2" // Use dynamic spotlight intensity
                castShadow
              />
              <Physics>
                <PerspectiveCamera makeDefault position={[-6,3.9,6.21]} fov={40}/>
                {/* {!thirdPerson && ( */}
                 <OrbitControls target={[-2.64, -0.71 ,0.03]}/>
                {/* )} */}
                <Track />
                <Ground/>
                <FollowCamera carRef={carRef} />
                <Car carRef={carRef} setAmbientLightIntensity={setAmbientLightIntensity} setSpotlightIntensity={setSpotlightIntensity} setShowPopup={setShowPopup}/>
                <TextOnSurface position={[-7, 0.00001,-4.5]} text="CodeForces Press Enter" rotation={[-Math.PI *0.5, 0, 0]} color="#384B70" fontSize="0.2" />
                <TextOnSurface position={[0, 1, 0]}  text="Hello Guys!" rotation={[0, 0, 0]} color="#384B70" fontSize="0.5"/>
                <TextOnSurface position={[2, 1, 6]}  text="Woo! Finished" rotation={[0, Math.PI*0.5, 0]} color="#384B70" fontSize="0.5"/>
                <TextOnSurface position={[-14, 1, -5+39]}  text="Maze Start!" rotation={[0, 0, 0]} color="#384B70" fontSize="0.5"/>
                <TextOnSurface position={[-8, 1.2,-3.7]}  text="Press Enter" rotation={[0, 0.8, 0]} color="#384B70" fontSize="0.2"/>
                <TextOnSurface position={[-7.6, 1.2,-5.3]}  text="Press Enter" rotation={[0, 0, 0]} color="#384B70" fontSize="0.2"/>
                <TextOnSurface position={[-7.5, 0.00001,-3.2]} text="Github" rotation={[-Math.PI *0.5, 0, 0.8]} color="#384B70" fontSize="0.3" />
                <TextOnSurface position={[-13.5, 0.0001,-5+41]} text="Start =>" rotation={[-Math.PI *0.5, 0, Math.PI *0.5]} color="#384B70" fontSize="0.5" />
                <TextOnSurface position={[-10, 0, -3.5 + 39]} text="TOP Performers" rotation={[-Math.PI *0.5, 0, 0]} color="#384B70" fontSize="0.3" />
                {loading ? (
                    <LoadingPlaceholder /> // Display loading placeholder while fetching
                    ) : (
                      // Display the top names using TextOnSurface
                      topNames.map((item, index) => (
                        <TextOnSurface
                          key={item._id} // Use the unique ID for the key
                          position={[-10, 0, -3+index * 0.3 + 39]} // Adjust positions based on index
                          text={`${index + 1}: ${item.name} - ${item.time} seconds`} // Display rank, name, and time
                          rotation={[-Math.PI *0.5, 0, 0]} // Rotation as needed
                          color="Black" // Text color
                          fontSize="0.2" // Font size
                        />
                      ))
                    )}
                {/* <Maze3/> */}
              </Physics>
              {/* {showPopup && window.alert("Press Enter to open Codeforces")} */}
        </Suspense>
    )
}
