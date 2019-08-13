var express = require('express');
var router = express.Router();
var ozbd = require('../functions');

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Response')
  console.log(ozbd);  
  res.send(ozbd);
});

module.exports = router;
