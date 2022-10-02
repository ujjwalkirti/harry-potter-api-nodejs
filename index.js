const express = require("express");
const app = express();
require("dotenv").config();
const db = require("./db/conn");
const characterRouter = require("./routes/characters");
const housesRouter = require("./routes/houses");
const PORT = process.env.PORT || 6000;

app.use(express.urlencoded({ extended: true }));

//connect to MongoDB cluster
db.connectToServer();

//defining the routes
app.use("/characters", characterRouter);
app.use("/houses", housesRouter);

//render the homepage
app.get("/", (req, res) => {
  const dbConnect = db.getDb();
  dbConnect
    .collection("routes")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        // console.log(result);
        res.render("home.ejs", { result });
      }
    });
});

//render the page to add routes
app.get("/addRoutes", (req, res) => {
  res.render("addRoutes.ejs");
});

app.post("/addRoutes", (req, res) => {
  const addedRoute = writeTheData("routes", req.body.routes);
  res.send("Successful");
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

/*----------------------UTILITY FUNCTIONS---------------------------*/

function writeTheData(collection, data) {
  let gift = { msg: "", data: "", status: 0 };

  const dbConnect = db.getDb();

  data.last_modified = new Date();

  dbConnect.collection(collection).insertOne(data, function (err, result) {
    if (err) {
      gift.status = 404;
      gift.msg = "Error fetching listings!";
      gift.data = err;
      return gift;
    } else {
      gift.data = result;
      gift.msg = "Successfully fetched the data";
      gift.status = 200;
      return gift;
    }
  });
}
