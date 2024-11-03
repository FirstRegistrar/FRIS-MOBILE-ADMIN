// controllers/fetchStockAccountsController.js

const connectDB = require('../config/db');

const fetchStockAccounts = async (req, res) => {
    const { mail, mobile, register_code } = req.body;

    if (!mail || !mobile || !register_code) {
        return res.status(400).json({ error: 'Email, Phone, and RegCode are required' });
    }

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('mail', sql.VarChar, mail)
            .input('mobile', sql.VarChar, mobile)
            .input('register_code', sql.VarChar, register_code)
            .query(`
                SELECT account_number, hlast_name, hfirst_name, hmname 
                FROM T_shareholder 
                WHERE mail = @mail AND mobile = @mobile AND register_code = @register_code
            `);

        return res.json({ shareholders: result.recordset });
    } catch (error) {
        console.error('Error in fetchStockAccounts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchStockAccounts;
