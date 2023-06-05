
const mongoose = require('mongoose');

let schema = mongoose.Schema ;

const bannerSchema = new schema({
    banner_url: String ,
    priority: String ,
    status: String 
});

let Banner = mongoose.model('banners',bannerSchema);


module.exports = {
    Banner
}