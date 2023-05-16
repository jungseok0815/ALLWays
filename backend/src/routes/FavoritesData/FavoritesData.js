const express = require('express');
const router = express.Router();
const { Favorites } = require('../../../models/favorites');


router.post('/', async (req, res) => {
  const { id, favorites  } = req.body;
  console.log("hi");

  try {
    const existFavorites = await User.findOne({ where: { Favorites } });
    if (existFavorites) {
      return res.status(409).send({ message: '이미 즐겨찾기에 추가된 항목입니다..' });
    }
    await Favorites.create({
      id,
      favorites
    });
    return res.status(201).send({ message: '추가 완료되었습니다..' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버 오류로 즐겨찾기에 실패하였습니다.'});
  }
});

module.exports = router;
