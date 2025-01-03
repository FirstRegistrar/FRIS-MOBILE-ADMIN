// routes/submitShareholdersForm.js

const express = require('express');
const router = express.Router();
const submitShareholdersForm = require('../controllers/submitShareholdersFormController');

router.post('/', submitShareholdersForm);

module.exports = router;
