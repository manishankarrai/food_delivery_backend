const jwt = require("jsonwebtoken");const { User }= require("../model/user.model");
const { Admin } = require('../model/admin.model');




const verifyUserToken = (req, res, next) => {
    console.log("1st");
  if (req.headers && req.headers.authorization) {
    console.log("2nd");
    jwt.verify(req.headers.authorization, process.env.SECRET, function (err, decode) {
        console.log("3rd");
        console.log(decode.id);
      if (err) req.user = undefined;
      User.findOne({
          _id: decode.id
        })
         .then((data)=>{
            req.user = data;
            next();
         })
         .catch((err)=> {
            req.user = undefined ;
            next();
         })
    });
  } else {
    req.user = undefined;
    next();
  }
};


const verifyAdminToken = (req, res, next) => {
    console.log("1st");
  if (req.headers && req.headers.authorizations) {
    console.log("2nd");
    jwt.verify(req.headers.authorizations, process.env.SECRET_ADMIN, function (err, decode) {
        console.log("3rd");
        console.log(decode)
        console.log(decode.id);
      if (err) req.admin = undefined;
      Admin.findOne({
          _id: decode.id
        })
         .then((data)=>{
            req.admin = data;
            next();
         })
         .catch((err)=> {
            req.admin = undefined ;
            next();
         })
    });
  } else {
    req.admin = undefined;
    next();
  }
};








module.exports ={ verifyUserToken ,verifyAdminToken }

// const verifyToken = (req, res, next) => {
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
//       if (err) req.user = undefined;
//       User.findOne({
//           _id: decode.id
//         })
//         .exec((err, user) => {
//           if (err) {
//             res.status(500)
//               .send({
//                 message: err
//               });
//           } else {
//             req.user = user;
//             next();
//           }
//         })
//     });
//   } else {
//     req.user = undefined;
//     next();
//   }
// };


// const  verifyToken =  (req, res, next) => {
//   if (req.body.accessToken) {
//     jwt.verify(req.body.accessToken, process.env.API_SECRET, function (err, decode) {
//       if (err) {
//         req.body.user = undefined;
//         console.log("error trigger")
//         next();
//       } else {
//       console.log("after error");
//      let datas =  User.findOne({
//           _id: decode.id
//         });
//         datas.then((val)=> {
//           console.log("this is the data come from id",val); 

//           req.body.user = true;
//           next();
//          }).catch(()=> {
//           req.body.user = false;
//           next();
//          });
//       //   console.log("decode.id",decode.id);
//         }
      
//     }); 
//   } else {
//     req.body.user = 'xx';
//     next();
//   }
// };