const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db1 = require('../config/db').db1; // Import the Sequelize instance
const winston = require('winston'); // For logging errors

const fetchStockBalance = async (req, res) => {
    const { account_no, register_code, mail, mobile } = req.body;

    // Validation for required fields
    if (!account_no || !register_code || (!mail && !mobile)) {
        return res.status(400).json({ error: 'AccountNo, Register Code, and either Email or Phone are required' });
    }

    try {
        const trimmedAccountNo = account_no.trim();
        const trimmedRegisterCode = register_code.trim();
        const trimmedMail = mail ? mail.trim() : null;
        const trimmedMobile = mobile ? mobile.trim() : null;

        // Query to fetch the total units with certificate_status = 1
        const unitsQuery = `
            SELECT SUM([no_of_units]) AS total_units
            FROM [dbo].[T_units]
            WHERE [account_no] = :account_no
            AND [reg_code] = :register_code
            AND [certificate_status] = 1
        `;

        // Execute the query for total units
        const [unitsResult] = await db1.query(unitsQuery, {
            replacements: {
                account_no: trimmedAccountNo,
                register_code: trimmedRegisterCode,
            },
            type: QueryTypes.SELECT,
        });

        const total_units = unitsResult.total_units || 0;

        // Start the base query for shareholder information
        let shareholderQuery = `
            SELECT 
                [addr1], 
                [addr2], 
                [st], 
                [last_nm], 
                [first_nm], 
                [middle_nm]
            FROM [dbo].[T_shold]
            WHERE [Acctno] = :account_no
            AND [regcode] = :register_code
        `;

        const replacements = {
            account_no: trimmedAccountNo,
            register_code: trimmedRegisterCode,
        };

        // Append conditions for email and/or mobile
        if (trimmedMail && trimmedMobile) {
            shareholderQuery += ` AND ([email] = :mail OR [mobile] = :mobile)`;
            replacements.mail = trimmedMail;
            replacements.mobile = trimmedMobile;
        } else if (trimmedMail) {
            shareholderQuery += ` AND [email] = :mail`;
            replacements.mail = trimmedMail;
        } else if (trimmedMobile) {
            shareholderQuery += ` AND [mobile] = :mobile`;
            replacements.mobile = trimmedMobile;
        }

        // Execute the query for shareholder information
        const [shareholderResult] = await db1.query(shareholderQuery, {
            replacements,
            type: QueryTypes.SELECT,
        });

        if (!shareholderResult) {
            return res.status(404).json({ error: 'Shareholder not found' });
        }

        return res.json({ shareholder: shareholderResult, total_units });
    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(
            `Error in fetchStockBalanceController for account_no: ${account_no}, register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`,
            {
                stack: error.stack,
                route: 'fetchStockBalance',
            }
        );

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchStockBalance;

