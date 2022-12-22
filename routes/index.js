var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// can view preview of the page from views/index.jade

module.exports = router;