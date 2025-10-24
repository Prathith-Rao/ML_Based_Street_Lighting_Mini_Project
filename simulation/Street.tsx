// Fix: Added a triple-slash directive to provide type definitions for react-three-fiber's JSX elements.
/// <reference types="@react-three/fiber" />
import React from 'react';
import * as THREE from 'three';

interface StreetProps {
    weatherSeverity: number;
}

export const Street: React.FC<StreetProps> = ({ weatherSeverity }) => {
    const wetness = weatherSeverity / 100;

    return (
        <>
            {/* Road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
                <planeGeometry args={[8, 120]} />
                <meshStandardMaterial
                    color="#444"
                    roughness={0.8 - wetness * 0.7}
                    metalness={wetness * 0.6}
                />
            </mesh>
            {/* Sidewalks */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, 0.1, 0]} receiveShadow>
                <planeGeometry args={[4, 120]} />
                <meshStandardMaterial color="#888" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, 0.1, 0]} receiveShadow>
                <planeGeometry args={[4, 120]} />
                <meshStandardMaterial color="#888" />
            </mesh>
        </>
    );
};