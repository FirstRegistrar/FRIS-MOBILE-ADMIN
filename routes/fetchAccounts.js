// routes/fetchAccounts.js

const express = require('express');
const router = express.Router();
const fetchAccounts = require('../controllers/fetchAccountsController');

router.post('/', fetchAccounts);

module.exports = router;
