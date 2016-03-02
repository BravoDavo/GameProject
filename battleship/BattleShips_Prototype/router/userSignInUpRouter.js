/**
 * Created by admin on 20.10.2015.
 */
var express = require('express');
var router  = express.Router();
var db          =   require('../Server_DBFunctions');
var loginStatus = false;

/*var mongodb = require('mongodb');

var Db = mongodb.Db;
var client = mongodb.MongoClient;
var Server = mongodb.Server;*/

router.get('/signin', function(req, res){
    res.redirect('/');
});

router.get('/signupuser', function(req,res){
    res.redirect('/');
    //res.render('index.html');
});

router.post('/signin', function(req, res) {

    function loginCheck(err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result[0] != undefined) {
                if (result[0].username == req.body.login) {
                    if (result[0].password == req.body.password) {
                        console.log("Login succeeded!");
                        loginStatus = true;
                    }
                    else {
                        console.log("Login failed!");
                        loginStatus = false;
                    }
                }
                else {
                    console.log("Login failed!");
                    loginStatus = false;
                }
            }
            else {
                console.log("Login failed!");
                loginStatus = false;
            }
            if (loginStatus) {
                res.clearCookie('loginFailed');
                var hour = 3600000;
                res.cookie('username', req.body.login, {maxAge: hour});
            }
            else {
                res.clearCookie('username');
                res.cookie('loginFailed', 1);
            }
            //res.render('index.html');
            res.redirect('/');

        }
    }

    function dblogin(loginCheck){
    db.getInstance(function (db) {
        // Get the documents collection
        var collection = db.collection('users');

        // Find users
        collection.find({"username": req.body.login}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //console.log(result[0]['user']['credentials']['name'] + " " + result[0]['user']['credentials']['password']);
                loginCheck(err, result);
                //return();
            }
        });
    });
}
    dblogin(loginCheck);
});

router.get('/clco', function(req, res){
    res.clearCookie('username');
    //res.render('index.html');
    res.redirect('/');
});


//Signup method
router.post('/signupuser', function(req, res) {
    console.log("signUp:");
    //res.render('index.html');
    res.redirect('/');
    console.log(req.body.fname);
    console.log(req.body.lname);
    console.log(req.body.username);
    console.log(req.body.password);

    db.insertNewUser(req.body.fname, req.body.lname, req.body.username, req.body.password)
/*    var db = new Db('/signIn', new Server('localhost', '27017'));
    db.open(function (err, db) {
        db.authenticate('', '', function (err, result) {

            //!********* *********
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
    });*/

});



//Signin Method
/*router.post('/signin', function(req, res) {
    /!*    var rec;
     var db = new Db('signin', new Server('localhost', '27017'));
     res.render('index.html');
     db.open(function (err, db) {
     //var url = 'mongodb://localhost:27017/signin';
     var url = 'mongodb://localhost:27017/gamedb/signin';
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
     });*!/
    db.findUserByUserLoginData(req.body.login, req.body.password);
    res.render('index.html');
});*/


function processRequest(rec,req,res) {
    console.log(req.body.username);
    console.log(req.body.password);
    var username = req.body.username;
    var password = req.body.password;

    var db = new Db('signin', new Server('localhost', '27017'));
    db.open(function (err, db) {
        db.authenticate('', '', function (err, result) {

            //*********get data from DB *********
            //var url = 'mongodb://localhost:27017/signin';
            var url = 'mongodb://localhost:27017/gamedb/signin';
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
};




module.exports = router;
