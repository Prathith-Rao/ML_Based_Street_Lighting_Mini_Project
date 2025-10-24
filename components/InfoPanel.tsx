
import React from 'react';

const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="glassmorphism p-4 rounded-md border border-cyan-500/10">
        <h4 className="font-retro text-lg text-amber-300 mb-2">{title}</h4>
        <div className="font-modern text-sm text-gray-300 space-y-2">
            {children}
        </div>
    </div>
);

export const InfoPanel: React.FC = () => {
  return (
    <div className="space-y-4">
       <h3 className="font-retro text-lg text-glow-amber text-amber-300">SYSTEM OVERVIEW</h3>
      <InfoCard title="How It Works">
        <p>This system uses a simulated XGBoost machine learning model to predict the optimal brightness for each streetlight in real-time. By analyzing traffic, weather, and time of day, it dynamically adjusts lighting levels, ensuring safety while drastically reducing energy consumption.</p>
      </InfoCard>
      <InfoCard title="Environmental & Cost Benefits">
        <p>Smart lighting can reduce energy usage by up to 80% compared to traditional systems. This leads to significant cost savings for cities and a substantial reduction in carbon emissions, contributing to a greener, more sustainable urban environment.</p>
      </InfoCard>
      <InfoCard title="UN Sustainable Development Goals">
        <ul className="list-disc list-inside">
            <li><span className="font-bold text-cyan-300">SDG 7:</span> Affordable and Clean Energy. By optimizing energy use, we make lighting more affordable and reduce reliance on non-renewable energy sources.</li>
            <li><span className="font-bold text-cyan-300">SDG 11:</span> Sustainable Cities and Communities. This technology helps create safer, more resilient, and sustainable urban infrastructure.</li>
        </ul>
      </InfoCard>
    </div>
  );
};
