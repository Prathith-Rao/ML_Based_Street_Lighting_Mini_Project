
import { useMemo } from 'react';
import type { CitySize, SimulationParams, LightingData } from '../types';

const CITY_FACTORS: Record<CitySize, { base: number; traffic: number; weather: number }> = {
  Small: { base: 1.0, traffic: 0.45, weather: 0.25 },
  Medium: { base: 1.1, traffic: 0.5, weather: 0.3 },
  Large: { base: 1.2, traffic: 0.55, weather: 0.35 },
};

const ENERGY_PER_LIGHT_HOUR = 0.15; // kWh for a standard LED streetlight at full brightness
const COST_PER_KWH = 0.12; // dollars
const C02_KG_PER_KWH = 0.4; // kg
const TOTAL_LIGHTS = 50; // In the simulated area

export const useSmartLighting = (params: SimulationParams): LightingData => {
  const { traffic, weather, city, time } = params;

  const lightingData = useMemo(() => {
    // --- ML Model Simulation ---
    const isDay = time > 6 && time < 19;
    
    if (isDay) {
        return {
            predictedBrightness: 0,
            energySaved: TOTAL_LIGHTS * ENERGY_PER_LIGHT_HOUR * 24 * 0.95, // Approximate daily savings
            smartEnergyConsumed: 0,
            costSaved: TOTAL_LIGHTS * ENERGY_PER_LIGHT_HOUR * 24 * 0.95 * COST_PER_KWH,
            co2Reduced: TOTAL_LIGHTS * ENERGY_PER_LIGHT_HOUR * 24 * 0.95 * C02_KG_PER_KWH,
            modelR2: 0.98,
            predictionAccuracy: 99.5,
            featureImportance: { traffic: 55, weather: 35, timeOfDay: 10 },
        };
    }

    const timeFactor = 1 - Math.abs(time - 24) / 12; // Peak brightness around midnight
    const baseBrightness = 0.1 * timeFactor;

    const trafficFactor = traffic / 100;
    const weatherFactor = weather / 100;

    const cityFactors = CITY_FACTORS[city];

    let brightness = baseBrightness +
      (trafficFactor * cityFactors.traffic) +
      (weatherFactor * cityFactors.weather);

    brightness = Math.max(0.05, Math.min(1.0, brightness)); // Clamp brightness

    // --- Analytics Calculation ---
    const dailyHours = 24;
    const conventionalEnergy = TOTAL_LIGHTS * ENERGY_PER_LIGHT_HOUR * dailyHours;
    const smartEnergy = TOTAL_LIGHTS * (ENERGY_PER_LIGHT_HOUR * brightness) * dailyHours;

    const energySaved = conventionalEnergy - smartEnergy;
    const costSaved = energySaved * COST_PER_KWH;
    const co2Reduced = energySaved * C02_KG_PER_KWH;

    // Simulated model performance metrics
    const modelR2 = 0.97 + (Math.random() * 0.02);
    const predictionAccuracy = 99.4 + (Math.random() * 0.2);

    return {
      predictedBrightness: brightness,
      energySaved: energySaved / 10,
      smartEnergyConsumed: smartEnergy / 10,
      costSaved: costSaved / 10,
      co2Reduced: co2Reduced / 10,
      modelR2: parseFloat(modelR2.toFixed(3)),
      predictionAccuracy: parseFloat(predictionAccuracy.toFixed(2)),
      featureImportance: {
        traffic: cityFactors.traffic * 100,
        weather: cityFactors.weather * 100,
        timeOfDay: 100 - (cityFactors.traffic * 100 + cityFactors.weather * 100)
      },
    };
  }, [traffic, weather, city, time]);

  return lightingData;
};
