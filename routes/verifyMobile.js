// routes/verifyMobile.js

const express = require('express');
const router = express.Router();
const verifyMobile = require('../controllers/verifyMobileController');

router.post('/', verifyMobile);

module.exports = router;
