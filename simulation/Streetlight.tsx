// Fix: Added a triple-slash directive to provide type definitions for react-three-fiber's JSX elements.
/// <reference types="@react-three/fiber" />
import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface StreetlightProps {
    position: [number, number, number];
    brightness: number;
}

export const Streetlight: React.FC<StreetlightProps> = ({ position, brightness }) => {
    const lightRef = useRef<THREE.SpotLight>(null);
    const pointLightRef = useRef<THREE.PointLight>(null);

    const target = new THREE.Object3D();
    target.position.set(position[0] > 0 ? position[0] - 3 : position[0] + 3, 0, position[2]);

    useFrame(() => {
        if (lightRef.current && pointLightRef.current) {
            lightRef.current.intensity = brightness * 80;
            lightRef.current.color.setHSL(0.1, 0.8, brightness * 0.5 + 0.3);

            pointLightRef.current.intensity = brightness * 2;
            pointLightRef.current.color.set(lightRef.current.color);
        }
    });

    return (
        <group position={position}>
            {/* Pole */}
            <mesh castShadow>
                <cylinderGeometry args={[0.1, 0.1, 6, 8]} />
                <meshStandardMaterial color="#555" />
            </mesh>
             {/* Arm */}
            <mesh position={[position[0] > 0 ? -0.5 : 0.5, 3, 0]} rotation={[0,0, position[0] > 0 ? -Math.PI/4 : Math.PI/4]}>
                <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
                <meshStandardMaterial color="#555" />
            </mesh>
            {/* Light fixture */}
            <mesh position={[position[0] > 0 ? -1 : 1, 2.5, 0]} >
                <boxGeometry args={[0.3, 0.2, 0.3]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            <spotLight
                ref={lightRef}
                position={[position[0] > 0 ? -1 : 1, 2.4, 0]}
                target={target}
                castShadow
                angle={Math.PI / 4}
                penumbra={0.3}
                distance={20}
                decay={2}
            />
            <pointLight 
                ref={pointLightRef}
                position={[position[0] > 0 ? -1 : 1, 2.4, 0]} 
                distance={5} 
            />
            {/* Add to the scene to make it a child of the scene, not the light */}
            <primitive object={target} />
        </group>
    );
};