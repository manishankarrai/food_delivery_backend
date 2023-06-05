
const mongoose = require('mongoose');

let schema = mongoose.Schema ;

const categorySchema = new schema({
    banner_url: String ,
    priority: String ,
    c_name: String ,
    c_slug: String ,
    description: String ,
    addi_content: String ,
    meta_title: String ,
    meta_keyword: String ,
    meta_descri: String 

});

let Category = mongoose.model('categories',categorySchema);


module.exports = {
    Category
}