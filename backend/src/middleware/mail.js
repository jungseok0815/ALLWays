const nodemailer = require('nodemailer');
require('dotenv').config();

// gmail transporter
const sendGmail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  }
});

const sendMail = async (elements) => {
  try {
    const information = await sendGmail.sendMail(elements);
    return information;
  } catch (error) {
    console.error('에러발생');
    throw error;
  }
};

module.exports = {
  sendMail,
};
