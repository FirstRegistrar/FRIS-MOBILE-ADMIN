// controllers/verifyEmailController.js

const connectDB = require('../config/db');
const generateCode = require('../utils/codeGenerator');
const sendEmail = require('../utils/emailSender');

const verifyEmail = async (req, res) => {
    const { mail } = req.body;

    if (!mail) {
        return res.status(400).json({ error: 'Email is required' });
    }

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('mail', sql.VarChar, mail)
            .query('SELECT mobile FROM T_shareholder WHERE mail = @mail');

        if (result.recordset.length > 0) {
            const mobile = result.recordset[0].mobile;
            const code = generateCode();
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
        console.error('Error in verifyEmail:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = verifyEmail;
