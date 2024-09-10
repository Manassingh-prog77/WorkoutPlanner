const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://jmsjbb1101:Something123456@workoutstorage.jb2ou.mongodb.net/?retryWrites=true&w=majority&appName=WorkOutStorage"

const connectToMongo = async() =>{
   try{
    mongoose.connect(mongoURI);
    console.log("connected MongoDb successfully");
   } catch (err){
    console.error("Connection error:", err);
   }
};

module.exports = connectToMongo; 