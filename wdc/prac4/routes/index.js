var express = require('express');
var router = express.Router();

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = new Date();
  last_time = last_time.toLocaleString();
});

router.get('/color.html', function(req, res, next) {
  let head_co = document.createElement("h1");
  head_co.innerText = "Red"
  res.send(head_co);
});

module.exports = router;
