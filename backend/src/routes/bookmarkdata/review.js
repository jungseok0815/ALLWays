const express = require("express");
const router = express.Router();
const { review } = require("../../../models");

router.post("/", async (req, res) => {
  const { userId, reviewData, reviewtext} = req.body;
    //console.log( userId, reviewData, reviewtext);
  try {
    const existFavorites = await review.findOne({ where: {  reviewData,
        userId } });
        if (existFavorites) {
            await review.update(
                { reviewtext: reviewtext },
                {
                where: {
                    reviewData,
                    userId,
                  },
                }
            );
        }else{
            const newreview = await review.create({
                userId,
                reviewData,
                reviewtext,
    })};
    return res.status(201).send({ message: "리뷰가 작성되었습니다." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ message: "서버 오류로 리뷰 작성에 실패하였습니다." });
  }
});


router.get("/", async (req, res) => {
    const {reviewData, userId} = req.query;
    console.log( userId, reviewData);
    const sreview= await review.findOne({
        where: {
          userid: userId,
          reviewData: reviewData
        },attributes: ['reviewtext'],
        
      });
      res.send(sreview);
})

module.exports = router;