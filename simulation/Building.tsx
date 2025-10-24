// Fix: Added a triple-slash directive to provide type definitions for react-three-fiber's JSX elements.
/// <reference types="@react-three/fiber" />
import React, { useMemo } from 'react';
import * as THREE from 'three';

interface BuildingProps {
    position: [number, number, number];
}

export const Building: React.FC<BuildingProps> = ({ position }) => {
    const { height, width, depth, color } = useMemo(() => {
        const h = 10 + Math.random() * 20;
        const w = 8 + Math.random() * 4;
        const d = 8 + Math.random() * 4;
        const c = new THREE.Color().setHSL(0.6, 0.1, Math.random() * 0.1 + 0.1);
        return { height: h, width: w, depth: d, color: c };
    }, []);

    return (
        <mesh position={[position[0], height / 2, position[2]]} castShadow receiveShadow>
            <boxGeometry args={[width, height, depth]} />
            <meshStandardMaterial color={color} />
        </mesh>
    );
};