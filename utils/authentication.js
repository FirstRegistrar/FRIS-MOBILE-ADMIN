// utils/authentication.js

require('dotenv').config();

const authenticate = (req) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return false;
    const token = authHeader.split(' ')[1];
    return token === process.env.API_KEY;
};

module.exports = authenticate;
