const { MailtrapClient } = require("mailtrap");
const dotenv = require('dotenv');
dotenv.config();
const TOKEN = process.env.MAILTRAP_TOKEN;

module.exports.mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

module.exports.sender = {
  email: "hello@demomailtrap.co",
  name: "Md Danish",
};

// const recipients = [
//   {
//     email: "mdsonufatehpur1000@gmail.com",
//   }
// ];

// client
//   .send({
//     from: sender,
//     to: recipients,
//     subject: "First Email!",
//     text: "Congrats for sending test email with Mailtrap!",
//     category: "Integration Test",
//   })
//   .then(console.log, console.error);