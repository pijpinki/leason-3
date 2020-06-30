const fetch = require('node-fetch');
const config = require('../config');

class OpenWeatherApi {
  constructor() {
    this.ENDPOINT = config.openWeather.endpoint;
    this.API_KEY = config.openWeather.apiKey;
  }

  /**
   * Basic method
   * @param {string} path - /search
   * @param {object} params
   * @return {Promise<*>}
   */
  async request(path, params) {
    const urlParams = new URLSearchParams({
      appid: this.API_KEY,
      exclude: 'current',
      ...params,
    });

    const response = await fetch(`${this.ENDPOINT}${path}?${urlParams}`);

    return response.json();
  }

  async getWeatherForPosition({ lat, lon }) {
    return this.request('/onecall', { lat, lon });
  }
}

module.exports = OpenWeatherApi;
