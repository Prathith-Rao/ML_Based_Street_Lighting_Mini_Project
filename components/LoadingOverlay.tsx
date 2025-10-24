
import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto"></div>
        <h2 className="mt-4 text-2xl font-retro text-glow-cyan text-cyan-300">Model Updating...</h2>
        <p className="text-gray-400">Recalibrating predictions based on new data...</p>
      </div>
    </div>
  );
};
