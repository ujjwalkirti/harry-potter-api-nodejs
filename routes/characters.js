const express = require('express')
const characterRouter = express.Router();

//get all characters
characterRouter.get("/all", function (req, res) {
  res.send('hi')
  
});

//get a specific character
characterRouter.post("/", function (req, res) {
  /*
    we require following params inorder to return the query
    {
        name string
        house name string 
        death eater bool
        muggle-born bool
    }
*/
  console.log(req.body);
  res.json(req.body)
});

module.exports = characterRouter;
