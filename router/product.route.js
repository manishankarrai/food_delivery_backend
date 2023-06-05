const express = require('express');
const { product_up } = require('../model/upload.model');
const {  uploadproduct , getallproduct , getproduct , updateproduct , deleteproduct  } = require('../controller/product.controller');
const { verifyAdminToken } = require('../middleware/token');

const productRoute = express.Router();

productRoute.use(verifyAdminToken);
productRoute.use((req,res,next)=>{
    if(req.admin){
        next();
    } else {
        res.send({message: "please login again" , value: false })
    }
});


productRoute.get('/product',(req,res)=>  {
     res.send({message: "its work"});
});



productRoute.post('/uploadproduct' ,product_up , uploadproduct);

productRoute.get('/getallproduct', getallproduct); 

productRoute.get('/getproduct/:id' , getproduct);

productRoute.delete('/deleteproduct/:id' ,deleteproduct);
productRoute.put('/updateproduct/:id' , product_up ,updateproduct);


 








module.exports = {
    productRoute
}