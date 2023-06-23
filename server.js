const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");

require("./db/dbconnection");
const { categoryRoute } = require("./router/category.router");
const { productRoute } = require("./router/product.route");
const { userRoute } = require("./router/user.route");
const { bannerRoute } = require("./router/banner.route");
const { adminRoute } = require("./router/admin.route");
const rateLimit = require("express-rate-limit");
const { deliveryArea } = require("./router/deliveryArea.route");
const { speCategoryRoute } = require("./router/speCategory.route");
const { addtocartRoute } = require("./router/addtocart.route");

const app = express();

//Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 100, // Limit each IP to 100 requests per minute
});
app.use(limiter);

let check_point = (req, res, next) => {
  if (req.user == null || req.admin == null || req.guest == null) {
    req.guest = {
      role: "guest",
      ipAddress: req.ip,
    };
    console.log("a new guest come with ip address is ", req.guest);
  } else {
  }
  next();
};
app.use(check_point);

// const db_status = (req,res ,next)=>{
//     if(database_status){
//       next();
//     } else {
//         res.status(500).send({message: "there is a problem in database , please try after some time.."});
//         console.log("alert !!!!   database connection fail , user may face problem.....");
//     }
// }

app.use(express.json({limit: '10mb'}));

app.use(
  cors({
    origin: "*",
  })
);

app.use(helmet());

app.use(express.static("public"));
//.use(db_status);
app.use("/user", userRoute);
app.use("/admin", adminRoute);
app.use("/banner", bannerRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);
app.use("/darea", deliveryArea);
app.use("/",  speCategoryRoute);
app.use("/cart" , addtocartRoute);

app.get("/", (req, res) => {
  res.send(`<h1>Hello World </h1>`);
});
app.get("/welcome", (req, res) => {
  res.send(`<h1>Hello World  Welcom to the new World</h1>`);
});

app.use((req, res, next) => {
  res
    .status(404)
    .send({
      message: "route not found , please find once again",
      value: false,
    });
});

app.listen(3000, () => {
  console.log(`server is runing on port 3000`);
  //console.log(`master process is started ${process.pid}.....`);
});

// three role are
//add to cart  , delete from cart 
// 