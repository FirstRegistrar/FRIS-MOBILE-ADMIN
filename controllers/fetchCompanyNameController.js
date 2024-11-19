const sql = require('mssql'); // Import MSSQL for database queries
const winston = require('winston'); // Winston for consistent logging
const dbConfig = require('../config/db'); // Import your database configuration

const fetchCompanyName = async (req, res) => {
    const { register_code } = req.body;

    // Validate input
    if (!register_code || !Array.isArray(register_code) || register_code.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty register_code array' });
    }

    try {
        // Trim and sanitize register_code array values
        const sanitizedRegisterCodes = register_code.map(code => code.trim());

        // Connect to the MSSQL database
        const pool = await sql.connect(dbConfig);

        // Build a query to fetch company names for the given register_code array
        const query = `
            SELECT register_code, prc_name
            FROM CompanyList
            WHERE register_code IN (@registerCodes)
        `;

        // Create a parameterized query by using the `IN` clause
        const result = await pool.request()
            .input('registerCodes', sql.VarChar, sanitizedRegisterCodes.join(',')) // Convert array to string for query
            .query(query);

        // Process the results
        const companies = result.recordset.map(row => ({
            register_code: row.register_code,
            prc_name: row.prc_name,
        }));

        // Return the fetched company names
        return res.json({ companies });
    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in fetchCompanyNameController for register_code: ${register_code} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchCompanyName',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchCompanyName;
