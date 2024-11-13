const { CompanyList } = require('../models'); // Adjust model import based on your project structure
const winston = require('winston'); // Winston for consistent logging

const fetchCompanyName = async (req, res) => {
    const { register_code } = req.body;

    if (!register_code || !Array.isArray(register_code) || register_code.length === 0) {
        return res.status(400).json({ error: 'Invalid or empty regCode array' });
    }

    try {
        // Query using Sequelize ORM
        const companies = await CompanyList.findAll({
            where: {
                register_code: {
                    [Op.in]: register_code // Fetch companies where register_code is in the provided array
                }
            }
        });

        // Return the fetched company names
        return res.json({ companies: companies.map(company => ({
            register_code: company.register_code,
            prc_name: company.prc_name
        })) });

    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in fetchCompanyNameController for register_code: ${register_code} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchCompanyName'
        });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchCompanyName;
