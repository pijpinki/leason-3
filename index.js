const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const maps = require('./controllers/maps');
const weather = require('./controllers/weather');
const tests = require('./tests');
const config = require('./config');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(morgan('dev'));

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(cors());

app.use('/static', express.static('public'));

app.use('/maps', maps);
app.use('/weather', weather);


app.get('/', (req, res) => {
  res.send('hello');
});

app.use('/tests', tests);

app.use((err, req, res, next) => {
  err && console.log(err);
  next();
});

app.listen(config.port, err => err ? console.error(err) : console.log('Server started'));
