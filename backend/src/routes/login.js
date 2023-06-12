const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();

const { User, bookMark } = require("../../models");

router.post("/", async (req, res, next) => {
  const { id, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(401).json({
        message:
          "아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message:
          "아이디 또는 비밀번호를 잘못 입력했습니다. \n입력하신 내용을 다시 확인해주세요.",
      });
    }

    req.session.User = user;
    req.session.save(function () {
      res.send(user.id);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버 오류로 로그인에 실패하였습니다.' });
  }
});

module.exports = router;
