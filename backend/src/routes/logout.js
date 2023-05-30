const express = require("express");
const router = express.Router();
const sessionMysql = require("../middleware/pageSession");

router.post("/", (req, res) => {
  console.log(req.session);

  const user = req.session.User;

  if (user) {
    sessionMysql.destroy(user.id, (err) => {
      if (err) {
        res.status(500).send("로그아웃에 실패했습니다.");
      } else {
        // 세션 쿠키 삭제
        res.clearCookie("mysqlSession");

        // 캐시 제어 헤더 설정
        res.setHeader("Cache-Control", "no-store");
        res.setHeader("Expires", "0");

        res.status(200).send({ message: "로그아웃 되었습니다." });
      }
    });
  } else {
    // 사용자 세션이 없는 경우에도 캐시 제어 헤더 설정
    res.setHeader("Cache-Control", "no-store");
    res.setHeader("Expires", "0");

    res.status(200).send({ message: "로그아웃 되었습니다." });
  }
});

module.exports = router;
