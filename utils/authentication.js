// utils/authentication.js

require('dotenv').config();
const winston = require('winston'); // Import winston for logging

const authenticate = (req) => {
    const authHeader = req.headers['authorization']; // Use lowercase

    if (!authHeader) {
        winston.warn('Missing authorization header in request: ' + req.headers['authorization'] + ' / ' + process.env.API_KEY, {
            route: req.originalUrl,
        });
        return false;
    }

    const token = authHeader; // Directly use the header value
    if (token !== process.env.API_KEY) {
        winston.warn(`Invalid API key used for request to ${req.originalUrl}`, {
            route: req.originalUrl,
        });
        return false;
    }

    return true;
};

module.exports = authenticate;

