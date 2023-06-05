const express = require('express');
const { upload_banner } = require('../model/upload.model');
const { uploadbanner , getallbanner  , getbanner  , deletebanner , updatebanner } = require('../controller/banner.controller');
const { verifyAdminToken } = require('../middleware/token');

const bannerRoute = express.Router();


bannerRoute.use(verifyAdminToken);
bannerRoute.use((req,res,next)=>{
    if(req.admin){
        next();
    } else {
        res.send({message: "please login again" , value: false })
    }
});
bannerRoute.get('/banner',(req,res)=>  {
     res.send({message: "its work"}); 
})


bannerRoute.post('/bannerupload' , upload_banner  , uploadbanner);

bannerRoute.get('/getallbanner',getallbanner); 

bannerRoute.get('/getbanner/:id' ,getbanner );
bannerRoute.delete('/deletebanner/:id' ,deletebanner);
bannerRoute.put('/updatebanner/:id' , upload_banner  ,updatebanner );


 








module.exports = {
    bannerRoute
}