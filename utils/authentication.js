// utils/authentication.js

require('dotenv').config();
const winston = require('winston'); // Import winston for logging

const authenticate = (req) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        // Log missing authorization header
        winston.warn('Missing authorization header in request', { route: req.originalUrl });
        return false;
    }

    const token = authHeader.split(' ')[1];
    if (token !== process.env.API_KEY) {
        // Log invalid token
        winston.warn(`Invalid API key used for request to ${req.originalUrl}`, { route: req.originalUrl });
        return false;
    }

    return true;
};

module.exports = authenticate;
