const express = require('express');
const { SpeCategory } = require('../model/speCategory.model');
const { uploadSpeCategory } = require('../model/upload.model');
const { authorize ,authComman  , verifyAdmin} = require('../middleware/authorization');
const { verifyUserToken, verifyAdminToken } = require('../middleware/token');
 
speCategoryRoute = express.Router();


speCategoryRoute.use(verifyAdminToken);
speCategoryRoute.use(verifyUserToken);
speCategoryRoute.use(authComman);

speCategoryRoute.get('/' ,(req,res)=>{
    res.status(200).send({
        message : "its works" 
    })
}) ;

speCategoryRoute.get('/getallspecategory' , async(req,res)=>{
try{
    let result = await SpeCategory.find();
    res.status(200).send(
    { message: "successfull" , data: result , value: true }
    )
} 
catch(error) {
    res.status(500).send({
        message: "fail" , data: null  , value: false 
    })
}
});
speCategoryRoute.get('/getspecategory/:id', async(req,res)=>{
    try{
        let result =  await SpeCategory().find({_id: req.params.id});
        res.status(200).send(
            { message: "successfull" , data: result , value: true }
            )
    } 
    catch(error) {
        res.status(500).send({
            message: "fail" , data: null  , value: false 
        })
    }
});
//, authorize('admin') , verifyAdmin
speCategoryRoute.post('/createspecategory' , authorize('admin') , verifyAdmin , uploadSpeCategory  , async(req,res)=>{
    try{ 
        let url = "http://192.168.1.12:3000/images/speCategory/"+req.file.filename ;
        let data = {
            category_name: req.body.category_name ,
            category_slug: req.body.category_slug ,
            category_url: req.body.category_url ,
            profile_url: url, 
            priority: req.body.priority ,
            short_description: req.body.short_description ,
             addictional_content: req.body.addictional_content ,
             meta_title: req.body.meta_title ,
             meta_keyword: req.body.meta_keyword ,
             meta_description: req.body.meta_description 
        }
        let result =  await SpeCategory(data).save();
        res.status(200).send({
            message: "successfull" , value: true , data: result
        })
    } 
catch(error) {
    res.status(500).send({
        message: "fail" , data: null  , value: false 
    })
}
});
speCategoryRoute.delete('/deletespecategory/:id', authorize('admin') , verifyAdmin ,async(req,res)=>{
    try{
       let result = await SpeCategory.deleteOne({_id: req.params.id});

        res.status(200).send(
            { message: "successfull" , data: result , value: true }
            )
    } 
catch(error) {
    res.status(500).send({
        message: "fail" , data: null  , value: false 
    })
}
});
//
speCategoryRoute.put('/updatespecategory/:id' ,authorize('admin') , verifyAdmin ,uploadSpeCategory ,async(req,res)=>{
    try{
        let data = req.body ;
        let url = "http://192.168.1.12:3000/images/speCategory/"+req.file.filename ;
          data.profile_url = url ;
        let result = await SpeCategory.updateOne({_id: req.params.id},{$set: data})

        res.status(200).send(
            { message: "successfull" , data: result , value: true }
            )
    } 
catch(error) {
    res.status(500).send({
        message: "fail" , data: null  , value: false 
    })
}
});






module.exports = {
      speCategoryRoute
}