let mongoose = require("mongoose");
let dotenv = require("dotenv");

//config
dotenv.config();



let connectDB=mongoose.connect(process.env.MONGOURL);

module.exports={connectDB};