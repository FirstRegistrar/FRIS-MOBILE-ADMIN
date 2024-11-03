// utils/emailSender.js

const nodeMailer = require('nodeMailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    service: process.env.EMAIL_SERVICE, // e.g., 'Gmail'
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendEmail = async (mail, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: mail,
        subject: 'Your Verification Code',
        text: `Your verification code is ${code}`
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending mail:', error);
        return false;
    }
};

module.exports = sendEmail;
