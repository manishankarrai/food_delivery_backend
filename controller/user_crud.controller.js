// const { User, delete_user } = require('../model/user.model');
// const { uploadProfile_user } = require('../model/upload.model');


// let deleteUser = async (req, res) => {

//     let del_id = req.params.id;
//     console.log(del_id);
//     let user_data = await User.findOne({ _id: del_id });
//     let data = {
//         name: user_data.name,
//         dob: user_data.dob,
//         email: user_data.email,
//         password: user_data.password,
//         createAt: user_data.createAt,
//         address: user_data.address,
//         mobile_no: user_data.mobile_no,
//         profile_url: user_data.profile_url,
//         update: user_data.update,
//         old_id: user_data._id,
//     }
//     console.log('data', data);
//     if (!data) {
//         res.send({ message: 'something wents wrongt plese try again ' , value: false })
//     } else {
//         console.log('data come from websie', user_data);


//         let saveDelUser = await delete_user(data).save();
//         if (!saveDelUser) {
//             res.send({ message: 'something wents wrongt plese try again ' , value: false })
//         } else {
//             let del_user = await User.deleteOne({ _id: del_id });
//             res.send({ message: 'user deleted successfully' , value: true });
//         }
//     }

// }
// let getAllUsers =  async(req, res)=> {
//     let data = await User.find();
//     res.send({message: "success" , 
//          user: data , value: true });
// }

// let getUser =  async(req, res)=> {
//     let data = await User.find(req.body);
//     res.send({message: "success" , 
//          user: data , value: true });
// }




// let updateUser = async (req,res) => { 
//     console.log("start");
//          let data = await User.updateOne({_id: req.params.id} , { $set:  req.body });
//          if(data) {
//             res.send({ message: "update sucessfully" , user: data   , value: true});
//          } else {
//             res.send({ message: "update fail " , user: data   , value: false});
//          }
// }
// // let upload_profile = async(req,res)  => {
// //   let  url = 'http://localhost:3000/journalist/' + req.file.filename;
// //   let data = await User.updateOne({_id: req.params.id} , { $set:  newdata });
  
// // }

// // let updateprofile = async (req, res ) => {

// // }


// module.exports = {
//     deleteUser, updateUser , getAllUsers , getUser  
// }
