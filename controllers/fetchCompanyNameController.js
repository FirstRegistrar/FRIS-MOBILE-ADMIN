// controllers/fetchCompanyNameController.js

const connectDB = require('../config/db');

const fetchCompanyName = async (req, res) => {
    const { register_code } = req.body;

    if (!register_code || !Array.isArray(register_code)) {
        return res.status(400).json({ error: 'Invalid regCode array' });
    }

    try {
        const pool = await connectDB();
        const placeholders = register_code.map((_, index) => `@register_code${index}`).join(', ');
        const request = pool.request();

        register_code.forEach((code, index) => {
            request.input(`register_code${index}`, sql.VarChar, code);
        });

        const query = `SELECT * FROM company_list WHERE register_code IN (${register_code.map((_, index) => `@register_code${index}`).join(', ')})`;
        const result = await request.query(query);
        return res.json({ companies: result.recordset });
    } catch (error) {
        console.error('Error in fetchCompanyName:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchCompanyName;
