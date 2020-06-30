const fetch = require('node-fetch');
const config = require('../config');

exports.OpenWeather = class OpenWeather {
  constructor() {
    this.API_KEY = config.apiKey;
    this.ENDPOINT = 'https://api.openweathermap.org/data/2.5/';
  }

  async request(method, params) {
    const urlParams = new URLSearchParams({
      appid: this.API_KEY,
      ...params,
    });

    const res = await fetch(`${this.ENDPOINT}${method}?${urlParams}`);

    return await res.json();
  }

  async getWeatherForLoc({ lat, lon }) {
    return this.request('/onecall', { lon, lat, exclude: 'hourly' });
  }
};
