
import React from 'react';

interface InfoPopupProps {
  onClose: () => void;
}

export const InfoPopup: React.FC<InfoPopupProps> = ({ onClose }) => {
  return (
    <div className="absolute inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
      <div className="glassmorphism max-w-2xl w-full p-8 rounded-lg border-2 border-cyan-500/50 shadow-2xl shadow-cyan-900/40 relative">
        <h1 className="text-3xl font-retro text-glow-cyan text-cyan-300 mb-4">Welcome to the AI Smart Streetlight Simulator</h1>
        <p className="text-gray-300 mb-6">
          This interactive 3D simulation demonstrates how an AI-driven system can optimize city lighting. Adjust the controls at the bottom to see how the model adapts to changing conditions in real-time.
        </p>
        <div className="space-y-4 text-gray-300">
          <p><strong className="text-amber-300 font-retro">Controls:</strong> Use the sliders and dropdown at the bottom to change traffic, weather, time, and city size. Press "Apply & Regenerate" to simulate a model update.</p>
          <p><strong className="text-amber-300 font-retro">Camera:</strong> Switch between an aerial drone view and a street-level driver's perspective using the buttons in the top-left.</p>
          <p><strong className="text-amber-300 font-retro">Dashboard:</strong> Explore the collapsible panel on the right for detailed analytics, model insights, and system health monitoring.</p>
        </div>
        <button
          onClick={onClose}
          className="mt-8 bg-cyan-500 text-gray-900 font-retro px-6 py-2 rounded-md hover:bg-cyan-400 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-cyan-500/30"
        >
          Begin Simulation
        </button>
      </div>
    </div>
  );
};
