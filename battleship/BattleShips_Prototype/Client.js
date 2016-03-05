/**
 * Created by admin on 12.01.2016.
 */
var Game        =     require('./Game');

Client = function(clientsocket, type, number){
    var socket = clientsocket
    this.clientNo = number;
    var clientType = type;
    var that = this;

    this.getSocket = function(){
        return socket;
    }

    this.updateSocket = function (clientsocket){
        socket = clientsocket
    }
    this.updateType = function (type){
        clientType = type;
    }

    this.getType = function(){
        return clientType;
    }

    socket.emit("cookie-request", {message: "senseless"});
    //Check weather the client who connected belongs to an existing game
    socket.on('cookie-response', function(data) {
        var sessionID = data.sessionID;
        var playerID = data.playerID;
        if(sessionID!=null && playerID!=null)
            Game.PlayerReconnected(that, sessionID, playerID);
        //Game.ClientConnected(socket.id, socket, sessionID, playerID);
    });

    socket.on('requestGameSession', function (data) {
        //create a new session
        //requesting player enters as player[0]. His or her name is passed as an argument
        //and will be shown in the sessionsList
        Game.createSession(that, data.pname);
    });
    socket.on('requestSessionsList', function (data) {
        var tempSessionsList = Game.getSessionsList();
        if(tempSessionsList!=null){
            that.send("responseSessionsList", tempSessionsList);
        }
    });
    socket.on('requestJoinSession', function (data) {
        Game.joinSession(that, data.sessionNo, data.pname);
    });

    socket.on('disconnect', function (data) {
        console.log("Client Disconnected socket.id:" + socket.id );
        Game.clientDisconnected(that.clientNo );
    });

    this.send = function(eventName, data ){
        socket.emit(eventName, data);
    }

}

module.exports = Client;