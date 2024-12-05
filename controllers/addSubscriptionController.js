const sequelize = require('../config/db'); // Import the Sequelize instance
const winston = require('winston'); // Import winston for logging

const addSubscription = async (req, res) => {
    const { user_id, email, phone_number, amount, paystack_reference, status } = req.body;
  
    // Validate input
    if (!user_id || !email || !phone_number || !amount || !paystack_reference || !status) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
  
    try {
      const query = `
        INSERT INTO [Estock].[dbo].[T_subscription_payments] 
        ([user_id], [email], [phone_number], [amount], [payment_date], [paystack_reference], [status]) 
        VALUES (:user_id, :email, :phone_number, :amount, GETDATE(), :paystack_reference, :status)
      `;
  
      await sequelize.query(query, {
        replacements: {
          user_id,
          email,
          phone_number,
          amount,
          paystack_reference,
          status,
        },
      });
  
      return res.status(201).json({ message: 'Subscription added successfully.' });
    } catch (error) {
      winston.error(`Error in addSubscription - ${error.message}`, { stack: error.stack });
      return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  };
  
  module.exports = addSubscription;
  