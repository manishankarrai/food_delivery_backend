const express = require('express');
const { create_user , user_login } = require('../controller/user_auth.controller');
const { verifyUserToken } = require('../middleware/token');
const {  uploadProfile_user } = require('../model/upload.model');
const rateLimit = require('express-rate-limit');

const userRoute = express.Router();

// const loginLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 3, // Limit to 3 login attempts within the time window
// });
//userRoute.use(loginLimiter);


userRoute.get('/user',(req,res)=>{res.send({message:"its work"})});

userRoute.post('/createuser', uploadProfile_user ,create_user);

userRoute.post('/loginuser' , user_login );


userRoute.get('/secret' , verifyUserToken ,(req,res)=> {
    if(req.user){
        res.send({message: "user verify" , data: "secret data xyz" , value: true});
    } else {
        res.send({message: "no user found , please login angin" , });
    }
});













module.exports =  {
    userRoute
}