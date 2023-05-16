const crypto = require('crypto');


let resetCode;

function createResetCode() {
  resetCode = crypto.randomBytes(6).toString("hex");
  
}

setInterval(createResetCode, 10 * 60 * 1000);
createResetCode();



module.exports = resetCode;