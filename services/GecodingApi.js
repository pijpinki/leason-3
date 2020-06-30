const fetch = require('node-fetch');
const config = require('../config');

class GecodingApi {
  constructor() {
    this.ENDPOINT = config.geocoding;
  }

  /**
   * Basic method
   * @param {string} path - /search
   * @param {object} params
   * @return {Promise<*>}
   */
  async request(path, params) {
    const urlParams = new URLSearchParams({
      format: 'json',
      ...params,
    });

    const response = await fetch(`${this.ENDPOINT}${path}?${urlParams}`);

    return response.json();
  }

  async getCityInfo({ city }) {
    return this.request('/search', { city });
  }
}

module.exports = GecodingApi;
