const jwt = require("jsonwebtoken");

const validateToken = (req, res, next) => {

  const token = req.get("x-auth-token");

  if (!token) {
    console.log('no token')
    return res.status(401).send("No token"); 
  }

  jwt.verify( token, process.env.JWT_SECRET , ( err, decoded ) => {
    if(err){return res.status(401).send("Authorization Denied");} 
    else{next();} 
  })
};

module.exports = validateToken;
