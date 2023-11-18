//import packages
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userpost = require("./routes/userposts.js")
const auth = require("./routes/auth.js")

dotenv.config(); 

const app = express();
app.use(cors());  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connecting mongodb
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log(err);
  });

//health api
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Server health good",
    timestamp: new Date(),
  });
});

app.use("/",userpost)
app.use("/",auth)

app.listen(process.env.PORT, () => {
  console.log(`Server running on ${process.env.PORT}`);
});
