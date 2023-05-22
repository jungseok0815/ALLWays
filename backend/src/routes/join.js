const express = require("express");
const router = express.Router();
const { User } = require("../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { id, password, realname, email } = req.body;

  try {
    const existId = await User.findOne({ where: { id } });
    if (existId) {
      return res
        .status(409)
        .send({ message: "이미 존재하는 사용자 이름입니다." });
    }
    const regularExpression_id = /^(?=.*[a-zA-Z])(?=.*[0-9]).{6,16}$/;
    if (!regularExpression_id.test(id)) {
      return res.status(409).send({
        message:
          "아이디는 영문과 숫자가 적어도 하나씩 포함되어야 하며, 6~16자리로 생성해주세요.",
      });
    }

    const regularExpression_pw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    if (!regularExpression_pw.test(password)) {
      return res.status(409).send({
        message:
          "비밀번호는 영문과 숫자가 적어도 하나씩 포함되어야 하며, 8~20자리로 생성해주세요.",
      });
    }

    const regularExpression_realname = /^[가-힣]{2,10}$|^[a-zA-Z]{2,10}$/;
    if (!regularExpression_realname.test(realname)) {
      return res.status(409).send({
        message:
          "이름은 한글 또는 영문으로만 작성되어야하며, 길이 2~10자리로 생성해주세요.",
      });
    }

    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) {
      return res.status(409).send({ message: "이미 존재하는 이메일입니다." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      id,
      password: hashedPassword,
      realname,
      email,
    });
    return res.status(201).send({ message: "회원 가입이 완료되었습니다." });
  } catch (error) {
    res.status(500).send({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;

