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

  // let transport = nodemailer.createTransport({
  //   host: process.env.EMAIL_Host,
  //   port: process.env.PORT,
  //   secure: false,
  //   auth: {
  //     user: process.env.EMAIL_USERNAME,
  //     pass: process.env.EMAIL_PASSWORD,
  //   },
  //   // tls: {
  //   //   rejectUnauthorized: false,
  //   //   ciphers: 'SSLv3',
  //   // },
  // });

  // // verify connection configuration
  // transport.verify(function (error, success) {
  //   if (error) {
  //     console.log(error);
  //     return;
  //   } else {
  //     console.log('Server is ready to take our messages');
  //   }
  // });

  // let mailOptions = {
  //   from: 'Main Admin <admin1@admin.com>',
  //   to: options.email,
  //   subject: options.subject,
  //   text: options.message,
  //   html: options.html,
  // };
  // // console.log(mailOptions);
  // await transport.sendMail(mailOptions, (error, info) => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log('Message sent: %s', info.messageId);
  // });
};

module.exports = sendEmail;
