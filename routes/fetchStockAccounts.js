// routes/fetchStockAccounts.js

const express = require('express');
const router = express.Router();
const fetchStockAccounts = require('../controllers/fetchStockAccountsController');

router.post('/', fetchStockAccounts);

module.exports = router;
