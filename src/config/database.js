const mongoose = require('mongoose');

async function connectToDb() {
   try{
    console.log(process.env.MONGO_URL);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("connected to DB");
   } 
   catch(err){
    console.log(err);

   }
}

module.exports = connectToDb;