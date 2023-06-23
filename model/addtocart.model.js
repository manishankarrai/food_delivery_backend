const mongoose = require('mongoose');
const schema = mongoose.Schema ;


const product_model = new schema({
    category: String ,
    product_name: String ,
    profile_url: String ,
    gross_weight: String ,
    net_weight: String ,
    mrp: String , 
    selling_price: String ,
    sort_descri: String ,
    strong_instruction: String ,
    meta_title: String ,
    meta_keyword: String ,
    meta_descri: String ,
    _id: String
})
 


const  cart_model = new schema ({
    product_id: String ,
    created_at : {
        type: Date ,
        default: Date.now
    } ,
    quantity: String ,
    user_id: String ,
});


const AddToCart = mongoose.model('carts' , cart_model);


module.exports =  {
    AddToCart
}