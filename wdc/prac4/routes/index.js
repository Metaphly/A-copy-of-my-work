var express = require('express');
var router = express.Router();
var visited = 0;

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = new Date();
  last_time = last_time.toLocaleString();
});

router.get('/color.html', function(req, res, next) {
  cheading = document.createElement("h1");
  cheading.innerText = "Red";
  res.set('Content-Type', 'text/html');
  res.send(cheading);
});

module.exports = router;
