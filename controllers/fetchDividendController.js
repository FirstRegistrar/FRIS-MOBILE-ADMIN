const { Shareholder, Div } = require('../models'); // Adjust model import based on your project structure
const winston = require('winston'); // Winston for consistent logging
const { Op } = require('sequelize'); // Sequelize operators

const fetchDividend = async (req, res) => {
    const { register_code, mail, mobile } = req.body;

    if (!register_code || !mail || !mobile) {
        return res.status(400).json({ error: 'Register Code, Email, and Phone are required' });
    }

    try {
        // Find shareholder with the given register_code, mail or mobile
        const shareholders = await Shareholder.findAll({
            where: {
                register_code: register_code,
                [Op.or]: [
                    { mail: mail },
                    { mobile: mobile }
                ]
            },
            include: {
                model: Div,
                where: { account_number: sequelize.col('Shareholder.account_number') },
                required: true // Ensures the dividend information is joined
            },
            order: [['Div', 'cslno', 'ASC']] // Order by dividend cslno
        });

        if (shareholders.length === 0) {
            return res.status(404).json({ error: 'No dividends found for the given parameters' });
        }

        // Map the response to match the required format
        const data = shareholders.map(shareholder => ({
            ...shareholder.toJSON(),
            dividends: shareholder.Div
        }));

        return res.json({ data });

    } catch (error) {
        // Logging error with Winston
        winston.error(`Error in fetchDividendController for register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchDividend'
        });
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = fetchDividend;
