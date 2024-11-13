// controllers/fetchStockBalanceController.js

const { T_units, T_shareholder } = require('../models'); // Import Sequelize models
const winston = require('winston'); // Import winston for logging

const fetchStockBalance = async (req, res) => {
    const { account_no, register_code, mail, mobile } = req.body;

    // Validation for required fields
    if (!account_no || !register_code || !mail || !mobile) {
        return res.status(400).json({ error: 'AccountNo, Register Code, Email, and Phone are required' });
    }

    try {
        // Fetch total units with cert_status = 1 using Sequelize's `sum` method
        const unitsResult = await T_units.sum('no_of_units', {
            where: {
                account_no: account_no,
                reg_code: register_code,
                cert_status: 1
            }
        });
        const total_units = unitsResult || 0;

        // Fetch shareholder information using Sequelize's `findOne` method
        const shareholder = await T_shareholder.findOne({
            where: {
                mail: mail,
                mobile: mobile,
                account_no: account_no,
                register_code: register_code
            },
            attributes: ['haddress', 'holder_address2', 'hcity_town', 'hlast_name', 'hfirst_name', 'hmname']
        });

        if (!shareholder) {
            return res.status(404).json({ error: 'Shareholder not found' });
        }

        return res.json({ shareholder, total_units });

    } catch (error) {
        // Logging the error using Winston
        winston.error(`Error in fetchStockBalanceController for account_no: ${account_no}, register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchStockBalance'
        });

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchStockBalance;
