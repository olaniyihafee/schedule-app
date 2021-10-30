const express = require("express");
var cors = require("cors");
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
app.use(
  cors({
    origin: "*",
  })
)
  initRoutes(app);

  let port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Running at localhost:${port}`);
  });
})()