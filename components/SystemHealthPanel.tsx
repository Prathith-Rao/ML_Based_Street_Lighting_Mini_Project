
import React, { useState, useEffect } from 'react';

const Gauge: React.FC<{ label: string; value: number; unit: string; max: number; color: string }> = ({ label, value, unit, max, color }) => {
    const percentage = (value / max) * 100;
    const circumference = 2 * Math.PI * 45; // 2 * pi * radius
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center p-4 glassmorphism rounded-lg border border-cyan-500/10">
            <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle
                        className="text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                    />
                    <circle
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        style={{ color }}
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        className="transform-gpu -rotate-90 origin-center transition-all duration-500"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="font-retro text-2xl" style={{ color }}>{value.toFixed(0)}</span>
                    <span className="font-retro text-xs text-gray-400">{unit}</span>
                </div>
            </div>
            <p className="font-retro text-cyan-300 mt-2 text-center">{label}</p>
        </div>
    );
};

export const SystemHealthPanel: React.FC = () => {
    const [health, setHealth] = useState({ latency: 18, accuracy: 99.5, response: 25 });

    useEffect(() => {
        const interval = setInterval(() => {
            setHealth({
                latency: 15 + Math.random() * 5,
                accuracy: 99.4 + Math.random() * 0.3,
                response: 20 + Math.random() * 10,
            });
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-4">
            <h3 className="font-retro text-lg text-glow-amber text-amber-300">SYSTEM HEALTH MONITOR</h3>
            <Gauge label="ML Latency" value={health.latency} unit="ms" max={50} color="#00ffff" />
            <Gauge label="Prediction Accuracy" value={health.accuracy} unit="%" max={100} color="#ffbf00" />
            <Gauge label="Response Time" value={health.response} unit="ms" max={100} color="#ff00ff" />
             <div className="text-center p-2">
                <p className="text-sm text-green-400 font-retro flex items-center justify-center">
                    <span className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                    ALL SYSTEMS OPERATIONAL
                </p>
            </div>
        </div>
    );
};
