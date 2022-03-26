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
  if(visited%4 == 0)
  {
    res.send('<h1 style="property:red;">red</h1>');
  }else if(visited%4 == 1)
  {
    res.send('<h1 style="property:yellow;">yellow</h1>');
  }else if(visited%4 == 2)
  {
    res.send('<h1 style="property:green;">green</h1>');
  }else if(visited%4 == 3)
  {
    res.send('<h1 style="property:blue;">blue</h1>');
  }
  visited++;
});

module.exports = router;
