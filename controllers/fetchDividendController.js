const sql = require('mssql'); // Import MSSQL for database queries
const winston = require('winston'); // Winston for consistent logging
const dbConfig = require('../config/db'); // Import your database configuration

const fetchDividend = async (req, res) => {
    const { register_code, mail, mobile } = req.body;

    // Validate input
    if (!register_code || !mail || !mobile) {
        return res.status(400).json({ error: 'Register Code, Email, and Phone are required' });
    }

    try {
        // Connect to the MSSQL database
        const pool = await sql.connect(dbConfig);

        // Write the SQL query to fetch shareholder and dividend data
        const query = `
            SELECT s.register_code, s.mail, s.mobile, d.account_number, d.cslno, d.dividend_amount
            FROM Shareholder s
            INNER JOIN Div d ON s.account_number = d.account_number
            WHERE s.register_code = @register_code
            AND (s.mail = @mail OR s.mobile = @mobile)
            ORDER BY d.cslno ASC
        `;

        // Execute the query with parameters
        const result = await pool.request()
            .input('register_code', sql.VarChar, register_code)
            .input('mail', sql.VarChar, mail)
            .input('mobile', sql.VarChar, mobile)
            .query(query);

        // Check if results are found
        if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'No dividends found for the given parameters' });
        }

        // Map the results to match the required format
        const data = result.recordset.map(row => ({
            register_code: row.register_code,
            mail: row.mail,
            mobile: row.mobile,
            dividends: {
                account_number: row.account_number,
                cslno: row.cslno,
                dividend_amount: row.dividend_amount,
            }
        }));

        return res.json({ data });

    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in fetchDividendController for register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchDividend',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchDividend;
