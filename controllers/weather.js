const express = require('express');
const OpenWeatherApi = require('../services/OpenWeatherApi');

const openWeatherApi = new OpenWeatherApi();
const router = express.Router();

const cache = new Map();

router.get('/', async (req, res) => {
  const { query: { lat, lon } } = req;

  if (!lat || !lon || +lat < 0 || +lon < 0) {
    return res.status(400).send({ message: 'Bad request' });
  }

  const key = `${lat}-${lon}`;

  if (cache.has(key)) {
    return res.send(cache.get(key));
  }

  try {
    const response = await openWeatherApi.getWeatherForPosition({ lat, lon });

    cache.set(key, response);

    res.send(response);
  } catch (e) {
    res.status(500).send({ message: 'Internal server error' });
  }
});

module.exports = router;
