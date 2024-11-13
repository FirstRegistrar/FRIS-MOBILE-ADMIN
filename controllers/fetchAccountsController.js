const { TShareholder, CompanyList } = require('../models'); // Adjust model import based on your project structure
const winston = require('winston');

const fetchAccounts = async (req, res) => {
    const { mail, mobile, type } = req.body;

    if (!mail || !mobile) {
        return res.status(400).json({ error: 'Email and Phone are required' });
    }

    try {
        // Query using Sequelize ORM
        const shareholders = await TShareholder.findAll({
            where: {
                [Op.or]: [{ mail }, { mobile }]
            },
            include: [
                {
                    model: CompanyList,
                    where: {
                        [Op.or]: [{ register_code: sequelize.col('TShareholder.register_code') }]
                    },
                    required: true // INNER JOIN instead of LEFT JOIN
                }
            ],
            distinct: true, // Avoid duplicates
            attributes: ['register_code', 'company_list.prc_name'] // Only select the necessary fields
        });

        const response = shareholders.map((shareholder) => ({
            register_code: shareholder.register_code,
            prc_name: shareholder.CompanyList.prc_name
        }));

        return res.json({ companies: response });
    } catch (error) {
        // Enhanced error logging with winston
        winston.error(`Error in fetchAccountsController for mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchAccounts'
        });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchAccounts;
