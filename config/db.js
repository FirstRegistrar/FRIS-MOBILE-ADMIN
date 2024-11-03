// config/db.js

const sql = require('mssql');
require('dotenv').config();

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    server: process.env.DB_HOST,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Use this if you're on Azure
        trustServerCertificate: true // Change to true for local dev / self-signed certs
    }
};

const connectDB = async () => {
    try {
        const pool = await sql.connect(dbConfig);
        console.log('Connected to the database');
        return pool;
    } catch (error) {
        console.error('Database Connection Failed!', error);
        throw error;
    }
};

module.exports = connectDB;
