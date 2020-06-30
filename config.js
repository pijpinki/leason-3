require('dotenv').config();

module.exports = {
  port: process.env.PORT,
  geocoding: process.env.GEOCODIGN_ENDPINT,
  openWeather: {
    apiKey: process.env.WEATHER_API_KEY,
    endpoint: process.env.WEATHER_API_ENDPOINT,
  },
};
