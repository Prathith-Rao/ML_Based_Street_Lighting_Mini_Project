/// <reference types="@react-three/fiber" />
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface StreetlightProps {
    position: [number, number, number];
    brightness: number;
}

export const Streetlight: React.FC<StreetlightProps> = ({ position, brightness }) => {
    const lightRef = useRef<THREE.SpotLight | null>(null);
    const pointLightRef = useRef<THREE.PointLight | null>(null);
    // persistent target object (won't be recreated on each render)
    const targetRef = useRef<THREE.Object3D>(new THREE.Object3D());

    // direction: if x > 0 (right side), we want to point toward negative X (road),
    // otherwise point toward positive X. This ensures lights face the road.
    const direction = position[0] > 0 ? -1 : 1;

    // set target local position once when component mounts or when position changes
    useEffect(() => {
        // place the target a few units away in the direction the light should face
        targetRef.current.position.set(direction * 5, 0, 0);
        // If the spotLight exists, make sure it uses the correct target object
        if (lightRef.current) {
            lightRef.current.target = targetRef.current;
            // also ensure target is added to the scene graph (we attach it as a primitive below)
        }
    }, [direction, position]);

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
            <mesh castShadow position={[0, 3, 0]}>
                <cylinderGeometry args={[0.1, 0.1, 6, 8]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* Arm (offset in local coords using direction) */}
            <mesh position={[direction * 0.5 * -1, 5.5 - 2.5, 0]} rotation={[0, 0, direction === -1 ? -Math.PI / 4 : Math.PI / 4]}>
                <cylinderGeometry args={[0.08, 0.08, 1.5, 8]} />
                <meshStandardMaterial color="#555" />
            </mesh>

            {/* Light fixture (local coords) */}
            <mesh position={[direction * 1, 2.5, 0]}>
                <boxGeometry args={[0.3, 0.2, 0.3]} />
                <meshStandardMaterial color="#333" />
            </mesh>

            {/* Spotlight and point light positioned relative to the group */}
            <spotLight
                ref={lightRef}
                position={[direction * 1, 2.4, 0]}
                // target will be assigned in useEffect via lightRef.current.target = targetRef.current
                castShadow
                angle={Math.PI / 4}
                penumbra={0.3}
                distance={20}
                decay={2}
            />
            <pointLight
                ref={pointLightRef}
                position={[direction * 1, 2.4, 0]}
                distance={5}
            />

            {/* The target object lives as a primitive child of this group so it's in the same local space */}
            <primitive object={targetRef.current} />
        </group>
    );
};
