const fetch = require('node-fetch');

exports.OpenMaps = class OpenMaps {
  constructor() {
    this.ENDPOINT = 'https://nominatim.openstreetmap.org';
  }

  async request(path, params) {
    const urlParams = new URLSearchParams({
      format: 'json',
      ...params,
    })
    const response = await fetch(`${this.ENDPOINT}${path}?${urlParams}`);

    return response.json();
  }

  async getCity(name) {
    return this.request('/search', { city: name });
  }
};
