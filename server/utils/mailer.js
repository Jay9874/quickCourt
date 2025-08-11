const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD
    }
});

transporter.verify(function (error, success) {
    if (error) {
        console.error('Mailer connection error:', error);
    }
    else {
        console.log('Mailer is ready to send emails');
    }
});

const sendMail = (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) return reject(error);
            resolve(info);
        });
    });
};

module.exports = sendMail;