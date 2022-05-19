var express = require('express');
var router = express.Router();

let post_list = [
  { title: "hi", desc: "test", tags: ['tag'] },
  { title: "hi", desc: "test", tags: ['tag'] }
];

// id INT,  //auto generate
// user INT, // get from login
// title VARCHAR(255), //YES
// content TEXT,   //YES
// timestamp DATETIME, //generate in SQL
// views INT, //initialise to 0

let users = {
  admin: { username: "admin", name: "Some Admin", password: "password123" },
  alice: { username: "alice", name: "Alice User", password: "horse" }
};

router.get('/test', function(req, res, next) {
  if('user' in req.session){
    res.json(req.session.user);
  } else {
    res.send('This is a test');
  }
});

router.get('/posts', function(req, res, next) {

  req.pool.getConnection(function(error,connection){
    if(error){
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let query = "SELECT * FROM posts;";
    connection.query(query, function(error, rows, fields) {
      connection.release(); // release connection
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.json(rows); //send response
    });

  });

});


router.post('/login', function(req, res, next) {
  // console.log(req.body);

  if ('username' in req.body && 'password' in req.body) {
    if(req.body.username in users && users[req.body.username].password === req.body.password){
      console.log('success');
      req.session.user = users[req.body.username];
      res.sendStatus(200);
    } else {
      console.log('bad login');
      res.sendStatus(401);
    }
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }

});

router.post('/signup', function(req, res, next) {
  console.log(req.body);

  if ('username' in req.body && 'name' in req.body && 'password' in req.body) {
    if(req.body.username in users){
      console.log('user exists');
      res.sendStatus(403);
    } else {
      users[req.body.username] = { username: req.body.username, name: req.body.name, password: req.body.password };
      console.log("User "+req.body.username+" created");
      req.session.user = users[req.body.username];
      res.sendStatus(200);
    }
  } else {
    console.log('bad request');
    res.sendStatus(400);
  }

});


router.post('/logout', function(req, res, next) {
  if('user' in req.session){
    delete req.session.user;
  }
  res.end();

});

router.use('/post/', function(req,res,next){
  if(!('user' in req.session)){
    console.log("user NOT authed");
    res.sendStatus(403);
  } else {
    console.log("user is authed");
    next();
  }
});


router.post('/post/new', function(req, res, next) {

  // console.log(req.body);
  // post_list.push(req.body);

  // res.end();

  req.pool.getConnection(function(error,connection){
    if(error){
      console.log(error);
      res.sendStatus(500);
      return;
    }

    let query = "INSERT INTO posts (user,title,content,timestamp,views) VALUES(?,?,?,CURRENT_TIMESTAMP(),1);";
    connection.query(query,[1,req.body.title,req.body.desc], function(error, rows, fields) {
      connection.release(); // release connection
      if (error) {
        console.log(error);
        res.sendStatus(500);
        return;
      }
      res.end();
    });

  });

});

module.exports = router;
