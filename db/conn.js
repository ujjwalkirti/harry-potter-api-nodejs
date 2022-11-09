const mongoose = require("mongoose");

function connectToDB() {
  const connection = mongoose.connect("mongodb://localhost:27017/test");
  connection
    .then(console.log("connected to db successfully"))
    .catch((reason) => console.log(reason));
}

module.exports = connectToDB;
