const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // For logging
const sendEmail = require('../utils/emailSender'); // Assuming you have a utility function for sending emails
const generateCode = require('../utils/codeGenerator'); // Assuming you have a utility function for generating codes

const verifyEmail = async (req, res) => {
    const { mail } = req.body;

    // Validate input
    if (!mail || typeof mail !== 'string') {
        return res.status(400).json({ error: 'A valid email address is required' });
    }

    try {
        const trimmedMail = mail.trim();

        // Modified query to prioritize accounts with the most complete information
        const [result] = await sequelize.query(
            `
            SELECT TOP 1 
                mobile, 
                first_nm, 
                middle_nm, 
                last_nm
            FROM T_shold
            WHERE email = :mail
            ORDER BY 
                (CASE 
                    WHEN first_nm IS NOT NULL AND middle_nm IS NOT NULL AND last_nm IS NOT NULL THEN 3
                    WHEN first_nm IS NOT NULL AND last_nm IS NOT NULL THEN 2
                    WHEN first_nm IS NOT NULL THEN 1
                    ELSE 0
                END) DESC
            `,
            {
                replacements: { mail: trimmedMail }, // Bind the parameter to avoid SQL injection
                type: sequelize.QueryTypes.SELECT, // Ensure the query returns rows
            }
        );

        // Check if a result was returned
        if (result && result.mobile) {
            const mobile = result.mobile;
            const first_nm = result.first_nm;
            const last_nm = result.last_nm;
            const middle_nm = result.middle_nm;
            const code = generateCode(); // Generate a verification code

            // Send email with the generated code
            const mailSent = await sendEmail(trimmedMail, code);

            if (mailSent) {
                return res.json({
                    code,
                    exists: true,
                    mobile,
                    first_nm,
                    last_nm,
                    middle_nm,
                });
            } else {
                return res.status(500).json({ error: 'Failed to send the email. Please try again later.' });
            }
        } else {
            return res.status(404).json({
                exists: false,
                message: 'Email not found in the database.',
            });
        }
    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in verifyEmailController for mail: ${mail} - ${error.message}`, {
            stack: error.stack,
            route: 'verifyEmail',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = verifyEmail;
