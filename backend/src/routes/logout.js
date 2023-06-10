const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.status(500).send("로그아웃에 실패했습니다.");
    } else {
      res.clearCookie("sessionID"); // 세션 쿠키 삭제

      console.log("세션 제거 완료");
      res.status(200).send({ message: "로그아웃 되었습니다." });
    }
  });
});

module.exports = router;
