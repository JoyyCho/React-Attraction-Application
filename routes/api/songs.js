var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('I AM TESTING - GET');
});

router.post('/', function(req, res, next) {
    res.send('I AM TESTING - POST');
  });

router.put('/', function(req, res, next) {
res.send('I AM TESTING - PUT');
});

module.exports = router;
