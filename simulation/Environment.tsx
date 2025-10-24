import React from 'react';
import { Sky, Stars } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface EnvironmentProps {
  weatherSeverity: number;
  time: number;
}

export const Environment: React.FC<EnvironmentProps> = ({ weatherSeverity, time }) => {
    const { scene } = useThree();

    // Fog
    const fogDensity = 0.005 + (weatherSeverity / 100) * 0.02;
    const isDay = time > 6 && time < 19;
    const fogColor = isDay ? new THREE.Color(0x87ceeb) : new THREE.Color(0x0a0a1a);
    scene.fog = new THREE.FogExp2(fogColor, fogDensity);

    // Sky
    // Fix: Explicitly type sunPosition as a tuple to match the prop type required by the <Sky> component.
    const sunPosition: [number, number, number] = [
        Math.cos((time / 24) * 2 * Math.PI) * 100,
        Math.sin((time / 24) * 2 * Math.PI) * 100,
        -50
    ];

    return (
        <>
            <Sky
                distance={450000}
                sunPosition={sunPosition}
                mieCoefficient={0.005}
                mieDirectionalG={0.8}
                rayleigh={isDay ? 3 : 0.1}
                turbidity={isDay ? 10 : 2}
            />
            {!isDay && <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />}
        </>
    );
};
