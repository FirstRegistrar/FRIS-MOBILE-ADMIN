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
        const shareholder = await T_shareholder.findOne({
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
                winston.error(`Mail sending failed for email: ${mail}`);
                return res.status(500).json({ error: 'Failed to send mail. Please try again later.' });
            }
        } else {
            return res.status(404).json({ exists: false, message: 'Email not found' });
        }
    } catch (error) {
        winston.error(`Error in verifyEmailController for mail: ${mail} - ${error.message}`, {
            stack: error.stack,
            route: 'verifyEmail'
        });
    
        if (error.name === 'SequelizeConnectionError') {
            return res.status(500).json({ error: 'Database connection error. Please check the database configuration.' });
        } else if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ error: 'Invalid data input.' });
        } else {
            return res.status(500).json({ error: `Unexpected error: ${error.message}` });
        }
    }
    
};

module.exports = verifyEmail;
