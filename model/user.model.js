const mongoose = require('mongoose');

let schema = mongoose.Schema ;




 const  user_schema = new schema({
    name:  String ,
    dob: String,
    email: String ,
    password: String,
    createAt: {
        type: Date ,
        default: new Date 
    },
    address: String,
    mobile_no :String ,
    profile_url: String ,
    role: {
        type: String , 
        default: "user"
    }
 });

 const deliveryAddressModel = new schema({
    address: String , 
    landmark: String ,
    near_location: String ,
    city: String ,
    area: String, 
    pincode: String ,
    user_id: String ,
    alternate_mobileno: String
 });


 const User = mongoose.model('users' , user_schema);
 const UserDeliveryAddress = mongoose.model('user_delivery_addresses' , deliveryAddressModel);


module.exports = {User , UserDeliveryAddress }
 
 