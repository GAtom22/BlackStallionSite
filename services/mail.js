const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');
require('dotenv').config();

const auth = {
    auth: {
        api_key: process.env.MAIL_GUN_API_KEY ||  'MAIL_GUN_API_KEY', 
        domain: process.env.MAIL_GUN_DOMAIN || 'MAIL_GUN_DOMAIN' 
    }
};

const transporter = nodemailer.createTransport(mailGun(auth));

const sendMail = (email, name, subject, text, cb) => {
    const mailOptions = {
        from: email, 
        to: process.env.EMAIL_RECEPTION,
        subject: subject + " - " + name,
        text
    };

    transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
            return cb(err, null);
        }
        return cb(null, data);
    });
}

module.exports = sendMail;