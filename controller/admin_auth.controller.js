const { Admin } = require("../model/admin.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const create_admin = async (req, res) => {
  let url = "http://192.168.1.12:3000/images/admins/" + req.file.filename;
  let salt = await bcrypt.genSalt(10);
  let passwordHash = await bcrypt.hash(req.body.password, salt);
  req.body.password = passwordHash;
  let admin_data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    mobile_no: req.body.mobile_no,
    dob: req.body.dob,
    profile_url: url,
  };
  let check_email = await Admin.findOne({ email: req.body.email });
  if (check_email) {
    res.send({ message: "email is already exist", value: false });
  } else {
    let data = await Admin(admin_data).save();
   
    

    res.status(201).send({
      message: "admin create successfully",
      admin: data,
      value: true,
    });
    console.log("Admin add successfully  ", data);
  }
};

const admin_login = async (req, res) => {
  let email_exist = await Admin.findOne({ email: req.body.email });
  console.log("email_exist", email_exist);
  if (!email_exist) {
    res
      .status(404)
      .send({ message: "email or password is encorrect ", value: false });
  } else {
    var passwordIsValid = bcrypt.compare(
      req.body.password,
      email_exist.password
    );
    if (!passwordIsValid) {
      return res.status(401)
        .send({
          accessToken: null,
          message: "Invalid Password!",
          value: false 
        });
    }
    let admin = email_exist;
    //signing token with admin id
    console.log("admin._id", admin._id);
   

    var token = jwt.sign({
      id: admin._id
    }, process.env.SECRET_ADMIN, {
      expiresIn: 8640000
    });
 //  req.session.role = 'admin';

    //responding to client request with admin profile success message and  access token .
    res.status(200)
      .send({
        data: admin,
        message: "Login successfull",
        accessToken: token,
      });
  }
};

module.exports = {
  create_admin,
  admin_login,
};
