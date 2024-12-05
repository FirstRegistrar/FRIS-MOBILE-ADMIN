// routes/fetchSubscription.js

const express = require('express');
const router = express.Router();
const fetchSubscription = require('../controllers/fetchSubscriptionController');

router.post('/', fetchSubscription);

module.exports = router;
