const { Product } = require('../model/product.model');


const uploadproduct = async(req , res)=> {
    let banner_url =  "http://localhost:3000/images/product/" + req.file.filename ;
    console.log(req.file.filename);
    let data  = req.body ;
    data.profile_url  =  banner_url ;
    console.log("product url and all banner data that save in database"   ,data );

    let result = await Product(data).save();
    console.log("result " , result);
    if(result){
        res.send({message: "product upload successfull "  , value: true  , data: result}); 
    } else {
        res.send({message: "there is some error , please try again " , value: false })
    }

}

const getallproduct = async (req,res)=> {
    let result = await Product.find();
    res.send({mesaage: "success" , data: result});
}


const getproduct = async (req,res)=> {
    console.log(req.params.id);
    let data  =  {
        _id: req.params.id  
    }
    let result = await Product.findOne(data);
    if(result) {
        res.send({message: "successs" , value: true , data: result});
    } else {
        res.send({message : "there is some error , please tyr again" , value: false});
    }
}


const updateproduct = async(req,res)=> {
    let data  =  {
        _id: req.params.id  
    }
    let result = Product.deleteOne(data).then((data)=> {
        res.send({message: 'successfull' , value: true });
    })
    .catch(err => {
        console.log(err);
        res.send({message: "try again"   ,value: false})
    })
}


const deleteproduct = async(req,res)=> {
    let data  =  req.body;
    let url =  "http://localhost:3000/images/product/" + req.file.filename ; 
    data.profile_url = url ;
    console.log("update data");

 Product.updateOne({_id: req.params.id} , {$set: data}).then((data)=>{
    console.log("update data" ,data);
    res.send({message: "successfull " , data: data , value: true}) ;
 })
 .catch((err)=> {
    res.send({message: "fail "  , value: false }) ;
 });


} 





module.exports = {
    uploadproduct , getallproduct , getproduct , updateproduct , deleteproduct 
}