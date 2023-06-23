const express = require('express');
const { upload_banner } = require('../model/upload.model');
const { uploadbanner , getallbanner  , getbanner  , deletebanner , updatebanner } = require('../controller/banner.controller');
const { verifyAdminToken, verifyUserToken } = require('../middleware/token');
const { authorize ,verifyAdmin, authComman  } = require('../middleware/authorization');

const bannerRoute = express.Router();


bannerRoute.use(verifyAdminToken);
bannerRoute.use(verifyUserToken);
bannerRoute.use(authComman);
//two layer auth is apply .. first jsonwebtoken and second express-session for user role 
//bannerRoute.use(verifyAdminToken);
//bannerRoute.use();
bannerRoute.get('/banner', authorize('admin') ,(req,res)=>  {
     res.send({message: "its work"}); 
})


bannerRoute.post('/bannerupload'  ,authorize('admin'),verifyAdmin,upload_banner  , uploadbanner);

bannerRoute.get('/getallbanner'  , getallbanner); 

bannerRoute.get('/getbanner/:id' ,getbanner );
bannerRoute.delete('/deletebanner/:id'  ,authorize('admin'),verifyAdmin ,deletebanner);
bannerRoute.put('/updatebanner/:id' ,authorize('admin'),verifyAdmin  ,upload_banner  ,updatebanner );


 








module.exports = {
    bannerRoute
}