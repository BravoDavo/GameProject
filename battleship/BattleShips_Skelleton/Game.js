
var SocketIO    =   require('./SocketIO');

var PlayerIDs = [];
var PlayerNumber=0;
//var ClientGameState = new Enum('waitingForOpponent', 'Placing', 'waitingOpponentPlacing', 'Attacking', 'Lost', 'Won');
var PlayerStates = new Array("waitingForOpponent", "waitingForOpponent");
var GameState="connecting";

var shipsSet = [];
shipsSet[1] = [];
shipsSet[0] = [];



function ClientConnected(clientID){
    if(PlayerNumber<2){
        PlayerIDs[PlayerNumber]=clientID;
        SocketIO.emit(clientID, "text", "message", "welcome " + PlayerNumber + " !<br> Your ID is: {" + clientID.toString() + "}.");
        if(PlayerNumber==1){//means second Player has connected: Game can now begin
            ClientUpdateStatus(PlayerIDs[0],"Placing");
            ClientUpdateStatus(PlayerIDs[1],"Placing");
        }
        PlayerNumber++;
    }else {
        SocketIO.emit(clientID, "ConnectionRefused", "message", "refused")
    }
}


function ClientDisConnected(clientID){
    if(PlayerNumber<2){
        PlayerIDs[PlayerNumber]=null;
        SocketIO.emit(clientID, "text", "message", "Player No.: " + PlayerNumber + " left!<br> ID is: {" + clientID.toString() + "}.");
        PlayerNumber--;
        console.log("Game is aborted!")
    }else {
        SocketIO.emit(clientID, "ConnectionRefused", "message", "refused")
    }
}



function receiveClientFieldData(data, socket){
    //Who has send?
    console.log("Message from ID: "+ socket.id.toString());
    var index= PlayerIDs.indexOf(socket.id);
    console.log("Message from player number: " + index);
    //Test
    console.log("Field: " + data.message.toString());
    shipsSet[index]=data.message;
    //return update of Player status: SETTING -->READY
}

function receiveClientStatusUpdate(data, socket){
    console.log("Message from ID: "+ socket.id.toString());
    var index= PlayerIDs.indexOf(socket.id);
    console.log("Status Update from player number: " + index);
    PlayerStates[index]=data.message;
}


function ClientUpdateStatus(clientID, newStatus){
    SocketIO.emit(clientID, "status-update", "message", newStatus );
}







module.exports.ClientConnected  = ClientConnected;
module.exports.ClientDisConnected  =  ClientDisConnected;
module.exports.receiveClientFieldData  = receiveClientFieldData;
module.exports.receiveClientStatusUpdate    =   receiveClientStatusUpdate;
