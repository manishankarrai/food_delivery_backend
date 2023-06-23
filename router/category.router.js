const express = require('express');
const { category_up ,upload_banner  } = require('../model/upload.model');
const {     uploadcategory , getallcategory , getcategory , updatecategory , deletecategory}=require('../controller/category.controller');
const { verifyAdminToken, verifyUserToken } = require('../middleware/token');
const { authorize  , authComman ,verifyAdmin} = require('../middleware/authorization');


const categoryRoute = express.Router();
categoryRoute.use(verifyAdminToken);
categoryRoute.use(verifyUserToken);
categoryRoute.use(authComman);

// categoryRoute.use(verifyAdminToken);
// categoryRoute.use((req,res,next)=>{
//     if(req.admin){
//         next();
//     } else {
//         res.send({message: "please login again" , value: false })
//     }
// });



categoryRoute.get('/category',(req,res)=>  {
     res.send({message: "its work"});
});


categoryRoute.post('/categoryupload' , authorize('admin'),verifyAdmin ,category_up , uploadcategory);

categoryRoute.get('/getallcategory',getallcategory); 

categoryRoute.get('/getcategory/:id'  ,getcategory);

categoryRoute.delete('/deletecategory/:id' ,authorize('admin'),verifyAdmin ,deletecategory);
categoryRoute.put('/updatecategory/:id' , authorize('admin'),verifyAdmin ,category_up ,updatecategory);


 








module.exports = {
    categoryRoute
}