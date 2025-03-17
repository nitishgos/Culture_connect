const mongoose = require('mongoose');
const mongoURL="mongodb://localhost:27017/ccdb";
const connectToMongo=()=>{
    mongoose.connect(mongoURL)
    .then(() => {
        console.log("Connected to MongoDB successfully");
    })
    .catch((err)=>{
        console.error("Failed to connect to MongoDB", err);
    })
};
module.exports=connectToMongo;