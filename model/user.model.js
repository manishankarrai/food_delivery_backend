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
 });



 const User = mongoose.model('users' , user_schema);


module.exports = {User }
 
 