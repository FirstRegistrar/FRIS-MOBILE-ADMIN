const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchAccounts = async (req, res) => {
    const { mail, mobile } = req.body;

    // Validate input
    if (!mail && !mobile) {
        return res.status(400).json({ error: 'Email and Phone are required' });
    }

    try {
        const trimmedMail = mail.trim();
        const trimmedMobile = mobile.trim();

        // Log the trimmed values to verify if they're correct
        console.log(`Mail: ${trimmedMail}, Mobile: ${trimmedMobile}`);

        // Define the query to fetch associated companies using Sequelize raw query
        const query = `
            SELECT DISTINCT TS.regcode,
                CL.Name
            FROM T_shold TS
            INNER JOIN ___OnlineRegs CL
                ON TS.regcode = CL.Id
            WHERE TS.email = :mail OR TS.mobile = :mobile
        `;

        // Execute raw query using Sequelize
        const result = await sequelize.query(query, {
            replacements: { mail: trimmedMail, mobile: trimmedMobile },
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
