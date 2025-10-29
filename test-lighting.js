// Quick test to verify daytime lighting fix
const { streetlightModel } = require('./services/xgboostModel.ts');

console.log('Testing streetlight brightness during different times...\n');

// Test daytime hours (should be 0)
console.log('=== DAYTIME TESTS (should be 0) ===');
for (let hour = 8; hour <= 17; hour++) {
  const brightness = streetlightModel.predict({
    timeOfDay: hour,
    trafficDensity: 10, // Low traffic
    weatherSeverity: 20,
    pedestrianCount: 5,
    ambientLight: 800,
    temperature: 22,
    humidity: 60,
    visibility: 500
  });
  console.log(`Hour ${hour}:00 - Brightness: ${brightness.toFixed(3)} (Traffic: 10)`);
}

// Test with high traffic during daytime (should still be 0)
console.log('\n=== DAYTIME WITH HIGH TRAFFIC (should still be 0) ===');
const highTrafficBrightness = streetlightModel.predict({
  timeOfDay: 12, // Noon
  trafficDensity: 90, // High traffic
  weatherSeverity: 80, // Bad weather
  pedestrianCount: 50,
  ambientLight: 600,
  temperature: 22,
  humidity: 80,
  visibility: 200
});
console.log(`Hour 12:00 - Brightness: ${highTrafficBrightness.toFixed(3)} (High traffic + bad weather)`);

// Test nighttime hours (should have brightness > 0)
console.log('\n=== NIGHTTIME TESTS (should be > 0) ===');
for (let hour of [20, 22, 0, 2, 6]) {
  const brightness = streetlightModel.predict({
    timeOfDay: hour,
    trafficDensity: 30,
    weatherSeverity: 20,
    pedestrianCount: 10,
    ambientLight: 10,
    temperature: 18,
    humidity: 60,
    visibility: 500
  });
  console.log(`Hour ${hour}:00 - Brightness: ${brightness.toFixed(3)}`);
}