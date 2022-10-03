const express = require("express");
const db = require("../db/conn");
const characterRouter = express.Router();




//get all characters
characterRouter.get("/all", function (req, res) {
  const dbConnect = db.getDb();
  dbConnect
    .collection("characters")
    .find({})
    .limit(50)
    .toArray(function (err, result) {
      if (err) {
        res.status(400).send("Error fetching listings!");
      } else {
        // console.log(result);
        res.status(200).json(result);
      }
    });
});

//get a specific character
characterRouter.post("/", function(req,res){
/*
    we require following params inorder to return the query
    {
        name string
        house name string 
        death eater bool
        muggle-born bool
    }
*/
    
})

module.exports = characterRouter;
