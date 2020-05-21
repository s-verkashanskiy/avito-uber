const mongoose = require("mongoose");
require('dotenv').config({ path: '../.env'});

// mongoose.connect("mongodb+srv://admin:${process.env.ADMIN_PASSWORD}@cluster0-ribwi.mongodb.net/test?retryWrites=true&w=majority", {
mongoose.connect("mongodb://localhost:27017/avito-uber", {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

module.exports = mongoose.connection;
