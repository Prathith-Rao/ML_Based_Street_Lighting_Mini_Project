
import React from 'react';
import type { SimulationParams, CitySize } from '../types';

interface ControlsProps {
  params: SimulationParams;
  onParamsChange: (newParams: Partial<SimulationParams>) => void;
  onApply: () => void;
}

const Slider: React.FC<{ label: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; min?: number; max?: number; step?: number }> = ({ label, value, onChange, min = 0, max = 100, step = 1 }) => (
  <div className="flex-1 min-w-[150px]">
    <label className="block font-retro text-cyan-300 text-sm mb-1">{label}</label>
    <div className="flex items-center space-x-2">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-sm accent-cyan-400"
      />
      <span className="font-retro text-amber-300 w-8 text-right">{value}</span>
    </div>
  </div>
);

export const Controls: React.FC<ControlsProps> = ({ params, onParamsChange, onApply }) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
      <div className="glassmorphism max-w-5xl mx-auto p-4 rounded-lg shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Slider label="Traffic Density" value={params.traffic} onChange={(e) => onParamsChange({ traffic: parseInt(e.target.value) })} />
          <Slider label="Weather Severity" value={params.weather} onChange={(e) => onParamsChange({ weather: parseInt(e.target.value) })} />
          <Slider label="Time of Day" value={params.time} min={0} max={23} onChange={(e) => onParamsChange({ time: parseInt(e.target.value) })} />

          <div className="flex-1 min-w-[150px]">
            <label className="block font-retro text-cyan-300 text-sm mb-1">City Size</label>
            <select
              value={params.city}
              onChange={(e) => onParamsChange({ city: e.target.value as CitySize })}
              className="w-full bg-gray-800 border border-cyan-500/50 text-amber-300 rounded-md px-3 py-2 font-retro focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <option>Small</option>
              <option>Medium</option>
              <option>Large</option>
            </select>
          </div>

          <button
            onClick={onApply}
            className="flex-shrink-0 bg-cyan-500 text-gray-900 font-retro px-6 py-2 rounded-md hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
          >
            Apply & Regenerate
          </button>
        </div>
      </div>
    </div>
  );
};
