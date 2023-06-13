const express = require('express');
const router = express.Router();
const {bookMark} = require('../../../models/index');

router.post('/', async (req, res) => {
  const {userid, place_name, place_url, address_name, phone, x, y} = req.body;
  console.log(x,y);

  try {
    const existFavorites = await bookMark.findOne({ where: {  userid, place_name } });
    if (existFavorites) {
      return res.status(409).send({ message: '이미 즐겨찾기에 추가된 항목입니다.' });
    }
    const newBookMark = await bookMark.create({ 
      userid,
      place_name,
      place_url,
      address_name,
      phone,
      x,
      y,
    });
    return res.status(201).send({ message: '추가 완료되었습니다.' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버 오류로 즐겨찾기에 실패하였습니다.' });
  }
});

module.exports = router;