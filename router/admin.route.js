const express = require('express');
const { create_admin , admin_login } = require('../controller/admin_auth.controller');
const { verifyAdminToken } = require('../middleware/token');
const {  uploadProfile_admin } = require('../model/upload.model');
const adminRoute = express.Router();



adminRoute.get('/admin',(req,res)=>{res.send({message:"its work"})});

adminRoute.post('/createadmin', uploadProfile_admin ,create_admin);

adminRoute.post('/loginadmin' , admin_login ); //set condition for situation like what happen when 
// tocken already pregent in header ..beacause it give error and terminate from port ..

 
adminRoute.get('/admins' , verifyAdminToken ,(req,res)=> { 
    if(req.admin){
        res.send({message: "admin verify" , data: "secret data xyz" , value: true});
    } else {
        res.send({message: "no admin found , please login angin" , });
    }
});













module.exports =  {
    adminRoute
}