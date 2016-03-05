var loggedIn = false;
var navigationHomeButton;
var navigationGameButton;
var navigationHowToButton;
var statusSpan;
var debugDiv;
var loginInfoBox;
var createGameInfoBox;
var gameSessionsList;
var updateSessionTrigger;
var username;

function onload(){
    statusSpan = document.getElementById("status");
    debugDiv  = document.getElementById("debugDiv");
    navigationHomeButton = document.getElementById("navigationHomeButton");
    navigationGameButton = document.getElementById("navigationGameButton");
    navigationHowToButton = document.getElementById("navigationHowToButton");
    loginInfoBox          = document.getElementById("loginInfoBox");
    createGameInfoBox     = document.getElementById("createGameInfoBox");
    gameSessionsList      =document.getElementById("gameSessionsList");
    createGameInfoBox.innerHTML='';

    checkLoggedIn();
    showLandingContent();
    navigationHomeButton.className = "selected";
    initd = true;

    gameTurnLight = document.getElementById("gameTurnLight");
    //Wait for Websocket to connect before requesting
    //setTimeout(requestSessionsList, 1200);
}


//called by returning Request ("responseSessionsList")
function showSessionsList(sessions){
    gameSessionsList.innerHTML="<ul>";
    if(sessions.length>0) {
        if (sessions[0].pname != undefined && sessions[0].no != undefined)
            for (i in sessions) {
                gameSessionsList.innerHTML += '<li>' + sessions[i].no + '. <a href="#" id="' + sessions[i].no + '" onclick="joinSession(id)">' + sessions[i].pname + '</li>';
            }
    }else {
        gameSessionsList.innerHTML+='<li>No open session at the moment </li>';
    }
    gameSessionsList.innerHTML+="</ul>";
}


function checkLoggedIn(){
    username = getCookie("username");
    if(username!=null){
        //showSignedIn();
        loggedIn = true;
        delCookie("loginFailed");
        //document.getElementById('loginFailed').innerHTML = '';
        loginInfoBox.innerHTML='';
        //update open sessions list every 2 seconds when logged in
        updateSessionTrigger = setInterval(requestSessionsList, 2000);
    }
    else if(getCookie("loginFailed")!=null)
    {
        loggedIn = false;
        delCookie("loginFailed");
        //document.getElementById('loginFailed').innerHTML = 'Login failed!<br>';
        loginInfoBox.innerHTML='Login failed.<br> Please check your credentials and try again.';
    }
    else
    {
        loggedIn = false;
        //delCookie("loginFailed");
        //document.getElementById('loginFailed').innerHTML = '';
        loginInfoBox.innerHTML='';
    }
}

function showLandingContent(){
    document.getElementById("aboutContentDiv").style.display= "inline";
    document.getElementById("GameContentDiv").style.display= "none";
    //document.getElementById("HowToContentDiv").style.display= "none";
    document.getElementById("otherContentDiv").style.display= "none";

    document.getElementById("loginSidebar").style.display= "inline";
    document.getElementById("gameSidebar").style.display= "none";
    document.getElementById("signupSidebar").style.display= "none";
    document.getElementById("createGameSidebar").style.display= "none";


    navigationHomeButton.className = "selected";
    navigationHowToButton.className = "notSelected";
    navigationGameButton.className = "notselected";

    if(showSignedIn)
        showSignedIn();
}


function showSignedIn(){
    document.getElementById("usernameWelcomming").innerHTML=username;
    if(ClientGameState == 'idle') {
        document.getElementById("createGameSidebar").style.display = "inline";
        document.getElementById("loginSidebar").style.display = "none";
        document.getElementById("gameSidebar").style.display = "none";
        document.getElementById("signupSidebar").style.display = "none";
    }
}
function showGameView(){
    //Show game view
    document.getElementById("aboutContentDiv").style.display = "none";
    document.getElementById("GameContentDiv").style.display = "inline";
    document.getElementById("otherContentDiv").style.display = "none";

    document.getElementById("loginSidebar").style.display = "none";
    document.getElementById("gameSidebar").style.display = "inline";
    document.getElementById("signupSidebar").style.display = "none";
    document.getElementById("createGameSidebar").style.display = "none";

    navigationHowToButton.className = "notSelected";
    navigationHomeButton.className = "notSelected";
    navigationGameButton.className = "selected";
    //loginInfoBox.innerHTML='';
    //loginInfoBox.innerHTML='';
}

function resetContentDivStyle(){
    document.getElementById("GameContentDiv").className= "content"
}


function resetGameInfoBox(){
    createGameInfoBox.innerHTML='';
}
function resetLoginInfoBox(){
    loginInfoBox.innerHTML='';
}


//Ende Class
//}


//module.exports.UIController  = UIController;