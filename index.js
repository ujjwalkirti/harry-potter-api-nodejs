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
  const routes = getTop50Records("routes");
  console.log(routes);
  res.render("home.ejs", { routes });
});

//render the page to add routes
app.get("/addRoutes", (req, res) => {
  res.render("addRoutes.ejs");
});

app.post("/addRoutes", (req, res) => {
  const addedRoute = writeTheData("routes", req.body.routes);
  res.send(req.body.routes);
});

app.listen(PORT, () => {
  console.log(`server has started on port ${PORT}`);
});

/*----------------------UTILITY FUNCTIONS---------------------------*/

function getTop50Records(collection) {
  let gift = { msg: "", data: "", status: 0 };

  const dbConnect = db.getDb();

  dbConnect
    .collection(collection)
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

  return gift;
}

function writeTheData(collection, data) {
  let gift = { msg: "", data: "", status: 0 };

  const dbConnect = db.getDb();

  dbConnect.collection(collection).insertOne(data, function (err, result) {
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

  return gift;
}
