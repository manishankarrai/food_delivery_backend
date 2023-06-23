const express = require('express');
const { DeliveryArea } = require('../model/deliveryArea.model');
const { authorize ,authComman  , verifyAdmin} = require('../middleware/authorization');
const { verifyUserToken, verifyAdminToken } = require('../middleware/token');


const deliveryArea = express.Router();


deliveryArea.use(verifyAdminToken);
deliveryArea.use(verifyUserToken);
deliveryArea.use(authComman);


deliveryArea.get('/',(req,res)=>{
    res.status(200).send({message: "its work"});
});
 


deliveryArea.get('/getalldeliveryarea' ,async (req,res)=> {
   try {
    let result  = await DeliveryArea.find() ;
    res.status(200).send({
        message:"successfull" , data : result , value: true 
    });
   }
   catch(error) {
    res.status(500).send({
        message: "there is an error , please try again" , data :null , value: false 
    });
   }
});

deliveryArea.get('/getdeliveryarea/:id' ,async (req,res)=> {
    try {
        
     let result  = await DeliveryArea.find({_id: req.params.id}) ;
     res.status(200).send({
         message:"successfull" , data : result , value: true 
     });
    }
    catch(error) {
     res.status(500).send({
         message:"successfull" , data : result , value: true 
     });
    }
 });

//authorize('admin') , verifyAdmin 
 deliveryArea.post('/createdeliveryarea' ,async(req,res)=>{
    try{
      let data =  {
        pincode: req.body.pincode ,
        area: req.body.area ,
        city : req.body.city 
      }
      let result = await DeliveryArea(data).save() ;
      res.status(200).send({
        message: "success" , value: true , data : result
      });
    }
    catch(error) {
       res.status(500).send({
        message: "fail" , data: null , value: false 
       });
    }
 });

 deliveryArea.put('/updatedeliveryarea/:id' , authorize('admin') , verifyAdmin   ,async(req,res)=>{
      try{
        let result = await DeliveryArea.updateOne(
            {_id: req.params.id} , {$set: req.body} 
          );
        res.status(200).send({message: "update successfully"  , value : true , data : result});
      }
      catch(error) {
        res.status(500).send({
            message: "fail"  , value : false  , data: null 
        });
      }
      
});

deliveryArea.delete('/deletedeliveryarea/:id' , authorize('admin') , verifyAdmin   , async (req, res)=>{
    try{
        let result = await DeliveryArea.deleteOne({_id: req.params.id});
        res.status(200).send({
            message: "successfull " , data : result  , value: true 
        });
    } 
    catch(error) {
        res.status(500).send({
            message: "fail"  , value : false  , data: null 
        });
      }
});



module.exports = {
    deliveryArea
}