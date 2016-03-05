/**
 * Created by admin on 09.11.2015.
 */
var Player      =   require('./Player');
var Game        =   require('./Game');
var db = require('./Server_DBFunctions');

const targetNumShips=19;



//module.exports = function(sessionID){
Session = function(sessionID) {
    var sessionID = sessionID;        //This ID should be saved in a Cockie inside both clients
    var that=this;
    var gameState = "connecting";

    //todo insert session into db
    db.insertNewSession(sessionID, gameState);

    this.getID = function () {
        return sessionID;
    };

    this.players = new Array(null, null)       //will be filled with instances of Player class
    this.playerCount = 0;
    this.isFull = function(){
        if(this.playerCount==2)
            return true;
        else
            return false;
    }
    //this.addPlayer = function (playerID, socket) {
    //    if (this.playerCount < 2) {
    //        console.log("Session Obj: creating new Player with ID= " + playerID);
    //        var playerNo = this.playerCount;
    //        this.players[playerNo] = new Player(playerID, socket, this);
    //        this.playerCount++;
    //        //greet the new player
    //        this.players[playerNo].send('status-update', {message: "Hello " + playerID});
    //        if (this.playerCount == 2) {
    //            this.players[0].setState('placing');
    //            this.players[1].setState('placing');
    //            this.updateGameState();
    //        }
    //        return 0;
    //    } else {
    //        console.log("Error.This Session already has two players.")
    //        return -1;
    //    }
    //
    //}
    this.addPlayer = function (playerID, socket, name) {
        if (this.playerCount < 2) {
            console.log("Session Obj: creating new Player with ID= " + playerID);
            var playerNo = this.playerCount;
            this.players[playerNo] = new Player(playerID, socket, that, playerNo, name);
            this.playerCount++;
            //greet the new player
          //  this.players[playerNo].send('status-update', {message: "Hello " + playerID});
            //Save the sessionID in a Cookie
            this.players[playerNo].sendObject('cookie-setRequest', {sessionID: that.getID(), playerID: playerID});
            //setTimeout()
            if (this.playerCount == 2) {
                setTimeout(tellOpponentConnected, 100);
            }
            return 0;
        } else {
            console.log("Error.This Session already has two players.")
            return -1;
        }
    }

    function tellOpponentConnected(){
        that.players[0].setState('placing');
        that.players[1].setState('placing');
        that.updateGameState();
    }


    ///GameState of this session

    this.updateGameState = function () {
        console.log("session.updateGameState current gameState" + gameState+ "...");
        var p0State = this.players[0].getState();
        var p1State = this.players[1].getState();
        var nextState;
        switch (gameState) {
            case "connecting":
                if ((p0State == "placing") && (p1State == "placing")) {
                    nextState = "placing";
                }

                break;
            case "placing":
                if ((p0State == "waitingOpponentPlacing") && (p1State == "waitingOpponentPlacing")) {
                    //ToDo insert random choosing first player
                    var randNo = Math.floor((Math.random())*2 + 1);
                    if(randNo==0) {
                        this.players[0].setState("attackingOwnTurn");
                        this.players[1].setState("attackingOtherTurn");
                        nextState = "p0Attacking";
                    }else if(randNo==1){
                        this.players[1].setState("attackingOwnTurn");
                        this.players[0].setState("attackingOtherTurn");
                        nextState = "p1Attacking";
                    }else{
                        that.updateGameState();
                    }
                }
                break;
            case "p0Attacking":
                if (p0State == "attackingOtherTurn") {
                    //ToDo check submitted attack
                    //update opponent gamefield and submit
                    //check if won
                    //if(won==false){
                    this.players[0].setState("attackingOtherTurn");
                    this.players[1].setState("attackingOwnTurn");
                    nextState = "p1Attacking";
                }
                break;
            case "p1Attacking":
                if (p1State == "attackingOtherTurn") {
                    //ToDo check submitted attack
                    //update opponent gamefield and submit
                    //check if won
                    //if(won==false){
                    this.players[1].setState("attackingOtherTurn");
                    this.players[0].setState("attackingOwnTurn");
                    nextState = "p0Attacking";
                }
                break;
            case "p0Won":
                break;
            case "p1Won":
                break;
            default:
        }
        if (nextState != undefined) {
            gameState = nextState;
            //todo update gamestate in db
            db.updateSessionUpdateGameState(gameState, sessionID);
        }
        console.log("session.updateGameState new gameState=" + gameState);
    }


    this.processAttack = function (indices) {
        //ToDo get opponent Gamefield
        //lookup the content at this index and compare
        var currentPlayer;
        var opponentPlayer;
        if (gameState == "p0Attacking") {
            currentPlayer   =   0;
            opponentPlayer  =   1;
            //gameState == "p1Attacking";
        }else {
            currentPlayer   =   1;
            opponentPlayer  =   0;
            //gameState == "p0Attacking";
        }
        if (this.players[opponentPlayer].gamefieldShips[indices[0]][indices[1]] == 1) {
            //mark as hit
            this.players[opponentPlayer].setGamefieldShips(new Array(indices[0],indices[1],2));
            this.players[currentPlayer].setGamefieldAttacks(new Array(indices[0],indices[1],2));
            this.players[opponentPlayer].hitCounter++;
         }
        else {
            console.log("error");
            this.players[opponentPlayer].setGamefieldShips(new Array(indices[0],indices[1],0));
            this.players[currentPlayer].setGamefieldAttacks(new Array(indices[0],indices[1],1));
            //No hit
            //this.players[0].gamefieldAttacks[indices[0]][indices[1]]=2;
        }
        if (this.players[opponentPlayer].hitCounter > targetNumShips)
        {
            this.players[opponentPlayer].setState("lost");
            this.players[currentPlayer].setState("won");
        }
    }


    //if hit, save it inside opponent gamefield
    //and tell that Attacking Player (more Client logic needed)
    //update gamestate (first approach: change to other player)

    //can be called when a player quit game
    this.close = function(){
        console.log("Session.close called by a quitting player");
        that.players[0].sendObject("gameClosed", {message: "loremipsum"});
        if(that.playerCount == 2)
            that.players[1].sendObject("gameClosed", {message: "loremipsum"});

        Game.closeSession(sessionID);
    }

}






module.exports = Session;
