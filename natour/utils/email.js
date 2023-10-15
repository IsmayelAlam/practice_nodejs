const nodeMilder = require("nodemailer");

const sendEmail = async (option) => {
  const transporter = nodeMilder.createTransport({
    host: process.env.Email_Host,
    port: process.env.Email_Port,
    auth: {
      user: process.env.Email_User,
      pass: process.env.Email_Password,
    },
  });

  const mailOption = {
    from: "Ismayel <test@user.com>",
    to: option.email,
    subject: option.subject,
    text: option.message,
  };

  await transporter.sendMail(mailOption);
};

module.exports = sendEmail;
