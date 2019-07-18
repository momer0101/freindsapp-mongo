var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
    service: 'yahoo',
    auth: {
      user: 'placeholder0101@yahoo.com',
      pass: 'holdthatplace'
    }
  });

  var emailSender = {};


  emailSender.sendEmail = function (user) {
    var mailOptions = {
        from: 'placeholder0101@yahoo.com',
        to: user.email,
        subject: 'Sending Email using Node.js ' + user.name,
        text: 'thanks for joining my friends app' + user.name
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

module.exports = emailSender;