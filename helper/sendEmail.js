require('dotenv').config();
var nodemailer = require('nodemailer');

exports.sendEmail = (token) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASS,
    }
  });

  var mailOptions = {
    from: process.env.EMAIL,
    to: 'adhyformerz@gmail.com',
    subject: 'Sending Email using Node.js',
    html: `Click this link to activate your account <a href="http://localhost:8080/auth/login?token=${token}">
    Activate Account</a>`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
