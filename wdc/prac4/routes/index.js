var express = require('express');
var router = express.Router();
var visited = 0;

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = new Date();
  last_time = last_time.toLocaleString();
});

router.get('/colorn.html', function(req, res, next) {
  res.send(visited);
  visited++;
});

module.exports = router;
