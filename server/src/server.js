const express = require("express");
const app = express();
const initRoutes = require("./routes/web");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
initRoutes(app);

let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
