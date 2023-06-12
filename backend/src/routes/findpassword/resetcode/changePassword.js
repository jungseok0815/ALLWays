const express = require("express");
const router = express.Router();
const { User } = require("../../../../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email: email } });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return res.status(404).json({
          message:
            "입력하신 비밀번호가 기존의 비밀번호와 동일합니다. 다시 입력해주세요.",
        });
      }

      const regularExpression_pw = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
      if (!regularExpression_pw.test(password)) {
        return res.status(404).send({
          message:
            "비밀번호는 영문과 숫자가 적어도 하나씩 포함되어야 하며, 8~20자리로 생성해주세요.",
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
      await user.save();

      res
        .status(200)
        .json({ message: "비밀번호가 성공적으로 변경되었습니다." });
    } else {
      res.status(404).json({ message: "비밀번호 변경에 실패하였습니다." });
    }
  } catch (error) {
    res.status(500).send({ message: "서버 오류가 발생했습니다." });
  }
});

module.exports = router;


