const express = require('express');
const router = express.Router();
const { User } = require('../../../models');
const mail = require('../../middleware/mail');

router.post('/', async (req, res) => {
  const { email, realname } = req.body;

  try {
    const user = await User.findOne({
      where: {
        realname,
        email,
      }
    });
    const { id } = user;
  
    const mailForm = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: '안녕하세요. 아이디 찾기 결과를 알려드립니다.',
      text: `안녕하세요. ${realname}님의 아이디는 ${id}입니다.`,
    }

    const info = await mail.sendMail(mailForm);
    res.status(200).json({ message: '아이디가 이메일로 전송되었습니다.' });
  } catch (error) {
    console.error('오류가 발생했습니다.');
  }
});

module.exports = router;
