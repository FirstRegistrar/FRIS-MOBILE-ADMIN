// models/Shareholder.js
module.exports = (sequelize, DataTypes) => {
    const Shareholder = sequelize.define('Shareholder', {
        account_number: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        hlast_name: {
            type: DataTypes.STRING
        },
        hfirst_name: {
            type: DataTypes.STRING
        },
        hmname: {
            type: DataTypes.STRING
        },
        mail: {
            type: DataTypes.STRING
        },
        mobile: {
            type: DataTypes.STRING
        },
        register_code: {
            type: DataTypes.STRING
        }
    }, {
        tableName: 'T_shareholder', // Matches the database view name
    });
    return Shareholder;
};
