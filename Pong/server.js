/**
 * Created by David on 05.03.2016.
 */
var express     =   require('express');
var bodyParser =    require('body-parser');
var app         =   express();
//var http = require('http').Server(app);
//var io = require('socket.io')(http);
var path        =   require('path');
var ejs         =   require('ejs');
//var socketIO    =   require('./SocketIO');
//var routes  =   require('./routes/index.js');


app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
//app.use('/', routes);
app.get('/', function(req, res){
    res.render('index.html');
})
/*var server      =   app.listen(3000, function(){
    console.log("Server started and listening on Port 3000");
});*/
//socketIO.initWebSocket(server);

/**************************************************
 ** NODE.JS REQUIREMENTS
 **************************************************/
var util = require("util"),					// Utility resources (logging, object inspection, etc)
    io = require ("socket.io"),
    Player = require("./Player").Player;	// Player class


/**************************************************
 ** GAME VARIABLES
 **************************************************/
var socket,		// Socket controller
    players;	// Array of connected players


/**************************************************
 ** GAME INITIALISATION
 **************************************************/
function init() {
    // Create an empty array to store players
    players = [];

    // Set up Socket.IO to listen on port 8000
    socket = io.listen(app.listen(3000));
    console.log("Server listens on port 3000");

    // Start listening for events
    setEventHandlers();
};


/**************************************************
 ** GAME EVENT HANDLERS
 **************************************************/
var setEventHandlers = function() {
    // Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

// New socket connection
function onSocketConnection(client) {
    util.log("New player has connected: "+client.id);

    // Listen for client disconnected
    client.on("disconnect", onClientDisconnect);

    // Listen for new player message
    client.on("new player", onNewPlayer);

    // Listen for move player message
    client.on("move player", onMovePlayer);
};

// Socket client has disconnected
function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);

    var removePlayer = playerById(this.id);

    // Player not found
    if (!removePlayer) {
        util.log("Player not found: "+this.id);
        return;
    };

    // Remove player from players array
    players.splice(players.indexOf(removePlayer), 1);

    // Broadcast removed player to connected socket clients
    this.broadcast.emit("remove player", {id: this.id});
};

// New player has joined
function onNewPlayer(data) {
    // Create a new player
    var newPlayer = new Player(data.x, data.y);
    newPlayer.id = this.id;

    // Broadcast new player to connected socket clients
    this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});

    // Send existing players to the new player
    var i, existingPlayer;
    for (i = 0; i < players.length; i++) {
        existingPlayer = players[i];
        this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
    };

    // Add new player to the players array
    players.push(newPlayer);
};

// Player has moved
function onMovePlayer(data) {
    // Find player in array
    var movePlayer = playerById(this.id);

    // Player not found
    if (!movePlayer) {
        util.log("Player not found: "+this.id);
        return;
    };

    // Update player position
    movePlayer.setX(data.x);
    movePlayer.setY(data.y);

    // Broadcast updated position to connected socket clients
    this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
};


/**************************************************
 ** GAME HELPER FUNCTIONS
 **************************************************/
// Find player by ID
function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
        if (players[i].id == id)
            return players[i];
    };

    return false;
};


/**************************************************
 ** RUN THE GAME
 **************************************************/
init();

