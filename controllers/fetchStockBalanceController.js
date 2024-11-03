// controllers/fetchStockBalanceController.js

const connectDB = require('../config/db');

const fetchStockBalance = async (req, res) => {
    const { account_no, register_code, mail, mobile } = req.body;

    if (!account_no || !register_code || !mail || !mobile) {
        return res.status(400).json({ error: 'AccountNo, Register Code, Email, and Phone are required' });
    }

    try {
        const pool = await connectDB();

        // Fetch total units with cert_status = true
        const unitsResult = await pool.request()
            .input('account_no', sql.VarChar, account_no)
            .input('register_code', sql.VarChar, register_code)
            .query(`
                SELECT SUM(no_of_units) AS total_units 
                FROM T_units 
                WHERE account_no = @account_no AND reg_code = @register_code AND cert_status = 1
            `);
        const total_units = unitsResult.recordset[0].total_units || 0;

        // Fetch shareholder information
        const shareholderResult = await pool.request()
            .input('mail', sql.VarChar, mail)
            .input('mobile', sql.VarChar, mobile)
            .input('account_no', sql.VarChar, account_no)
            .input('register_code', sql.VarChar, register_code)
            .query(`
                SELECT haddress, holder_address2, hcity_town, hlast_name, hfirst_name, hmname 
                FROM T_shareholder 
                WHERE mail = @mail AND mobile = @mobile AND account_no = @account_no AND register_code = @register_code
            `);
        const shareholder = shareholderResult.recordset[0] || {};

        return res.json({ shareholder, total_units });
    } catch (error) {
        console.error('Error in fetchStockBalance:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchStockBalance;
