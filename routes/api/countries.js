var express = require("express");
var router = express.Router();

const Country = require("../../models/country");

var validateToken = require('../../middleware/validateToken');
// router.use(validateToken);

//Get ALL the countries
router.get("/", (req, res) => {
  Country.find((err, country) => {
    if (err) {
      console.log(err);
      res.status(500).send("An err occured");
    }

    res.json(country);
  });
});

// Get one country by id
router.get("/:id", validateToken, (req, res) => {
  Country.findById(req.params.id, (err, country) => {
    if (err) {
      return res.status(400).send(`Error: ${err.message}`);
    }

    res.send(country);
  });
});

// Create country
router.post("/", (req, res) => {
  const country = new Country({
    name: req.body.name,
    languages: req.body.languages,
    flag_img: req.body.flag_img,
    capital_city: req.body.capital_city,
    tourism_cities: req.body.tourism_cities,
  });

  country
    .save()
    .then((data) => {
      res.status(201).send(country);
    })
    .catch((err) => {
      res.status(422).json({ message: err });
    });
});

// Update country by Id
router.put("/:id", (req, res) => {
  Country.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    (err, updateSong) => {
      if (err) {
        return res.status(400).send(`Error: ${err.message}`);
      }

      res.status(201).send();
    }
  );
});

// Delete country by Id
router.delete("/:id", (req, res) => {
  Country.findByIdAndDelete(req.params.id, (err, deleteCountry) => {
    res.status(201).send();
  });
});

module.exports = router;
