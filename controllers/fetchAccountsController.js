// controllers/fetchAccountsController.js

const connectDB = require('../config/db');

const fetchAccounts = async (req, res) => {
    const { mail, mobile, type } = req.body;

    if (!mail || !mobile) {
        return res.status(400).json({ error: 'Email and Phone are required' });
    }

    try {
        const pool = await connectDB();
        const result = await pool.request()
            .input('mail', sql.VarChar, mail)
            .input('mobile', sql.VarChar, mobile)
            .query('SELECT register_code FROM T_shareholder WHERE mail = @mail OR mobile = @mobile');

        const shareholders = result.recordset;
        const response = [];
        const seenRegCodes = new Set();

        for (const shareholder of shareholders) {
            const register_code = shareholder.register_code;

            if (seenRegCodes.has(register_code)) continue;
            seenRegCodes.add(register_code);

            let companyQuery = '';
            if (type == 0) {
                // show unit = 1 ;
                companyQuery = 'SELECT register_code, prc_name FROM company_list WHERE register_code = @register_code';
            } else {
                // show div = 1 ; 
                companyQuery = 'SELECT register_code, prc_name FROM company_list WHERE register_code = @register_code';
            }

            const companyResult = await pool.request()
                .input('register_code', sql.VarChar, register_code)
                .query(companyQuery);

            if (companyResult.recordset.length > 0) {
                response.push(companyResult.recordset[0]);
            }
        }

        return res.json({ companies: response });
    } catch (error) {
        console.error('Error in fetchAccounts:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchAccounts;
