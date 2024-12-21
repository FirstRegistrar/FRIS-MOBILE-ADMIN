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
