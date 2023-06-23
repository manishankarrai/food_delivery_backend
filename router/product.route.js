const express = require('express');
const { product_up } = require('../model/upload.model');
const {  uploadproduct , getallproduct , getproduct , updateproduct , deleteproduct, search_product  } = require('../controller/product.controller');
const { authorize ,authComman  , verifyAdmin} = require('../middleware/authorization');
const { verifyUserToken, verifyAdminToken } = require('../middleware/token');


const productRoute = express.Router();

productRoute.use(verifyAdminToken);
productRoute.use(verifyUserToken);
productRoute.use(authComman);


// productRoute.use(verifyAdminToken);
// productRoute.use((req,res,next)=>{
//     if(req.admin){
//         next();
//     } else {
//         res.send({message: "please login again" , value: false })
//     }
// });


productRoute.get('/product',(req,res)=>  {
     res.send({message: "its work"});
}); 

//,authorize('admin'),verifyAdmin ,

productRoute.post('/uploadproduct' ,product_up , uploadproduct);

productRoute.get('/getallproduct',  getallproduct); 
productRoute.get('/getallproducts' , getallproduct); 


productRoute.get('/getproduct/:id'  , getproduct);

productRoute.delete('/deleteproduct/:id' ,authorize('admin'), verifyAdmin,deleteproduct);
productRoute.put('/updateproduct/:id'   ,product_up ,updateproduct); //update when comment and reviews


//for serch product
productRoute.get('/search/:key', search_product);

 








module.exports = {
    productRoute
}