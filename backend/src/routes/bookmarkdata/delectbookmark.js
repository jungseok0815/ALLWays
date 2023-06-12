
const express = require("express");
const router = express.Router();
const { User, bookMark } = require("../../../models");

router.get("/", async (req, res, next) => {
    const {place_name, userId} = req.query;
    //console.log("//////////////////////////",place_name,userId);
    await bookMark.destroy({
        where: {
          userid: userId,
          place_name: place_name
        },
      });
      res.send(true);
});

module.exports = router;


