const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchStockAccounts = async (req, res) => {
    const { mail, mobile, register_code } = req.body;

    // Validate input
    if (!mail || !mobile || !register_code) {
        return res.status(400).json({ error: 'Email, Phone, and RegCode are required' });
    }

    try {
        const trimmedMail = mail.trim();
        const trimmedMobile = mobile.trim();
        const trimmedRegCode = register_code.trim();

        // Define the SQL query
        const query = `
            SELECT 
                Acctno, 
                last_nm, 
                first_nm, 
                middle_nm
            FROM T_shold
            WHERE (email = :mail
            OR mobile = :mobile)
            AND regcode = :register_code
        `;

        // Execute the raw query with Sequelize
        const shareholders = await sequelize.query(query, {
            replacements: {
                mail: trimmedMail,
                mobile: trimmedMobile,
                register_code: trimmedRegCode,
            },
            type: sequelize.QueryTypes.SELECT,
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
