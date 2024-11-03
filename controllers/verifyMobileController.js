// controllers/verifyMobileController.js

const connectDB = require('../config/db');
const generateCode = require('../utils/codeGenerator');
const sendSMS = require('../utils/smsSender');

const verifyMobile = async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('mobile', sql.VarChar, mobile)
            .query('SELECT mail FROM T_shareholder WHERE mobile = @mobile');

        if (result.recordset.length > 0) {
            const mail = result.recordset[0].mail;
            const code = '1047'; //generateCode();
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
        console.error('Error in verifyMobile:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = verifyMobile;
