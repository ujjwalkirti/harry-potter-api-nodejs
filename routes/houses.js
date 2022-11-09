const express = require("express");

const houseRouter = express.Router();

houseRouter.get("/", (req, res) => {
  const data = {
    message:
      "get some rest, as it will take time, we are still building the routes",
  };
  res.json(data);
});

module.exports = houseRouter;
