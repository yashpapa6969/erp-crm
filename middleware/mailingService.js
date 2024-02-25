require('dotenv').config();
const nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
}
}));

/**

 * @param {string} to Recipient's email address
 * @param {string} subject Subject of the email
 * @param {string} textBody Plain text body of the email
 * @param {string} htmlBody HTML body of the email (optional)
 */
const sendEmail = (to, subject, textBody, htmlBody = '') => {
    let mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: to, // List of recipients
        subject: subject, // Subject line
        text: textBody, // Plain text body
        html: htmlBody // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};
module.exports =sendEmail
// Example usage
