const { Sequelize } = require('sequelize');

// MSSQL database configuration
const sequelize = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST, // Database host (e.g., localhost or IP)
    username: process.env.DB_USER, // Your DB username
    password: process.env.DB_PASS, // Your DB password
    database: process.env.DB_NAME, // Your DB name
    dialectOptions: {
        encrypt: false, // Use encryption if required (Azure)
    },
    logging: false, // Disable logging if not needed
});

module.exports = sequelize;
