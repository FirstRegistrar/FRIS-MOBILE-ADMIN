const { QueryTypes } = require('sequelize'); // Import QueryTypes
const winston = require('winston');
const { db2 } = require('../config/db').db2;
const validator = require('validator');

const addSubscription = async (req, res) => {
    const { user_id, email, phone_number, amount, paystack_reference, status } = req.body;

    // Enhanced validation
    if (!user_id || !Number.isInteger(Number(user_id))) {
        return res.status(400).json({ error: 'Invalid user ID.' });
    }

    if (!email || !validator.isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    if (!phone_number || !/^\d{10,15}$/.test(phone_number)) {
        return res.status(400).json({ error: 'Invalid phone number.' });
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
        return res.status(400).json({ error: 'Invalid amount.' });
    }

    if (!paystack_reference || !status) {
        return res.status(400).json({ error: 'Paystack reference and status are required.' });
    }

    try {
        const query = `
            INSERT INTO [Estock].[dbo].[T_subscription_payments] 
            ([user_id], [email], [phone_number], [amount], [payment_date], [paystack_reference], [status]) 
            VALUES (:user_id, :email, :phone_number, :amount, GETDATE(), :paystack_reference, :status)
        `;

        await db2.query(query, {
            replacements: {
                user_id,
                email,
                phone_number,
                amount,
                paystack_reference,
                status,
            },
        });

        winston.info('Subscription added successfully', { user_id, email, amount, status });
        return res.status(201).json({ message: 'Subscription added successfully.' });
    } catch (error) {
        winston.error(`Error in addSubscription - ${error.message}`, { 
            stack: error.stack, 
            input: req.body 
        });
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = addSubscription;
