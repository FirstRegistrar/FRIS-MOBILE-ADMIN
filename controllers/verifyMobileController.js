const sequelize = require('../config/db'); // Import the Sequelize instance
const generateCode = require('../utils/codeGenerator'); // Assuming you have a utility function for generating codes
const sendSMS = require('../utils/smsSender'); // Assuming you have a utility function for sending SMS
const winston = require('winston'); // Import winston for logging

const verifyMobile = async (req, res) => {
    const { mobile } = req.body;

    // Validate input
    if (!mobile || typeof mobile !== 'string') {
        return res.status(400).json({ error: 'A valid phone number is required' });
    }

    try {
        const trimmedMobile = mobile.trim();

        // Execute raw query to fetch the email associated with the given mobile number
        const [result] = await sequelize.query(
            'SELECT TOP 1 email, first_nm, last_nm  FROM T_shold WHERE mobile = :mobile',
            {
                replacements: { mobile: trimmedMobile }, // Bind the mobile parameter
                type: sequelize.QueryTypes.SELECT, // Ensure the query returns rows
            }
        );

        // Check if a result was returned
        if (result && result.email) {
            const mail = result.email;
            const first_nm = result.first_nm;
            const last_nm = result.last_nm;
            const code = generateCode(); // Generate a verification code

            // Send SMS with the generated code
            const smsSent = await sendSMS(trimmedMobile, code);

            if (smsSent) {
                return res.json({
                    exists: true,
                    code,
                    mail,
                    first_nm,
                    last_nm,
                });
            } else {
                return res.status(500).json({ error: 'Failed to send SMS. Please try again later.' });
            }
        } else {
            return res.status(404).json({
                exists: false,
                message: 'Phone number not found in the database.',
            });
        }
    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in verifyMobileController for mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'verifyMobile',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = verifyMobile;
