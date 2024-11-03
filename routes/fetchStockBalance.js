// routes/fetchStockBalance.js

const express = require('express');
const router = express.Router();
const fetchStockBalance = require('../controllers/fetchStockBalanceController');

router.post('/', fetchStockBalance);

module.exports = router;
