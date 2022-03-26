var express = require('express');
var router = express.Router();

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = 
});

module.exports = router;
