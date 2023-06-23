const { Product } = require('../model/product.model');


const uploadproduct = async(req , res)=> {
    let banner_url =  "/images/products/" + req.file.filename ;
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


const  deleteproduct = async(req,res)=> {
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
 

const updateproduct = async(req,res)=> {
    let data  =  req.body;
    let url =  "/images/products/" + req.file.filename ; 
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


//search api for product 
let search_product = async (req, res) => {
    console.log(req.params.key);
    try {
        let data = await Product.find({
            "$or": [
                { "product_name": { $regex: req.params.key, $options: 'i' } } ,
                { "category": { $regex: req.params.key, $options: 'i' } } ,
                 { "meta_descri": { $regex: req.params.key, $options: 'i' } } ,
                 { "meta_keyword": { $regex: req.params.key, $options: 'i' } } ,
                 { "meta_title": { $regex: req.params.key, $options: 'i' } } 

            ]
        });
        res.send({message: "successfully" , data: data  ,value: true });
    } catch (error) {
        console.error(error);
        res.status(500).send({message : 'Internal Server Error' , data: null , value: false});
    }
}


module.exports = {
    uploadproduct , getallproduct , getproduct , updateproduct , deleteproduct ,search_product
}