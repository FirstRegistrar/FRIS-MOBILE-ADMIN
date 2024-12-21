const nodeMailer = require('nodemailer');
require('dotenv').config();

const transporter = nodeMailer.createTransport({
    host: process.env.MAILER_HOSTNAME, // 'smtp.office365.com'
    port: process.env.MAILER_PORT,    // 587
    secure: false, // Use TLS
    auth: {
        user: process.env.EMAIL_USER, // 'info@firstregistrarsnigeria.com'
        pass: process.env.EMAIL_PASS  // 'Investor1'
    },
    tls: {
        rejectUnauthorized: false // For self-signed certificates or testing
    }
});

const sendEmail = async (mail, code) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "williams.abiola@itech.ng",
        subject: 'Your One Time Password (OTP)',
        text: `Your One Time Password (OTP) for First Registrars Mobile App log-in is ${code}. It expires in 20 minutes. If you did not initiate this request, kindly call our customer service. Do not share your OTP with anyone.`
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

