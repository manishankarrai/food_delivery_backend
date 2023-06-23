const express = require('express');
const { create_user , user_login } = require('../controller/user_auth.controller');
const {  uploadProfile_user } = require('../model/upload.model');
const rateLimit = require('express-rate-limit');
const { verifyUser, authorize  , checkuser} = require('../middleware/authorization');
const { verifyUserToken } = require('../middleware/token');

const userRoute = express.Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit to 3 login attempts within the time window
});
//userRoute.use(loginLimiter);


userRoute.get('/user',  loginLimiter ,(req,res)=>{res.send({message:"its work"})});

userRoute.post('/createuser',   loginLimiter  ,uploadProfile_user ,create_user);

userRoute.post('/loginuser' ,  loginLimiter, user_login );
//user crud are not define yet , but in controller their code are written . its define after need of admin

userRoute.get('/secret' , verifyUserToken , authorize('user') ,checkuser ,(req,res)=> {
    if(req.user){
        console.log(req.user);
        res.send({message: "user verified successfully" , data: "secret data xyz" , value: true});
    } else {
        res.send({message: "no user found , please login angin" , });
    }
});













module.exports =  {
    userRoute
}