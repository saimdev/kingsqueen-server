const nodemailer = require('nodemailer');

const sendMail = (to, subject = '', html = '') => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Nodemail server is ready.");
        }
    });

    let message = {
        from: process.env.GMAIL_USER,
        to,
        subject,
        html
    }

    return transporter.sendMail(message);
}


module.exports = sendMail;