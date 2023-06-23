const mongoose = require('mongoose');

const schema = mongoose.Schema ;

const speCategoryScheman = new schema({
   category_name: String ,
   category_slug: String ,
   category_url: String ,
   profile_url: String , 
   priority: String ,
   short_description: String ,
    addictional_content: String ,
    meta_title: String ,
    meta_keyword: String ,
    meta_description: String 
});


const SpeCategory = mongoose.model('specail_category' , speCategoryScheman);


module.exports=  {
    SpeCategory
}