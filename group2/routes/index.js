var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/events', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT event_id,event_name,location,start_time FROM events;";
    connection.query(query, function(error, rows, fields) {
      connection.release();
      if (error) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

module.exports = router;