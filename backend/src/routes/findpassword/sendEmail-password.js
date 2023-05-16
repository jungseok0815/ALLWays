const express = require("express");
const router = express.Router();
const { User } = require("../../../models");
const mail = require("../../middleware/mail");
const resetCodeModule = require('../../middleware/resetCode');


router.post("/", async (req, res) => {
  const { email, realname } = req.body;

  try {
    const user = await User.findOne({
      where: {
        realname,
        email,
      },
    });

    const mailForm2 = {
      from: process.env.FROM_EMAIL,
      to: email,
      subject: "안녕하세요. 비밀번호 초기화 인증 코드를 보내드립니다.",
      html: `<p>안녕하세요 ${realname}님, <br>비밀번호 초기화 인증 코드는 다음과 같습니다: <strong>${resetCodeModule}</strong></p>`,
    };

    const info = await mail.sendMail(mailForm2);
    res.status(200).json({ message: "비밀번호 초기화 인증코드를 이메일로 보내드렸습니다." });
  } catch (error) {
    console.error("오류가 발생했습니다.");
  }
});

module.exports = router;
