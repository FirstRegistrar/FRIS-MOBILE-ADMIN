const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // For logging errors

const fetchStockBalance = async (req, res) => {
    const { account_no, register_code, mail, mobile } = req.body;

    // Validation for required fields
    if (!account_no || !register_code || !mail || !mobile) {
        return res.status(400).json({ error: 'AccountNo, Register Code, Email, and Phone are required' });
    }

    try {
        const trimmedAccountNo = account_no.trim();
        const trimmedRegisterCode = register_code.trim();
        const trimmedMail = mail.trim();
        const trimmedMobile = mobile.trim();

        // Query to fetch the total units with cert_status = 1
        const unitsQuery = `
            SELECT SUM(no_of_units) AS total_units
            FROM T_units
            WHERE account_no = :account_no
            AND reg_code = :register_code
            AND certificate_status = 1
        `;

        // Execute the query for total units
        const [unitsResult] = await sequelize.query(unitsQuery, {
            replacements: {
                account_no: trimmedAccountNo,
                register_code: trimmedRegisterCode,
            },
            type: sequelize.QueryTypes.SELECT,
        });

        const total_units = unitsResult.total_units || 0;

        // Query to fetch shareholder information
        const shareholderQuery = `
            SELECT 
                addr1, 
                addr2, 
                st, 
                last_nm, 
                first_nm, 
                middle_nm
            FROM T_shold
            WHERE (email = :mail
            OR mobile = :mobile)
            AND Acctno = :account_no
            AND regcode = :register_code
        `;

        // Execute the query for shareholder information
        const [shareholderResult] = await sequelize.query(shareholderQuery, {
            replacements: {
                mail: trimmedMail,
                mobile: trimmedMobile,
                account_no: trimmedAccountNo,
                register_code: trimmedRegisterCode,
            },
            type: sequelize.QueryTypes.SELECT,
        });

        if (!shareholderResult) {
            return res.status(404).json({ error: 'Shareholder not found' });
        }

        return res.json({ shareholder: shareholderResult, total_units });
    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(`Error in fetchStockBalanceController for account_no: ${account_no}, register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchStockBalance',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchStockBalance;
