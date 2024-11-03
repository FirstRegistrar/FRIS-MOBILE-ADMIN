// routes/fetchDividend.js

const express = require('express');
const router = express.Router();
const fetchDividend = require('../controllers/fetchDividendController');

router.post('/', fetchDividend);

module.exports = router;
