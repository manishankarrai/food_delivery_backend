//const mongoose = require('mongoose');
// require('dotenv').config();
// var dbb_boolean   ;

// async function main_conn() {
//    try {
//      await  databaseConncetion();
     
//       console.log("database conncetion is successfull");
//    }
//    catch{
//     console.log('database connection fail ............');
    
//    }
    
// }

// function databaseConncetion() {
//  return mongoose.connect('mongodb://localhost:27017/m_delight') ;
// }

// main_conn();

// module.exports = {
// }

const mongoose = require('mongoose');

// Connection URL
const url = 'mongodb://127.0.0.1:27017/food_delivery';

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully to the database');
    
    // Start performing database operations
    // ...
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
  });
