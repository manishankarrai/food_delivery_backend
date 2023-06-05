const mongoose = require('mongoose');
require('dotenv').config();
var dbb_boolean   ;

async function main_conn() {
   try {
       let data ;
     await  databaseConncetion();
      data = true ;
      dbb_boolean = data ;
      console.log("database conncetion is successfull");
   }
   catch{
    console.log('database connection fail ............');
    let data = false ;
    dbb_boolean = data ;
   }
    
}

function databaseConncetion() {
 return mongoose.connect(process.env.url) ;
}

main_conn();

module.exports = {
    dbb_boolean
}