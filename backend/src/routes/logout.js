const express = require('express');
const router = express.Router();


// 로그아웃 라우터
router.post("/", (req, res) => {
    // 세션 삭제
    req.session.destroy((err) => {
      if (err) {
        console.error("세션 삭제 오류:", err);
        res.status(500).send("로그아웃에 실패했습니다.");
      } else {
        // 세션 쿠키 삭제
        res.clearCookie("connect.sid");
        res.status(200).send({ message: "로그아웃 되었습니다." });
        
      }
    });
  });

  module.exports = router;