const mongoose  = require('mongoose');


const schema =  mongoose.Schema ;


const deliveryArea_schema = new schema({
    area: String ,
    city: String  ,
    pincode: String 
    
});

const DeliveryArea = mongoose.model('delivery_area', deliveryArea_schema);


module.exports = {
    DeliveryArea
}