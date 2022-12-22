var express = require("express");
var router = express.Router();
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../../models/user");
const Login = require("../../models/login");

router.use(cors({ exposedHeaders: "auth-token" }));

router.get("/", (req, res) => {
  User.find((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send("An err occured");
    }

    res.json(user);
  });
});

router.post("/register", (req, res) => {

  let user = new User(req.body);

  User.findOne({ email: req.body.email }, (err, one) => {
    if (one)
      return res.status(409).send({ serverMessage: "Existing Email Address" });

    user.password = bcrypt.hashSync(user.password, 10)

    jwt.sign( req.body , process.env.JWT_SECRET , (err,token)=>{

      if(err) return res.status(401).send('An error occured with login')
  
      res.header('Access-Control-Expose-Headers', 'x-auth-token')
      res.header('x-auth-token', token)
  
      let output = {
        id: user.id,
        email: user.email,
      };
    
      user
        .save()
        .then((data) => {
          res.status(201).send(output);
        })
        .catch((err) => {
          console.log(err)
          res.status(400).send(err);
        });    
      });
    });
  });

router.post("/login", (req, res) => {
  console.log(req.body);

  const login = new Login(req.body);

  login.validate((error) => {
    if (error) {
      return res.status(422).send(error);
    }

    User.findOne({ email: req.body.email }, (err, user) => {
      if (!user)
        return res.status(401).send({ serverMessage: "Invalid Login" });

      bcrypt.compare(req.body.password, user.password , (err, result) => {
        if (!result)
          return res.status(401).send({ serverMessage: "Invalid Login" });

        jwt.sign( req.body , process.env.JWT_SECRET , (err, token) => {
          if (err) return res.status(400).send("An error occured with login");
          res.header("Access-Control-Expose-Headers", "x-auth-token");
          res.header("x-auth-token", token);
          res.status(200).send({ serverMessage: "Login Successful" });
        });
      });
    });
  });
});

module.exports = router;
