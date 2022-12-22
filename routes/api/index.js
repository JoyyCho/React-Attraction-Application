var express = require('express');
var router = express.Router();
// var validateToken = require('../../middleware/validateToken'); 

// SONGS
var songsRouter = require('./songs');
router.use('/songs', songsRouter);

//USERS
var usersRouter = require('./users');
router.use('/users', usersRouter);

// COUNTRIES
var countriesRouter = require('./countries');
// countriesRouter.use(validateToken)
router.use('/countries', countriesRouter);
// ATTRACTIONS
var attractionsRouter = require('./attractions');
router.use('/attractions', attractionsRouter);


router.get('/', (req, res) => {
    // res.header('custome-header', 'foo')
    res.send('Welcome to our API!!!!!!!!')
})

module.exports = router;