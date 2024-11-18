// controllers/verifyEmailController.js

const { Shareholder } = require('../models'); // Import Sequelize models
const generateCode = require('../utils/codeGenerator');
const sendEmail = require('../utils/emailSender');
const winston = require('winston'); // Import winston for logging

const verifyEmail = async (req, res) => {
    const { mail } = req.body;

    // Validate input
    if (!mail) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        // Fetch mobile number associated with the provided email
        const shareholder = await Shareholder.findOne({
            where: { mail: mail },
            attributes: ['mobile'] // Only fetch the mobile number
        });

        if (shareholder) {
            const mobile = shareholder.mobile;
            const code = generateCode();  // Generate verification code

            // Send email with the generated code
            const mailSent = await sendEmail(mail, code);

            if (mailSent) {
                return res.json({ code, exists: true, mobile });
            } else {
                return res.status(500).json({ error: 'Failed to send mail' });
            }
        } else {
            return res.json({ exists: false, message: 'Email not found' });
        }
    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in verifyEmailController for mail: ${mail} - ${error.message}`, {
            stack: error.stack,
            route: 'verifyEmail'
        });

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = verifyEmail;
