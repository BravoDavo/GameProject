/**
 * Created by admin on 20.10.2015.
 */
var express     =   require('express');

var app         =   express();
var path = require('path');
var mainrouter  =   require('./router/main');
var ejs         =   require('ejs');
var socketIO    =   require('./SocketIO');
var Game        =   require('./Game');
mainrouter(app);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(express.static(path.join(__dirname, 'public')));
//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});

var server      =   app.listen(3000, function(){
    console.log("Server started and listening on Port 3000");
});

socketIO.initWebSocket(server);

