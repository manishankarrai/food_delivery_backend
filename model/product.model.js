 
const mongoose = require('mongoose');

let schema = mongoose.Schema ;

const productSchema = new schema({
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
   meta_descri: String 
});

let Product = mongoose.model('products',productSchema);


module.exports = {
    Product
}