const express = require('express');
const GeocoddingApi = require('../services/GecodingApi');
const router = express.Router();

const gecodingApi = new GeocoddingApi();
const cache = new Map();

router.get('/', async (req, res) => {
  const { city } = req.query;

  if (!city || city.length < 3) {
    return res.status(400).send({ message: 'Bed request' });
  }

  if (cache.has(city)) {
    return res.send(cache.get(city));
  }

  const response = await gecodingApi.getCityInfo({ city: req.query.city });

  cache.set(city, response);

  res.send(response);
});

module.exports = router;
