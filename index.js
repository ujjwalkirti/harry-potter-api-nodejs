const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT || 6000;

app.get("/", (req, res) => {
  res.render("home.ejs");
});

//get all the characters

app.get("/all", (req, res) => {
  const data = [];
  res.status(200).json(data);
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});
