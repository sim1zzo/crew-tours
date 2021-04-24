const nodemailer = require('nodemailer');
// this is just a standard schema find in the nodemailer documentation.

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: 'Reset your password ',
    text: options.message,
  };

  await transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
      return;
    }
    console.log(info.response);
  });
};

module.exports = sendEmail;
