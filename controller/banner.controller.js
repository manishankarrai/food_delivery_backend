const { Banner } = require('../model/banner.model');
 


 const uploadbanner =  async(req , res)=> {
    let banner_url =  "http://192.168.1.12:3000/images/banner/" + req.file.filename ;
    console.log(req.file.filename);
    let data  = req.body ;
    data.banner_url  =  banner_url ;
    console.log("banner url and all banner data that save in database"   ,data );
      
    
    let result = await Banner(data).save();
    console.log("result " , result);
    if(result){
        res.send({message: "banner upload successfull "  , value: true  , data: result}); 
    } else {
        res.send({message: "there is some error , please try again " , value: false })
    }



}


const getallbanner = async (req,res)=> {
    let result = await Banner.find();
    res.send({mesaage: "success" , data: result});
}

const getbanner = async (req,res)=> {
    console.log(req.params.id);
    let data  =  {
        _id: req.params.id  
    }
    let result = await Banner.findOne(data);
    if(result) {
        res.send({message: "successs" , value: true , data: result});
    } else {
        res.send({message : "there is some error , please tyr again" , value: false});
    }
} 


const deletebanner =  async(req,res)=> {
    let data  =  {
        _id: req.params.id  
    }
    let result = Banner.deleteOne(data).then((data)=> {
        res.send({message: 'successfull' , value: true});
    })
    .catch(err => {
        console.log(err);
        res.send({message: "try again"   ,value: false})
    })
}

const updatebanner = async(req,res)=> {
    let data  =  req.body;
    let url =  "http://192.168.1.12:3000/images/banner/" + req.file.filename ; 
    data.banner_url = url ;
    console.log("update data");

 Banner.updateOne({_id: req.params.id} , {$set: data}).then((data)=>{
    console.log("update data" ,data);
    res.send({message: "successfull " , data: data , value: true}) ;
 })
 .catch((err)=> {
    res.send({message: "fail "  , value: false }) ;
 })


}




module.exports  = {
    uploadbanner , getallbanner  , getbanner  , deletebanner , updatebanner 
}
