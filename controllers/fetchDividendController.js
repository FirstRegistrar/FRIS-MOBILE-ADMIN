// controllers/fetchDividendController.js

const connectDB = require('../config/db');

const fetchDividend = async (req, res) => {
    const { register_code, mail, mobile } = req.body;

    if (!register_code || !mail || !mobile) {
        return res.status(400).json({ error: 'Register Code, Email, and Phone are required' });
    }

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('register_code', sql.VarChar, register_code)
            .input('mail', sql.VarChar, mail)
            .input('mobile', sql.VarChar, mobile)
            .query(`
                SELECT s.*, d.* 
                FROM T_shareholder s 
                JOIN T_Divs d ON s.account_number = d.account_no 
                WHERE s.register_code = @register_code 
                AND (s.mail = @mail
                OR s.mobile = @mobile)
                ORDER BY d.cslno
            `);

        return res.json({ data: result.recordset });
    } catch (error) {
        console.error('Error in fetchDividend:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchDividend;
