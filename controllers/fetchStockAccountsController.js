const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db1 = require('../config/db').db1; // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchStockAccounts = async (req, res) => {
    const { mail, mobile, register_code } = req.body;

    // Validate input
    if ((!mail && !mobile) || !register_code) {
        return res.status(400).json({ error: 'Either Email or Phone, and RegCode are required' });
    }

    try {
        const trimmedMail = mail ? mail.trim() : null;
        const trimmedMobile = mobile ? mobile.trim() : null;
        const trimmedRegCode = register_code.trim();

        // Start the base query
        let query = `
            SELECT 
                [Acctno], 
                [last_nm], 
                [first_nm], 
                [middle_nm]
            FROM [dbo].[T_shold]
            WHERE [regcode] = :register_code
        `;

        const replacements = { register_code: trimmedRegCode };

        // Append conditions based on input availability
        if (trimmedMail && trimmedMobile) {
            query += ` AND ([email] = :mail OR [mobile] = :mobile)`;
            replacements.mail = trimmedMail;
            replacements.mobile = trimmedMobile;
        } else if (trimmedMail) {
            query += ` AND [email] = :mail`;
            replacements.mail = trimmedMail;
        } else if (trimmedMobile) {
            query += ` AND [mobile] = :mobile`;
            replacements.mobile = trimmedMobile;
        }

        // Execute the raw query with Sequelize
        const shareholders = await db1.query(query, {
            replacements,
            type: QueryTypes.SELECT,
        });

        // Check if results are found
        if (shareholders.length === 0) {
            return res.status(404).json({ error: 'No stock accounts found for the given parameters' });
        }

        // Format the response
        const data = shareholders.map(row => ({
            account_number: row.Acctno,
            last_name: row.last_nm,
            first_name: row.first_nm,
            middle_name: row.middle_nm,
        }));

        return res.json({ shareholders: data });
    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(`Error in fetchStockAccountsController for mail: ${mail}, mobile: ${mobile}, register_code: ${register_code} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchStockAccounts',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchStockAccounts;

