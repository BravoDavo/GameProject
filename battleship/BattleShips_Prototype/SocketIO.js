/**
 * Created by admin on 09.10.2015.
 */
//var http    =   require('http');
var socketio      =   require('Socket.io')({'close timeout': 60*60*24});//24h
var Game        =     require('./Game');



var io;
var clients = [];


var initWebSocket = function ListenOnHttp(HttpServer){                  //function is called by www, with existing http
    io  =   socketio.listen(HttpServer);

    io.sockets.on('connection', connectedHandler);  //decides what to do when connected (and receiving)
    //io.sockets.on('field-update', Game.receiveClientFieldData);
    //io.sockets.on('status-update',Game.receiveClientStatusUpdate);
  }

//function connectedHandler(socket) {
//    console.log("One Client with id: " + socket.id + " connected");
//    clients.push(socket.id);
//    Game.ClientConnected(socket.id, socket);
//    socket.on('disconnect', disconnectedHandler);
//
//    function disconnectedHandler() {
//        console.log("Client with ID: " + socket.id + " disconnected");
//        var index= clients.indexOf(socket.id);
//        delete clients[index];
//    }
//}


function connectedHandler(socket) {
    console.log("One Client with id: " + socket.id + " connected");
    clients.push(socket.id);
    //setInterval(emit, 2000);
    //Game.ClientConnected(socket.id);
    Game.ClientConnected(socket);

    //socket.emit("cookie-request", {message: "senseless"});
    //
    //socket.on('cookie-response', function(data){
    //    var sessionID   =   data.sessionID;
    //    var playerID    =   data.playerID;
    //    Game.ClientConnected(socket.id, socket, sessionID, playerID);
    //});


    socket.on('disconnect', disconnectedHandler);

    function disconnectedHandler() {
        console.log("Client with ID: " + socket.id + " disconnected");
        var index= clients.indexOf(socket.id);
        delete clients[index];
    }
}





//function emit(){
//   if(io!=undefined) {
//        var d = new Date();
//        io.emit("broadcast", {message: "This is a broadcast<br>"});
//        io.emit("time", {message: d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds()})
//
//        for (var i in clients) {
//            var clientID = clients[i];
//            if(clientID!=undefined && io.sockets.connected[clientID]!=undefined){
//                io.sockets.connected[clientID].emit("message", {message: "This one goes to one single client.<br>"});
//                io.sockets.connected[clientID].emit("message", {message: "Your ID is: "+ clientID + "."});
//            }
//        }
//    }
//}

function emit(clientID, eventName, DataIdent, data ){
    if(clientID!=undefined && io.sockets.connected[clientID]!=undefined )
        io.sockets.connected[clientID].emit(eventName, {message: data});
}

function send(clientID, eventName, data ){
    io.sockets.connected[clientID].emit(eventName, data);
}







module.exports.initWebSocket    =initWebSocket;
module.exports.emit             =emit;
module.exports.send             =send;