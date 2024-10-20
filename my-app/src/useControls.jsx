import { useEffect, useState, useRef } from "react";

export const useManualControls = (vehicleRef, chassisRef) => {
  const [controls, setControls] = useState({});
  const velocity = useRef({ x: 0, y: 0, z: 0 });
  const acceleration = 0.02; // Acceleration rate
  const friction = 0.98; // Friction for slowing down
  const turnSpeed = 0.03; // Speed of turning
  const gravity = -0.005; // Gravity for the chassis
  const jumpStrength = 0.2; // Impulse strength for jumps

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    };

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    };

    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
    };
  }, []);

  useEffect(() => {
    const updateVehicle = () => {
      if (!vehicleRef.current || !chassisRef.current) return;

      // Get current position and rotation of vehicle and chassis
      const vehiclePosition = vehicleRef.current.position;
      const vehicleRotation = vehicleRef.current.rotation;
      const chassisPosition = chassisRef.current.position;

      // Apply acceleration to the vehicle
      if (controls.w) {
        velocity.current.x += Math.sin(vehicleRotation.y) * acceleration;
        velocity.current.z += Math.cos(vehicleRotation.y) * acceleration;
      } else if (controls.s) {
        velocity.current.x -= Math.sin(vehicleRotation.y) * acceleration;
        velocity.current.z -= Math.cos(vehicleRotation.y) * acceleration;
      }

      // Apply turning
      if (controls.a) {
        vehicleRotation.y += turnSpeed;
      } else if (controls.d) {
        vehicleRotation.y -= turnSpeed;
      }

      // Apply friction to gradually slow down the vehicle
      velocity.current.x *= friction;
      velocity.current.z *= friction;

      // Update the vehicle's position based on velocity
      vehiclePosition.x += velocity.current.x;
      vehiclePosition.z += velocity.current.z;

      // Gravity effect on chassis
      velocity.current.y += gravity;

      // Apply impulses for jumping or directional movement
      if (controls.arrowup) velocity.current.z -= jumpStrength;
      if (controls.arrowdown) velocity.current.z += jumpStrength;
      if (controls.arrowleft) velocity.current.x -= jumpStrength;
      if (controls.arrowright) velocity.current.x += jumpStrength;

      // Update the chassis position
      chassisPosition.x += velocity.current.x;
      chassisPosition.y += velocity.current.y;
      chassisPosition.z += velocity.current.z;

      // Basic ground collision detection
      if (chassisPosition.y < 0) {
        chassisPosition.y = 0;
        velocity.current.y = 0;
      }

      // Reset vehicle and chassis positions if 'r' is pressed
      if (controls.r) {
        vehiclePosition.set(0, 0.5, 0);
        vehicleRotation.set(0, 0, 0);
        chassisPosition.set(0, 0.5, 0);
        velocity.current = { x: 0, y: 0, z: 0 };
      }
    };

    const interval = setInterval(updateVehicle, 16); // Update at ~60 FPS
    return () => clearInterval(interval);
  }, [controls, vehicleRef, chassisRef]);

  return controls;
};
