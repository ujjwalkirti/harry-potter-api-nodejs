const express = require("express");
const app = express();
require("dotenv").config();
const characterRouter = require("./routes/characters");
const housesRouter = require("./routes/houses");
const PORT = process.env.PORT || 6000;
const connectToDB = require("./db/conn");

app.use(express.urlencoded({ extended: true }));

//connect to MongoDB cluster
connectToDB();

//defining the routes
app.use("/characters", characterRouter);
app.use("/houses", housesRouter);

//render the homepage
app.get("/", (req, res) => {
  res.send('hi')
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
