const cors = require('cors');

const corsOptions = {
  origin: 'http://localhost:3000', // 클라이언트 주소
  optionsSuccessStatus: 200
};

module.exports = cors(corsOptions);
