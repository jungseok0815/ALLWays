// const express = require("express");
// const router = express.Router();
// const { review } = require("../../../models");

// router.post("/", async (req, res) => {
//   const { userId, reviewData, reviewText } = req.body;
//   console.log(userId, reviewData, reviewText);
//   try {
//     const newReview = await review.create({
//       userId,
//       reviewData,
//       reviewText,
//     });
//     return res.status(201).send({ message: "리뷰가 작성되었습니다." });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .send({ message: "서버 오류로 리뷰 작성에 실패하였습니다." });
//   }
// });

// module.exports = router;
