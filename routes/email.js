const express = require("express");
const router = express.Router();
const nodemailer = require('nodemailer');
  
const sendMail = async () => {
  let testEmailAccount = await nodemailer.createTestAccount();
  
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    // secure: false,
    // service: 'yandex',
    auth: {
      // user: testEmailAccount.user,
      // pass: testEmailAccount.pass
      user: 'stype@ya.ru',
      pass: ''
    }
  });
  
  let result = await transporter.sendMail({
    from: '"Node js" <stype@yandex.ru>',
    to: "stype@yandex.ru",
    subject: "Message from AVITO-Uber site",
    text: "This message was sent from Node js server.",
    html: "This <i>message</i> was sent from <strong>Node js</strong> server."
  });
  
  console.log(result);
}
sendMail();

module.exports = router;
