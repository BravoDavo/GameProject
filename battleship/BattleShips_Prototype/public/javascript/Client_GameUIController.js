/**
 * Created by admin on 12.01.2016.
 */

//function UIController() {//is a class definition

var initd = false;
const debugMode=false;
//"traffic light" saying whose turn it is
var gameTurnLight;



function ms(id){
    var td = document.getElementById(id);
    var indices = parseId2Indices(id);
    var indicesShip = calculatePlaceIndicesFromPreset(id);
    var sizeToSet   = getPlacementSize();
    var possible = true;

    //If not in placing state, leave
    if (ClientGameState != 'placing')
        return;

    //check if one of the cells is already set
    for (i in indicesShip) {
        if (shipsSet[indicesShip[i][0]][indicesShip[i][1]] == 1) {
            possible=false;
            return;
        }
    }
    //out of bounds?
    if (indicesShip == null)
        return;

   switch(sizeToSet) {
       case 2:
            if(numDestroyer < targetNumDestroyer)
                numDestroyer++;
            else
                return;
            break;
       case 3:
           if(numCruiser < targetNumCruiser)
               numCruiser++;
           else
               return;
           break;
       case 4:
           if(numBattleship < targetNumBattleship)
                numBattleship++;
            else
                return;
           break;
        case 5:
            if(numCarrier < targetNumCarrier)
                numCarrier++;
            else
                return;
           break;
       default:
   }


    if (indicesShip != null  && (numSetShips + sizeToSet) <= targetNumShips ) {
        for (i in indicesShip) {
            if (shipsSet[indicesShip[i][0]][indicesShip[i][1]] != 1) {
                td = document.getElementById(parseIndices2Id(indicesShip[i]));
                td.className="GameFieldShipsCheckedCell";
                shipsSet[ indicesShip[i][0] ][ indicesShip[i][1] ]=1;
                numSetShips++;
            }
        }
    }

    updateShipPlacementCounter();


    //}else {
    //    td.className="GameFieldShipsUncheckedCell";
    //    shipsSet[indices[0]][indices[1]]=0;
    //
    //}
}

function preselectBombCell(id) {
    var td = document.getElementById(id);
    var indices = parseId2Indices(id);
    //show preselection of attack-cell onmouseover
}

function preselectCell(id) {
    var td = document.getElementById(id);
    var indices = parseId2Indices(id);
    var indicesShip = calculatePlaceIndicesFromPreset(id);
    var possible = true;
    var sizeToSet = getPlacementSize();
    //If not in placing state, leave

    if (ClientGameState != 'placing' || (numSetShips + sizeToSet) > targetNumShips ){
        td.className = "GameFieldShipsSelectionImpossibleCell";
        return;}

    switch(sizeToSet) {
        case 2:
            if (numDestroyer >= targetNumDestroyer){
                td.className = "GameFieldShipsSelectionImpossibleCell";
                return;}
            break;
        case 3:
            if (numCruiser >= targetNumCruiser){
                td.className = "GameFieldShipsSelectionImpossibleCell";
                 return;}
            break;
        case 4:
            if (numBattleship >= targetNumBattleship){
                td.className = "GameFieldShipsSelectionImpossibleCell";
                return;}
            break;
        case 5:
            if (numCarrier >= targetNumCarrier){
                td.className = "GameFieldShipsSelectionImpossibleCell";
                return;}
            break;
        default:
    }

    if (indicesShip!=null)
        for (i in indicesShip) {
            if (shipsSet[indicesShip[i][0]][indicesShip[i][1]] == 1) {
                possible=false;
            }
        }
    else
        possible=false;

    if(possible){
        for (i in indicesShip) {
            if (shipsSet[indicesShip[i][0]][indicesShip[i][1]] != 1) {
                td = document.getElementById(parseIndices2Id(indicesShip[i]));
                td.className = "GameFieldShipsPreselectedCell";
            }
        }
    }else{
        td.className = "GameFieldShipsSelectionImpossibleCell";
    }
}

function calculatePlaceIndicesFromPreset(id){
    //0:
    var indicesSelected = parseId2Indices(id);
    var orientation= getPlacementOrientation();
    var indicesShip = new Array();
    indicesShip.push(indicesSelected);
    var size = getPlacementSize();
    switch(size){
        case 2:
            if(orientation=="h"){
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]+1));
            }else{
                indicesShip.push(new Array(indicesSelected[0]+1, indicesSelected[1]));
            }
            break;
        case 3:
            if(orientation=="h"){
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]-1));
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]+1));
            }else{
                indicesShip.push(new Array(indicesSelected[0]-1, indicesSelected[1]));
                indicesShip.push(new Array(indicesSelected[0]+1, indicesSelected[1]));

            }
            break;
        case 4:
            if(orientation=="h"){
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]-1));
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]+1));
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]+2));
            }else{
                indicesShip.push(new Array(indicesSelected[0]-1, indicesSelected[1]));
                indicesShip.push(new Array(indicesSelected[0]+1, indicesSelected[1]));
                indicesShip.push(new Array(indicesSelected[0]+2, indicesSelected[1]));
            }
            break;
        case 5:
            if(orientation=="h"){
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]-2));
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]-1));
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]+1));
                indicesShip.push(new Array(indicesSelected[0], indicesSelected[1]+2));
            }else{
                indicesShip.push(new Array(indicesSelected[0]-2, indicesSelected[1]));
                indicesShip.push(new Array(indicesSelected[0]-1, indicesSelected[1]));
                indicesShip.push(new Array(indicesSelected[0]+1, indicesSelected[1]));
                indicesShip.push(new Array(indicesSelected[0]+2, indicesSelected[1]));
            }
            break;
        default:
            indicesShip = null;
    }
    //check if this placement is possible
    for(i in indicesShip){
        if(indicesShip[i][0]>=gameboardSize || indicesShip[i][0]<0)
            return null;
        if(indicesShip[i][1]>=gameboardSize || indicesShip[i][1]<0)
            return null;
    }
    return indicesShip;
}

function getPlacementOrientation(){
    if(document.getElementById("radioHorizontal").checked == true)
        return "h";
    else
        return "v";
}
function getPlacementSize(){
    if(document.getElementById("radioCarrier").checked == true)
        return 5;
    else if(document.getElementById("radioBattleShip").checked == true)
        return 4;
    else if(document.getElementById("radioCruiser").checked == true)
        return 3;
    else if(document.getElementById("radioDestroyer").checked == true)
        return 2;
    else
        return 2;
}




function resetCellStyle(id){
    var td = document.getElementById(id);
    var indices = parseId2Indices(id);
    var indicesShip = calculatePlaceIndicesFromPreset(id);
    if(td.className != "GameFieldShipsSelectionImpossibleCell")
        for(i in indicesShip){
            if (shipsSet[indicesShip[i][0]][indicesShip[i][1]] != 1) {
                td = document.getElementById(parseIndices2Id(indicesShip[i]));
                td.className="GameFieldShipsUnCheckedCell";
            }
        }
    else if(shipsSet[indices[0]][indices[1]]==undefined){
        td.className="GameFieldShipsUnCheckedCell";
    }else if(shipsSet[indices[0]][indices[1]] != 1){
        td.className="GameFieldShipsUnCheckedCell";
    }else{
        td.className="GameFieldShipsCheckedCell";
    }
}
function resetGameFieldShips(){
    if(ClientGameState!='placing')
        return;

    shipsSet = new Array(gameboardSize)
    for (var i = 0; i < gameboardSize; i++) {
        shipsSet[i] = new Array(gameboardSize);
    }
    numSetShips = 0;
    numCarrier = 0;
    numBattleship = 0;
    numCruiser = 0;
    numDestroyer = 0;
    var i = 0;
    var j = 0;
    for (i = 0; i < gameboardSize; i++) {
        for (j = 0; j < gameboardSize; j++) {
            //GamefieldShips
            var gameBoardID = parseIndices2Id(new Array(i, j));
            var gameBoardTd = document.getElementById(gameBoardID);
            if (shipsSet[i][j] == 1)
                gameBoardTd.className = "GameFieldShipsCheckedCell";
            else {
                gameBoardTd.className = "GameFieldShipsUncheckedCell";
                gameBoardTd.innerHTML = "";
            }
        }
    }
}





function as(id) {   //is called by clicking on a Attack Gamfield Field (lower)
    var td = document.getElementById(id);
    if (ClientGameState != 'attackingOwnTurn')
        return;

    bombIndices = parseId2Indices(id.substr(1, 3));

    if (bombsPlace[bombIndices[0]][bombIndices[1]] != 1) {
        if (bombSet == false) {
            bombSet = true;
            td.className = "GameFieldAttackCheckedCell";
            attackIndices = bombIndices;
            bombsPlace[bombIndices[0]][bombIndices[1]]=1;
            setStatusInfo("Press continue, when you are ready.");
        }
        else {
            //document.getElementById("status").innerHTML = "Sorry you have already placed a bomb."
            setStatusInfo("Sorry you have already placed a bomb.");
        }
    }
    else {
        bombSet = false;
        td.className = "GameFieldAttackUncheckedCell";
        //necessary to set bombsPlace to 0 or just remove it from bombsPlace
        bombsPlace[bombIndices[0]][bombIndices[1]]=0;
    }

}

function refreshUI(){
    var i = 0;
    var j = 0;
    for(i=0; i<gameboardSize; i++ ){
        for(j=0; j<gameboardSize; j++){
            //GamefieldShips
            var gameBoardID = parseIndices2Id(new Array(i, j));
            var gameBoardTd = document.getElementById(gameBoardID);
            if( shipsSet[i][j]==1)
                gameBoardTd.className = "GameFieldShipsCheckedCell";
            else if( shipsSet[i][j]==2){
                gameBoardTd.className = "GameFieldShipsDamagedCell";
                gameBoardTd.innerHTML = "X";
            }else{
                gameBoardTd.className = "GameFieldShipsUncheckedCell";
                gameBoardTd.innerHTML = "";
            }
            //GamefieldAttacks
            //Attack-Cell Ids begin with 'X'
            //Thats the difference to Ship Cells
            gameBoardID = 'X'
            gameBoardID += parseIndices2Id(new Array(i, j));
            gameBoardTd = document.getElementById(gameBoardID);
            if(bombsPlace[i][j]==1)
                gameBoardTd.className = "GameFieldAttackCheckedCell";
            else if(bombsPlace[i][j]==2){
                gameBoardTd.className = "GameFieldAttackSuccessCell";
                gameBoardTd.innerHTML = "X";
            }else {
                gameBoardTd.className = "GameFieldShipsUncheckedCell";
                gameBoardTd.innerHTML = "";
            }
        }
    }
}



function parseId2Indices(id) {
    //get first character of id like 'A'
    var C0 = id.substr(0, 1);
    if(id.length>2){
        //IDs like A10 have 3 characters!
        var C1 = id.substr(1, 2);}
    else{
        //IDs like A9 have only 2 characters
        var C1 = id.substr(1, 1);}

    var colNo = C0.charCodeAt(0) - 65;
    var lineNo = C1 - 1;
    //hint: first element has index [0][0]
    return new Array(lineNo, colNo)
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


//Visualizes that a cell of this Player has been damaged
function setCellAtacked(indices){
    var id = parseIndices2Id(indices);
    document.getElementById(id).className = "GameFieldShipsDamagedCell";
    document.getElementById(id).innerHTML = "X";
    //make BG of Content-Div flash red
    document.getElementById("GameContentDiv").className = "contentGameDamaged";
    setTimeout( resetContentDivStyle , 100);

}

//visualize in the right board, that an attack was successful
function setCellAtackSuccess(indices){
    var id = "X";
    id += parseIndices2Id(indices);
    document.getElementById(id).className = "GameFieldAttackSuccessCell";
    document.getElementById(id).innerHTML = "X";
}

function setStatusInfo(text){
    statusSpan.innerHTML = text;
}
function setDebugInfo(text){
 if(debugMode)
    debugDiv.innerHTML = text;
}


function updateShipPlacementCounter(){
    var ca = document.getElementById("shipsCounterCarrier");
    var ba = document.getElementById("shipsCounterBattleship");
    var cr = document.getElementById("shipsCounterCruiser");
    var de = document.getElementById("shipsCounterDestroyer");

    ca.innerHTML = "(" +  numCarrier +   "/" +   targetNumCarrier + ")";
    ba.innerHTML = "(" + numBattleship +  "/" +  targetNumBattleship +  ")";
    cr.innerHTML = "(" + numCruiser +     "/" +  targetNumCruiser   +   ")";
    de.innerHTML = "(" + numDestroyer +  "/" +  targetNumDestroyer + ")";

}

function setGameTurnLight(turn){
    if(turn==true)
        gameTurnLight.className= "TlGreen";
    else if(turn==false)
        gameTurnLight.className= "TlRed";
    else
        gameTurnLight.className= "";


}