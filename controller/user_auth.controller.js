const { User } = require("../model/user.model");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");

const create_user = async (req, res) => {
  let url = "http://localhost:3000/images/users/" + req.file.filename;
  let salt = await bcrypt.genSalt(10);
  let passwordHash = await bcrypt.hash(req.body.password, salt);
  req.body.password = passwordHash;
  let user_data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    mobile_no: req.body.mobile_no,
    dob: req.body.dob,
    profile_url: url,
  };
  let check_email = await User.findOne({ email: req.body.email });
  if (check_email) {
    res.send({ message: "email is already exist", value: false });
  } else {
    let data = await User(user_data).save();

    res.send({
      message: "user create successfully",
      user: data,
      value: true,
    });
    console.log("User add successfully  ", data);
  }
};

const user_login = async (req, res) => {
  let email_exist = await User.findOne({ email: req.body.email });
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
    let user = email_exist;
    //signing token with user id
    console.log("user._id", user._id);

    var token = jwt.sign({
      id: user._id
    }, process.env.SECRET, {
      expiresIn: 86400
    });

    //responding to client request with user profile success message and  access token .
    res.status(200)
      .send({
        data: user,
        message: "Login successfull",
        accessToken: token,
      });
  }
};

module.exports = {
  create_user,
  user_login,
};
