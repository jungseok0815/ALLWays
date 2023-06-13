const express = require('express');
const router = express.Router();
const {bookMark} = require('../../../models/index');

router.post('/', async (req, res) => {
  const {} = req.body;
 

  try {
    
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: '서버 오류로 즐겨찾기에 실패하였습니다.' });
  }
});

module.exports = router;