
export type CitySize = 'Small' | 'Medium' | 'Large';

export interface SimulationParams {
  traffic: number;
  weather: number;
  city: CitySize;
  time: number;
}

export interface LightingData {
  predictedBrightness: number;
  energySaved: number;
  smartEnergyConsumed: number;
  costSaved: number;
  co2Reduced: number;
  modelR2: number;
  predictionAccuracy: number;
  featureImportance: {
    traffic: number;
    weather: number;
    timeOfDay: number;
  };
  hourlyBrightness: number[];
  hourlyConsumption: number[];
  yearlyProjections: {
    energySaved: number;
    costSaved: number;
    co2Reduced: number;
    loadDecrease: number;
  };
}
