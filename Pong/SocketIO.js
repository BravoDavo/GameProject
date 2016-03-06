/**
 * Created by David on 05.03.2016.
 */
var socketio      =   require('Socket.io')({'close timeout': 60*60*24});//24h
//var Game        =     require('./Game');



var io;
var clients = [];


var initWebSocket = function ListenOnHttp(HttpServer){                  //function is called by www, with existing http
    io  =   socketio.listen(HttpServer);

    io.sockets.on('connection', connectedHandler);  //decides what to do when connected (and receiving)
}

function connectedHandler(socket) {
    console.log("One Client with id: " + socket.id + " connected");
    clients.push(socket.id);

    //Game.ClientConnected(socket);

    socket.on('disconnect', disconnectedHandler);

    function disconnectedHandler() {
        console.log("Client with ID: " + socket.id + " disconnected");
        var index= clients.indexOf(socket.id);
        delete clients[index];
    }
}

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