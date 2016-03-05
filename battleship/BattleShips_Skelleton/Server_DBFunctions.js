/**
 * Created by David on 04.11.2015.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
//var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/local';

/*
 example for a user document in the DB:
 {"user":
 {
 "credentials":{"name":"exampleUser1","password":"password"},
 "statistics":{"lastmatch":"won","metascore":"1/0"},
 "friend":[{"name":"exampleUser2"},{"name":"exampleUser3"}],
 "personalData":{"name":"tom","lastname":"jerry" }
 }
 }
*/

/*
 example for a session document in the DB:
 {"gamesession":
 {
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

function insertNewSession (player1, player2) {
// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('users');


            // Insert some users
            collection.insertOne({"gamesession":
            {
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
                        }, "attacks":{
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
                //Close connection
                db.close();
            });
        }
    });
}


a


function updateGamefieldAttacksForPlayer(player1, player2, playerNumber, coordinates){
    // Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);
            // Get the documents collection
            var collection = db.collection('gamesessions');

            collection.updateMany({"gamesession.credentials.name": name, }, {$set: {"user.credentials.password": password}}, function (err, numUpdated) {
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
            collection.find({ "user.credentials.name": name , "user.credentials.password": password}).toArray(function (err, result) {
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

function insertNewUser (name, password, firstname, lastname) {
// Use connect method to connect to the Server
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //connected
            console.log('Connection established to', url);

            // Get the documents collection
            var collection = db.collection('users');


            // Insert some users
            collection.insertOne({"user":
            {
                "credentials":{"name":name,"password":password},
                "statistics":{"lastmatch":"","metascore":""},
                "friend":[],
                "personalData":{"name":firstname,"lastname":lastname }
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

module.exports.findUserByUserLoginData = findUserByUserLoginData;
module.exports.insertNewUser = insertNewUser;
module.exports.insertNewSession = insertNewSession;
module.exports.updateUserPassword = updateUserPassword;
module.exports.findGameSession = findGameSession;