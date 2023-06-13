const express = require("express");
const router = express.Router();
const { review } = require("../../../models/index");

router.post("/", async (req, res) => {
  const { userid, place_name, memo } = req.body;

  try {
    const existReview = await review.findOne({
      where: { userid, place_name },
    });
    if (existReview) {
      return res
        .status(409)
        .send({ message: "이미 리뷰가 작성되었습니다." });
    }
    const newReview = await review.create({
      userid,
      place_name,
      memo,
    });
    return res.status(201).send({ message: "리뷰가 작성되었습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "서버 오류로 리뷰 작성에 실패하였습니다." });
  }
});

module.exports = router;
