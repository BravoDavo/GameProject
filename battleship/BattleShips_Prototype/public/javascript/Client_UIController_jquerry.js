/**
 * Created by admin on 18.01.2016.
 */

$(document).ready(function() {

    function menu_highlight(menu_item){

        $("#menu").find("ul").find("li > a").removeClass('selected');
        $("#menu").find("ul").find("li > a").addClass('unSelected');
        $(menu_item).addClass("selected");
    };
    function changeVisibleContent(ContentDivId){
        $("#main").find("div.content").css("display", "none");
        $(ContentDivId).css("display", "inline");
    }
    function changeVisibleSidebar(SidebarDivId){
        $(document).find("div.side").css("display", "none");
        $(SidebarDivId).css("display", "inline");
    }


    $("#navigationHomeButton").on('click', function (x) {
        menu_highlight(this);
        changeVisibleContent("#aboutContentDiv");
        if(loggedIn == false)
            changeVisibleSidebar("#loginSidebar");
        else
            changeVisibleSidebar("#createGameSidebar");
    });

    $("#navigationGameButton").on('click', function (x) {
        if (loggedIn == true && GameSessionActive == true) {
            menu_highlight(this);
            changeVisibleContent("#GameContentDiv");
            changeVisibleSidebar("#gameSidebar");
        } else if (loggedIn == true) {
            createGameInfoBox.innerHTML = 'Please create or join a game first.';
            setTimeout(resetGameInfoBox, 1000);
        } else {
            //Neither logged in nor is a session open
            loginInfoBox.innerHTML = 'Please login and create or join a game first. ';
            setTimeout(resetLoginInfoBox, 1000);
        }
    });

    $("#navigationHowToButton").on('click', function (e) {
        menu_highlight(this); // Updates menu selection by adding highlight as selected class to menu items
        $("#otherContentDiv").html(how_to_play_html); // Add the how_to_play_html variable to the body content div #content
        changeVisibleContent("#otherContentDiv");
        if(loggedIn == false)
            changeVisibleSidebar("#loginSidebar");
        else
            changeVisibleSidebar("#createGameSidebar");
        e.preventDefault(); // Stop page from reloading
    });

    $("#navigationContactButton").on('click', function (x) {
        menu_highlight(this); // Updates menu selection by adding highlight as selected class to menu items
        $("#otherContentDiv").html(contact_html); // Add the contact_html variable to the body content div #content
        changeVisibleContent("#otherContentDiv");
        if(loggedIn == false)
            changeVisibleSidebar("#loginSidebar");
        else
            changeVisibleSidebar("#createGameSidebar");
        x.preventDefault(); // Stop page from reloading
    });

    $("#signupButton").on('click', function (x) {
        loginInfoBox.innerHTML='';
        changeVisibleSidebar("#signupSidebar");
        x.preventDefault(); // Stop page from reloading
    });

    $("#logoutButton").on('click', function (x) {
        delCookie("username");
        logoutUser();
        loggedIn = false;
        menu_highlight("#navigationHomeButton");
        changeVisibleSidebar("#loginSidebar");
        changeVisibleContent("#aboutContentDiv");
        loginInfoBox.innerHTML = '';
        clearInterval(updateSessionTrigger);
    });

    //ToDo: add TellFriend

    var home = '<h1> <center><u>About Battle ship</u></center></h1>\
				<p> Battleship is a very popular battle game, played all over the world in different forms and with different rules.\
				The original battleship game was played with paper and pencil, invented by Clifford Von Wickler before World War I. Back then,\
				the game was not called Battleship but Salvo. <p><p>While people still play this battle game with a paper and pencil,\
				it is also played as an online game. Because of its simplicity, \
				Battleship is a great game for children of all ages. Playing the game with a computer-controlled opponent allows\
				children to make mistakes while learning how to play the game.</p>Have FUN..!<div>\
			<marquee behavior="alternate"><img src="move.png" style="width:230px;height:80px;"></marquee>\
			</div>';


    var how_to_play_html = "<center><u> <b> <big>START/PREPARATION</big> </b> </u></center>Place yourships on the board which is 10X10 in size. These represent the location of the ships on a battlefield. There are total of 3 ships with 2 square, 4 square and 5 square in lenght. They can be placed horizontally and vertically. Then when you are ready click start. It will take one turn at a time for every palyer. Once the ships are placed the position cannot be changed. Each player will also bein possession of a second grid of the same size. Where the first grid is their own ships, the second one (which is blank at thebeginning of the game) is a mirror of their opponent battlefield.</p><p><center><u> <b> <big>IN PLAY</big> </b> </u></center> Once it is determined who will go first, that person will pick a square at random and just select it. This represents their firing a missile directly at that square.If the opposing player has any part  in the square then it will be destroyed. Equally the attacking player will place an X on theirblank grid (the mirror of their opponents field) to show a hit. In this instance the first player will now be allowed to make anotherguess. This continues until the attacking player misses. </p> "; // Add new page HTML here.
    var contact_html = '<table width="450px">\
			<tr>\
			 <td valign="top">\
			  <label for="first_name">First Name</label>\
			 </td>\
			 <td valign="top">\
			  <input  type="text" name="first_name" maxlength="50" size="30">\
			 </td>\
			</tr>\
			<tr>\
			 <td valign="top"">\
			  <label for="last_name">Last Name</label>\
			 </td>\
			 <td valign="top">\
			  <input  type="text" name="last_name" maxlength="50" size="30">\
			 </td>\
			</tr>\
			<tr>\
			 <td valign="top">\
			  <label for="email">Email Address</label>\
			 </td>\
			 <td valign="top">\
			  <input  type="text" name="email" maxlength="80" size="30">\
			 </td>\
			</tr>\
			<tr>\
			 <td valign="top">\
			  <label for="comments">Your Message</label>\
			 </td>\
			 <td valign="top">\
			  <textarea  name="comments" maxlength="1000" cols="40" rows="15"></textarea>\
			 </td>\
			 </tr>\
			<tr>\
			 <td colspan="2" style="text-align:center">\
			  <input type="submit" value="Submit">\
			 </td>\
			</tr>\
			</table>\
			</form>';

});