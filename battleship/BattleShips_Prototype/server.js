/**
 * Created by admin on 20.10.2015.
 */
var express     =   require('express');
var bodyParser =    require('body-parser');

var app         =   express();
var path        =   require('path');
var ejs         =   require('ejs');
var socketIO    =   require('./SocketIO');
var db          =   require('./Server_DBFunctions');
var mainrouter  =   require('./router/main.js');
var signInRouter =  require('./router/userSignInUpRouter.js');
//mainrouter(app);




app.use(express.static(path.join(__dirname, 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', mainrouter);
//app.use('/signin', signInRouter);
//app.use('/signupuser', signInRouter);
app.use('/', signInRouter);
app.use('/signupuser', signInRouter);




//app.use(function(req, res, next) {
//    var err = new Error('Not Found');
//    err.status = 404;
//    next(err);
//});
db.initPool();

var server      =   app.listen(3000, function(){
    console.log("Server started and listening on Port 3000");
});
socketIO.initWebSocket(server);



