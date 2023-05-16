const express = require("express");
const router = express.Router();
const { User } = require("../../../../models");
const resetCodeModule = require("../../../middleware/resetCode");


router.post("/", async (req, res) => {
  const { email, resetCode} = req.body;

  if (resetCode !== resetCodeModule) { // 프론트엔드에서 받아온 resetCode와 비교
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
