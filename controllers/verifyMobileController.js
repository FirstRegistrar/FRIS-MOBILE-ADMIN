// controllers/verifyMobileController.js

const { T_shareholder } = require('../models'); // Import Sequelize models
const generateCode = require('../utils/codeGenerator');
const sendSMS = require('../utils/smsSender');
const winston = require('winston'); // Import winston for logging

const verifyMobile = async (req, res) => {
    const { mobile } = req.body;

    // Validate input
    if (!mobile) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        // Find the shareholder with the provided mobile number
        const shareholder = await T_shareholder.findOne({
            where: { mobile: mobile },
            attributes: ['mail'] // Only fetch the mail
        });

        if (shareholder) {
            const mail = shareholder.mail;
            const code = '1047';  // You can generate a dynamic code here using generateCode()
            const smsSent = await sendSMS(mobile, code);

            if (smsSent) {
                return res.json({ exists: true, code, mail });
            } else {
                return res.status(500).json({ error: 'Failed to send SMS' });
            }
        } else {
            return res.json({ exists: false, message: 'Phone number not found' });
        }
    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in verifyMobileController for mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'verifyMobile'
        });

        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = verifyMobile;
