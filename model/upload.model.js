
const multer = require('multer');

const storage_banner = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/banner')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
let upload = multer({ storage: storage_banner });

let upload_banner = upload.single('banner');
 


const storage_category = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/category')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
let upload_category = multer({ storage: storage_category  });

let  category_up = upload_category.single('banner');

const storage_product = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/products')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
let upload_product = multer({ storage: storage_product  });

let  product_up = upload_product.single('product_img');


const storage_user = multer.diskStorage({
    destination: (req, file, cb) => {
        let journalist_dir = 'public/images/admin/';
        cb(null, journalist_dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});   
let upload_user = multer({ storage: storage_user }); 

let uploadProfile_user = upload_user.single('profile');

const storage_admin = multer.diskStorage({
    destination: (req, file, cb) => {
        let journalist_dir = 'public/images/admin/';
        cb(null, journalist_dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
let upload_admin = multer({ storage: storage_admin });

let uploadProfile_admin = upload_admin.single('profile');


//upload for specail category 
const storage_speCategory = multer.diskStorage({
    destination: (req, file, cb) => {
        let journalist_dir = 'public/images/speCategory/';
        cb(null, journalist_dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname)
    }
});
let upload_speCategory = multer({ storage: storage_speCategory });

let uploadSpeCategory = upload_speCategory.single('profile');




module.exports = {  category_up ,upload_banner  , product_up , uploadProfile_user , uploadSpeCategory
    , uploadProfile_admin};