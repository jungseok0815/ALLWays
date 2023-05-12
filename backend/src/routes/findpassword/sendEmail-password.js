const express = require("express");
const router = express.Router();
const { User } = require("../../../models");
const mail = require("../../middleware/mail");
const crypto = require('crypto');

let resetCode;

function createResetCode() {
  resetCode = crypto.randomBytes(6).toString("hex");
}

createResetCode();

setInterval(createResetCode, 10 * 60 * 1000);

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
      html: `<p>안녕하세요 ${realname}님, <br>비밀번호 초기화 인증 코드는 다음과 같습니다: <strong>${resetCode}</strong></p>`,
    };

    const info = await mail.sendMail(mailForm2);
    res.status(200).json({ message: "비밀번호 초기화 인증코드를 이메일로 보내드렸습니다." });
  } catch (error) {
    console.error("오류가 발생했습니다.");
  }
});

router.post("/check", async (req, res) => {
  const { email, resetCode } = req.body;

  if (resetCode !== global.resetCode) {
    return res.status(400).json({ message: "잘못된 인증코드입니다." });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "존재하지 않는 이메일입니다." });
    }

    res.status(200).json({ message: "인증코드가 일치합니다." });
  } catch (error) {
    console.error("오류가 발생했습니다.");
  }
});

module.exports = router;
