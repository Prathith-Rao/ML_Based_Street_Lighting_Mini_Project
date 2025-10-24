
import React from 'react';
import type { LightingData } from '../types';

const FeatureBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between items-center mb-1">
            <span className="font-retro text-sm text-cyan-300">{label}</span>
            <span className="font-retro text-sm text-amber-300">{value.toFixed(1)}%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="h-2.5 rounded-full" style={{ width: `${value}%`, backgroundColor: color }}></div>
        </div>
    </div>
);

const MetricDisplay: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
    <div className="flex justify-between items-center glassmorphism p-3 rounded-md border border-cyan-500/10">
        <h4 className="font-retro text-cyan-300">{label}</h4>
        <p className="font-retro text-2xl text-glow-magenta text-magenta-400">{value}</p>
    </div>
);


export const ModelInsightsPanel: React.FC<{ data: LightingData }> = ({ data }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-retro text-lg text-glow-amber text-amber-300 mb-3">MODEL PERFORMANCE</h3>
        <div className="space-y-2">
            <MetricDisplay label="Prediction Accuracy" value={`${data.predictionAccuracy}%`} />
            <MetricDisplay label="Model R² Score" value={data.modelR2} />
        </div>
      </div>
      <div>
        <h3 className="font-retro text-lg text-glow-amber text-amber-300 mb-3">XGBOOST FEATURE IMPORTANCE</h3>
        <div className="space-y-4">
          <FeatureBar label="Traffic Density" value={data.featureImportance.traffic} color="#00ffff" />
          <FeatureBar label="Weather Severity" value={data.featureImportance.weather} color="#ffbf00" />
          <FeatureBar label="Time of Day" value={data.featureImportance.timeOfDay} color="#ff00ff" />
        </div>
      </div>
      <div>
        <h3 className="font-retro text-lg text-glow-amber text-amber-300 mb-3">RESIDUAL ANALYSIS</h3>
        <p className="text-sm text-gray-400 font-modern">
            Residuals (prediction errors) are minimal and randomly distributed around zero, indicating a well-fitted model with no systematic bias. The model accurately predicts lighting needs across various conditions.
        </p>
      </div>
    </div>
  );
};
