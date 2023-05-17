const express = require("express");
const router = express.Router();
const { User } = require("../../../../models");
const bcrypt = require('bcrypt');

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      const hashedPassword = await bcrypt.hash(password, 10);

      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    } else {
      res.status(404).json({ message: "비밀번호 변경에 실패하였습니다." });
    }
  } catch (error) {
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
    const regularExpression_id = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,16}$/; // 영문 대소문자와 숫자로 이루어지며, 길이는 6자리 이상 20자리 이하
    if (!regularExpression_id.test(id)) {
      // 형식에 맞지 않는 경우
      return res.status(409).send({ message: '아이디는 영문과 숫자가 적어도 하나씩 포함되어야 하며, 길이는 6~16자리로 생성해주세요.' });
      }
    const regularExpression_pw = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,20})/; // 영문 대소문자, 숫자, 특수문자가 모두 포함되어 있으며, 길이는 8자리 이상
    if (!regularExpression_pw.test(password)) {
      // 형식에 맞지 않는 경우
      return res.status(409).send({ message: '비밀번호는 영문, 숫자, 특수문자가 적어도 하나씩 포함되어야 하며, 길이는 8~20자리로 생성해주세요.' });
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
    res.status(500).send({ message: '서버 오류가 발생했습니다.' });
  }
});

module.exports = router;

  }
});

module.exports = router;
