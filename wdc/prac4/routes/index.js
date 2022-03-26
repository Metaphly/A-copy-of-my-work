var express = require('express');
var router = express.Router();
var visited = 0;
var nvisited = 0;

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = new Date();
  last_time = last_time.toLocaleString();
});

router.get('/color.html', function(req, res, next) {
  if(visited%4 == 0)
  {
    res.send("red");
  }else if(visited%4 == 1)
  {
    res.send("yellow");
  }else if(visited%4 == 2)
  {
    res.send("green");
  }else if(visited%4 == 3)
  {
    res.send("blue");
  }
  visited++;
});

router.get('/color.txt', function(req, res, next) {
  if(nvisited%4 == 0)
  {
    res.send("red");
  }else if(nvisited%4 == 1)
  {
    res.send("yellow");
  }else if(nvisited%4 == 2)
  {
    res.send("green");
  }else if(nvisited%4 == 3)
  {
    res.send("blue");
  }
  nvisited++;
});

module.exports = router;
