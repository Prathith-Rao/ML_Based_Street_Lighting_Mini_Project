// Fix: Added a triple-slash directive to provide type definitions for react-three-fiber's JSX elements.
/// <reference types="@react-three/fiber" />
import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Environment } from './Environment';
import { Street } from './Street';
import { Streetlight } from './Streetlight';
import { Car } from './Car';
import { Building } from './Building';

interface SceneProps {
  brightness: number;
  trafficCount: number;
  weatherSeverity: number;
  time: number;
  cameraView: 'street' | 'aerial';
}

const CameraController: React.FC<{ view: 'street' | 'aerial' }> = ({ view }) => {
  const { camera } = useThree();
  const streetPos = new THREE.Vector3(0, 1.5, 45);
  const aerialPos = new THREE.Vector3(0, 60, 50);

  useFrame(() => {
    const targetPos = view === 'street' ? streetPos : aerialPos;
    camera.position.lerp(targetPos, 0.05);
    if (view === 'street') {
      camera.lookAt(0, 2, -10);
    } else {
      camera.lookAt(0, 0, 0);
    }
  });

  return null;
};

export const Scene: React.FC<SceneProps> = ({ brightness, trafficCount, weatherSeverity, time, cameraView }) => {
  const cars = Array.from({ length: trafficCount }, (_, i) => i);
  const streetlights = [-40, -20, 0, 20, 40];
  const buildings = [-50, -30, -10, 10, 30, 50];

  return (
    <>
      <PerspectiveCamera makeDefault fov={60} position={[0, 60, 50]} />
      <CameraController view={cameraView} />

      <Environment weatherSeverity={weatherSeverity} time={time} />

      <ambientLight intensity={0.1} color="#4a6a8b" />
      <directionalLight 
        position={[10, 30, 20]} 
        intensity={time > 6 && time < 19 ? 0.0 : 0.8}
        color={time > 6 && time < 19 ? '#ffffff' : '#87CEEB'}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      
      <Street weatherSeverity={weatherSeverity} />

      {streetlights.map(z => (
        <React.Fragment key={z}>
          <Streetlight position={[-5, 1, z]} brightness={brightness} />
          <Streetlight position={[5, 1, z]} brightness={brightness} />
        </React.Fragment>
      ))}

      {cars.map(i => <Car key={i} index={i} total={trafficCount} />)}

      {buildings.map(z => (
          <React.Fragment key={`bld-${z}`}>
              <Building position={[-15, 0, z]} />
              <Building position={[15, 0, z]} />
          </React.Fragment>
      ))}
    </>
  );
};