const mongoose = require("mongoose");

mongoose.connect(`mongodb+srv://admin:${process.env.ADMIN_PASSWORD}@cluster0-ribwi.mongodb.net/avito-uber?retryWrites=true&w=majority`, {
// mongoose.connect("mongodb://localhost:27017/avito-uber", {  
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

module.exports = mongoose.connection;

