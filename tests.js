const express = require('express');
const router = express.Router();

const tests = new Map();

router.get('/', (req, res) => {
  res.send([...tests.values()])
})

router.post('/', (req, res) => {
  const { id, name }  = req.body;

  tests.set(id, { id, name });

  res.send();
})

module.exports = router;
