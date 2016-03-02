var express = require('express');
var mongodb = require('mongodb');
var client = mongodb.MongoClient;
var Db = mongodb.Db;
var Server = mongodb.Server;
var bodyParser = require('body-parser'); // for reading POSTed form data into `req.body`
var cookieParser = require('cookie-parser'); // the session is stored in a cookie, so we use this to parse it

var app = express();
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/signup', function(req, res, next) {
  res.render('signup');
});

router.post('/signupuser', function(req, res) {


  console.log(req.body.fname);
  console.log(req.body.lname);
  console.log(req.body.username);
  console.log(req.body.password);

  var db = new Db('signin', new Server('localhost', '27017'));
  db.open(function (err, db) {
    db.authenticate('', '', function (err, result) {

      //********* *********
      var url = 'mongodb://localhost:27017/signin';
      client.connect(url, function (err, db) {


        var col = db.collection('allusers');
        var document = {
          fname: req.body.fname,
          lname: req.body.lname,
          username: req.body.username,
          password: req.body.password
        };
        col.insert(document, function (err, result) {
          console.log('data successfully inserted');
          console.log(result);
        });
      });
    });
  });
  res.render('index');
});



//Signin Method
router.post('/welcome', function(req, res) {

  var rec;
  var db = new Db('signin', new Server('localhost', '27017'));

  db.open(function (err, db) {
    var url = 'mongodb://localhost:27017/signin';
    db.authenticate('', '', function (err, result) {
      client.connect(url, function (err, db) {
        var col = db.collection('allusers');
        col.find({}).count(function (err, data) {
          rec = data;
          console.log("Users in DB : "+ parseInt(rec) );
          processRequest(rec,req,res);
        });
      });
    });
  });
  //res.render('main', { title: 'Express' });
});

function processRequest(rec,req,res) {
  console.log(req.body.username);
  console.log(req.body.password);
  var username = req.body.username;
  var password = req.body.password;

  var db = new Db('signin', new Server('localhost', '27017'));
  db.open(function (err, db) {
    db.authenticate('', '', function (err, result) {

      //*********get data from DB *********
      var url = 'mongodb://localhost:27017/signin';
      client.connect(url, function (err, db) {
        que = new Array();
        var col = db.collection('allusers');
        var document = {username: username};
        col.find(document).toArray(function (err, items) {
          console.log('items : ' + JSON.stringify(items));
          items.forEach(function (doc) {
            console.log(doc.password + " == " + password);
            if (doc.password == password) {
              db.close();
              console.log("NO OF RECORDS: " + rec);
              res.render('main', {username: username});
            }
            else {
              console.log("Incorrect username or password");
              res.redirect('index');
            }
          });
        });
      });
    });
  });
}

module.exports = router;