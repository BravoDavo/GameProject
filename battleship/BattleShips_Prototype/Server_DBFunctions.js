/**
 * Created by David on 04.11.2015.
 */

var MongoClient = require('mongodb').MongoClient;
//var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/local';
//var MongoDB = require('mongodb');
var loginStatus = false;
var option = {
    db:{
        numberOfRetries : 5
    },
    server: {
        auto_reconnect: true,
        poolSize : 40,
        socketOptions: {
            connectTimeoutMS: 500
        }
    },
    replSet: {},
    mongos: {}
};

function MongoPool(){}

var p_db;

function initPool(cb){
    MongoClient.connect(url, option, function(err, db) {
        if (err) throw err;

        p_db = db;
        if(cb && typeof(cb) == 'function')
            cb(p_db);
    });
    return MongoPool;
}

function getInstance(cb){
    if(!p_db){
        initPool(cb)
    }
    else{
        if(cb && typeof(cb) == 'function')
            cb(p_db);
    }
}



//var db;

/*
 example for a user document in the DB:
 {"user":
 {
 "credentials":{"name":"exampleUser1","password":"password"},
 "statistics":{"lastmatch":"won","metascore":"1/0"},
 "friend":[{"name":"exampleUser2"},{"name":"exampleUser3"}],
 "personalData":{"name":"tom","lastname":"jerry" },
 "gamessessionID":"ID"
 }
 }
*/

/*
 example for a session document in the DB:
 {"gamesession":
 {
 "gamessessionID":"ID",
 "player":[{
    "name":"exampleUser1",
    "state":"placing",
    "gamefield":{
             "ships":{
             "aircraftcarrier":
             [{"coordinate":"a1","hitstatus":"false"},
             {"coordinate":"a2","hitstatus":"false"},
             {"coordinate":"a3","hitstatus":"false"},
             {"coordinate":"a4","hitstatus":"false"},
             {"coordinate":"a5","hitstatus":"false"}],
             "battleship":
             [{"coordinate":"b1","hitstatus":"false"},
             {"coordinate":"b2","hitstatus":"false"},
             {"coordinate":"b3","hitstatus":"false"},
             {"coordinate":"b4","hitstatus":"false"}],
             "cruiser1":
             [{"coordinate":"c1","hitstatus":"false"},
             {"coordinate":"c2","hitstatus":"false"},
             {"coordinate":"c3","hitstatus":"false"}],
             "cruiser2":
             [{"coordinate":"d1","hitstatus":"false"},
             {"coordinate":"d2","hitstatus":"false"},
             {"coordinate":"d3","hitstatus":"false"}],
             "destryoer":
             [{"coordinate":"e1","hitstatus":"false"},
             {"coordinate":"e2","hitstatus":"false"}]
             },
             "attacks":{
             "a1":"false","b1":"false","c1":"false","d1":"false","e1":"false","f1":"false","g1":"false","h1":"false","i1":"false","j1":"false",
             "a2":"false","b2":"false","c2":"false","d2":"false","e2":"false","f2":"false","g2":"false","h2":"false","i2":"false","j2":"false",
             "a3":"false","b3":"false","c3":"false","d3":"false","e3":"false","f3":"false","g3":"false","h3":"false","i3":"false","j3":"false",
             "a4":"false","b4":"false","c4":"false","d4":"false","e4":"false","f4":"false","g4":"false","h4":"false","i4":"false","j4":"false",
             "a5":"false","b5":"false","c5":"false","d5":"false","e5":"false","f5":"false","g5":"false","h5":"false","i5":"false","j5":"false",
             "a6":"false","b6":"false","c6":"false","d6":"false","e6":"false","f6":"false","g6":"false","h6":"false","i6":"false","j6":"false",
             "a7":"false","b7":"false","c7":"false","d7":"false","e7":"false","f7":"false","g7":"false","h7":"false","i7":"false","j7":"false",
             "a8":"false","b8":"false","c8":"false","d8":"false","e8":"false","f8":"false","g8":"false","h8":"false","i8":"false","j8":"false",
             "a9":"false","b9":"false","c9":"false","d9":"false","e9":"false","f9":"false","g9":"false","h9":"false","i9":"false","j9":"false",
             "a10":"false","b10":"false","c10":"false","d10":"false","e10":"false","f10":"false","g10":"false","h10":"false","i10":"false","j10":"false",
             }
                }
            },
   {
    "name":"exampleUser2",
    "state":"placing",
    "gamefield":{
             "ships":{
             "aircraftcarrier":
             [{"coordinate":"a1","hitstatus":"false"},
             {"coordinate":"a2","hitstatus":"false"},
             {"coordinate":"a3","hitstatus":"false"},
             {"coordinate":"a4","hitstatus":"false"},
             {"coordinate":"a5","hitstatus":"false"}],
             "battleship":
             [{"coordinate":"b1","hitstatus":"false"},
             {"coordinate":"b2","hitstatus":"false"},
             {"coordinate":"b3","hitstatus":"false"},
             {"coordinate":"b4","hitstatus":"false"}],
             "cruiser1":
             [{"coordinate":"c1","hitstatus":"false"},
             {"coordinate":"c2","hitstatus":"false"},
             {"coordinate":"c3","hitstatus":"false"}],
             "cruiser2":
             [{"coordinate":"d1","hitstatus":"false"},
             {"coordinate":"d2","hitstatus":"false"},
             {"coordinate":"d3","hitstatus":"false"}],
             "destryoer":
             [{"coordinate":"e1","hitstatus":"false"},
             {"coordinate":"e2","hitstatus":"false"}]
             },
             "attacks":{
             "a1":"false","b1":"false","c1":"false","d1":"false","e1":"false","f1":"false","g1":"false","h1":"false","i1":"false","j1":"false",
             "a2":"false","b2":"false","c2":"false","d2":"false","e2":"false","f2":"false","g2":"false","h2":"false","i2":"false","j2":"false",
             "a3":"false","b3":"false","c3":"false","d3":"false","e3":"false","f3":"false","g3":"false","h3":"false","i3":"false","j3":"false",
             "a4":"false","b4":"false","c4":"false","d4":"false","e4":"false","f4":"false","g4":"false","h4":"false","i4":"false","j4":"false",
             "a5":"false","b5":"false","c5":"false","d5":"false","e5":"false","f5":"false","g5":"false","h5":"false","i5":"false","j5":"false",
             "a6":"false","b6":"false","c6":"false","d6":"false","e6":"false","f6":"false","g6":"false","h6":"false","i6":"false","j6":"false",
             "a7":"false","b7":"false","c7":"false","d7":"false","e7":"false","f7":"false","g7":"false","h7":"false","i7":"false","j7":"false",
             "a8":"false","b8":"false","c8":"false","d8":"false","e8":"false","f8":"false","g8":"false","h8":"false","i8":"false","j8":"false",
             "a9":"false","b9":"false","c9":"false","d9":"false","e9":"false","f9":"false","g9":"false","h9":"false","i9":"false","j9":"false",
             "a10":"false","b10":"false","c10":"false","d10":"false","e10":"false","f10":"false","g10":"false","h10":"false","i10":"false","j10":"false",
             }
                }
             }]
 }
 }
 */

function insertNewSession (sessionID, state) {
// Use connect method to connect to the Server
            // Get the documents collection

    getInstance(function (db){
        //query your mongo db.

            var collection = db.collection('sessions');

            // Insert some users
            collection.insertOne({"session":
            {
                "sessionID":sessionID,
                "state":state,
                "player1":{
                    "playerID":"",
                    "name":"",
                    "state":"",
                    "bombs":"",
                    "ships":""
                },
                "player2":{
                    "playerID":"",
                    "name":"",
                    "state":"",
                    "bombs":"",
                    "ships":""
                }
            }
            }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection.');// The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
            });
    });
}

function insertNewUser (firstname, lastname, username, password) {
// Use connect method to connect to the Server
    // Get the documents collection

    getInstance(function (db){
        //query your mongo db.

        var collection = db.collection('users');

        // Insert some users
        collection.insertOne(
        {
            "firstname":firstname,
            "lastname":lastname,
            "username":username,
            "password":password
        }
        , function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
            //Close connection
        });
    });
}

function findUserByUserLoginData (name, password){
    // Use connect method to connect to the Server

    getInstance(function (db){
        // Get the documents collection
        var collection = db.collection('users');

        // Find users
        collection.find({"username": name}).toArray(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                //console.log(result[0]['user']['credentials']['name'] + " " + result[0]['user']['credentials']['password']);
                console.log(result);
                if(result[0] != undefined) {
                    if (result[0].username == name) {
                        if (result[0].password == password) {
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
                //return();
            }
        });
    });
    //return loginStatus;
}

/*function insertNewSession (sessionID, state) {
// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('sessions');


            // Insert some users
            collection.insertOne({"session":
            {
                "sessionID":sessionID,
                "state":state,
                "player1":{
                    "playerID":"",
                    "name":"",
                    "state":"",
                    "bombs":"",
                    "ships":""
                },
                "player2":{
                    "playerID":"",
                    "name":"",
                    "state":"",
                    "bombs":"",
                    "ships":""
                }
            }
            }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });
        }
    });
}*/

function updateSessionAddPlayer(playerName,  playerID, playerState, sessionID, playerNumber) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            //console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('sessions');

            if(playerNumber == 1) {
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player1.playerID": playerID,
                        "session.player1.name": playerName,
                        "session.player1.state": playerState
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                        //console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
            else{
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player2.playerID": playerID,
                        "session.player2.name": playerName,
                        "session.player2.state": playerState
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                       // console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
        }
    });
}

function updateSessionUpdatePlayerState(playerState, sessionID, playerNumber) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            //console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('sessions');

            if(playerNumber == 1) {
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player1.state": playerState
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                      //  console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
            else{
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player2.state": playerState
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                       // console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
        }
    });
}

function updateSessionUpdateGameState(gameState, sessionID) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
           // console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('sessions');

                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.state": gameState
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                     //   console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
        }
    });
}

function updateSessionUpdatePlayerShips(playerShips, sessionID, playerNumber) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
          //  console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('sessions');

            if(playerNumber == 1) {
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player1.ships": playerShips
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                       // console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
            else{
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player2.state": playerShips
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                       // console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
        }
    });
}

function updateSessionUpdatePlayerBombs(playerBombs, sessionID, playerNumber) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            //console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('sessions');

            if(playerNumber == 1) {
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player1.bombs": playerBombs
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                       // console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
            else{
                collection.updateOne({"session.sessionID": sessionID}, {
                    $set: {
                        "session.player2.state": playerBombs
                    }
                }, function (err, numUpdated) {
                    if (err) {
                        console.log(err);
                    } else if (numUpdated) {
                        //console.log('Updated Successfully %d document(s).', numUpdated);
                    } else {
                        console.log('No document found with defined "find" criteria!');
                    }
                    //Close connection
                    db.close();
                });
            }
        }
    });
}

/*function updateGamefieldAttacksForPlayer(player, gamesessionID, playerNumber, coordinates){
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('gamesessions');
            var stringCommand = "{$set: {";
                for (var i=0; i < coordinates.length; i++)
            {
                stringCommand += "'gamesession.player" + playerNumber + ".attacks." + coordinates[i][0] + "':'" +  coordinates[i][1] + "',"
            }
            stringCommand += "}";
            var setCommand = JSON.parse(stringCommand);

            collection.updateMany({"gamesession.gamesessionID": gamesessionID }, setCommand, function (err, numUpdated) {
                if (err) {
                    console.log(err);
                } else if (numUpdated) {
                    console.log('Updated Successfully %d document(s).', numUpdated);
                } else {
                    console.log('No document found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
        }
    });
}

function getSessionByIDFromDB (sessionID){

}

function findGameSession (){
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //Connection established.
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('users');

            // Find users
            collection.find({"gamesession.player.name":"exampleUser1"}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result);
                    //return();
                }
                //Close connection
                db.close();
            });
        }
    });
}

function findUserByUserLoginData (name, password){
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //Connection established.
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('users');

            // Find users
            collection.find({ "credentials.name": name , "credentials.password": password}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(result[0]['user']['credentials']['name'] + " " + result[0]['user']['credentials']['password']);
                    //return();
                }
                //Close connection
                db.close();
            });
        }
    });
}

function connectDB() {
    db=null;
    MongoDB.MongoClient.connect(url, function (err, database) {
        if (err)
            console.log('Unable to connect to the mongoDB server. Error:', err);
            //connected
            console.log('Connection established to', url);

            // Get the documents collection
            //var collection = db.collection('users');
            db = database;

    });
}

function insertNewUser (name, password, firstname, lastname) {
// Use connect method to connect to the Server
/!*
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);
*!/

            // Get the documents collection
            var collection = db.collection('users');


            // Insert some users
            collection.insertOne({"user":
            {
                "credentials":{"name":name,"password":password},
                "statistics":{"lastmatch":"","metascore":""},
                "friend":[],
                "personalData":{"name":firstname,"lastname":lastname },
                "gamesessionID":"none"
            }
            }, function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });
/!*        }
    });*!/
}

function updateUserPassword (name, password) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('users');

            collection.updateOne({"user.credentials.name": name}, {$set: {"user.credentials.password": password}}, function (err, numUpdated) {
                if (err) {
                    console.log(err);
                } else if (numUpdated) {
                    console.log('Updated Successfully %d document(s).', numUpdated);
                } else {
                    console.log('No document found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
        }
    });
}

function updateUserGamesessionID (name, ID) {
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('users');

            collection.updateOne({"user.credentials.name": name}, {$set: {"user.gamesessionID": ID}}, function (err, numUpdated) {
                if (err) {
                    console.log(err);
                } else if (numUpdated) {
                    console.log('Updated Successfully %d document(s).', numUpdated);
                } else {
                    console.log('No document found with defined "find" criteria!');
                }
                //Close connection
                db.close();
            });
        }
    });
}

DBClientConnection = function(currentUrl) {
    var Client = MongoDB.MongoClient;
    var url = currentUrl;
    var collection;
    var database = null;
    var that = this;

    Client.connect(url, null, function (err, db) {
        if (err) {
            throw err;
            //console.log('Unable to connect to the mongoDB server. Error:', err);
        }
        //connected
        console.log('Connection established to', url);
        database = db;
        collection = db.collection('users');

    });

    this.closeDatabase = function () {
        database.close();
        console.log('DB closed')
    };

    this.insertNewUser = function(name, password, firstname, lastname) {
// Use connect method to connect to the Server
        /!*
         MongoClient.connect(url, function (err, db) {
         if (err) {
         console.log('Unable to connect to the mongoDB server. Error:', err);
         } else {
         //connected
         console.log('Connection established to', url);
         *!/

        // Get the documents collection
        //var collection = db.collection('users');


        // Insert some users
        collection.insertOne({"user":
        {
            "credentials":{"name":name,"password":password},
            "statistics":{"lastmatch":"","metascore":""},
            "friend":[],
            "personalData":{"name":firstname,"lastname":lastname },
            "gamesessionID":"none"
        }
        }, function (err, result) {
            if (err) {
                console.log(err);
            } else {
                console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
            }
            //Close connection
            db.close();
        });
        /!*        }
         });*!/
    }*/

    /*this.insertNewSession = function (sessionID, player1, player2){
     //this.collection = database.collection('users');

     var test = collection;
     var test1 = this.collection;
     var test2 = that.collection;
     // Insert some users
     database.collection('sessions').insertOne({"gamesession":
     {
     "gamesessionID":sessionID,
     "player":[{
     "name":player1,
     "state":"placing",
     "gamefield":{
     "ships":{
     "aircraftcarrier":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "battleship":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "cruiser1":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "cruiser2":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "destroyer":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}]
     },
     "attacks":{
     "a1":"false","b1":"false","c1":"false","d1":"false","e1":"false","f1":"false","g1":"false","h1":"false","i1":"false","j1":"false",
     "a2":"false","b2":"false","c2":"false","d2":"false","e2":"false","f2":"false","g2":"false","h2":"false","i2":"false","j2":"false",
     "a3":"false","b3":"false","c3":"false","d3":"false","e3":"false","f3":"false","g3":"false","h3":"false","i3":"false","j3":"false",
     "a4":"false","b4":"false","c4":"false","d4":"false","e4":"false","f4":"false","g4":"false","h4":"false","i4":"false","j4":"false",
     "a5":"false","b5":"false","c5":"false","d5":"false","e5":"false","f5":"false","g5":"false","h5":"false","i5":"false","j5":"false",
     "a6":"false","b6":"false","c6":"false","d6":"false","e6":"false","f6":"false","g6":"false","h6":"false","i6":"false","j6":"false",
     "a7":"false","b7":"false","c7":"false","d7":"false","e7":"false","f7":"false","g7":"false","h7":"false","i7":"false","j7":"false",
     "a8":"false","b8":"false","c8":"false","d8":"false","e8":"false","f8":"false","g8":"false","h8":"false","i8":"false","j8":"false",
     "a9":"false","b9":"false","c9":"false","d9":"false","e9":"false","f9":"false","g9":"false","h9":"false","i9":"false","j9":"false",
     "a10":"false","b10":"false","c10":"false","d10":"false","e10":"false","f10":"false","g10":"false","h10":"false","i10":"false","j10":"false",
     }
     }
     },
     {
     "name":player2,
     "state":"placing",
     "gamefield":{
     "ships":{
     "aircraftcarrier":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "battleship":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "cruiser1":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "cruiser2":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}],
     "destroyer":
     [{"coordinate":"notset","hitstatus":"false"},
     {"coordinate":"notset","hitstatus":"false"}]
     },
     "attacks":{
     "a1":"false","b1":"false","c1":"false","d1":"false","e1":"false","f1":"false","g1":"false","h1":"false","i1":"false","j1":"false",
     "a2":"false","b2":"false","c2":"false","d2":"false","e2":"false","f2":"false","g2":"false","h2":"false","i2":"false","j2":"false",
     "a3":"false","b3":"false","c3":"false","d3":"false","e3":"false","f3":"false","g3":"false","h3":"false","i3":"false","j3":"false",
     "a4":"false","b4":"false","c4":"false","d4":"false","e4":"false","f4":"false","g4":"false","h4":"false","i4":"false","j4":"false",
     "a5":"false","b5":"false","c5":"false","d5":"false","e5":"false","f5":"false","g5":"false","h5":"false","i5":"false","j5":"false",
     "a6":"false","b6":"false","c6":"false","d6":"false","e6":"false","f6":"false","g6":"false","h6":"false","i6":"false","j6":"false",
     "a7":"false","b7":"false","c7":"false","d7":"false","e7":"false","f7":"false","g7":"false","h7":"false","i7":"false","j7":"false",
     "a8":"false","b8":"false","c8":"false","d8":"false","e8":"false","f8":"false","g8":"false","h8":"false","i8":"false","j8":"false",
     "a9":"false","b9":"false","c9":"false","d9":"false","e9":"false","f9":"false","g9":"false","h9":"false","i9":"false","j9":"false",
     "a10":"false","b10":"false","c10":"false","d10":"false","e10":"false","f10":"false","g10":"false","h10":"false","i10":"false","j10":"false",
     }
     }
     }]
     }
     }, function (err, result) {
     if (err) {
     console.log(err);
     } else {
     console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
     }
     });
     }*/
//}

//module.exports.findUserByUserLoginData = findUserByUserLoginData;
//module.exports.insertNewUser = insertNewUser;
MongoPool.initPool = initPool;
MongoPool.getInstance = getInstance;
MongoPool.insertNewSession = insertNewSession;
MongoPool.updateSessionAddPlayer = updateSessionAddPlayer;
MongoPool.updateSessionUpdatePlayerState = updateSessionUpdatePlayerState;
MongoPool.updateSessionUpdateGameState = updateSessionUpdateGameState;
MongoPool.updateSessionUpdatePlayerShips = updateSessionUpdatePlayerShips;
MongoPool.updateSessionUpdatePlayerBombs = updateSessionUpdatePlayerBombs;
MongoPool.insertNewUser = insertNewUser;
MongoPool.findUserByUserLoginData = findUserByUserLoginData;
module.exports = MongoPool;
module.exports.loginStatus = loginStatus;
//module.exports.updateUserPassword = updateUserPassword;
//module.exports.findGameSession = findGameSession;
//module.exports.updateUserGamesessionID = updateUserGamesessionID;
//module.exports.updateGamefieldAttacksForPlayer = updateGamefieldAttacksForPlayer;
//module.exports.connectDB = connectDB;
//module.exports = DBClientConnection;