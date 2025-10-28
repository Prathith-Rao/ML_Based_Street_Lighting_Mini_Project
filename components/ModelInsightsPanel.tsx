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

const CostItem: React.FC<{ label: string; value: string; subtext?: string }> = ({ label, value, subtext }) => (
    <div className="flex justify-between items-baseline">
        <h4 className="font-retro text-cyan-300 text-sm">{label}</h4>
        <div className="text-right">
            <p className="font-retro text-lg text-magenta-400">{value}</p>
            {subtext && <p className="text-xs text-gray-500 font-modern">{subtext}</p>}
        </div>
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
      <div>
        <h3 className="font-retro text-lg text-glow-amber text-amber-300 mb-3">YEARLY PROJECTIONS</h3>
        <div className="glassmorphism p-4 rounded-md border border-cyan-500/10 space-y-3">
            <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-gradient-to-br from-cyan-500/10 to-transparent rounded-md border border-cyan-500/20">
                    <p className="text-xs text-cyan-300 font-retro mb-1">Annual Energy Saved</p>
                    <p className="text-2xl font-bold text-cyan-400">{data.yearlyProjections.energySaved.toFixed(0)}</p>
                    <p className="text-xs text-gray-400 font-modern">kWh/year</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-amber-500/10 to-transparent rounded-md border border-amber-500/20">
                    <p className="text-xs text-amber-300 font-retro mb-1">Annual Cost Saved</p>
                    <p className="text-2xl font-bold text-amber-400">${data.yearlyProjections.costSaved.toFixed(0)}</p>
                    <p className="text-xs text-gray-400 font-modern">USD/year</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-green-500/10 to-transparent rounded-md border border-green-500/20">
                    <p className="text-xs text-green-300 font-retro mb-1">Annual CO₂ Reduced</p>
                    <p className="text-2xl font-bold text-green-400">{data.yearlyProjections.co2Reduced.toFixed(0)}</p>
                    <p className="text-xs text-gray-400 font-modern">kg CO₂/year</p>
                </div>
                <div className="text-center p-3 bg-gradient-to-br from-magenta-500/10 to-transparent rounded-md border border-magenta-500/20">
                    <p className="text-xs text-magenta-300 font-retro mb-1">Load Decrease</p>
                    <p className="text-2xl font-bold text-magenta-400">{data.yearlyProjections.loadDecrease.toFixed(1)}%</p>
                    <p className="text-xs text-gray-400 font-modern">vs conventional</p>
                </div>
            </div>
            <div className="text-xs text-gray-400 font-modern pt-2 border-t border-cyan-500/10">
                <p>Projected environmental impact equivalent to:</p>
                <ul className="list-disc pl-5 mt-1 space-y-1">
                    <li>{(data.yearlyProjections.co2Reduced / 411).toFixed(0)} trees planted annually</li>
                    <li>{(data.yearlyProjections.co2Reduced / 4600).toFixed(1)} cars off the road per year</li>
                    <li>{(data.yearlyProjections.energySaved / 877).toFixed(0)} homes powered for a month</li>
                </ul>
            </div>
        </div>
      </div>
      <div>
        <h3 className="font-retro text-lg text-glow-amber text-amber-300 mb-3">IMPLEMENTATION ANALYSIS</h3>
        <div className="glassmorphism p-4 rounded-md border border-cyan-500/10 space-y-4">
            <div>
                <h4 className="font-retro text-md text-cyan-300 mb-2 border-b border-cyan-500/20 pb-1">ESTIMATED TIMELINE (SMALL CITY)</h4>
                <ul className="text-sm text-gray-300 font-modern space-y-1 pl-2">
                    <li><strong className="text-amber-300">Phase 1 (1-2 Months):</strong> Planning & Survey</li>
                    <li><strong className="text-amber-300">Phase 2 (3-4 Months):</strong> Pilot Program</li>
                    <li><strong className="text-amber-300">Phase 3 (6-9 Months):</strong> Full Rollout</li>
                    <li><strong className="text-amber-300">Phase 4 (1 Month):</strong> Optimization & Handover</li>
                </ul>
            </div>
            <div>
                <h4 className="font-retro text-md text-cyan-300 mb-2 border-b border-cyan-500/20 pb-1">COST ANALYSIS (EST. 1,000 LIGHTS)</h4>
                <div className="space-y-3 mt-2">
                    <CostItem label="Hardware (Smart Nodes)" value="$350,000" subtext="~$350 / unit" />
                    <CostItem label="Installation & Labor" value="$150,000" subtext="~$150 / unit" />
                    <CostItem label="Network & Platform Fee" value="$50,000" subtext="Annual" />
                    <div className="border-t border-cyan-500/20 my-2"></div>
                    <CostItem label="Total Initial Cost" value="~$550,000" />
                    <CostItem label="Est. Annual Savings" value="~$90,000" />
                    <CostItem label="Return on Investment" value="~6 Years" />
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};