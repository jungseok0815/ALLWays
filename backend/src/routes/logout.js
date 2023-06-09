const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      res.status(500).send('로그아웃에 실패했습니다.');
    } else {
      res.clearCookie('sessionID'); // 세션 쿠키 삭제

      // 추가적인 로직이 있다면 여기에 작성
      console.log('세션 제거 완료');
      res.status(200).send({ message: '로그아웃 되었습니다.' });
    }
  });
});

module.exports = router;


// const express = require("express");
// const router = express.Router();
// const sessionMysql = require("../middleware/pageSession");

// router.post("/", (req, res) => {
//   console.log(req.session);

//   const userid = req.session.userid

//   if (userid) {
//     sessionMysql.destroy(user.id, (err) => {
//       if (err) {
//         res.status(500).send("로그아웃에 실패했습니다.");
//       } else {
//         // 세션 쿠키 삭제
//         res.clearCookie("mysqlSession");

//         // 캐시 제어 헤더 설정
//         res.setHeader("Cache-Control", "no-store");
//         res.setHeader("Expires", "0");

//         res.status(200).send({ message: "로그아웃 되었습니다." });
//       }
//     });
//   } else {
//     // 사용자 세션이 없는 경우에도 캐시 제어 헤더 설정
//     res.setHeader("Cache-Control", "no-store");
//     res.setHeader("Expires", "0");

//     res.status(200).send({ message: "로그아웃 되었습니다." });
//   }
// });

// module.exports = router;
