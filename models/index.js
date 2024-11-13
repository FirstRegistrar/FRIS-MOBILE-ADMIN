// models/index.js
const { sequelize } = require('../config/db');  // Import the sequelize instance from db.js
const { DataTypes } = require('sequelize');

// Import models
const Shareholder = require('./Shareholder')(sequelize, DataTypes);

// You can import other models here if needed, like:
 // const AnotherModel = require('./AnotherModel')(sequelize, DataTypes);

// Export all models
module.exports = {
    Shareholder,
    // Add other models here
};
