var express = require("express");
var router = express.Router();

const Attraction = require("../../models/attraction");

var validateToken = require('../../middleware/validateToken')

router.get("/", (req, res) => {

  Attraction.find((err, attraction) => {
    if (err) {
      console.log(err);
      res.status(500).send("An err occured");
    }

    res.json(attraction);
  });
});

router.get("/:id", (req, res) => {

  Attraction.findById(req.params.id, (err, attraction) => {
    if (err) {
      return res.status(400).send(`Error: ${err.message}`);
    }

    res.send(attraction);
  });
});

router.post("/", validateToken, (req, res) => {
  
  let attraction = new Attraction(req.body);

  Attraction.findOne( {name: req.body.name} , (err, one) => {
    if(one)
     return res.status(404).send({ message: "This attraction is already existed" });

    attraction.save()
    .then((data) => {
      res.status(201).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
      console.log(err)
    });
  });
})

router.put("/:id", validateToken, (req, res) => {

  Attraction.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, updateAttraction) => {
    if (!updateAttraction) {
      return res.status(404).send(`Error: ${err.message}`);
    }
    
    if (err) {
      return res.status(400).send(`Error: ${err.message}`);
    }
      res.status(200).send();
    }
  );
});

router.delete("/:id", validateToken, (req, res) => {
  Attraction.findByIdAndDelete(req.params.id, (err, deleteAttraction) => {
    res.status(201).send();
  });
});

module.exports = router;
