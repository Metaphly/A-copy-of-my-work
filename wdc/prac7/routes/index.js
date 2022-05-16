var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/brew', function(req, res, next) {
  var reqdrink = req.query.drink;
  if(reqdrink == "tea")
  {
    res.send("A delicious cup of tea!");
  }else if(reqdrink == "coffee")
  {
    res.sendStatus(418);
  }else
  {
    res.sendStatus(400);
  }

});

let lastpass = "first";

router.post('/pass-it-on', function(req, res, next) {
  if(req.body.message)
  {
    res.send(lastpass);
    lastpass = req.body.message;
  }else
  {
    res.sendStatus(400);
  }
});

router.post('/combine', function(req, res, next) {
  let responseout = "";
  let inputlines = req.body.lines
  for(let line in inputlines)
  {
    responseout = responseout + inputlines[line] + req.body.suffix + '\n';
  }
  res.send(responseout);
});

router.post('/combine', function(req, res, next) {
  let responseout = "";
  let inputlines = req.body.lines
  for(let line in inputlines)
  {
    responseout = responseout + inputlines[line] + req.body.suffix + '\n';
  }
  res.send(responseout);
});

module.exports = router;
