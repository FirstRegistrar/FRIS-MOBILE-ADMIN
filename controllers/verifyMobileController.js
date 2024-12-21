const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db1 = require('../config/db').db1; // Import the Sequelize instance
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

        // Modified query to prioritize accounts with the most complete information
        const [result] = await db1.query(
            `
            SELECT TOP 1 
                email, 
                first_nm, 
                middle_nm, 
                last_nm
            FROM [dbo].[T_shold]
            WHERE mobile = :mobile
            ORDER BY 
                (CASE 
                    WHEN first_nm IS NOT NULL AND middle_nm IS NOT NULL AND last_nm IS NOT NULL THEN 3
                    WHEN first_nm IS NOT NULL AND last_nm IS NOT NULL THEN 2
                    WHEN first_nm IS NOT NULL THEN 1
                    ELSE 0
                END) DESC
            `,
            {
                replacements: { mobile: trimmedMobile }, // Bind the mobile parameter
                type: QueryTypes.SELECT, // Ensure the query returns rows
                timeout: 260000,
            }
        );

        // Check if a result was returned
        if (result && result.email) {
            const mail = result.email;
            const first_nm = result.first_nm;
            const last_nm = result.last_nm;
            const middle_nm = result.middle_nm;
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
                    middle_nm,
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
