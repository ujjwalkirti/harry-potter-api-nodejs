const mongoose = require("mongoose");

function connectToDB() {
  const connection = mongoose.connect(process.env.MONGODB_URI);
  connection
    .then(console.log("connected to db successfully"))
    .catch((reason) => console.log(reason));
}

module.exports = connectToDB;
