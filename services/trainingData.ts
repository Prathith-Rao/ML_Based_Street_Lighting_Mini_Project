export interface StreetlightTrainingData {
  timeOfDay: number;
  trafficDensity: number;
  weatherSeverity: number;
  pedestrianCount: number;
  ambientLight: number;
  temperature: number;
  humidity: number;
  visibility: number;
  targetBrightness: number;
}

export const generateTrainingData = (): StreetlightTrainingData[] => {
  const data: StreetlightTrainingData[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let scenario = 0; scenario < 50; scenario++) {
      const isDaytime = hour >= 6 && hour < 19;
      const isPeakHour = (hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19);
      const isNight = hour >= 22 || hour < 6;

      const timeOfDay = hour;
      const trafficDensity = isDaytime
        ? (isPeakHour ? 60 + Math.random() * 40 : 30 + Math.random() * 30)
        : (isNight ? Math.random() * 20 : 10 + Math.random() * 30);

      const weatherSeverity = Math.random() * 100;
      const pedestrianCount = isDaytime
        ? 10 + Math.random() * 50
        : Math.random() * 15;

      const ambientLight = isDaytime
        ? 500 + Math.random() * 500
        : Math.random() * 50;

      const temperature = 15 + Math.random() * 20;
      const humidity = 40 + Math.random() * 50;
      const visibility = weatherSeverity > 70 ? 100 + Math.random() * 400 : 400 + Math.random() * 600;

      let targetBrightness = 0;

      if (isDaytime) {
        targetBrightness = 0;
      } else {
        const baseNightBrightness = 0.3;
        const trafficBoost = (trafficDensity / 100) * 0.4;
        const weatherBoost = (weatherSeverity / 100) * 0.2;
        const visibilityPenalty = visibility < 300 ? 0.15 : 0;
        const pedestrianBoost = (pedestrianCount / 60) * 0.15;

        targetBrightness = Math.min(1.0,
          baseNightBrightness + trafficBoost + weatherBoost + visibilityPenalty + pedestrianBoost
        );
      }

      data.push({
        timeOfDay,
        trafficDensity,
        weatherSeverity,
        pedestrianCount,
        ambientLight,
        temperature,
        humidity,
        visibility,
        targetBrightness
      });
    }
  }

  return data;
};

export const preprocessFeatures = (data: StreetlightTrainingData): number[] => {
  return [
    data.timeOfDay / 24,
    data.trafficDensity / 100,
    data.weatherSeverity / 100,
    data.pedestrianCount / 60,
    data.ambientLight / 1000,
    data.temperature / 40,
    data.humidity / 100,
    data.visibility / 1000
  ];
};
