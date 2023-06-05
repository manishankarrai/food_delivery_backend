const express =  require('express');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const cluster = require('cluster'); //when we use pm2
const os = require('os');

const { dbb_boolean} = require('./db/dbconnection');
const { categoryRoute } = require('./router/category.router');
const { productRoute } = require('./router/product.route');
const { userRoute } = require('./router/user.route');
const { bannerRoute } = require('./router/banner.route');
const { adminRoute} = require('./router/admin.route');
const rateLimit = require('express-rate-limit');



const app = express();





// Apply rate limiting middleware
// const limiter = rateLimit({
//   windowMs: 60 * 1000, // 1 minute
//   max: 100, // Limit each IP to 100 requests per minute
// });
// app.use(limiter);



// const db_status = (req,res ,next)=>{
//     if(database_status){
//       next();
//     } else {
//         res.status(500).send({message: "there is a problem in database , please try after some time.."});
//         console.log("alert !!!!   database connection fail , user may face problem.....");
//     }
// }

app.use(express.json());

app.use(cors({
    origin : '*'
}));

app.use(helmet());

app.use(express.static('public'));
//.use(db_status);
app.use('/user',userRoute);
 app.use('/admin',adminRoute);
 app.use('/banner',bannerRoute);
 app.use('/category',categoryRoute);
 app.use('/product',productRoute);
 

app.get('/',(req,res)=> {
    res.send(`<h1>Hello World </h1>`)
});


if(cluster.isMaster) {
    console.log(`master process is started ${process.pid}.....`);
  const NUM_WORKERS = os.cpus().length  ;
  for(let i = 0; i < NUM_WORKERS ; i++) {
    cluster.fork();
  }
}
else {
    app.listen(3000,()=> {
      console.log(`server is runing on port 3000`);
        //console.log(`master process is started ${process.pid}.....`);

    });
}




