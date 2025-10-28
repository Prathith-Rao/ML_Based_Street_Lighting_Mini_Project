
import { useMemo } from 'react';
import type { CitySize, SimulationParams, LightingData } from '../types';
import { streetlightModel } from '../services/xgboostModel';

const CITY_FACTORS: Record<CitySize, { base: number; traffic: number; weather: number; pedestrian: number }> = {
  Small: { base: 1.0, traffic: 0.45, weather: 0.25, pedestrian: 0.8 },
  Medium: { base: 1.1, traffic: 0.5, weather: 0.3, pedestrian: 1.0 },
  Large: { base: 1.2, traffic: 0.55, weather: 0.35, pedestrian: 1.3 },
};

const ENERGY_PER_LIGHT_HOUR = 0.15;
const COST_PER_KWH = 0.12;
const C02_KG_PER_KWH = 0.4;
const TOTAL_LIGHTS = 50;

export const useSmartLighting = (params: SimulationParams): LightingData => {
  const { traffic, weather, city, time } = params;

  const lightingData = useMemo(() => {
    const cityFactors = CITY_FACTORS[city];
    const pedestrianCount = (traffic / 100) * 40 * cityFactors.pedestrian;
    const isDaytime = time >= 6 && time < 19;
    const ambientLight = isDaytime ? 800 : 10;

    const brightness = streetlightModel.predict({
      timeOfDay: time,
      trafficDensity: traffic,
      weatherSeverity: weather,
      pedestrianCount,
      ambientLight,
      temperature: 20,
      humidity: 60,
      visibility: weather > 70 ? 200 : 600
    });

    const hourlyBrightness: number[] = [];
    const hourlyConsumption: number[] = [];

    for (let hour = 0; hour < 24; hour++) {
      const hourIsDaytime = hour >= 6 && hour < 19;
      const hourAmbientLight = hourIsDaytime ? 800 : 10;

      const hourTraffic = hourIsDaytime
        ? ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19) ? 70 : 40)
        : 15;

      const hourBrightness = streetlightModel.predict({
        timeOfDay: hour,
        trafficDensity: hourTraffic,
        weatherSeverity: weather,
        pedestrianCount: hourTraffic / 100 * 30,
        ambientLight: hourAmbientLight,
        temperature: 20,
        humidity: 60,
        visibility: weather > 70 ? 200 : 600
      });

      hourlyBrightness.push(hourBrightness);
      hourlyConsumption.push(TOTAL_LIGHTS * ENERGY_PER_LIGHT_HOUR * hourBrightness);
    }

    const dailySmartEnergy = hourlyConsumption.reduce((sum, val) => sum + val, 0);
    const dailyConventionalEnergy = TOTAL_LIGHTS * ENERGY_PER_LIGHT_HOUR * 12;
    const dailyEnergySaved = dailyConventionalEnergy - dailySmartEnergy;

    const energySaved = dailyEnergySaved;
    const costSaved = energySaved * COST_PER_KWH;
    const co2Reduced = energySaved * C02_KG_PER_KWH;

    const yearlyEnergySaved = dailyEnergySaved * 365;
    const yearlyCostSaved = yearlyEnergySaved * COST_PER_KWH;
    const yearlyCo2Reduced = yearlyEnergySaved * C02_KG_PER_KWH;
    const loadDecrease = ((dailyConventionalEnergy - dailySmartEnergy) / dailyConventionalEnergy) * 100;

    const metrics = streetlightModel.getModelMetrics();
    const featureImportance = streetlightModel.getFeatureImportance();

    return {
      predictedBrightness: brightness,
      energySaved,
      smartEnergyConsumed: dailySmartEnergy,
      costSaved,
      co2Reduced,
      modelR2: metrics.r2Score,
      predictionAccuracy: metrics.accuracy,
      featureImportance,
      hourlyBrightness,
      hourlyConsumption,
      yearlyProjections: {
        energySaved: yearlyEnergySaved,
        costSaved: yearlyCostSaved,
        co2Reduced: yearlyCo2Reduced,
        loadDecrease
      }
    };
  }, [traffic, weather, city, time]);

  return lightingData;
};
