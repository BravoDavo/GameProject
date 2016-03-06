/**
 * Created by David on 05.03.2016.
 */
var express     =   require('express');
var bodyParser =    require('body-parser');
var app         =   express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path        =   require('path');
var ejs         =   require('ejs');
//var socketIO    =   require('./SocketIO');
var routes  =   require('./routes/index.js');



io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function() {
        console.log('user disconnected');
    });
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg)
    });
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', routes);
app.get('/', function(req, res){
    res.sendFile(__dirname + '/views/part1.html');
})
var server      =   app.listen(3000, function(){
    console.log("Server started and listening on Port 3000");
});
//socketIO.initWebSocket(server);



