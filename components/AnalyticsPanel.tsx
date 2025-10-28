
import React from 'react';
import type { LightingData } from '../types';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const MetricCard: React.FC<{ title: string; value: string; unit: string; color: string }> = ({ title, value, unit, color }) => (
  <div className="glassmorphism p-3 rounded-md border border-cyan-500/10">
    <h4 className="font-retro text-sm text-cyan-300">{title}</h4>
    <p className="font-modern text-2xl font-bold" style={{ color }}>{value} <span className="text-base font-normal">{unit}</span></p>
  </div>
);

export const AnalyticsPanel: React.FC<{ data: LightingData }> = ({ data }) => {
    const hourLabels = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

    const brightnessChartData = {
        labels: hourLabels,
        datasets: [
          {
            label: 'Adaptive Brightness Level',
            data: data.hourlyBrightness.map(v => (v * 100).toFixed(1)),
            backgroundColor: 'rgba(0, 255, 255, 0.2)',
            borderColor: 'rgba(0, 255, 255, 1)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
          },
        ],
      };

      const consumptionChartData = {
        labels: hourLabels,
        datasets: [
          {
            label: 'Energy Consumption (kWh)',
            data: data.hourlyConsumption.map(v => v.toFixed(2)),
            backgroundColor: 'rgba(255, 191, 0, 0.6)',
            borderColor: 'rgba(255, 191, 0, 1)',
            borderWidth: 1,
          },
        ],
      };

      const lineChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Adaptive Brightness Over 24 Hours', color: '#00ffff', font: { size: 14 } },
        },
        scales: {
            x: {
              ticks: { color: '#e0e0e0', maxRotation: 45, minRotation: 45 },
              grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            y: {
              ticks: { color: '#e0e0e0' },
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              title: { display: true, text: 'Brightness %', color: '#00ffff' }
            }
        }
      };

      const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Hourly Energy Consumption', color: '#ffbf00', font: { size: 14 } },
        },
        scales: {
            x: {
              ticks: { color: '#e0e0e0', maxRotation: 45, minRotation: 45 },
              grid: { color: 'rgba(255, 255, 255, 0.05)' }
            },
            y: {
              ticks: { color: '#e0e0e0' },
              grid: { color: 'rgba(255, 255, 255, 0.05)' },
              title: { display: true, text: 'kWh', color: '#ffbf00' }
            }
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
      <div className="pt-4 space-y-6">
         <div className="h-64">
           <Line options={lineChartOptions as any} data={brightnessChartData} />
         </div>
         <div className="h-64">
           <Bar options={barChartOptions as any} data={consumptionChartData} />
         </div>
      </div>
    </div>
  );
};
