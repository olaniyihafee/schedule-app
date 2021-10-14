const express = require("express");
const app = express();
const mongoose =  require("mongoose");
const initRoutes = require("./routes/web");

;(async () => {
  const url = process.env.MONGODB_URI || "mongodb://localhost:27017/juniper"
  const options = { useNewUrlParser: true, useUnifiedTopology: true }

  try{
    await mongoose.connect( url ,options)
  }catch(err){
    console.log(err)}

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  initRoutes(app);

  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
  });
})()