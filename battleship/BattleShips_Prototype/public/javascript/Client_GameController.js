/**
 * Created by admin on 24.10.2015.
 */
//var Enum = require('enum');
//var shipsSet = [];
const gameboardSize = 10;
//Ships to be places///////////////
const targetNumShips=19;
//how many of which type?
const targetNumCarrier = 1;
const targetNumBattleship = 1;
const targetNumCruiser = 2;
const targetNumDestroyer = 2;
//ship Counter
var numSetShips =0;
//how many of which type?
var numCarrier = 0;
var numBattleship = 0;
var numCruiser = 0;
var numDestroyer = 0;
////////////////////////////////

var GameSessionActive=false;
var gameSessionId=null;

var shipsSet = new Array(gameboardSize)
for(var i=0;i<gameboardSize; i++){
    //in every row:
    //initialize every cell/ column
    shipsSet[i] = new Array(gameboardSize);
}

var bombSet=false;
var bombsPlace = new Array(gameboardSize)
for(var i=0;i<gameboardSize; i++){
    //in every row:
    //initialize every cell/ column
    bombsPlace[i] = new Array(gameboardSize);
}

var bombIndices;
var attackIndices;
var lastSuccessfulAttackID = 'first';
var lastSuccessfulAttackIndices = null;
var lastHitShipID = null;
var lastHitShipIndices = null;
var shipIndices = [];

//var ClientGameState = new Enum('waitingForOpponent', 'placing', 'waitingOpponentPlacing', 'attackingOwnTurn',
// 'AttackingOtherTurn'   'lost', 'won');
//var ClientGameState = 'waitingForOpponent';
var  ClientGameState = 'idle';
//var ClientGameState = 'AttackingOwnTurn';

//var statusBox=document.getElementById("status");
//var UIController = UIController();

function ContinueClicked() {  //handles a click on continue button
    switch (ClientGameState) {
        case 'placing':
            if (numSetShips == targetNumShips){
                sendFieldUpdate(shipsSet);
                //sendFieldUpdate(testarray);
                sendStateUpdate('waitingOpponentPlacing');
                GameStateTransistionOutput('waitingOpponentPlacing');}
            else
                alert("Please set " + targetNumShips + " ships first.")
            break;
        case 'attackingOwnTurn':
            if (bombSet == true){
                //sendFieldUpdate(bombsPlace);
                sendAttackUpdate(attackIndices);
                sendStateUpdate('attackingOtherTurn');
                //GameStateTransistionOutput('attackingOtherTurn');
            } else
                alert("Its only allowed to select one field to bomb.")
            break;
        case 'lost':
            sendStateUpdate('waitingForOpponent');
            GameStateTransistionOutput('waitingForOpponent');
            break;
        case 'won':
            sendStateUpdate('waitingForOpponent');
            GameStateTransistionOutput('waitingForOpponent');
            break;
        default:
    }
}

function ReceivedStatusUpdate(newStatus){
    switch (ClientGameState) {
        case 'idle':
            if(newStatus=='placing') {
              GameStateTransistionOutput('placing');
            }
            break;

        case 'waitingForOpponent':
            if(newStatus=='placing') {
                GameStateTransistionOutput('placing');
                sendStateUpdate('placing');
            }
            break;
        case 'placing':
            break;
        case 'waitingOpponentPlacing':
            if(newStatus=='attackingOtherTurn') {
                GameStateTransistionOutput('attackingOtherTurn');
            }
            if(newStatus=='attackingOwnTurn') {
                GameStateTransistionOutput('attackingOwnTurn');
            }
            break;
        case 'attackingOtherTurn':
            if (newStatus == 'lost')
            {
                GameStateTransistionOutput('lost');
            }
            else {
                bombSet = false;
                GameStateTransistionOutput('attackingOwnTurn');

                //clean up own set/attack field/////////////////////
                /////////////////////////////////////////////////////
                //ToDo add update of UI according to attack of enemy//
                /////////////////////////////////////////////////////
            }
            break;
        case 'attackingOwnTurn':
            if (newStatus == 'won')
            {
                GameStateTransistionOutput('won');
            }
            else {

                GameStateTransistionOutput('attackingOtherTurn');
                //clean up own set/attack field/////////////////////
                /////////////////////////////////////////////////////
                //ToDo add update of UI according to attack of enemy//
                /////////////////////////////////////////////////////
            }
            break;
        case 'lost':
            if(newStatus=='waitingForOpponent')
                GameStateTransistionOutput('attackingOwnTurn');
            else
                break;
        case 'won':
            if(newStatus=='waitingForOpponent')
                GameStateTransistionOutput('attackingOwnTurn');
            else
                break;
        default:
    }
}



function GameStateTransistionOutput(nextState){//makes changes according to current and following state (requested)
    switch(ClientGameState) {
        case 'idle':
            if (nextState == 'placing') {
                //triggered by server (other player connected)
                setGameTurnLight(true);
                setStatusInfo("Welcome! <br>Please start placing your ships in the left Field!");}
            if (nextState == 'waitingForOpponent') {
                //triggered by server (other player connected)
                setGameTurnLight(true);
                setStatusInfo("You just created a new game.! <br>Waiting for somebody to join your game.");}
            break;
        case 'waitingForOpponent':
            if (nextState == 'placing') {
                //triggered by server (other player connected)
                setGameTurnLight(true);
                setStatusInfo("You've got an enemy now. <br>Please start placing your ships in the left Field!");
            }
            else if(nextState == 'refresh'){
                setStatusInfo("Welcome back!");
            }else{}

            break;
        case 'placing':   //can be triggered by pressing "continue" button.
            if(nextState=='waitingOpponentPlacing'){
                setGameTurnLight(false);
                setStatusInfo("Please wait until your enemy has finished placing ships.");}
            else{}
            break;
        case 'waitingOpponentPlacing':
            if(nextState=='attackingOwnTurn'){
                setGameTurnLight(true);
                setStatusInfo("Your Enemy is ready. <br> Please start your first attack in the right board.");}
            else if(nextState=='attackingOtherTurn'){
                setGameTurnLight(false);
                setStatusInfo("Enemy has placed and may start his first attack. <br> Please wait.");}
            break;
        case 'attackingOwnTurn':
            if(nextState=='attackingOtherTurn') {
                setGameTurnLight(false);
                if(lastSuccessfulAttackID == 'first'){
                }
                else if(lastSuccessfulAttackID != null)
                {
                    //document.getElementById("X"+lastSuccessfulAttackID).style.backgroundColor = "red";
                    //statusBox.innerHTML +="<br>You've hit an enemies ship at " + lastSuccessfulAttackID + "!";
                    setCellAtackSuccess(lastSuccessfulAttackIndices);
                    setStatusInfo("Success: You damaged a ship of your enemy!<br> It's his/her turn now.");
                }
                else{
                    setStatusInfo("You missed!<br> Your Enemy is at turn.");
                }
            }
            else{
                if(nextState=='won')
                    setStatusInfo("Congratulation! You have won.");
                setCellAtackSuccess(lastSuccessfulAttackIndices);
                if(nextState=='lost')
                    setStatusInfo("Sorry you have lost");
            }


            break;
        case 'attackingOtherTurn':
            if(nextState=='attackingOwnTurn') {
                setGameTurnLight(true);
                setStatusInfo("Enemy is ready now. <br> Atack in the right board and push continue.");
            }
            else{
                if(nextState=='won')
                    setStatusInfo("Congratulation! You have won.");
                if(nextState=='lost')
                    setStatusInfo("Sorry you have lost");
            }
            if(lastHitShipID != null)
            {
                setCellAtacked(lastHitShipIndices);
                //document.getElementById(lastHitShipID).style.backgroundColor = "red";
                setStatusInfo("Warning: One of your Ships was hit!<br> It's your turn to start a counterstrike.");
                //statusBox.innerHTML +="Warning: One of your Ships was hit!";
            }
            break;
        case 'refresh':
            if (nextState == 'waitingForOpponent'){
                setGameTurnLight(false);
                setStatusInfo("You just created a new game.! <br>Waiting for somebody to join your game.");}
            else if (nextState == 'placing'){
                setGameTurnLight(true);
                setStatusInfo("You've got an enemy now. <br>Please start placing your ships in the left Field!");}
            else if(nextState=='waitingOpponentPlacing'){
                setGameTurnLight(false);
                setStatusInfo("Please wait until your enemy has finished placing ships.");}
            else if(nextState=='attackingOwnTurn'){
                setGameTurnLight(true);
                setStatusInfo("Enemy is ready now. <br> Atack in the right board and push continue.");}
            else if(nextState=='attackingOtherTurn'){
                setGameTurnLight(false);
                setStatusInfo("Enemy has placed and is attacking you. <br> Please wait.");}
            else
                setStatusInfo("Error");
        break;
        case 'lost':
            break;
        case 'won':
            break;
        default:
            console.log('error in GameController');
    }

    ClientGameState=nextState;
}

function ReceivedAttackUpdate(indicesPlusState){

    var id = parseIndices2Id(indicesPlusState);
    bombsPlace[indicesPlusState[0]][indicesPlusState[1]]=indicesPlusState[2];

    if (indicesPlusState[2] == 2){
        lastSuccessfulAttackID = id;
        lastSuccessfulAttackIndices = indicesPlusState;
        /*document.getElementById("X"+id).style.backgroundColor = "red";
         statusBox.innerHTML+="<br>You've hit an enemies ship at " + id + "!";*/
    }
    else{
        lastSuccessfulAttackID = null;
        lastSuccessfulAttackIndices = null;
        /*document.getElementById("X"+id).style.backgroundColor = "grey";
         statusBox.innerHTML+="<br>You missed!";*/
    }
}

function ReceivedFieldUpdate(indicesPlusState){
    var id = parseIndices2Id(indicesPlusState);
    shipsSet[indicesPlusState[0]][indicesPlusState[1]]=indicesPlusState[2];

    if (indicesPlusState[2] == 2){
        lastHitShipID = id;
        lastHitShipIndices = indicesPlusState;
        /*document.getElementById(id).style.backgroundColor = "red";
         statusBox.innerHTML+="<br>A ship got hit at " + id + "!";*/
    }
    else{
        lastHitShipID = null;
        lastHitShipIndices = null;
    }

}

function ReceivedFieldRefresh(shipsRefresh){
    shipsSet = shipsRefresh;
    refreshUI();
}
function ReceivedAttackRefresh(bombsRefresh){
    bombsPlace = bombsRefresh;
    refreshUI();
}

function quitGame(){
    GameSessionActive = false;
    //sends the quit command to the server
    quitGameSession();
    resetGame();
}
function resetGame(){
    gameSessionId = null;
    GameSessionActive = false;

    shipsSet = new Array(gameboardSize)
    for(var i=0;i<gameboardSize; i++){
        //in every row:
        //initialize every cell/ column
        shipsSet[i] = new Array(gameboardSize);
    }
    bombsPlace = new Array(gameboardSize)
    for(var i=0;i<gameboardSize; i++){
        //in every row:
        //initialize every cell/ column
        bombsPlace[i] = new Array(gameboardSize);
    }
    numSetShips =0;
    numCarrier = 0;
    numBattleship = 0;
    numCruiser = 0;
    numDestroyer = 0;
    bombSet=false;
    ClientGameState = 'idle';

    setGameTurnLight(null);

    delCookie("sessionID");
    delCookie("playerID");

    setStatusInfo("");
    setDebugInfo("");
    refreshUI();
    //leave the game view
    showLandingContent();
}

function parseIndices2Id(indices) {
    //get first character of id like 'A'
    var C0 = indices[0];
    var C1 = indices[1];


    var lineNo = C0+1;
    var colNo = String.fromCharCode(C1+65);
    //hint: first element has index [0][0]
    //return new Array(lineNo, colNo)
    return colNo + lineNo;
}


//Called by UI (createGameSidebar)
function startNewGame(){
    requestGameSession(username);
}

function joinSession(sessionNo){
    if(GameSessionActive == false)
        requestJoinSession(sessionNo, username);
    else{
        createGameInfoBox.innerHTML='You have already an active game. Use Quit below the gamefield.';
        setTimeout(resetGameInfoBox, 1000);
    }
}

