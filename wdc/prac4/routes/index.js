var express = require('express');
var router = express.Router();

router.get('/last.txt', function(req, res, next) {
  res.send("test");
});

module.exports = router;
