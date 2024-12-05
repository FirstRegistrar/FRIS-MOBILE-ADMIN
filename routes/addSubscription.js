// routes/addSubscription.js

const express = require('express');
const router = express.Router();
const addSubscription = require('../controllers/addSubscriptionController');

router.post('/', addSubscription);

module.exports = router;
