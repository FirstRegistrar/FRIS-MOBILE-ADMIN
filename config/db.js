// config/db.js

const { Sequelize } = require('sequelize');
require('dotenv').config();

// Set up Sequelize connection using environment variables
const sequelize = new Sequelize(
    process.env.DB_NAME,   // Database name
    process.env.DB_USER,   // Database user
    process.env.DB_PASS,   // Database password
    {
        host: process.env.DB_HOST,        // Database host (e.g., localhost or server)
        dialect: 'mssql',                 // Dialect for SQL Server
        dialectOptions: {
            options: {
                encrypt: true,            // Set to true for Azure
                trustServerCertificate: true // Set to true for local dev/self-signed certs
            }
        }
    }
);

// Test the connection
const connectDB = async () => {
    try {
        await sequelize.authenticate();  // Try authenticating the connection
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        throw error;  // Rethrow error if connection fails
    }
};

module.exports = { sequelize, connectDB };  // Export both sequelize instance and connectDB function
