const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchAccounts = async (req, res) => {
    const { mail, mobile } = req.body;

    // Validate input
    if (!mail && !mobile) {
        return res.status(400).json({ error: 'Either Email or Phone is required' });
    }

    try {
        const trimmedMail = mail ? mail.trim() : null;
        const trimmedMobile = mobile ? mobile.trim() : null;

        // Log the trimmed values to verify if they're correct
        console.log(`Mail: ${trimmedMail}, Mobile: ${trimmedMobile}`);

        // Start the base query
        let query = `
            SELECT DISTINCT TS.regcode,
                CL.Name
            FROM T_shold TS
            INNER JOIN ___OnlineRegs CL
                ON TS.regcode = CL.Id
        `;

        const replacements = {};

        // Append conditions based on input availability
        if (trimmedMail && trimmedMobile) {
            query += ` WHERE TS.email = :mail OR TS.mobile = :mobile`;
            replacements.mail = trimmedMail;
            replacements.mobile = trimmedMobile;
        } else if (trimmedMail) {
            query += ` WHERE TS.email = :mail`;
            replacements.mail = trimmedMail;
        } else if (trimmedMobile) {
            query += ` WHERE TS.mobile = :mobile`;
            replacements.mobile = trimmedMobile;
        }

        // Execute raw query using Sequelize
        const result = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        // Log the result to check the output
        console.log('Query Result:', result);

        // Check if we got any result
        if (result && result.length > 0) {
            const companies = result.map((row) => ({
                register_code: row.regcode,
                prc_name: row.Name,
            }));

            return res.json({ companies });
        } else {
            return res.status(404).json({
                message: 'No companies found for the provided email or phone number.',
            });
        }
    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(`Error in fetchAccountsController for mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchAccounts',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchAccounts;
