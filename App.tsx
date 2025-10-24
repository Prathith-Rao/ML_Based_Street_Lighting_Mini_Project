import React, { useState, useCallback, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './simulation/Scene';
import { Controls } from './components/Controls';
import { Dashboard } from './components/Dashboard';
import { useSmartLighting } from './hooks/useSmartLighting';
import type { CitySize, SimulationParams } from './types';
import { LoadingOverlay } from './components/LoadingOverlay';
import { InfoPopup } from './components/InfoPopup';

const App: React.FC = () => {
  const [params, setParams] = useState<SimulationParams>({
    traffic: 30,
    weather: 10,
    city: 'Medium',
    time: 22, // 10 PM
  });
  const [cameraView, setCameraView] = useState<'street' | 'aerial'>('aerial');
  const [isTraining, setIsTraining] = useState(false);
  const [showInfo, setShowInfo] = useState(true);

  const lightingData = useSmartLighting(params);

  const handleParamsChange = useCallback((newParams: Partial<SimulationParams>) => {
    setParams(prev => ({ ...prev, ...newParams }));
  }, []);

  const handleApply = useCallback(() => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 1500);
  }, []);

  const memoizedScene = useMemo(() => (
    <Scene
      brightness={lightingData.predictedBrightness}
      trafficCount={Math.floor(params.traffic / 10)}
      weatherSeverity={params.weather}
      time={params.time}
      cameraView={cameraView}
    />
  ), [lightingData.predictedBrightness, params.traffic, params.weather, params.time, cameraView]);

  return (
    <div className="w-screen h-screen bg-[#0a0a1a] font-modern">
      <div className="absolute inset-0 z-0">
        <Canvas shadows>
          {memoizedScene}
        </Canvas>
      </div>
      
      {showInfo && <InfoPopup onClose={() => setShowInfo(false)} />}
      <LoadingOverlay isVisible={isTraining} />

      <div className="absolute top-4 right-4 md:right-auto md:left-4 z-20 flex space-x-2">
         <button onClick={() => setShowInfo(true)} className="glassmorphism text-cyan-300 font-retro px-3 py-2 rounded-md hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-110 border border-cyan-500/30">INFO</button>
        <button onClick={() => setCameraView('street')} className={`glassmorphism text-cyan-300 font-retro px-3 py-2 rounded-md hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-110 border border-cyan-500/30 ${cameraView === 'street' ? 'bg-cyan-500/30' : ''}`}>STREET</button>
        <button onClick={() => setCameraView('aerial')} className={`glassmorphism text-cyan-300 font-retro px-3 py-2 rounded-md hover:bg-cyan-500/20 transition-all duration-300 transform hover:scale-110 border border-cyan-500/30 ${cameraView === 'aerial' ? 'bg-cyan-500/30' : ''}`}>AERIAL</button>
      </div>
      
      <Dashboard data={lightingData} />
      
      <Controls
        params={params}
        onParamsChange={handleParamsChange}
        onApply={handleApply}
      />
    </div>
  );
};

export default App;