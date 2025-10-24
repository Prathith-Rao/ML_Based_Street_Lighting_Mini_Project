// Fix: Added a triple-slash directive to provide type definitions for react-three-fiber's JSX elements.
/// <reference types="@react-three/fiber" />
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface CarProps {
  index: number;
  total: number;
}

export const Car: React.FC<CarProps> = ({ index, total }) => {
  const meshRef = useRef<THREE.Group>(null);
  const lane = (index % 4); // 4 lanes
  const initialZ = (index / total) * 120 - 60;

  useFrame((_, delta) => {
    if (meshRef.current) {
      const speed = lane < 2 ? 15 + (index % 5) : -15 - (index % 5);
      meshRef.current.position.z += speed * delta;
      if (speed > 0 && meshRef.current.position.z > 60) {
        meshRef.current.position.z = -60;
      }
      if (speed < 0 && meshRef.current.position.z < -60) {
        meshRef.current.position.z = 60;
      }
    }
  });

  const getLaneX = () => {
      switch(lane) {
          case 0: return -3; // Southbound slow
          case 1: return -1; // Southbound fast
          case 2: return 1;  // Northbound fast
          case 3: return 3;  // Northbound slow
          default: return -3;
      }
  }

  return (
    <group ref={meshRef} position={[getLaneX(), 0.4, initialZ]}>
        <mesh castShadow>
            <boxGeometry args={[1.2, 0.7, 2.5]} />
            <meshStandardMaterial color={new THREE.Color().setHSL(Math.random(), 0.6, 0.5)} />
        </mesh>
         <mesh position={[0, 0.5, -0.5]}>
            <boxGeometry args={[1.0, 0.5, 1.5]} />
            <meshStandardMaterial color="lightblue" transparent opacity={0.5}/>
        </mesh>
    </group>
  );
};