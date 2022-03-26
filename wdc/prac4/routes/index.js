var express = require('express');
var router = express.Router();

let last_time = [];

router.get('/last.txt', function(req, res, next) {
  res.send("test");
});

module.exports = router;
