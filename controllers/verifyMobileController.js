const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db1 = require('../config/db').db1; // Import the Sequelize instance
const generateCode = require('../utils/codeGenerator'); // Assuming you have a utility function for generating codes
const sendSMS = require('../utils/smsSender'); // Assuming you have a utility function for sending SMS
const winston = require('winston'); // Import winston for logging

const executeQueryWithRetry = async (query, options, maxRetries = 3) => {
    let attempts = 0;

    while (attempts < maxRetries) {
        try {
            attempts++;
            return await db1.query(query, options); // Try the query
        } catch (error) {
            if (error.message.includes('Timeout')) {
                winston.warn(`Query timeout on attempt ${attempts}. Retrying...`);
                if (attempts < maxRetries) {
                    await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // Exponential backoff
                }
            } else {
                throw error; // If the error is not a timeout, rethrow it
            }
        }
    }
    throw new Error(`Query failed after ${maxRetries} retries`);
};

const verifyMobile = async (req, res) => {
    const { mobile } = req.body;

    // Validate input
    if (!mobile || typeof mobile !== 'string') {
        return res.status(400).json({ error: 'A valid phone number is required' });
    }

    try {
        const trimmedMobile = mobile.trim();

        // Query with retry logic
        const query = `
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
        `;
        const options = {
            replacements: { mobile: trimmedMobile },
            type: QueryTypes.SELECT,
            timeout: 15000,
        };

        const [result] = await executeQueryWithRetry(query, options);

        // Check if a result was returned
        if (result && result.email) {
            const { email, first_nm, middle_nm, last_nm } = result;
            const code = generateCode(); // Generate a verification code

            // Send SMS with the generated code
            const smsSent = await sendSMS(trimmedMobile, code);

            if (smsSent) {
                return res.json({
                    exists: true,
                    code,
                    mail: email,
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
