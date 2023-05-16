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
    console.error("오류가 발생했습니다.");
  }
});

module.exports = router;
