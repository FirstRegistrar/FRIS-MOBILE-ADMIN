// index.js

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const authenticate = require('./utils/authentication');

const verifyEmailRoute = require('./routes/verifyEmail');
const verifyMobileRoute = require('./routes/verifyMobile');
const fetchAccountsRoute = require('./routes/fetchAccounts');
const fetchCompanyNameRoute = require('./routes/fetchCompanyName');
const fetchStockAccountsRoute = require('./routes/fetchStockAccounts');
const fetchStockBalanceRoute = require('./routes/fetchStockBalance');
const fetchDividendRoute = require('./routes/fetchDividend');

const app = express();
const PORT = process.env.PORT || 3000;




// Middleware
app.use(bodyParser.json());

// Authentication Middleware
app.use((req, res, next) => {
    if (['/verifyEmail', '/verifyMobile'].includes(req.path)) {
        // These routes might not require authentication depending on your logic
        return next();
    }

    if (!authenticate(req)) {
        return res.status(401).json({ error: 'Invalid API Key' });
    }
    next();
});

// Routes
app.use('/verifyEmail', verifyEmailRoute);
app.use('/verifyMobile', verifyMobileRoute);
app.use('/fetchAccounts', fetchAccountsRoute);
app.use('/fetchCompanyName', fetchCompanyNameRoute);
app.use('/fetchStockAccounts', fetchStockAccountsRoute);
app.use('/fetchStockBalance', fetchStockBalanceRoute);
app.use('/fetchDividend', fetchDividendRoute);

// Default Route
app.get('/', (req, res) => {
    res.send('Welcome to the Estock Backend API');
});

// Error Handling for Undefined Routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});


