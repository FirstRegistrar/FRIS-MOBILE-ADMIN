// utils/smsSender.js

const axios = require('axios');

const sendSMS = async (mobile, code) => {
    mobile = "08046007412";
    const SMS_USERNAME = "firstregistrars";
    const SMS_PASSWORD = "Firstreg77";
    const sender = "FIRSTREG";
    const message = `Your OTP Code is ${code}`;

    // Construct API URL
    const apiUrl = `http://193.105.74.59/api/sendsms/plain?user=${SMS_USERNAME}&password=${SMS_PASSWORD}&sender=${sender}&SMSText=${encodeURIComponent(message)}&GSM=${mobile}`;

    try {
        // Send SMS
        const response = await axios.get(apiUrl);

        // Log the full response for debugging
        console.log('SMS API Response:', response.data);

        // Check if the response is a string and contains 'OK'
        if (typeof response.data === 'string' && response.data.includes('OK')) {
            console.log('SMS sent successfully!');
            return true;
        } else {
            console.error('Unexpected SMS API response:', response.data);
            return false;
        }
    } catch (error) {
        // Log the full error message
        console.error('Error sending SMS:', error.message);
        console.error('Error details:', error.response ? error.response.data : 'No response data');
        return false;
    }
};

module.exports = sendSMS;
