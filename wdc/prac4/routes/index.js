var express = require('express');
var router = express.Router();

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = new Date();
  last_time = last_time.toLocaleString();
});

router.get('/color.html', function(req, res, next) {
  res.render('bcolor.html');
});

module.exports = router;
