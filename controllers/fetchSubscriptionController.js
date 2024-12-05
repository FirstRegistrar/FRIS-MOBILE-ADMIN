const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const fetchSubscription = async (req, res) => {
    const { email, mobile } = req.body;

    // Validate input
    if (!email && !mobile) {
        return res.status(400).json({ error: 'Either Email or Phone Number is required' });
    }

    try {
        const trimmedEmail = email ? email.trim() : null;
        const trimmedPhone = mobile ? mobile.trim() : null;

        // Log the trimmed values to verify if they're correct
        console.log(`Email: ${trimmedEmail}, Phone Number: ${trimmedPhone}`);

        // Start the base query
        let query = `
            SELECT DISTINCT 
                [user_id],
                [email],
                [phone_number],
                [amount],
                [payment_date],
                [paystack_reference],
                [status]
            FROM [Estock].[dbo].[T_subscription_payments]
        `;

        const replacements = {};

        // Append conditions based on input availability
        if (trimmedEmail && trimmedPhone) {
            query += ` WHERE [email] = :email OR [phone_number] = :phone_number`;
            replacements.email = trimmedEmail;
            replacements.phone_number = trimmedPhone;
        } else if (trimmedEmail) {
            query += ` WHERE [email] = :email`;
            replacements.email = trimmedEmail;
        } else if (trimmedPhone) {
            query += ` WHERE [phone_number] = :phone_number`;
            replacements.phone_number = trimmedPhone;
        }

        // Execute raw query using Sequelize
        const result = await sequelize.query(query, {
            replacements,
            type: sequelize.QueryTypes.SELECT,
        });

        // Log the result to check the output
        console.log('Query Result:', result);

        // Check if we got any result
        if (result && result.length > 0) {
            return res.json({ subscriptions: result });
        } else {
            return res.status(404).json({
                message: 'No subscriptions found for the provided email or phone number.',
            });
        }
    } catch (error) {
        // Enhanced error logging with Winston
        winston.error(`Error in fetchSubscription for email: ${email}, phone_number: ${phone_number} - ${error.message}`, {
            stack: error.stack,
            route: 'fetchSubscription',
        });

        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message,
        });
    }
};

module.exports = fetchSubscription;