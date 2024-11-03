// routes/fetchCompanyName.js

const express = require('express');
const router = express.Router();
const fetchCompanyName = require('../controllers/fetchCompanyNameController');

router.post('/', fetchCompanyName);

module.exports = router;
