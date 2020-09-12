const nodemailer = require("nodemailer");

//1) Create A Transporter
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,

    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  //2) Define the EMail Option

  const mailOption = {
    from: "NAVYA NILYAM<alok@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //3) Send the EMAIL
  await transporter.sendMail(mailOption);
};

module.exports = sendEmail;
