
import React from 'react';
import type { LightingData } from '../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MetricCard: React.FC<{ title: string; value: string; unit: string; color: string }> = ({ title, value, unit, color }) => (
  <div className="glassmorphism p-3 rounded-md border border-cyan-500/10">
    <h4 className="font-retro text-sm text-cyan-300">{title}</h4>
    <p className="font-modern text-2xl font-bold" style={{ color }}>{value} <span className="text-base font-normal">{unit}</span></p>
  </div>
);

export const AnalyticsPanel: React.FC<{ data: LightingData }> = ({ data }) => {
    const chartData = {
        labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
        datasets: [
          {
            label: 'Energy Saved (kWh)',
            data: [data.energySaved * 2, data.energySaved * 2.5, 0, 0, data.energySaved*0.5, data.energySaved * 1.5].map(v => v.toFixed(2)),
            backgroundColor: 'rgba(255, 191, 0, 0.6)',
            borderColor: 'rgba(255, 191, 0, 1)',
            borderWidth: 1,
          },
        ],
      };

      const chartOptions = {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: '24-Hour Cumulative Savings', color: '#00ffff' },
        },
        scales: {
            x: { ticks: { color: '#e0e0e0' } },
            y: { ticks: { color: '#e0e0e0' } }
        }
      };
      
  return (
    <div className="space-y-4">
      <h3 className="font-retro text-lg text-glow-amber text-amber-300">REAL-TIME METRICS</h3>
      <div className="grid grid-cols-2 gap-4">
        <MetricCard title="Energy Saved" value={data.energySaved.toFixed(2)} unit="kWh" color="#ffbf00" />
        <MetricCard title="Energy Consumed" value={data.smartEnergyConsumed.toFixed(2)} unit="kWh" color="#ffbf00" />
        <MetricCard title="Cost Saved" value={`$${data.costSaved.toFixed(2)}`} unit="/day" color="#ff00ff" />
        <MetricCard title="CO₂ Reduced" value={data.co2Reduced.toFixed(2)} unit="kg" color="#ff00ff" />
      </div>
      <div className="pt-4">
         <h3 className="font-retro text-lg text-glow-amber text-amber-300 mb-2">SAVINGS SUMMARY</h3>
         <Bar options={chartOptions as any} data={chartData} />
      </div>
    </div>
  );
};
