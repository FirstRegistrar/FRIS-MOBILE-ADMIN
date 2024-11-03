// controllers/updatePhoneController.js

/*const connectDB = require('../config/db');

const updatePhone = async (req, res) => {
    const { mail, mobile } = req.body;

    if (!mail || !mobile) {
        return res.status(400).json({ error: 'Email and Phone are required' });
    }

    // Normalize mobile number
    const normalizedPhone = mobile.replace(/\D/g, '');
    const countryCode = '234'; // Example country code (without '+')
    let mobileWithCountryCode = normalizedPhone;

    if (normalizedPhone.startsWith('0')) {
        mobileWithCountryCode = countryCode + normalizedPhone.substring(1);
    }

    try {
        const pool = await connectDB();

        // Update mail where mobile matches (either format)
        const updateEmailResult = await pool.request()
            .input('mail', sql.VarChar, mail)
            .input('mobile1', sql.VarChar, normalizedPhone)
            .input('mobile2', sql.VarChar, mobileWithCountryCode)
            .query(`
                UPDATE shareholders 
                SET mail = @mail 
                WHERE REPLACE(mobile, '+', '') = @mobile1 OR REPLACE(mobile, '+', '') = @mobile2
            `);
        const mailUpdated = updateEmailResult.rowsAffected[0] > 0;

        // Update mobile where mail matches
        const updatePhoneResult = await pool.request()
            .input('mobile', sql.VarChar, mobile)
            .input('mail', sql.VarChar, mail)
            .query(`
                UPDATE shareholders 
                SET mobile = @mobile 
                WHERE mail = @mail
            `);
        const mobileUpdated = updatePhoneResult.rowsAffected[0] > 0;

        const updated = mailUpdated || mobileUpdated;
        return res.json({ updated });
    } catch (error) {
        console.error('Error in updatePhone:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = updatePhone;
*/