// models/CompanyList.js
module.exports = (sequelize, DataTypes) => {
    const CompanyList = sequelize.define('CompanyList', {
        NAME: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        ADDRESS: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        account_no: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        reg_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        SumOfno_of_units: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        tableName: 'companyregister', // Matches the database view name
        timestamps: false,          // Views usually don't have timestamps
    });

    return CompanyList;
};
