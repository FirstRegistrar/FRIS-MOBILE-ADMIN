const { QueryTypes } = require('sequelize'); // Import QueryTypes
const db1 = require('../config/db').db1; // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchDividend = async (req, res) => {
    const { register_code, mail, mobile } = req.body;
    const { page = 1, limit = 50 } = req.query; // Get page and limit from query params

    // Validate input
    if (!register_code || (!mail && !mobile)) {
        return res.status(400).json({ error: 'Register Code, Email, or Phone are required' });
    }

    try {
        const trimmedMail = mail ? mail.trim() : null;
        const trimmedMobile = mobile ? mobile.trim() : null;
        const trimmedRegCode = register_code.trim();

        const QUERY_TIMEOUT = 260000; // 2 minutes
        const BATCH_SIZE = limit; // Use the `limit` for batch size

        // Query 1: Fetch shareholder details by register_code and email or mobile
        let shareholderQuery = `
            SELECT last_nm lastname, first_nm firstname, middle_nm middlename, st city,
            addr1 address1, addr2 address2, regcode register_code, email, mobile, Acctno account_no
            FROM T_shold
            WHERE regcode = :register_code
        `;

        if (trimmedMail) {
            shareholderQuery += ' AND email = :mail';
        } else if (trimmedMobile) {
            shareholderQuery += ' AND mobile = :mobile';
        }

        const shareholders = await db1.query(shareholderQuery, {
            replacements: {
                register_code: trimmedRegCode,
                mail: trimmedMail,
                mobile: trimmedMobile,
            },
            type: QueryTypes.SELECT,
            options: { timeout: QUERY_TIMEOUT },
        });

        if (shareholders.length === 0) {
            return res.status(404).json({ error: 'No Dividend payment found for the given shareholder(s)' });
        }

        // Get account numbers from shareholder query result
        const accountNumbers = shareholders.map((sh) => sh.account_no);

        if (accountNumbers.length === 0) {
            return res.status(404).json({ error: 'No Dividend payment found for the given shareholder(s)' });
        }

        // Fetch dividends in smaller batches
        let dividends = [];
        for (let i = 0; i < accountNumbers.length; i += BATCH_SIZE) {
            const batch = accountNumbers.slice(i, i + BATCH_SIZE);

            let offset = (page - 1) * limit; // Calculate the offset based on the page number
            const LIMIT = limit; // Use the `limit` value

            let hasMore = true;
            while (hasMore) {
                const batchDividends = await db1.query(
                    `
                    SELECT account_no, date_paid, divwarrant_no warrant_no, dividend_type, total_holding total,
                    divgross_amt gross_amt, div_netamt net_amt, cslno
                    FROM T_Divs2
                    WHERE account_no IN (:accountNumbers) AND date_paid IS NOT NULL
                    ORDER BY account_no
                    OFFSET ${offset} ROWS FETCH NEXT ${LIMIT} ROWS ONLY
                    `,
                    {
                        replacements: { accountNumbers: batch },
                        type: QueryTypes.SELECT,
                        options: { timeout: QUERY_TIMEOUT },
                    }
                );

                dividends = dividends.concat(batchDividends);
                offset += LIMIT;
                hasMore = batchDividends.length === LIMIT;
            }
        }

        if (dividends.length === 0) {
            return res.status(404).json({ error: 'No Dividend payment found for the given shareholder(s)' });
        }

        // Combine shareholder and dividend data
        const data = shareholders.map((shareholder) => {
            const relatedDividends = dividends.filter(
                (dividend) => dividend.account_no === shareholder.account_no
            );

            return relatedDividends.map((dividend) => ({
                register_code: shareholder.register_code,
                mail: shareholder.email,
                mobile: shareholder.mobile,
                account_no: shareholder.account_no,
                dividend_type: dividend.dividend_type,
                csl_no: dividend.cslno,
                div_net_amt: dividend.net_amt,
                div_gross_amt: dividend.gross_amt,
                firstname: shareholder.firstname,
                lastname: shareholder.lastname,
                middlename: shareholder.middlename,
                address: shareholder.address1,
                address2: shareholder.address2,
                city: shareholder.city,
                date_paid: dividend.date_paid,
                div_warrant_no: dividend.warrant_no,
                total: dividend.total,
            }));
        }).flat();

        return res.json({ shareholders: data });
    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(
            `Error in fetchDividendController for register_code: ${register_code}, mail: ${mail}, mobile: ${mobile} - ${error.message}`,
            {
                stack: error.stack,
                route: 'fetchDividend',
            }
        );

        return res.status(500).json({
            error: 'Internal Server Error',
            details: `${error.message} ${error.stack}`,
        });
    }
};

module.exports = fetchDividend;
