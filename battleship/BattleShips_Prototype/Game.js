var SocketIO    =   require('./SocketIO');
var Session     =   require('./Session');
var Client      =   require('./Client');

var sessions =  [];
var sessionsList = [];
var clients  =  [];
var sessionsCount =0;

var lastClosedSessionID=-1;

const debugMode = false;
//
//function ClientConnected(clientID, clientSocket){
//    //So far only one session is used
//    if(sessions[0]==undefined){
//        sessions[0] = new Session(sessionsCount);
//        sessionsCount++;
//    }
//    if(sessions[0].addPlayer(clientSocket.id, clientSocket)!=0) {   //socket ID is used as Player Id too
//        console.log("Error: Session is already full");
//        SocketIO.emit(clientID, "ConnectionRefused", "message", "refused")
//    }
//}


//a client with Cookies signalizing an active game session has connected
//function ClientConnected(clientID, clientSocket, sessionID, playerID) {
function ClientConnected(clientSocket) {
        //var result = ClientExistsInSession(sessionID, playerID);
        //if (result != null) {
        //    //if so, socket.id has to be updated because it has changed
        //    sessions[result.sessionNumber].players[result.playerNumber].updateSocket(clientSocket);
        //    sessions[result.sessionNumber].players[result.playerNumber].refreshClient();
        //    return;
        //}else{
        //    //No session was found related to those cookie information
        //}

    var newClient = new Client(clientSocket, "visitor", clients.length);
    clients.push(newClient);
}

//Check data delivered by Cookie Response
function PlayerReconnected(client, sessionID, playerID){
    console.log("Player Reconnected to session" + sessionID + "playerID "+ playerID );
    var result = ClientExistsInSession(sessionID, playerID);
    if (result != null) {
        console.log("->Recognized as session No "+ result.sessionNumber + "player No"+ result.playerNumber);
        //if so, socket.id has to be updated because it has changed
        sessions[result.sessionNumber].players[result.playerNumber].updateSocket(client.getSocket());
        sessions[result.sessionNumber].players[result.playerNumber].refreshClient();
        return;
    }else{
        console.log("->Not recognized.");
        client.send("GameCookie-clearRequest",{message:"loremIpsum"});
        //No session was found related to those cookie information
    }
}


function ClientExistsInSession(sessionID, playerID){
    //If Client contains a Cookie,
    // then it is the Websocket ID, it had when joining the session
    //enables to test easier, because no player will be recognized again
    if(debugMode==true){
        return null; }

    for(var i in sessions){
        if(sessions[i].getID()==sessionID){
            //Client exists already
            for(var j in sessions[i].players) {
                if(sessions[i].players[j]!=null)
                    if(sessions[i].players[j].getID()==playerID)
                        return {sessionNumber: i, playerNumber: j};
            }
            //ToDo send: current ClientState, Game and AttackField to show
        }
    }
    return null;
}

function createSession(client, pname){
     //if(sessionsCount==0 || sessions[sessionsCount - 1].isFull()){
        //create a new session
        //SessionsCount is used as preliminary sessionID
        sessions[sessionsCount] = new Session(sessionsCount);
        console.log("created new session No." + sessionsCount);
        sessionsCount++;
    //}
    //add new player to the current session (highes number)
    if (sessions[sessionsCount - 1].addPlayer(client.getSocket().id, client.getSocket(), pname) != 0) {   //socket ID is used as Player Id too
        console.log("Error: Session is already full");
        client.send( "responseSession", {flag: "refused"});
    } else {
        client.send( "responseSession", {flag: "done", sessionId: sessions[sessionsCount - 1 ].getID()});
    }
}

function joinSession(client, sessionNo, pname){
    if(sessionsCount==0){
        client.send( "responseJoinSession", {flag: "refused"});
        return false;}
    if(sessions[sessionNo]==undefined){
        client.send( "responseJoinSession", {flag: "refused"});
        return false;}
    if (sessions[sessionNo].addPlayer(client.getSocket().id, client.getSocket(), pname) != 0)  {   //socket ID is used as Player Id too
        console.log("Error: Session is already full");
        client.send( "responseJoinSession", {flag: "refused"});
        return false;
    } else {
        client.send( "responseJoinSession", {flag: "done", sessionId:sessions[sessionNo].getID()});
        return true;
    }
}

function getSessionsList() {
    sessionsList=[];
    if(sessions!=[] && sessionsCount>0 )
        for (var i in sessions) {
            if (sessions[i].isFull() == false) {
                if (i != -1) {
                    var tempSessionInfo = {pname: sessions[i].players[0].getName(), no: i, sessionId: sessions[i].getID()};
                    sessionsList.push(tempSessionInfo);
                }
            }
        }
    //console.log(sessionsList.length);
    return sessionsList;
}



//will be obsolet, because data is received by Player Object
function receiveClientFieldData(data, socket){
    //Who has send?
    console.log("Message from ID: "+ socket.id.toString());

    console.log("Field: " + data.message.toString() + "\n");
     //return update of Player status: SETTING -->READY
}

////will be obsolet, because data is received by Player Object
//function receiveClientStatusUpdate(data, socket){
//    console.log("Status Update from Client. Message from ID: "+ socket.id.toString());
//    console.log("Message: " + data.message + "\n");
//}

function closeSession(sessionID){
    if(sessionsCount >0 && lastClosedSessionID!=sessionID) {
        sessions.splice(sessionID, 1);
        sessionsCount--;
        lastClosedSessionID = sessionID;
    }
}

function clientDisconnected(clientNo){
    clients.splice(clientNo+1,1);
}







module.exports.ClientConnected              = ClientConnected;
module.exports.PlayerReconnected            = PlayerReconnected;
//module.exports.ClientDisConnected         =  ClientDisConnected;
module.exports.receiveClientFieldData       = receiveClientFieldData;
//module.exports.receiveClientStatusUpdate  =   receiveClientStatusUpdate;
module.exports.createSession                = createSession;
module.exports.clientDisconnected           = clientDisconnected;
module.exports.closeSession                 =   closeSession;
module.exports.getSessionsList              = getSessionsList;
module.exports.sessionsList                 = sessionsList;
module.exports.joinSession                  = joinSession;

