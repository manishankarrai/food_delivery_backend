const { Category } = require('../model/category.model');



const uploadcategory =  async(req , res)=> {
    let banner_url =  "http://localhost:3000/images/category/" + req.file.filename ;
    console.log(req.file.filename);
    let data  = req.body ;
    data.banner_url  =  banner_url ;
    console.log("category url and all banner data that save in database"   ,data );
      
    
    let result = await Category(data).save();
    console.log("result " , result);
    if(result){
        res.send({message: "category upload successfull "  , value: true  , data: result}); 
    } else {
        res.send({message: "there is some error , please try again " , value: false })
    }

}

const getallcategory =  async (req,res)=> {
    let result = await Category.find();
    res.send({mesaage: "success" , data: result});
}

const getcategory = async (req,res)=> {
    console.log(req.params.id);
    let data  =  {
        _id: req.params.id  
    }
    let result = await Category.findOne(data);
    if(result) {
        res.send({message: "successs" , value: true , data: result});
    } else {
        res.send({message : "there is some error , please tyr again" , value: false});
    }
}

const deletecategory = async(req,res)=> {
    let data  =  {
        _id: req.params.id  
    }
    let result = Category.deleteOne(data).then((data)=> {
        res.send({message: 'successfull' , value: true , data: result});
    })
    .catch(err => {
        console.log(err);
        res.send({message: "try again"   ,value: false})
    })
}


const updatecategory = async(req,res)=> {
    let data  =  req.body;
    let url =  "http://localhost:3000/images/category/" + req.file.filename ; 
    data.banner_url = url ;
    console.log("update data");

 Category.updateOne({_id: req.params.id} , {$set: data}).then((data)=>{
    console.log("update data" ,data);
    res.send({message: "successfull " , data: data , value: true}) ;
 })
 .catch((err)=> {
    res.send({message: "fail "  , value: false }) ;
 })


}


module.exports = {
    uploadcategory , getallcategory , getcategory , updatecategory , deletecategory
}