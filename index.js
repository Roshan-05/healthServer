// require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 3001;

const userRoutes = require("./routes/users");

app.use(cors());
app.use(express.json());
app.use("/users", userRoutes);
const url = "mongodb://localhost:27017/healthGuide";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "healthGuide",
  })
  .then((result) => {
    app.listen(port, () => {
      console.log("App is listening for request on " + port);
    });
  })
  .catch((err) => {
    console.log(err);
  });
