// const jwt = require('jsonwebtoken');

// exports.verifyToken = (req, res, next) => {
//     const token = req.headers.authorization?.split(' ')[1];
//     if (!token) {
//       return res.status(401).json({
//         code: 401,
//         message: '유효하지 않은 토큰입니다.',
//       });
//     }
  
//     try {
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.decoded = decoded;
//       return next();
//     } catch (error) {
//       if (error.name === 'TokenExpiredError') {
//         return res.status(419).json({
//           code: 419,
//           message: '토큰이 만료되었습니다',
//         });
//       }
//       return res.status(401).json({
//         code: 401,
//         message: '유효하지 않은 토큰입니다.',
//       });
//     }
//   };
  

// // const jwt = require("jsonwebtoken");

// // exports.verifyToken = (req, res, next) => {
// //   try {
// //     req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
// //     return next();
// //   } catch (error) {
// //     if (error.name === "TokenExpiredError") {
// //       return res.status(419).json({
// //         code: 419,
// //         message: "토큰이 만료되었습니다",
// //       });
// //     }
// //     return res.status(401).json({
// //       code: 401,
// //       message: "유효하지 않은 토큰입니다.",
// //     });
// //   }
// // };

// // const jwt = require('jsonwebtoken');

// // exports.verifyToken = (req, res, next) => {
// //     try{
// //         req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
// //         return next();
// //     } catch(error){
// //         if(error.name === 'TokenExpiredError') {
// //             return res.status(419).json({
// //                 code: 419,
// //                 message: '토큰이 만료되었습니다',
// //             });
// //         }
// //         return res.status(401).json({
// //             code: 401,
// //             message: '유효하지 않은 토큰입니다.',
// //         });
// //     }
// // };
