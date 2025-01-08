const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db1 = require('../config/db').db1; // Adjust to match the exported db1
const winston = require('winston'); // For logging
const sendEmail = require('../utils/emailSender'); // Assuming you have a utility function for sending emails
const generateCode = require('../utils/codeGenerator'); // Assuming you have a utility function for generating codes

const verifyEmail = async (req, res) => {
    const { mail } = req.body;

    if (!mail || typeof mail !== 'string') {
        return res.status(400).json({ error: 'A valid email address is required' });
    }

    try {
        const trimmedMail = mail.trim();

        // Query the database
        const [result] = await db1.query(
            `
            SELECT TOP 1 
                mobile, 
                first_nm, 
                middle_nm, 
                last_nm
            FROM [dbo].[T_shold]
            WHERE email = :mail
            `,
            {
                replacements: { mail: trimmedMail },
                type: QueryTypes.SELECT,
                timeout: 260000,
            }
        );

        if (result && result.mobile) {
            const { mobile, first_nm, middle_nm, last_nm } = result;
            const code = generateCode(); // Generate verification code

            // Attempt to send email
            const emailResult = await sendEmail(trimmedMail, code);

            if (emailResult.success) {
                return res.json({
                    code,
                    exists: true,
                    mobile,
                    first_nm,
                    middle_nm,
                    last_nm,
                });
            } else {
                return res.status(500).json({
                    error: 'Failed to send the email.',
                    details: emailResult.error, // Include detailed email error
                });
            }
        } else {
            return res.status(404).json({
                exists: false,
                message: 'Email not found in the database.',
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: 'Internal Server Error',
            details: {
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

module.exports = verifyEmail;
