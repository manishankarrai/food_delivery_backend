const mongoose = require('mongoose');

let schema = mongoose.Schema ;




 const  admin_schema = new schema({
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
        default: "admin"
    }
 });



 const Admin = mongoose.model('admins' , admin_schema);


module.exports = {Admin }
 
 