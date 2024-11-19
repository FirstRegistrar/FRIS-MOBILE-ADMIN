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

        // Execute raw query to fetch the mobile number using MSSQL syntax (TOP instead of LIMIT)
        const [result] = await sequelize.query(
            'SELECT TOP 1 mobile FROM T_shold WHERE email = :mail',
            {
                replacements: { mail: trimmedMail }, // Bind the parameter to avoid SQL injection
                type: sequelize.QueryTypes.SELECT, // Ensure the query returns rows
            }
        );

        // Check if a result was returned
        if (result && result.mobile) {
            const mobile = result.mobile;
            const code = generateCode(); // Generate a verification code

            // Send email with the generated code
            const mailSent = await sendEmail(trimmedMail, code);

            if (mailSent) {
                return res.json({
                    code,
                    exists: true,
                    mobile,
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