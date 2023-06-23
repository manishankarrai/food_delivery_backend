const express = require("express");
const { AddToCart } = require("../model/addtocart.model");
const { Product } = require("../model/product.model");
const { UserDeliveryAddress } = require("../model/user.model");
const { DeliveryArea } = require("../model/deliveryArea.model");
const addtocartRoute = express.Router();

addtocartRoute.get("/info", (req, res) => {
  res.send({ message: "its work" });
});
// if item already pregent in cart 
//
//add to cart item post 
//checked 
addtocartRoute.post("/add", async (req, res) => {
  try {
    let data = {
        product_id: req.body.product_id,
        quantity: req.body.quantity ,
        user_id: req.body.user_id ,
        created_at: req.body.created_at
    }
    let itemincart = await AddToCart.findOne({ product_id: data.product_id });
    if (itemincart) {
      let quantityIncrease = str(int(itemincart.quantity) + 1);
      data.created_at = date.now;
      data.quantity = quantityIncrease;
      let savedata = await AddToCart.updateOne(
        { product_id: data.product_id },
        {
          $set: { quantity: quantityIncrease, created_at: data.created_at },
        }
      );
      let getproduct = await Product.findOne({ _id: data.product_id });
      let cartdata = {
        product: getproduct,
        user_id: itemincart.user_id,
        quantity: data.quantity,
        created_at: data.created_at,
      };
      res.status(200).send({
        message: "submit successfully",
        data: cartdata,
        value: true,
      });
    } else {
      let cart = {
        product_id: data.product_id,
        user_id: data.user_id,
        quantity: data.quantity,
      };
      let result = await AddToCart(cart).save();
      let getproduct = await Product.findOne({ _id: data.product_id });
      let cartdata = {
        product: getproduct,
        user_id: result.user_id,
        quantity: result.quantity,
        created_at: result.created_at,
      };
      res.status(200).send({
        message: "submit successfully",
        data: cartdata,
        value: true,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "there is an error , please try again",
      data: null,
      value: false,
    });
  }
});
//get all item pregent in cart
//when someone click on goto cart
//checked
addtocartRoute.post("/getall", async (req, res) => {
  try {
    let allcart = await AddToCart.find({ user_id: req.body.user_id });
    console.log("all cart", allcart.length);
    let products_id = [];
    for (let x of allcart) {
      products_id.push(x.product_id);
    }
    console.log("product id ", products_id);
    let products = await Product.find({ _id: { $in: products_id } });
    console.log("products kength", products.length);
    let mapthedata = [];
    for (let x of products) {
      console.log("inside first for loop");
      for (let data of allcart) {
        console.log("inside second for loop");
        if (data.product_id == x._id) {
          console.log("inside if loop");
          let mapdata = {
            product: x,
            user_id: data.user_id,
            created_at: data.created_at,
            quantity: data.quantity,
            _id: data._id
          };
          mapthedata.push(mapdata);
          console.log("finally data pushed", mapthedata.length);
          break;
        }
      }
    }
    console.log("map the data length", mapthedata.length);
    res
      .status(200)
      .send({ message: "successfull", data: mapthedata, value: true });
  } catch (error) {
    res.status(500).send({
      message: "there is an error , please try again",
      data: null,
      value: false,
    });
  }
});

//route for removing item from cart  
//checked
addtocartRoute.delete('/deleteitem/:id', async(req,res)=>{
    try{
        let id = req.params.id ;
        let result = await AddToCart.deleteOne({_id: id});
        res.status(200).send({
            message: "deleted successfully" , data:  null , value: true 
        });
    }
    catch(error){
        res.status(500).send({
            message: "there is an error , please try again",
            data: null,
            value: false,
          });
    }
});


//route for increasing /decrease item in cart 
//front end dev alredy update quantity and send the remain quantity
//checked
addtocartRoute.post('/quantityupdate',async(req,res)=>{
  
    try {
        let data = {
            cart_id: req.body.cart_id,
            quantity: req.body.quantity  
        }
        let savedata = await AddToCart.updateOne(
            { _id: data.cart_id },
            {
              $set: { quantity: data.quantity },
            }
          );
          console.log(savedata);
          let result = await AddToCart.findOne({_id: data.cart_id});
          let getproduct = await Product.findOne({ _id: result.product_id });
          let cartdata = {
            product: getproduct,
            user_id: result.user_id,
            quantity: result.quantity,
            created_at: result.product_id ,
            _id: result._id
          }
          res.status(200).send({
            message: "submit successfully",
            data: cartdata,
            value: true,
          });
    }
    catch(error) {
        res.status(500).send({
            message: "there is an error , please try again",
            data: null,
            value: false,
          });
    }
});

//there are four step on buting a product 1. check user login or not , 2.choose address , 3. ordersummary 4. payment
// go for 2nd
//checked
addtocartRoute.post("/addnewaddress" , async(req,res)=>{
    console.log("data come in try" , req.body);
   try {
    console.log("data come in try" , req.body);
      let data = {
        address: req.body.address, 
        landmark: req.body.landmark ,
        near_location: req.body.near_location ,
        city: req.body.city ,
        area: req.body.area, 
        pincode: req.body.pincode ,
        user_id: req.body.user_id ,
        alternate_mobileno: req.body.alternate_mobileno
    }
      let area_found = await UserDeliveryAddress.findOne({
        $and: [
            { landmark: data.landmark },
            { address: data.address },
            { pincode: data.pincode  },
            { user_id: data.user_id }
          ]    });
     
     console.log("area found" ,area_found);
      if(area_found) {
         console.log("area exist");
        res.status(200).send({
            message: "address match found " , data: area_found , value: true
        });
      } else {
        console.log("area insert successfull");
        let result = await UserDeliveryAddress(data).save();
        console.log("result" ,result);
        res.status(200).send({
            message: "address add successfully" , data: result , value: true
        });
      }
   } 
   catch(error) {
    res.status(500).send({
        message: "there is an error , please try again",
        data: null,
        value: false,
      });
   }
});
// checked
addtocartRoute.get("/alldeliveryaddress", async(req,res)=>{
   try{
    let result = await UserDeliveryAddress.find();
    res.status(200).send({
        message: "successfull" , data: result , value: true
    });
   }
   catch(error){
    res.status(500).send({
        message: "there is an error , please try again",
        data: null,
        value: false,
      });
   }
});
//checked
addtocartRoute.post('/updatedeliuseradd',async(req,res)=>{
   try{
    console.log("data comes in the update delivery user address ");
     let id = req.body._id ;
      let data = {
        address: req.body.address, 
        landmark: req.body.landmark ,
        near_location: req.body.near_location ,
        city: req.body.city ,
        area: req.body.area, 
        pincode: req.body.pincode ,
        user_id: req.body.user_id ,
        alternate_mobileno: req.body.alternate_mobileno 
      }
    let updateaddress = await UserDeliveryAddress.updateOne({_id: id}, {$set: data});
    let result = await UserDeliveryAddress.findOne({_id: id});
    res.status(200).send({
        message: "update successfully" , data: result , value: true
    });
   }
   catch(error){
    res.status(500).send({
        message: "there is an error , please try again",
        data: null,
        value: false,
      });
   }
});

// select delivery area  nad match with delivery range based on it show a pop that is item is avalible on 
// that postion or not 
// 
addtocartRoute.post('/verifydeliveryarea', async(req,res)=>{
    try {
        let data =  {
            pincode: req.body.pincode ,
            user_id: req.body.user_id
        }
        let result = await DeliveryArea.findOne({pincode: data.pincode});
        if(result){
            res.status(200).send({
                message: "delivery area match" , data: null , value: true
            });
        } else {
            res.status(200).send({
                message: "delivery area not match" , data: null , value: false 
            });
        }
    }
    catch(error){
        res.status(500).send({
            message: "there is an error , please try again",
            data: null,
            value: false,
          });
    }
});

 



module.exports = {
  addtocartRoute,
};
