const { Sequelize } = require('sequelize');

// First Database
const db1 = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST,
    username: "fris_mobile_db",
    password: "mOy2vG*71X!_x#",
    database: process.env.DB_NAME,
    dialectOptions: {
        encrypt: false,
        requestTimeout: 260000,
    },
    logging: false,
});

// Second Database (fris_mobile_db)
const db2 = new Sequelize({
    dialect: 'mssql',
    host: process.env.DB_HOST,
    username: "fris_mobile_db",
    password: "mOy2vG*71X!_x#",
    database: process.env.DB2_NAME,
    dialectOptions: {
        encrypt: false,
        requestTimeout: 260000,
    },
    logging: false,
});

module.exports = { db1, db2 };

