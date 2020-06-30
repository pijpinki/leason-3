const express = require('express');
const config = require('./config');
const { OpenWeather } = require('./services/OpenWeather');
const { OpenMaps } = require('./services/OpenMaps');

const app = express();
const openWeather = new OpenWeather();
const openMaps = new OpenMaps();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Content-type', 'application/json');
  next();
});

app.get('/weather', async (req, res) => {
  res.send(await openWeather.getWeatherForLoc(req.query));
});

app.get('/city', async (req, res) => {
  res.send(await openMaps.getCity(req.query.name));
});

app.listen(config.port);
