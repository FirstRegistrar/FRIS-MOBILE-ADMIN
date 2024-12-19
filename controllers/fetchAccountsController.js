const { QueryTypes } = require('sequelize'); // Import QueryTypes
const { db1 } = require('../config/db'); // Correctly import db1
const winston = require('winston');
const validator = require('validator');

// Configure Winston logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    ],
});

const fetchAccounts = async (req, res) => {
    const { mail, mobile } = req.body;

    // Validate input
    if (!mail && !mobile) {
        return res.status(400).json({ error: 'Either Email or Phone is required.' });
    }

    const trimmedMail = mail ? mail.trim() : null;
    const trimmedMobile = mobile ? mobile.trim() : null;

    if (trimmedMail && !validator.isEmail(trimmedMail)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (trimmedMobile && !/^\d{10,15}$/.test(trimmedMobile)) {
        return res.status(400).json({ error: 'Invalid phone number format.' });
    }

    try {
        // Start building the query
        let query = `
            SELECT DISTINCT TS.regcode,
                CL.Name
            FROM [dbo].[T_shold] TS
            INNER JOIN [dbo].[___OnlineRegs] CL
                ON TS.regcode = CL.Id
        `;

        const replacements = {};

        // Add conditions dynamically
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

        // Execute the query
        const result = await db1.query(query, {
            replacements,
            type: QueryTypes.SELECT,
        });

        // Log the query result
        logger.info('fetchAccounts query executed successfully', {
            resultCount: result.length,
            mail: trimmedMail,
            mobile: trimmedMobile,
        });

        // Check and return results
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
        // Log detailed error with metadata
        logger.error(
            `Error in fetchAccountsController - mail: ${trimmedMail}, mobile: ${trimmedMobile} - ${error.message}`,
            {
                stack: error.stack,
                route: 'fetchAccounts',
            }
        );

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred. Please try again later.',
        });
    }
};

module.exports = fetchAccounts;
