const express = require('express');
const cuisines = require('../data/cuisines');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ cuisines });
});

module.exports = router;
