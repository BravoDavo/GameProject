var socket

//wait 100 ms to boot UI
setTimeout(connect, 1000);
function connect() {

    socket = io.connect();

    socket.on('connect', function (data) {
        document.getElementById("status").innerHTML = "Status: Websocket connected.";
    })
    socket.on('ConnectionRefused', function (data) {
        socket.disconnect();
        resetGame();
        document.getElementById("status").innerHTML = "Status:Refused! Websocket disconnected.";
    })

//Handling writing and reading Cookies on request from server
    socket.on('cookie-request', function (data) {
        var sID = getCookie("sessionID");
        var pID = getCookie("playerID");
        if (sID == undefined || sID == "")
            sID = null;
        if (pID == undefined || pID == "")
            pID = null;
        socket.emit('cookie-response', {sessionID: sID, playerID: pID});
    });
    socket.on('cookie-setRequest', function (data) {
        var expHours = 1;
        setCookie("sessionID", data.sessionID, expHours);
        setCookie("playerID", data.playerID, expHours);
        setDebugInfo("From Cookie: <br> " +
            "sessionID: " + data.sessionID + "<br>" +
            "playerID: <br>" + data.playerID + "<br>");
    });
    socket.on('GameCookie-clearRequest', function (data) {
        delCookie("sessionID");
        delCookie("playerID");
        resetGame();
    });
    socket.on('LoginCookie-clearRequest', function (data) {
        delCookie("username");
    });

    socket.on('status-update', function (data) {
        ReceivedStatusUpdate(data.message)
    });
    socket.on('field-update', function (data) {
        ReceivedFieldUpdate(data.message)
    });
    socket.on('attack-update', function (data) {
        ReceivedAttackUpdate(data.message)
    });
    socket.on('refresh-state', function (data) {
        GameStateTransistionOutput('refresh');
        GameStateTransistionOutput(data.message);
    });
    socket.on('refresh-field', function (data) {
        ReceivedFieldRefresh(data);
    });
    socket.on('refresh-bombs', function (data) {
        ReceivedAttackRefresh(data);
    });
    socket.on('refresh-infos', function (data) {
        setDebugInfo("Refreshed: <br> " +
            "sessionID: " + data.message.sessionID + "<br>" +
            "playerID: <br>" + data.message.playerID + "<br>");
        GameSessionActive=true;
        gameSessionId=data.message.sessionId;
        if(GameSessionActive==true){
            showGameView();
        }
    });
    //})
    socket.on('responseSession', function (data) {
        if (data.flag == "done") {
            GameSessionActive=true;
            //navigationClicked("navigationGameButton");
            showGameView();
            GameStateTransistionOutput('waitingForOpponent');
            //ClientGameState = 'waitingForOpponent';
        } else {
            alert("Error");
            GameSessionActive=false;
            ClientGameState = 'idle';
        }
    });
    socket.on('responseJoinSession', function (data) {
        if (data.flag == "done") {
            GameSessionActive=true;
            gameSessionId = data.sessionId;
            showGameView();
            GameStateTransistionOutput('placing');
            //ClientGameState = 'placing';
        } else {
            alert("Error");
            GameSessionActive=false;
            gameSessionId = null;
            ClientGameState = 'idle';
        }

    });
    socket.on('responseSessionsList', function(data){
        if(data!=null)
            showSessionsList(data);
    });



    socket.on('gameClosed', function (data) {
        resetGame();
    });

}//End of Connect()


function sendFieldUpdate(field){
    socket.emit('field-update',{message: field});
}


function sendStateUpdate(newState){
    socket.emit('status-update',{message: newState});
}

function sendAttackUpdate(newState){
    //ToDo send attaqck indices
    socket.emit('attack-update',{message: newState});
}

function requestGameSession(pname) {
    socket.emit('requestGameSession', {pname: pname});
}
function requestJoinSession(sessionNo, pname) {
    socket.emit('requestJoinSession', {sessionNo: sessionNo, pname: pname });
}


function requestSessionsList(){
    socket.emit('requestSessionsList', {message: "loremIpsumDolor"});
}


function quitGameSession(){
    socket.emit('quit-game', {message: "loremIpsumDolor"});
}

function logoutUser(){
    socket.emit('logout', {message: ""});
}

