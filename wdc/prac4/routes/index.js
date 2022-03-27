var express = require('express');
var router = express.Router();
var visited = 0;
var nvisited = 0;
var times = [];
var ntimes = [];

let last_time = "";

router.get('/last.txt', function(req, res, next) {
  res.send(last_time);
  last_time = new Date();
  last_time = last_time.toLocaleString();
});

router.get('/color.html', function(req, res, next) {
  var color = "";
  if(visited%4 == 0)
  {
    color = "red";
  }else if(visited%4 == 1)
  {
    color = "yellow";
  }else if(visited%4 == 2)
  {
    color = "green";
  }else if(visited%4 == 3)
  {
    color = "blue";
  }
  res.send(
`<!DOCTYPE html>
<html lang='en'>
<head>
    <meta charset='UTF-8'>
    <title>3.2</title>
</head>

<body>
<h1 style="color:${color};">${color}</h1>
</body>

</html>`
);
  visited++;
});

router.get('/log.html', function(req, res, next) {

  times.push(Date());
  var thelist = "<ul>";
  for (var element of times) {
    thelist = thelist + "<li>" + element + "</li>";
  }
  thelist = thelist + "</ul>";
  res.send(
    `<!DOCTYPE html>
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>3.3</title>
    </head>

    <body>
    ${thelist}
    </body>

    </html>`
    );
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

router.get('/log.json', function(req, res, next) {
  ntimes.push(Date());
  res.json(ntimes);
});

router.get('/log-ro.json', function(req, res, next) {
  res.json(ntimes);
});

router.get('/accept', function(req, res, next) {
  res.status(200).end();
});

module.exports = router;
