const express = require('express');
const router = express.Router();

const { User } = require('../../../models');

router.post('/', async (req, res) => {
  const { id, realname, email } = req.body;

  try {
    const user = await User.findOne({
        where: {
          id,
          realname,
          email,
        }
      });
    if (!user) {
      // 해당 정보를 가진 사용자가 없는 경우
      return res.status(404).json({ message: '해당하는 사용자 정보가 없습니다.' });
    }

    // 해당 정보를 가진 사용자가 있는 경우
    return res.status(200).json({ message: '사용자 정보를 확인 중입니다.' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: '서버 오류가 발생하였습니다.' });
  }
});

module.exports = router;
