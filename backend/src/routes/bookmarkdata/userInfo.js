const express = require('express');
const router = express.Router();
const {bookMark} = require("../../../models");

router.get('/', async (req, res, next) => {
  const value = req.query.value;
  //console.log("//////////////////////////",value);
   
      const userFa = await bookMark.findAll({
        where: {
          userid: value,
        },
      });
    
      const combinedFavorites = userFa.map((bookMark) => {
        return bookMark.dataValues;
      });
      res.json(combinedFavorites)
      


   

  });
  
  
  module.exports = router;