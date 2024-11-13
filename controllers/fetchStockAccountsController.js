const { Shareholder } = require('../models'); // Adjust model import based on your project structure
const winston = require('winston'); // For logging errors
const { Op } = require('sequelize'); // Sequelize operators

const fetchStockAccounts = async (req, res) => {
    const { mail, mobile, register_code } = req.body;

    if (!mail || !mobile || !register_code) {
        return res.status(400).json({ error: 'Email, Phone, and RegCode are required' });
    }

    try {
        // Fetch shareholder information using Sequelize ORM
        const shareholders = await Shareholder.findAll({
            where: {
                mail: mail,
                mobile: mobile,
                register_code: register_code
            }
        });

        if (shareholders.length === 0) {
            return res.status(404).json({ error: 'No stock accounts found for the given parameters' });
        }

        // Map the response to match the required format
        const data = shareholders.map(shareholder => ({
            account_number: shareholder.account_number,
            hlast_name: shareholder.hlast_name,
            hfirst_name: shareholder.hfirst_name,
            hmname: shareholder.hmname
        }));

        return res.json({ shareholders: data });
    } catch (error) {
        // Log the error with Winston for consistency
        winston.error(`Error in fetchStockAccountsController for mail: ${mail}, mobile: ${mobile}, register_code: ${register_code} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchStockAccounts'
        });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchStockAccounts;
