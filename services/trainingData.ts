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

const getRealisticTrafficForHour = (hour: number): number => {
  const trafficPattern = [
    5,   // 00:00 - very low
    3,   // 01:00 - minimal
    2,   // 02:00 - minimal
    2,   // 03:00 - minimal
    3,   // 04:00 - minimal
    8,   // 05:00 - early commuters start
    25,  // 06:00 - morning commute begins
    55,  // 07:00 - peak morning rush
    75,  // 08:00 - peak morning rush
    60,  // 09:00 - late morning
    45,  // 10:00 - mid-morning
    50,  // 11:00 - near noon
    55,  // 12:00 - lunch hour
    50,  // 13:00 - afternoon
    48,  // 14:00 - afternoon
    52,  // 15:00 - afternoon
    58,  // 16:00 - pre-evening rush
    70,  // 17:00 - evening rush begins
    80,  // 18:00 - peak evening rush
    65,  // 19:00 - evening
    40,  // 20:00 - late evening
    25,  // 21:00 - night
    15,  // 22:00 - late night
    8    // 23:00 - late night
  ];

  return trafficPattern[hour];
};

export const generateTrainingData = (): StreetlightTrainingData[] => {
  const data: StreetlightTrainingData[] = [];

  for (let hour = 0; hour < 24; hour++) {
    for (let scenario = 0; scenario < 100; scenario++) {
      const isDaytime = hour >= 6 && hour < 19;
      const isEarlyMorning = hour >= 5 && hour < 7;
      const isDusk = hour >= 18 && hour < 20;

      const timeOfDay = hour;
      const baseTraffic = getRealisticTrafficForHour(hour);
      const trafficVariation = (Math.random() - 0.5) * 20;
      const trafficDensity = Math.max(0, Math.min(100, baseTraffic + trafficVariation));

      const weatherSeverity = Math.random() * 100;
      const pedestrianCount = trafficDensity * 0.6 * (isDaytime ? 1.5 : 0.3);

      const ambientLight = isDaytime
        ? 500 + Math.random() * 500
        : (isEarlyMorning || isDusk ? 100 + Math.random() * 200 : Math.random() * 50);

      const temperature = 15 + Math.random() * 20;
      const humidity = 40 + Math.random() * 50;
      const visibility = weatherSeverity > 70 ? 100 + Math.random() * 400 : 400 + Math.random() * 600;

      let targetBrightness = 0;

      if (isDaytime && hour > 7 && hour < 18) {
        targetBrightness = 0;
      } else if (isEarlyMorning || isDusk) {
        const transitionFactor = isDusk ? (hour - 18) / 2 : (7 - hour) / 2;
        const minBrightness = 0.15;
        const trafficBoost = (trafficDensity / 100) * 0.5;
        const weatherBoost = (weatherSeverity / 100) * 0.25;

        targetBrightness = Math.min(1.0,
          minBrightness + transitionFactor * 0.3 + trafficBoost + weatherBoost
        );
      } else {
        const hourFromMidnight = hour > 12 ? 24 - hour : hour;
        const nightDepthFactor = Math.max(0, (6 - hourFromMidnight) / 6);

        const baseNightBrightness = 0.2 + (nightDepthFactor * 0.1);
        const trafficBoost = (trafficDensity / 100) * 0.45;
        const weatherBoost = (weatherSeverity / 100) * 0.2;
        const visibilityPenalty = visibility < 300 ? 0.15 : 0;
        const pedestrianBoost = (pedestrianCount / 100) * 0.1;

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
    data.pedestrianCount / 100,
    data.ambientLight / 1000,
    data.temperature / 40,
    data.humidity / 100,
    data.visibility / 1000
  ];
};

export const getTrafficForHour = (hour: number, cityFactor: number = 1.0): number => {
  const baseTraffic = getRealisticTrafficForHour(hour);
  return baseTraffic * cityFactor;
};
