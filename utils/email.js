const nodemailer = require('nodemailer');
// this is just a standard schema find in the nodemailer documentation.

const sendEmail = async (options) => {
  let transport = nodemailer.createTransport({
    host: process.env.EMAIL_Host,
    port: process.env.PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: 'Admin <fca883888d-c19180@inbox.mailtrap.io>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html: options.html,
  };
  console.log(mailOptions);
  await transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
  });
};

module.exports = sendEmail;
