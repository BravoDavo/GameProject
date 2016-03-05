

//function UIController() {//is a class definition
    var statusBox = document.getElementById("status");

    function ms(id) {   //is called by clicking on a SET Gamfield Field (upper)
        if (ClientGameState != 'Placing')
            return;

        var td = document.getElementById(id);
        if (shipsSet[id] != 1) {
            if (numSetShips < targetNumShips) {
                numSetShips++;

                document.getElementById("status").innerHTML = "Status: Ship set at place " + id;
                document.getElementById("status").innerHTML += "" + (targetNumShips - numSetShips) + " ships available"
                var td=document.getElementById(id);
                document.getElementById(id).style.backgroundColor = "grey";
                document.getElementById(id).className="GameFieldChecked";
                shipsSet[id] = 1;
            }
            else {
                document.getElementById("status").innerHTML = "Status: You have placed all available ships."
            }
        }
        else {
            numSetShips--;
            document.getElementById("status").innerHTML = "Status: Ship removed from place " + id;
            document.getElementById("status").innerHTML += "" + (targetNumShips - numSetShips) + " ships available"
            document.getElementById(id).style.backgroundColor = "dodgerblue";
            shipsSet[id] = 0;
        }

    }


    function as(id) {   //is called by clicking on a Attack Gamfield Field (lower)
        var td = document.getElementById(id);
        if (ClientGameState != 'AttackingOwnTurn')
            return;

        if (bombsPlace[id] != 1) {
            if (bombSet == false) {
                bombSet = true;
                document.getElementById("status").innerHTML = "Status: Bomb set at place " + id;
                document.getElementById(id).style.backgroundColor = "red";
                bombsPlace[id.substring(1, 3)] = 1;
            }
            else {
                document.getElementById("status").innerHTML = "Status: You have already placed a bomb."
            }
        }
        else {
            bombSet = false;
            document.getElementById("status").innerHTML = "Status: Bomb removed from place " + id;
            document.getElementById(id).style.backgroundColor = "dodgerblue";
            bombsPlace[id.substring(1, 3)] = 0;
        }

    }

//Ende Class
//}


//module.exports.UIController  = UIController;