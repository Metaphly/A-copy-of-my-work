var express = require('express');
var path = require('path');
var router = express.Router();

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('82416996899-apdbt8826sr91gc3n29li4d6oknnbt02.apps.googleusercontent.com');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// console.log are used partly as comment

// following two routers are used to redner the html file
router.get('/loginPage', function(req, res) {

  //in case user have login
  if('user' in req.session){
    console.log("already log in");
    res.redirect(409, '/');
    return;
  }
  res.sendFile(path.join(__dirname, '/../public/login.html'));
});

router.get('/signupPage', function(req, res) {

  //in case user have login
  if('user' in req.session){
    console.log("already log in");
    res.redirect(409, '/');
    return;
  }
  res.sendFile(path.join(__dirname, '/../public/signup.html'));
});


// send all events to user
router.get('/events', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT event_id,event_name,location,start_date,description FROM events;";
    connection.query(query, function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      res.json(rows);
    });
  });
});

// check login info in database
router.post('/login', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    if('user' in req.session){
      console.log("already log in");
      res.sendStatus(409);
      return;
    }

    connection.query("SELECT * FROM users WHERE user_name = ?;",[req.body.user_name], function(error, rows, fields) {
      connection.release();
      if (error) {
        res.sendStatus(500);
        return;
      }

      if(rows.length==0)
      {
        console.log('incorrect email');
        res.sendStatus(401);
      } else if(rows[0].password == req.body.password) {
        console.log('sccuess');
        req.session.user = rows[0];
        res.sendStatus(200);
      } else {
        console.log('wrong password');
        res.sendStatus(401);
      }

    });
  });
});


// check sign up info in database
router.post('/signup', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    if('user' in req.session){
      console.log("already log in");
      res.sendStatus(409);
      return;
    }

    if(req.body.password != req.body.password2)
    {
      console.log("Get two different password");
      res.sendStatus(400);
      return;
    }else if(req.body.user_name == [])
    {
      console.log("User name empty!");
      res.sendStatus(400);
      return;
    }else if(req.body.password == [] || req.body.password2 == [])
    {
      console.log("invalid password");
      res.sendStatus(400);
      return;
    }

    var exist = false;
    // insert new user into database
    let query="INSERT INTO users(user_name,password) VALUES (?,?);";
    connection.query(query,[req.body.user_name,req.body.password], function(error, rows, fields) {
      if (error) {
        connection.release();
        console.log('user exist');
        res.sendStatus(500);
        return;
      }
      console.log('success created');
      req.session.user = {"user_name":req.body.user_name, "email":""};

      // query user info and store in session
      connection.query("SELECT * FROM users WHERE user_name = ?;",[req.body.user_name], function(error, rows, fields) {
        connection.release();
        if (error) {
          console.log('Can not find created user info');
          res.sendStatus(500);
          return;
        }
        console.log("find user session info");
        req.session.user = rows[0];
        res.sendStatus(200);
      });

    });

  });
});

// send all events created by a particular user
router.post('/single_event', function(req, res, next) {
  req.pool.getConnection(function(error,connection){
    if(error){
      res.sendStatus(500);
      return;
    }

    let query = "SELECT * FROM events WHERE event_id = ?;";
    connection.query(query,[req.body.event_id],function(error, rows, fields) {
      connection.release();
      if (error) {
        console.log("query error");
        res.sendStatus(500);
        return;
      }
      res.json(rows[0]);
    });
  });
});


// google log in
// if email is not existed in data base, create one, use email info as name and email
router.post('/googleuser', function(req, res, next) {

  if('user' in req.session){
    console.log("already log in");
    res.sendStatus(202);
    return;
  }

  let email = "googlemail";

  async function verify() {
    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: "82416996899-apdbt8826sr91gc3n29li4d6oknnbt02.apps.googleusercontent.com",
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    email = payload['email'];
  }
  verify().then(function(){

    req.pool.getConnection(function(error,connection){
      if(error){
        res.sendStatus(500);
        return;
      }

      connection.query("SELECT * FROM users WHERE email = ?;",[email], function(error, rows, fields) {
        if (error) {
          res.sendStatus(500);
          return;
        }

        if(rows.length==0)
        {
          // create new user
          console.log('have not created account');
          connection.query("INSERT INTO users(user_name,email) VALUES (?,?);",[email,email], function(error, rows, fields) {
            if (error) {
              console.log("wrong email insert");
              res.sendStatus(500);
              return;
            }
          });
          console.log("google user inserted");

          // store user info in session
          connection.query("SELECT * FROM users WHERE email = ?;",[email], function(error, rows, fields) {
            connection.release();
            if (error) {
              console.log('Can not find created user info');
              res.sendStatus(500);
              return;
            }
            console.log("find user session info");
            req.session.user = rows[0];
            res.sendStatus(200);
            return;
          });
        } else if(rows[0].email == email) {
          // find user email in database, log in
          connection.release();
          console.log('sccuess');
          req.session.user = rows[0];
          res.sendStatus(200);
        } else {
          connection.release();
          console.log('incorrect google signin');
          res.sendStatus(401);
        }

      });
    });

  }).catch(function(){
    res.sendStatus(403);
  });


});


// log out google
router.get('/google_logout', function(req, res, next) {
  if('user' in req.session){
    console.log("still have user session");
    res.sendStatus(202);
    return;
  }
  console.log("google sign out");
  res.sendStatus(200);
});


module.exports = router;
