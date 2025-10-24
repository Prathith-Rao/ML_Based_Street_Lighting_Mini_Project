import React, { useState } from 'react';
import type { LightingData } from '../types';
import { AnalyticsPanel } from './AnalyticsPanel';
import { ModelInsightsPanel } from './ModelInsightsPanel';
import { SystemHealthPanel } from './SystemHealthPanel';
import { InfoPanel } from './InfoPanel';
import { Icon } from './Icon';

type Tab = 'Analytics' | 'Insights' | 'Health' | 'Info';

interface DashboardProps {
  data: LightingData;
}

export const Dashboard: React.FC<DashboardProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('Analytics');

  const tabs: { name: Tab; icon: 'chart' | 'brain' | 'heart' | 'info' }[] = [
    { name: 'Analytics', icon: 'chart' },
    { name: 'Insights', icon: 'brain' },
    { name: 'Health', icon: 'heart' },
    { name: 'Info', icon: 'info' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Analytics':
        return <AnalyticsPanel data={data} />;
      case 'Insights':
        return <ModelInsightsPanel data={data} />;
      case 'Health':
        return <SystemHealthPanel />;
      case 'Info':
        return <InfoPanel />;
      default:
        return null;
    }
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-1/2 -translate-y-1/2 right-0 z-20 glassmorphism p-2 rounded-l-md transition-transform duration-300 hover:scale-110"
        style={{ transform: `translateX(${isOpen ? '-384px' : '0px'}) translate(-50%,-50%) rotate(180deg)` }}
      >
        <Icon name="chevron" className={`w-6 h-6 text-cyan-300 transform transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <div className={`fixed top-0 right-0 h-full w-96 z-20 glassmorphism shadow-2xl shadow-cyan-900/20 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="flex-shrink-0 p-4 border-b border-cyan-500/20">
            <h2 className="text-2xl font-retro text-glow-cyan text-cyan-300">AI DECISION CENTER</h2>
          </div>
          <div className="flex-shrink-0 flex justify-around p-2 bg-black/20">
            {tabs.map(tab => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`p-2 rounded-md transition-all duration-300 transform hover:scale-110 w-full flex flex-col items-center ${activeTab === tab.name ? 'bg-cyan-500/20' : 'hover:bg-cyan-500/10'}`}
              >
                <Icon name={tab.icon} className={`w-6 h-6 mb-1 ${activeTab === tab.name ? 'text-cyan-300' : 'text-gray-400'}`} />
                <span className={`font-retro text-xs ${activeTab === tab.name ? 'text-cyan-300' : 'text-gray-400'}`}>{tab.name}</span>
              </button>
            ))}
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};