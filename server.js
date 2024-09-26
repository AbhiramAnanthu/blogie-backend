const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

port = process.env["PORT"] || 5000;
const uri = process.env["MONGODB"];
mongoose
  .connect(uri)
  .then(() => {
    console.log("MongoDB connection successfull");
  })
  .catch((err) => {
    console.error("Error connecting to mongoDB: ", err);
  });
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
