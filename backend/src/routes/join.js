const express = require('express');
const router = express.Router();
const { User } = require('../../models');
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
  const { id, password, realname, email } = req.body;

  try {
    const existId = await User.findOne({ where: { id } });
    if (existId) {
      return res.status(409).send({ message: '이미 존재하는 사용자 이름입니다.' });
    }
    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
      return res.status(409).send({ message: '이미 존재하는 이메일입니다.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id,
      password: hashedPassword,
      realname,
      email,
    });
    return res.status(201).send({ message: '회원 가입이 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버 오류로 회원 가입에 실패하였습니다.' });
  }
});

module.exports = router;
