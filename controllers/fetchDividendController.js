const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchDividend = async (req, res) => {
    const { register_code, mail, mobile } = req.body;

    // Validate input
    if (!register_code || (!mail && !mobile)) {
        return res.status(400).json({ error: 'Register Code, Email, and Phone are required' });
    }

    try {
        const trimmedMail = mail.trim();
        const trimmedMobile = mobile.trim();
        const trimmedRegCode = register_code.trim();

        // Define the SQL query using Sequelize ORM
        const query = `
        SELECT s.hlast_name lastname, s.hfirst_name firstname, s.hmname middlename, s.hcity_town city, 
        d.date_paid date_paid, d.divwarrant_no warrant_no, d.total_holding total, s.haddress address1, 
        s.holder_address2 address2, s.register_code register_code, s.mail email, s.mobile mobile, 
        s.account_number account_no, d.cslno cslno, d.divgross_amt gross_amt, d.div_netamt net_amt
        FROM T_shareholder s
            INNER JOIN T_Divs2 d ON s.account_number = d.account_no
            WHERE s.register_code = :register_code 
            AND (s.mail = :mail OR s.mobile = :mobile)
            AND d.date_paid IS NOT NULL
        `;

        // Execute the raw query with Sequelize
        const shareholders = await sequelize.query(query, {
            replacements: {
                mail: trimmedMail,
                mobile: trimmedMobile,
                register_code: trimmedRegCode,
            },
            type: sequelize.QueryTypes.SELECT,
        });

        // Check if results are found
        if (shareholders.length === 0) {
            return res.status(404).json({ error: 'No Dividend payment found for the given parameters' });
        }

        const data = shareholders.map(row => ({
            register_code: row.regcode,
            mail: row.email,
            mobile: row.mobile,
            account_no: row.account_no,
            csl_no: row.cslno,
            div_net_amt: row.net_amt,
            div_gross_amt: row.gross_amt,
            firstname: row.firstname,
            lastname: row.lastname,
            middlename: row.middlename,
            address: row.address1,
            address2: row.address2,
            city: row.city,
            date_paid: row.date_paid,
            div_warrant_no: row.warrant_no,
            total: row.total

        }));

        return res.json({ shareholders: data });


    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(`Error in fetchDividendController for register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchDividend',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message+" "+error.stack,
        });
    }
};

module.exports = fetchDividend;
