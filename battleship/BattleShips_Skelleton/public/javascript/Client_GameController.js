/**
 * Created by admin on 24.10.2015.
 */
//var Enum = require('enum');


var shipsSet = [];
var numSetShips =0;
var targetNumShips=4;

var bombSet=false;
var bombsPlace = [];

//var enum ClientStates {waitingForOponent, Placing, waitingOponentPlacing, Attacking, Lost, Won};
//var ClientGameState = new Enum('waitingForOpponent', 'Placing', 'waitingOpponentPlacing', 'Attacking', 'Lost', 'Won');
var ClientGameState = 'waitingForOpponent';
//var ClientGameState = 'AttackingOwnTurn';

//var statusBox=document.getElementById("status");
//var UIController = UIController();

function ContinueClicked() {  //handles a click on continue button
    switch (ClientGameState) {
        case 'Placing':
            if (numSetShips == targetNumShips){
                sendFieldUpdate(shipsSet);
                sendStateUpdate('waitOpponentPlacing');
                GameStateTransistionOutput('waitingOpponentPlacing');}
            else
                alert("Please set " + targetNumShips + " ships first.")
            break;
        case 'AttackingOwnTurn':
            if (bombSet == true){
                sendFieldUpdate(bombsPlace);
                sendStateUpdate('AttackingOtherTurn');
                GameStateTransistionOutput('AttackingOtherTurn');}
            else
                alert("Its only allowed to select one field to bomb.")
            break;
        case 'Lost':
            sendStateUpdate('WaitingForOpponent');
            GameStateTransistionOutput('WaitingForOpponent');
            break;
        case 'Won':
            sendStateUpdate('WaitingForOpponent');
            GameStateTransistionOutput('WaitingForOpponent');
            break;
        default:
    }
}

function ReceivedStatusUpdate(newStatus){
    switch (ClientGameState) {
        case 'waitingForOpponent':
            GameStateTransistionOutput('Placing');
            sendStateUpdate('Placing');

        case 'Placing':
            break;
        case 'AttackingOtherTurn':
            GameStateTransistionOutput('AttackingOwnTurn');
            //clean up own set/attack field/////////////////////
            /////////////////////////////////////////////////////
            //ToDo add update of UI according to attac of enemy//
            /////////////////////////////////////////////////////
            break;
        case 'Lost':
            if(newStatus=='WaitingForOpponent')
                GameStateTransistionOutput('AttackingOwnTurn');
            else
            break;
        case 'Won':
            if(newStatus=='WaitingForOpponent')
                GameStateTransistionOutput('AttackingOwnTurn');
            else
            break;
        default:
    }
}



function GameStateTransistionOutput(nextState){//makes changes according to current and following state (requested)
    statusBox=document.getElementById("status");
    switch(ClientGameState) {
        case 'waitingForOpponent':
            if (nextState == 'Placing') {
                //triggered by server (other player connected)
            statusBox.innerHTML = "You've got an enemy now. <br>"
            statusBox.innerHTML += "Please start placing your ships(" + targetNumShips + " in the upper Field!";
            }
            else{}
            break;
        case 'Placing':   //can be triggered by pressing "continue" button.
            if(nextState=='waitingOpponentPlacing')
                statusBox.innerHTML="Please wait until your enemy has finished placing ships";
        else{}
            break;
        case 'waitingOpponentPlacing':
            if(nextState=='AttackingOwnTurn')
                statusBox.innerHTML="Enemy is ready now. <br> Start Atacking in the lower field and push continue.";
            else{}
            break;
        case 'AttackingOwnTurn':
            if(nextState=='AttackingOtherTurn')
                statusBox.innerHTML="Enemy is attacking you. Please wait.";
            else{}
            break;
            break;
        case 'AttackingOtherTurn':
            if(nextState=='AttackingOwnTurn')
                statusBox.innerHTML="Enemy is ready now. <br> Atack in the lower field and push continue.";
            else{
                if(nextState=='Won')
                    statusBox.innerHTML="Congratulation! You have won.";
                if(nextState=='Lost')
                    statusBox.innerHTML="Sorry you have lost";
            }
            break;
        case 'Lost':
            break;
        case 'Won':
            break;
        default:
            console.log('error in GameController');
    }

ClientGameState=nextState;
}




