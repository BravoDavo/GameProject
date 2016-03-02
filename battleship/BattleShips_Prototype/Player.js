/**
 * Created by admin on 09.11.2015.
 */
var db = require('./Server_DBFunctions');


Player = function(ID, socket, session, playerNumber, name) {
    console.log("Player Constructor call with ID=" + ID);
    //save a reference on parent object
    this.session = session;

    var that = this;
    this.hitCounter = 0;

    var playerNo = playerNumber;
    //var playerID = ID;      //equals the socketID
    var playerID = ID;
    var playerName = name;
    this.getID = function () {
        return playerID;
    }
    this.getName = function(){
        return playerName;
    }

    this.socket = socket;             //Websocket to reach this player e.g. socket.emit(...)
     //var ClientGameState = new Enum('waitingForOpponent', 'placing', 'waitingOpponentPlacing', 'attackingOwnTurn',
// 'AttackingOtherTurn'   'lost', 'won');
    var state = 'waitingForOpponent';


    //todo insert player in db = update session with player data
    db.updateSessionAddPlayer("name", playerID, state, that.session.getID(), playerNo);
    //ToDo: Implement as an enum type
    this.setState = function (newState) {
        //ToDo: check validity
        //and set new state (on server)
        //todo update player state in db = update session with player state by playernumber

        state = newState;
        db.updateSessionUpdatePlayerState(state, that.session.getID(), playerNo);
        //and update client too
        console.log("status-update: " + newState + "; Sent to client socketID:"+ that.socket.id+ ".");
        this.send('status-update', newState);
    }

    this.getState = function () {
        //considering the state saved on server up-to-date,
        //as the client is configured to update server immediately.
        return state;
    }
    //Gamefields
    //initialize all rows
    this.gamefieldShips = new Array(10)
    for (var i = 0; i < 10; i++) {
        //in every row:
        //initialize every cell/ column
        this.gamefieldShips[i] = new Array(10);
    }
    this.gamefieldAttacks = new Array(10)
    for (var i = 0; i < 10; i++) {
        //in every row:
        //initialize every cell/ column
        this.gamefieldAttacks[i] = new Array(10);
    }
    //this.gamefieldAttacks = [];
    this.setGamefieldShips = function (/*col, row, value*/indices) {
        this.gamefieldShips[indices[0]][indices[1]] = indices[2];
        //todo update session with ships in db
        db.updateSessionUpdatePlayerShips(this.gamefieldShips, that.session.getID());
        this.send('field-update', /*this.gamefieldShips*/indices);
    }

    this.setGamefieldAttacks = function (/*col, row, value*/indices) {
        this.gamefieldAttacks[indices[0]][indices[1]] = indices[2];
        //todo update session with attacks in db
        db.updateSessionUpdatePlayerBombs(indices);
        this.send('attack-update', /*this.gamefieldAttacks*/indices);
    }

    this.refreshClient = function () {
        this.send('refresh-state', state);
        this.sendObject('refresh-field', this.gamefieldShips);
        this.sendObject('refresh-bombs', this.gamefieldAttacks);
        this.send('refresh-infos', {sessionID: this.session.getID(), playerID: this.getID()});
    }

    this.send = function (event, data) {
        this.socket.emit(event, {message: data});
    }

    this.sendObject = function (event, object) {
        this.socket.emit(event, object);
    }



    this.updateSocket = function (socket) {
        this.socket = socket;
        this.socket.on('status-update', function (data) {
            console.log("Received status update from player ID=" + playerID);
            console.log("with content: " + data.message + "\n");
            if ((data.message == "waitingOpponentPlacing") || (data.message == "attackingOtherTurn")) {
                if (data.message != state)
                    state = data.message;
            }//...
            //check weather gamestate should be changed
            session.updateGameState();
        });

        this.socket.on('field-update', function (data) {
            if (state == "placing")
                that.gamefieldShips = data.message;
            console.log("received a Ships Gamefield Array from player ID=" + playerID + "\n");
        });
        this.socket.on('attack-update', function (data) {
            if (state == "attackingOwnTurn") {
                //the message contains the indices of the attack
                var indices = data.message;
                that.gamefieldAttacks[indices[0]][indices[1]] = 1;
                that.session.processAttack(indices);
            }
            this.gamefieldAttacks = data.message;
            console.log("received an Attack Placement" + playerID + "\n");
        });
        this.socket.on('quit-game', function(data){
            console.log("quit-game received by player with id" + that.getID());
            that.session.close();
        });
        this.socket.on('logout', function(data){
            that.session.close();
        });



    }
    this.updateSocket(socket);
}

module.exports = Player;