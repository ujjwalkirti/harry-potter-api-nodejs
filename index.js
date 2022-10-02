const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db/conn");
const characterRouter = require("./routes/characters");
const housesRouter = require("./routes/houses");
const PORT = process.env.PORT || 6000;

//connect to MongoDB cluster
db.connectToServer();

//defining the routes
app.use("/characters", characterRouter);
app.use("/houses", housesRouter);

app.get("/", (req, res) => {
  const routes = getTop50Records();
  console.log(routes);
  res.render("home.ejs", { routes });
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

function getTop50Records() {
  let gift = { msg: "", data: "", status: 0 };
  db.route("/listings").get(async function (req, res) {
    const dbConnect = dbo.getDb();

    dbConnect
      .collection("routes")
      .find({})
      .limit(50)
      .toArray(function (err, result) {
        if (err) {
          gift.status = 404;
          gift.msg = "Error fetching listings!";
          gift.data = err;
        } else {
          gift.data = result;
          gift.msg = "Successfully fetched the data";
          gift.status = 200;
        }
      });
  });
  return gift;
}
