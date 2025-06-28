const mongoose = require("mongoose");


const connectDB = async() => {
    await mongoose.connect("mongodb+srv://abhishekkumars356:1jNnr0ay8u4zWDCB@namestenode.yfnk1fq.mongodb.net/devTinder");
}

module.exports = connectDB;